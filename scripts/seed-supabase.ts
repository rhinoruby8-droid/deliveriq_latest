import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing VITE_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function seed() {
  console.log('Reading local cms-content.json...');
  const filePath = join(process.cwd(), 'src/data/cms-content.json');
  const data = JSON.parse(readFileSync(filePath, 'utf-8'));

  console.log('Seeding speakers...');
  if (data.speakers && data.speakers.length > 0) {
    const { error } = await supabase.from('speakers').upsert(
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
    if (error) console.error('Error seeding speakers:', error);
  }

  console.log('Seeding sponsors...');
  if (data.sponsors && data.sponsors.length > 0) {
    const { error } = await supabase.from('sponsors').upsert(
      data.sponsors.map((s: any) => ({
        id: s.id,
        name: s.name,
        logo_url: s.logoUrl,
        website_url: s.websiteUrl,
        tier: s.tier
      }))
    );
    if (error) console.error('Error seeding sponsors:', error);
  }

  console.log('Seeding sessions...');
  if (data.sessions && data.sessions.length > 0) {
    const { error } = await supabase.from('sessions').upsert(
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
    if (error) console.error('Error seeding sessions:', error);
  }

  console.log('Seeding forms...');
  if (data.forms && data.forms.length > 0) {
    const { error } = await supabase.from('forms').upsert(
      data.forms.map((f: any) => ({
        id: f.id,
        name: f.name,
        fields: f.fields,
        submit_button_text: f.submitButtonText,
        success_message: f.successMessage
      }))
    );
    if (error) console.error('Error seeding forms:', error);
  }

  console.log('Seeding pages...');
  const pages = [
    { id: 'homepage', html: data.homepageHtml, content: data.homepageContent },
    { id: 'sessions', html: data.sessionsPageHtml, content: data.sessionsContent },
    { id: 'speakers', html: data.speakersPageHtml, content: data.speakersContent },
    { id: 'sponsors', html: data.sponsorsPageHtml, content: data.sponsorsContent },
    { id: 'contact', html: data.contactPageHtml, content: data.contactContent },
    { id: 'privacy', html: data.privacyPageHtml, content: data.privacyContent },
    { id: 'terms', html: data.termsPageHtml, content: data.termsContent }
  ];

  const { error } = await supabase.from('pages').upsert(
    pages.map(p => ({
      id: p.id,
      html: p.html || '',
      content: p.content || {},
      visual_mode: p.content?.visualMode || false
    }))
  );
  if (error) console.error('Error seeding pages:', error);

  console.log('Seeding settings...');
  const settingsToSeed = [
    {
      id: 'payment_config',
      value: data.paymentConfig || {
        stripeActive: true,
        paypalActive: false,
        razorpayActive: false,
        currency: 'USD'
      }
    }
  ];

  if (data.globalSiteContent) {
    settingsToSeed.push({ id: 'global_site_content', value: data.globalSiteContent });
  }
  if (data.heroBannerConfig) {
    settingsToSeed.push({ id: 'hero_banner_config', value: data.heroBannerConfig });
  }
  if (data.topics) {
    settingsToSeed.push({ id: 'topics', value: data.topics });
  }
  if (data.coupons) {
    settingsToSeed.push({ id: 'coupons', value: data.coupons });
  }

  const { error: settingsError } = await supabase.from('settings').upsert(settingsToSeed);
  if (settingsError) console.error('Error seeding settings:', settingsError);

  console.log('Seeding complete!');
}

seed().catch(console.error);
