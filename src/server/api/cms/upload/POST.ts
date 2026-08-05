import { Request, Response } from 'express';
import { supabaseAdmin } from '../../../supabase';
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

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
    const folder = req.body.folder || 'uploads';
    const path = `${folder}/${uniqueFilename}`;

    // Try Supabase Storage first
    try {
      if (supabaseAdmin) {
        const { error } = await supabaseAdmin.storage
          .from('deliveriq-assets')
          .upload(path, buffer, {
            contentType,
            upsert: false,
          });

        if (!error) {
          const { data: publicUrlData } = supabaseAdmin.storage
            .from('deliveriq-assets')
            .getPublicUrl(path);
          return res.status(200).json({ url: publicUrlData.publicUrl });
        }
        console.warn('Supabase upload warning, falling back to local file storage:', error.message);
      }
    } catch (supErr: any) {
      console.warn('Supabase storage unavailable, using local disk fallback:', supErr?.message || supErr);
    }

    // Local Disk Fallback
    const uploadDir = join(process.cwd(), 'public', 'assets', 'uploads');
    if (!existsSync(uploadDir)) {
      mkdirSync(uploadDir, { recursive: true });
    }

    const localFilePath = join(uploadDir, uniqueFilename);
    writeFileSync(localFilePath, buffer);

    const publicUrl = `/assets/uploads/${uniqueFilename}`;
    return res.status(200).json({ url: publicUrl });

  } catch (error: any) {
    console.error('Upload handler error:', error);
    return res.status(500).json({ error: error.message || 'Upload failed.' });
  }
}
