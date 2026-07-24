import { supabaseAdmin } from '../src/server/supabase';

async function run() {
  const { data, error } = await supabaseAdmin
    .from('pages')
    .select('id, html')
    .eq('id', 'sessions')
    .single();

  if (error || !data) {
    console.error('Error fetching page:', error);
    return;
  }

  const updatedHtml = data.html.replace('class="mb-12"', 'class="mb-6"');

  const { error: updateError } = await supabaseAdmin
    .from('pages')
    .update({ html: updatedHtml })
    .eq('id', 'sessions');

  if (updateError) {
    console.error('Error updating page:', updateError);
  } else {
    console.log('Successfully updated sessions page HTML in database!');
  }
}

run();
