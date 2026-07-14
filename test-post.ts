import { supabaseAdmin } from './src/server/supabase.js';

async function testPost() {
  const data = {
    forms: [
      {
        id: 'test-form',
        name: 'Test Form',
        fields: [{ id: 'f1', type: 'text', label: 'L1', required: false }],
        submitButtonText: 'Submit',
        successMessage: 'Success'
      }
    ]
  };

  const { error } = await supabaseAdmin.from('forms').upsert(
    data.forms.map((f: any) => ({
      id: f.id,
      name: f.name,
      fields: f.fields,
      submit_button_text: f.submitButtonText,
      success_message: f.successMessage
    }))
  );
  
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success!');
  }
}
testPost();
