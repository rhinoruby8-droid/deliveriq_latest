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

      // Delete removed speakers
      const incomingIds = data.speakers.map((s: any) => s.id);
      const { data: existing } = await supabaseAdmin.from('speakers').select('id');
      const existingIds = existing?.map((s: { id: string }) => s.id) || [];
      const idsToDelete = existingIds.filter((id: string) => !incomingIds.includes(id));
      if (idsToDelete.length > 0) {
        await supabaseAdmin.from('speakers').delete().in('id', idsToDelete);
      }
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

      // Delete removed sponsors
      const incomingIds = data.sponsors.map((s: any) => s.id);
      const { data: existing } = await supabaseAdmin.from('sponsors').select('id');
      const existingIds = existing?.map((s: { id: string }) => s.id) || [];
      const idsToDelete = existingIds.filter((id: string) => !incomingIds.includes(id));
      if (idsToDelete.length > 0) {
        await supabaseAdmin.from('sponsors').delete().in('id', idsToDelete);
      }
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

      // Delete removed sessions
      const incomingIds = data.sessions.map((s: any) => s.id);
      const { data: existing } = await supabaseAdmin.from('sessions').select('id');
      const existingIds = existing?.map((s: { id: string }) => s.id) || [];
      const idsToDelete = existingIds.filter((id: string) => !incomingIds.includes(id));
      if (idsToDelete.length > 0) {
        await supabaseAdmin.from('sessions').delete().in('id', idsToDelete);
      }

      // Store pricing config in settings to avoid schema changes
      const sessionPricing: Record<string, any> = {};
      const sessionOgImages: Record<string, any> = {};
      data.sessions.forEach((s: any) => {
        sessionPricing[s.id] = {
          price: s.price !== undefined ? s.price : 0,
          isFree: s.isFree !== undefined ? s.isFree : false
        };
        if (s.sessionOgImageUrl) {
          sessionOgImages[s.id] = s.sessionOgImageUrl;
        }
      });
      
      const { error: pricingErr } = await supabaseAdmin.from('settings').upsert([
        { id: 'session_pricing', value: sessionPricing },
        { id: 'session_og_images', value: sessionOgImages }
      ]);
      if (pricingErr) throw new Error(`Pricing/OG Config upsert failed: ${pricingErr.message}`);
    }

    // Save coupons to settings to avoid schema changes
    if (data.coupons) {
      const { error: couponsErr } = await supabaseAdmin.from('settings').upsert({
        id: 'coupons',
        value: data.coupons
      });
      if (couponsErr) throw new Error(`Coupons upsert failed: ${couponsErr.message}`);
    }

    // Save topics to settings to avoid schema changes
    if (data.topics) {
      const { error: topicsErr } = await supabaseAdmin.from('settings').upsert({
        id: 'topics',
        value: data.topics
      });
      if (topicsErr) throw new Error(`Topics upsert failed: ${topicsErr.message}`);
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

      // Delete removed forms
      const incomingIds = data.forms.map((f: any) => f.id);
      const { data: existing } = await supabaseAdmin.from('forms').select('id');
      const existingIds = existing?.map((f: { id: string }) => f.id) || [];
      const idsToDelete = existingIds.filter((id: string) => !incomingIds.includes(id));
      if (idsToDelete.length > 0) {
        await supabaseAdmin.from('forms').delete().in('id', idsToDelete);
      }
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

    // Save hero banner config to settings
    if (data.heroBannerConfig) {
      const { error: heroErr } = await supabaseAdmin.from('settings').upsert({
        id: 'hero_banner_config',
        value: data.heroBannerConfig
      });
      if (heroErr) throw new Error(`Hero banner config upsert failed: ${heroErr.message}`);
    }

    if (data.globalSiteContent) {
      const { error: globalSiteErr } = await supabaseAdmin.from('settings').upsert({
        id: 'global_site_content',
        value: data.globalSiteContent
      });
      if (globalSiteErr) throw new Error(`Global site content upsert failed: ${globalSiteErr.message}`);
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
