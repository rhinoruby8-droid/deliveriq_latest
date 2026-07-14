/**
 * CMS Block Utilities
 * generateHtmlFromBlocks — deterministically converts structured content → HTML string
 * parseHtmlToBlocks — best-effort parse of HTML → structured blocks (returns null if too complex)
 */

import type {
  HomepageContent, SpeakersPageContent, SponsorsPageContent,
  ContactPageContent, DocumentPageContent, GenericPageContent,
} from './cms-client';

export type PageKey = 'homepage' | 'sessions' | 'speakers' | 'sponsors' | 'contact' | 'privacy' | 'terms' | 'register' | 'replays' | 'session-detail' | '404';

// ── HTML → Blocks (best-effort) ───────────────────────────────────────────

/**
 * Attempts to parse an HTML string into structured blocks for the given page.
 * Returns null if the HTML is too complex/custom to parse reliably.
 */
export function parseHtmlToBlocks(page: PageKey, html: string): unknown | null {
  // We only attempt parse for known simple patterns.
  // For complex/custom HTML (scripts, heavy nesting) we return null.
  try {
    if (typeof document === 'undefined') return null; // SSR guard
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.body;

    if (page === 'privacy' || page === 'terms') {
      return parseDocumentPage(body);
    }
    // For other pages, best-effort extraction of h1/h2 + paragraphs
    const h1 = body.querySelector('h1')?.textContent?.trim() || '';
    const h2 = body.querySelector('h2')?.textContent?.trim() || '';
    const paras = Array.from(body.querySelectorAll('p')).map(p => p.textContent?.trim() || '').filter(Boolean);
    if (!h1 && !h2 && paras.length === 0) return null;

    if (page === 'contact') {
      return {
        visualMode: true,
        hero: { title: h1 || h2, subtitle: paras[0] || '' },
        formIntro: paras[1] || '',
      } satisfies Partial<ContactPageContent>;
    }
    // generic pages (sessions)
    return {
      visualMode: true,
      hero: { title: h1 || h2, subtitle: paras[0] || '' },
      sections: paras.slice(1).map(p => ({ title: '', body: p })),
    } satisfies Partial<GenericPageContent>;
  } catch {
    return null;
  }
}

function parseDocumentPage(body: Element): Partial<DocumentPageContent> | null {
  const h1 = body.querySelector('h1')?.textContent?.trim() || '';
  const sections = Array.from(body.querySelectorAll('h2, h3')).map(heading => ({
    title: heading.textContent?.trim() || '',
    body: heading.nextElementSibling?.textContent?.trim() || '',
  })).filter(s => s.title);
  if (!h1 && sections.length === 0) return null;
  return { visualMode: true, title: h1, lastUpdated: '', sections };
}

// ── Blocks → HTML (deterministic) ────────────────────────────────────────

export function generateHtmlFromBlocks(page: PageKey, content: unknown): string {
  switch (page) {
    case 'homepage': return homepageToHtml(content as HomepageContent);
    case 'speakers': return speakersToHtml(content as SpeakersPageContent);
    case 'sponsors': return sponsorsToHtml(content as SponsorsPageContent);
    case 'contact':  return contactToHtml(content as ContactPageContent);
    case 'privacy':
    case 'terms':    return documentToHtml(content as DocumentPageContent);
    case 'sessions':
    case 'register':
    case 'replays':
    case 'session-detail':
    case '404':      return genericToHtml(content as GenericPageContent);
    default: return '';
  }
}

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function homepageToHtml(c: HomepageContent): string {
  const { hero, stats, introParagraph } = c;
  const statsHtml = stats.map(s =>
    `<div class="stat-item"><span class="stat-value">${esc(s.value)}</span><span class="stat-label">${esc(s.label)}</span></div>`
  ).join('\n  ');
  return `<section class="hero">
  <p class="eyebrow">${esc(hero.eyebrow || '')}</p>
  <h1>${esc(hero.headline)}</h1>
  <p class="subheadline">${esc(hero.subheadline)}</p>
  <div class="cta-group">
    <a href="${esc(hero.primaryCta.href)}" class="btn-primary">${esc(hero.primaryCta.label)}</a>
    ${hero.secondaryCta ? `<a href="${esc(hero.secondaryCta.href)}" class="btn-secondary">${esc(hero.secondaryCta.label)}</a>` : ''}
  </div>
</section>
<section class="stats">
  ${statsHtml}
</section>
<section class="intro">
  <p>${esc(introParagraph)}</p>
</section>`;
}

function speakersToHtml(c: SpeakersPageContent): string {
  const { hero, benefits, cta } = c;
  const bHtml = benefits.map(b =>
    `<div class="benefit"><strong>${esc(b.title)}</strong><p>${esc(b.description)}</p></div>`
  ).join('\n  ');
  return `<section class="hero">
  <h1>${esc(hero.headline)}</h1>
  <p>${esc(hero.subheadline)}</p>
</section>
<section class="benefits">
  ${bHtml}
</section>
<section class="cta">
  <h2>${esc(cta.headline)}</h2>
  ${cta.subtext ? `<p>${esc(cta.subtext)}</p>` : ''}
  <a href="${esc(cta.buttonHref)}">${esc(cta.buttonLabel)}</a>
</section>`;
}

function sponsorsToHtml(c: SponsorsPageContent): string {
  const { hero, tiers, cta } = c;
  const tiersHtml = tiers.map(t =>
    `<div class="tier tier-${esc(t.name.toLowerCase())}">
  <h3>${esc(t.name)}</h3>
  <p class="price">${esc(t.priceLabel)}</p>
  <ul>${t.benefits.map(b => `<li>${esc(b)}</li>`).join('')}</ul>
</div>`
  ).join('\n');
  return `<section class="hero">
  <h1>${esc(hero.headline)}</h1>
  <p>${esc(hero.subheadline)}</p>
</section>
<section class="tiers">
${tiersHtml}
</section>
<section class="cta">
  <h2>${esc(cta.headline)}</h2>
  <a href="${esc(cta.buttonHref)}">${esc(cta.buttonLabel)}</a>
</section>`;
}

function contactToHtml(c: ContactPageContent): string {
  return `<section class="hero">
  <h1>${esc(c.hero.title)}</h1>
  <p>${esc(c.hero.subtitle)}</p>
</section>${c.email ? `\n<p>Email: <a href="mailto:${esc(c.email)}">${esc(c.email)}</a></p>` : ''}${c.phone ? `\n<p>Phone: ${esc(c.phone)}</p>` : ''}${c.address ? `\n<address>${esc(c.address)}</address>` : ''}${c.formIntro ? `\n<p class="form-intro">${esc(c.formIntro)}</p>` : ''}`;
}

function documentToHtml(c: DocumentPageContent): string {
  const sectionsHtml = c.sections.map(s =>
    `<section>\n  <h2>${esc(s.title)}</h2>\n  <p>${esc(s.body)}</p>\n</section>`
  ).join('\n');
  return `<h1>${esc(c.title)}</h1>
<p class="last-updated">Last updated: ${esc(c.lastUpdated)}</p>
${sectionsHtml}`;
}

function genericToHtml(c: GenericPageContent): string {
  const sectionsHtml = c.sections.map(s =>
    s.title ? `<section>\n  <h2>${esc(s.title)}</h2>\n  <p>${esc(s.body)}</p>\n</section>` : `<p>${esc(s.body)}</p>`
  ).join('\n');
  return `<section class="hero">
  <h1>${esc(c.hero.title)}</h1>
  <p>${esc(c.hero.subtitle)}</p>
</section>
${sectionsHtml}`;
}
