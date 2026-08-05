import { Request, Response } from 'express';
import { supabaseAdmin } from '../../../supabase';

export default async function uploadHandler(req: Request, res: Response) {
  try {
    const { filename, contentType, base64 } = req.body;

    if (!filename || !contentType || !base64) {
      return res.status(400).json({ error: 'Missing required fields: filename, contentType, or base64.' });
    }

    // Convert base64 back to binary buffer
    const buffer = Buffer.from(base64, 'base64');
    
    // Ensure unique filename
    const uniqueFilename = `${Date.now()}-${filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const folder = req.body.folder || 'avatars';
    const path = `${folder}/${uniqueFilename}`;

    const { error } = await supabaseAdmin.storage
      .from('deliveriq-assets')
      .upload(path, buffer, {
        contentType,
        upsert: false,
      });

    if (error) {
      console.error('Supabase upload error:', error);
      return res.status(500).json({ error: error.message });
    }

    // Get public URL
    const { data: publicUrlData } = supabaseAdmin.storage
      .from('deliveriq-assets')
      .getPublicUrl(path);

    return res.status(200).json({ url: publicUrlData.publicUrl });
  } catch (error: any) {
    console.error('Upload handler error:', error);
    return res.status(500).json({ error: error.message });
  }
}
