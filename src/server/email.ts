import { Resend } from 'resend';
import { supabaseAdmin } from './supabase';

const EMAIL_GATEWAY_URL = "http://127.0.0.1:2525/api/email/send";
const REQUEST_TIMEOUT_MS = 30_000;

export type EmailAttachment = {
	/** File name presented to the recipient. Must not contain CR, LF, quote, or backslash. */
	filename: string;
	/**
	 * Attachment bytes. Always pass raw bytes — the helper base64-encodes
	 * for the wire. For text content (e.g. an .ics calendar invite),
	 * encode the string yourself: `Buffer.from(text, 'utf-8')`.
	 */
	content: Buffer | Uint8Array;
	/** MIME type. Defaults to application/octet-stream when omitted. */
	contentType?: string;
};

export type SendEmailInput = {
	/** Recipient address(es). At least one required. */
	to: string | string[];
	/** Carbon-copy recipient(s). */
	cc?: string | string[];
	/** Blind-carbon-copy recipient(s). Never appears in headers. */
	bcc?: string | string[];
	/** Subject line. Required. */
	subject: string;
	/** Plain-text body. At least one of text or html is required. */
	text?: string;
	/** HTML body. At least one of text or html is required. */
	html?: string;
	/** Reply-To header. Use this to direct replies elsewhere. */
	replyTo?: string;
	/**
	 * Sender address. Omit to use the app's canonical sender — the gateway
	 * picks the right value based on attached domains. Only set this when
	 * a specific local-part on a verified domain is required; the gateway
	 * rejects unverified senders with a 400.
	 */
	from?: string;
	/**
	 * Display name shown in the recipient's inbox (e.g. "Acme Bakery").
	 * Combined with the resolved sender address to produce an RFC 5322
	 * From header like: "Acme Bakery" <sender@domain>.
	 */
	fromName?: string;
	/**
	 * When true, if From and any recipient share the same domain, the gateway
	 * rewrites From to the platform default sender (e.g. <appId>@airoapp.ai).
	 * Use when same-domain emails are being quarantined by inbound filters.
	 */
	sameDomainFallback?: boolean;
	/** Up to 10 attachments, each ≤ 2 MB decoded. */
	attachments?: EmailAttachment[];
};

export type SendEmailResult = {
	/** Opaque id minted by the gateway or Resend. Logged for correlation. */
	messageId: string;
};

type GatewayPayload = {
	to: string[];
	cc?: string[];
	bcc?: string[];
	subject: string;
	text?: string;
	html?: string;
	replyTo?: string;
	from?: string;
	fromName?: string;
	sameDomainFallback?: boolean;
	attachments?: { filename: string; content: string; contentType?: string }[];
};

type GatewayResponse = {
	success: boolean;
	messageId?: string;
	error?: string;
};

export async function getGatewaySettings(): Promise<{ email_provider: string; resend_api_key: string }> {
	try {
		if (supabaseAdmin) {
			const { data } = await supabaseAdmin
				.from('settings')
				.select('value')
				.eq('id', 'gateway_api_keys')
				.maybeSingle();

			if (data?.value) {
				return {
					email_provider: data.value.email_provider || process.env.EMAIL_PROVIDER || 'airo',
					resend_api_key: data.value.resend_api_key || process.env.RESEND_API_KEY || '',
				};
			}
		}
	} catch (err) {
		console.warn('Failed to fetch email settings from Supabase:', err);
	}

	return {
		email_provider: process.env.EMAIL_PROVIDER || 'airo',
		resend_api_key: process.env.RESEND_API_KEY || '',
	};
}

