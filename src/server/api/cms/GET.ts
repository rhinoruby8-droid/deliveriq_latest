import type { Request, Response } from 'express';
import { supabaseAdmin } from '../../supabase';
import { cmsCache } from './cache';

export default async function handler(req: Request, res: Response) {
  try {
    // Add aggressive caching headers for clients/CDNs
    res.setHeader('Cache-Control', 'public, max-age=300, s-maxage=300, stale-while-revalidate=86400');
    
    // Return fast in-memory cache if it exists
    if (cmsCache) {
      return res.status(200).json(cmsCache);
    }

    const [pagesRes, speakersRes, sponsorsRes, sessionsRes, settingsRes, formsRes] = await Promise.all([
      supabaseAdmin.from('pages').select('*'),
      supabaseAdmin.from('speakers').select('*'),
      supabaseAdmin.from('sponsors').select('*'),
      supabaseAdmin.from('sessions').select('*'),
      supabaseAdmin.from('settings').select('*'),
      supabaseAdmin.from('forms').select('*')
    ]);

    if (pagesRes.error) throw pagesRes.error;
    if (speakersRes.error) throw speakersRes.error;
    if (sponsorsRes.error) throw sponsorsRes.error;
    if (sessionsRes.error) throw sessionsRes.error;
    if (settingsRes.error) throw settingsRes.error;
    if (formsRes.error) throw formsRes.error;
    
    // Optimize image URLs
    const optimizeImg = (url: string | null) => {
      if (!url) return url;
      if (url.includes('supabase.co/storage/v1/object/public/')) {
        return url + (url.includes('?') ? '&' : '?') + 'format=webp';
      }
      return url;
    };
    
    const data: any = {
      speakers: speakersRes.data.map((s: any) => ({
        id: s.id,
        name: s.name,
        role: s.role,
        organisation: s.organisation,
        bio: s.bio,
        avatarUrl: optimizeImg(s.avatar_url),
        email: s.email,
        socialUrl: s.social_url
      })),
      sponsors: sponsorsRes.data.map((s: any) => ({
        id: s.id,
        name: s.name,
        logoUrl: optimizeImg(s.logo_url),
        websiteUrl: s.website_url,
        tier: s.tier
      })),
      sessions: sessionsRes.data.map((s: any) => ({
        id: s.id,
        title: s.title,
        description: s.description,
        tag: s.tag,
        date: s.date,
        time: s.time,
        duration: s.duration,
        status: s.status,
        speakerIds: s.speaker_ids || [],
        sponsorIds: s.sponsor_ids || [],
        registrationUrl: s.registration_url,
        videoUrl: s.video_url
      })),
      forms: formsRes.data.map((f: any) => ({
        id: f.id,
        name: f.name,
        fields: f.fields,
        submitButtonText: f.submit_button_text,
        successMessage: f.success_message
      }))
    };

    pagesRes.data.forEach((p: any) => {
      const pageKey = p.id;
      if (pageKey === 'homepage') {
        data.homepageHtml = p.html;
        data.homepageContent = p.content;
        data.homepageCss = p.content?.customCss || '';
      } else if (pageKey === 'sessions') {
        data.sessionsPageHtml = p.html;
        data.sessionsContent = p.content;
        data.sessionsPageCss = p.content?.customCss || '';
      } else if (pageKey === 'speakers') {
        data.speakersPageHtml = p.html;
        data.speakersContent = p.content;
        data.speakersPageCss = p.content?.customCss || '';
      } else if (pageKey === 'sponsors') {
        data.sponsorsPageHtml = p.html;
        data.sponsorsContent = p.content;
        data.sponsorsPageCss = p.content?.customCss || '';
      } else if (pageKey === 'contact') {
        data.contactPageHtml = p.html;
        data.contactContent = p.content;
        data.contactPageCss = p.content?.customCss || '';
      } else if (pageKey === 'privacy') {
        data.privacyPageHtml = p.html;
        data.privacyContent = p.content;
        data.privacyPageCss = p.content?.customCss || '';
      } else if (pageKey === 'terms') {
        data.termsPageHtml = p.html;
        data.termsContent = p.content;
        data.termsPageCss = p.content?.customCss || '';
      } else if (pageKey === 'register') {
        data.registerPageHtml = p.html;
        data.registerContent = p.content;
        data.registerPageCss = p.content?.customCss || '';
      } else if (pageKey === 'replays') {
        data.replaysPageHtml = p.html;
        data.replaysContent = p.content;
        data.replaysPageCss = p.content?.customCss || '';
      } else if (pageKey === 'session-detail') {
        data.sessionDetailPageHtml = p.html;
        data.sessionDetailContent = p.content;
        data.sessionDetailPageCss = p.content?.customCss || '';
      } else if (pageKey === '404') {
        data.notFoundPageHtml = p.html;
        data.notFoundContent = p.content;
        data.notFoundPageCss = p.content?.customCss || '';
      }
    });

    const paymentConfigSetting = settingsRes.data.find((s: any) => s.id === 'payment_config');
    if (paymentConfigSetting) {
      data.paymentConfig = paymentConfigSetting.value;
    }

    const globalCssSetting = settingsRes.data.find((s: any) => s.id === 'global_css');
    if (globalCssSetting) {
      data.globalCss = globalCssSetting.value?.css || '';
    } else {
      data.globalCss = '';
    }

    // Store in cache for future requests
    const cacheModule = await import('./cache');
    cacheModule.setCmsCache(data);

    return res.status(200).json(data);
  } catch (err) {
    console.error('CMS GET handler failed:', err);
    return res.status(500).json({ error: 'Failed to fetch CMS content' });
  }
}
