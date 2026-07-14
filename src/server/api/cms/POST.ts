import type { Response } from 'express';
import { supabaseAdmin } from '../../supabase';
import type { AuthRequest } from '../../auth';

export default async function handler(req: AuthRequest, res: Response) {
  try {
    const data = req.body;

    // Upsert Speakers
    if (data.speakers) {
      const { error } = await supabaseAdmin.from('speakers').upsert(
        data.speakers.map((s: any) => ({
          id: s.id,
          name: s.name,
          role: s.role,
          organisation: s.organisation,
          bio: s.bio,
          avatar_url: s.avatarUrl,
          email: s.email,
          social_url: s.socialUrl
        }))
      );
      if (error) throw new Error(`Speakers upsert failed: ${error.message}`);
    }

    // Upsert Sponsors
    if (data.sponsors) {
      const { error } = await supabaseAdmin.from('sponsors').upsert(
        data.sponsors.map((s: any) => ({
          id: s.id,
          name: s.name,
          logo_url: s.logoUrl,
          website_url: s.websiteUrl,
          tier: s.tier
        }))
      );
      if (error) throw new Error(`Sponsors upsert failed: ${error.message}`);
    }

    // Upsert Sessions
    if (data.sessions) {
      const { error } = await supabaseAdmin.from('sessions').upsert(
        data.sessions.map((s: any) => ({
          id: s.id,
          title: s.title,
          description: s.description,
          tag: s.tag,
          date: s.date,
          time: s.time,
          duration: s.duration,
          status: s.status,
          speaker_ids: s.speakerIds || [],
          sponsor_ids: s.sponsorIds || [],
          registration_url: s.registrationUrl,
          video_url: s.videoUrl
        }))
      );
      if (error) throw new Error(`Sessions upsert failed: ${error.message}`);
    }

    // Upsert Forms
    if (data.forms) {
      const { error } = await supabaseAdmin.from('forms').upsert(
        data.forms.map((f: any) => ({
          id: f.id,
          name: f.name,
          fields: f.fields,
          submit_button_text: f.submitButtonText,
          success_message: f.successMessage
        }))
      );
      if (error) throw new Error(`Forms upsert failed: ${error.message}`);
    }

    // Upsert Pages
    const pages = [
      { id: 'homepage', html: data.homepageHtml, content: { ...(data.homepageContent || {}), customCss: data.homepageCss } },
      { id: 'sessions', html: data.sessionsPageHtml, content: { ...(data.sessionsContent || {}), customCss: data.sessionsPageCss } },
      { id: 'speakers', html: data.speakersPageHtml, content: { ...(data.speakersContent || {}), customCss: data.speakersPageCss } },
      { id: 'sponsors', html: data.sponsorsPageHtml, content: { ...(data.sponsorsContent || {}), customCss: data.sponsorsPageCss } },
      { id: 'contact', html: data.contactPageHtml, content: { ...(data.contactContent || {}), customCss: data.contactPageCss } },
      { id: 'privacy', html: data.privacyPageHtml, content: { ...(data.privacyContent || {}), customCss: data.privacyPageCss } },
      { id: 'terms', html: data.termsPageHtml, content: { ...(data.termsContent || {}), customCss: data.termsPageCss } },
      { id: 'register', html: data.registerPageHtml, content: { ...(data.registerContent || {}), customCss: data.registerPageCss } },
      { id: 'replays', html: data.replaysPageHtml, content: { ...(data.replaysContent || {}), customCss: data.replaysPageCss } },
      { id: 'session-detail', html: data.sessionDetailPageHtml, content: { ...(data.sessionDetailContent || {}), customCss: data.sessionDetailPageCss } },
      { id: '404', html: data.notFoundPageHtml, content: { ...(data.notFoundContent || {}), customCss: data.notFoundPageCss } }
    ];

    const { error: pagesError } = await supabaseAdmin.from('pages').upsert(
      pages.map(p => ({
        id: p.id,
        html: p.html || '',
        content: p.content || {},
        visual_mode: p.content?.visualMode || false
      }))
    );
    if (pagesError) throw new Error(`Pages upsert failed: ${pagesError.message}`);

    // Upsert Settings
    if (data.paymentConfig) {
      const { error } = await supabaseAdmin.from('settings').upsert({
        id: 'payment_config',
        value: data.paymentConfig
      });
      if (error) throw new Error(`Settings upsert failed: ${error.message}`);
    }

    if (data.globalCss !== undefined) {
      const { error } = await supabaseAdmin.from('settings').upsert({
        id: 'global_css',
        value: { css: data.globalCss }
      });
      if (error) throw new Error(`Global CSS upsert failed: ${error.message}`);
    }

    // Clear local memory cache
    const cacheModule = await import('./cache');
    cacheModule.clearCmsCache();

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('CMS POST handler failed:', err);
    return res.status(500).json({ error: err instanceof Error ? err.message : 'Failed to write CMS content' });
  }
}