export async function sendEmailViaResend(input: SendEmailInput, apiKey: string): Promise<SendEmailResult> {
	if (!apiKey) {
		throw new Error('Resend API key is missing');
	}

	const resend = new Resend(apiKey);
	const fromAddress = input.from || 'onboarding@resend.dev';
	const fromFormatted = input.fromName ? `${input.fromName} <${fromAddress}>` : fromAddress;

	const payload: Record<string, unknown> = {
		from: fromFormatted,
		to: toArray(input.to),
		subject: input.subject,
	};

	const cc = toArray(input.cc);
	if (cc.length > 0) payload.cc = cc;

	const bcc = toArray(input.bcc);
	if (bcc.length > 0) payload.bcc = bcc;

	if (input.text) payload.text = input.text;
	if (input.html) payload.html = input.html;
	if (!input.text && !input.html) payload.html = '<p></p>';

	if (input.replyTo) payload.reply_to = input.replyTo;

	if (input.attachments && input.attachments.length > 0) {
		payload.attachments = input.attachments.map((att) => ({
			filename: att.filename,
			content: Buffer.from(att.content),
		}));
	}

	const { data, error } = await resend.emails.send(payload as any);

	if (error || !data) {
		throw new Error(`Resend email send failed: ${error?.message || 'Unknown error'}`);
	}

	return { messageId: data.id };
}

export async function sendEmailViaAiro(input: SendEmailInput): Promise<SendEmailResult> {
	const payload = buildPayload(input);

	let response: Response;
	let body: GatewayResponse;
	try {
		response = await fetch(EMAIL_GATEWAY_URL, {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify(payload),
			signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
		});
		body = await parseBody(response);
	} catch (err) {
		throw new Error(`email gateway unreachable: ${describeError(err)}`);
	}

	if (!response.ok || !body.success) {
		const detail = body.error ?? `HTTP ${response.status}`;
		const idSuffix = body.messageId ? ` (messageId=${body.messageId})` : "";
		throw new Error(`email send failed: ${detail}${idSuffix}`);
	}

	if (!body.messageId) {
		throw new Error("email send succeeded but gateway returned no messageId");
	}

	return { messageId: body.messageId };
}

export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
	const settings = await getGatewaySettings();
	if (settings.email_provider === 'resend' && settings.resend_api_key) {
		return sendEmailViaResend(input, settings.resend_api_key);
	}
	return sendEmailViaAiro(input);
}

function buildPayload(input: SendEmailInput): GatewayPayload {
	const payload: GatewayPayload = {
		to: toArray(input.to),
		subject: input.subject,
	};
	const cc = toArray(input.cc);
	if (cc.length > 0) payload.cc = cc;
	const bcc = toArray(input.bcc);
	if (bcc.length > 0) payload.bcc = bcc;
	if (input.text) payload.text = input.text;
	if (input.html) payload.html = input.html;
	if (input.replyTo) payload.replyTo = input.replyTo;
	if (input.from) payload.from = input.from;
	if (input.fromName) payload.fromName = input.fromName;
	if (input.sameDomainFallback) payload.sameDomainFallback = true;
	if (input.attachments && input.attachments.length > 0) {
		payload.attachments = input.attachments.map(encodeAttachment);
	}
	return payload;
}

function toArray(value: string | string[] | undefined): string[] {
	if (value === undefined) return [];
	return Array.isArray(value) ? value : [value];
}

function encodeAttachment(att: EmailAttachment): { filename: string; content: string; contentType?: string } {
	const out: { filename: string; content: string; contentType?: string } = {
		filename: att.filename,
		content: Buffer.from(att.content).toString("base64"),
	};
	if (att.contentType) out.contentType = att.contentType;
	return out;
}

async function parseBody(response: Response): Promise<GatewayResponse> {
	try {
		return (await response.json()) as GatewayResponse;
	} catch (err) {
		if (isAbortLike(err)) throw err;
		return { success: false, error: `non-JSON response (HTTP ${response.status})` };
	}
}

function isAbortLike(err: unknown): boolean {
	return err instanceof Error && (err.name === "AbortError" || err.name === "TimeoutError");
}

function describeError(err: unknown): string {
	if (err instanceof Error) {
		if (isAbortLike(err)) return `timed out after ${REQUEST_TIMEOUT_MS}ms`;
		return err.message;
	}
	return String(err);
}

