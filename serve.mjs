// Production server startup script
// Imports the Express app from the built bundle and starts it listening

import app from './api/index.js';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import express from 'express';

const __dirname = dirname(fileURLToPath(import.meta.url));
const clientDir = join(__dirname, 'dist/client');
const port = parseInt(process.env.PORT || '3001', 10);
const host = process.env.HOST || '0.0.0.0';

// Serve static client files
app.use(express.static(clientDir, {
  index: false,
  setHeaders(res, filePath) {
    res.set(
      'Cache-Control',
      filePath.includes('/assets/')
        ? 'public, max-age=31536000, immutable'
        : 'no-cache',
    );
  },
}));

// SPA fallback - serve index.html for all non-API, non-file routes
app.use((req, res, next) => {
  if (req.path.startsWith('/api') || req.path.includes('.')) return next();
  try {
    const html = readFileSync(join(clientDir, 'index.html'), 'utf-8');
    res.set('Content-Type', 'text/html; charset=utf-8').set('Cache-Control', 'no-cache').send(html);
  } catch {
    next();
  }
});

const server = app.listen(port, host, () => {
  console.log(`✅ Production server running at http://${host}:${port}`);
});

server.on('error', (err) => {
  console.error('Server failed to start:', err.message);
  process.exit(1);
});

(['SIGTERM', 'SIGINT']).forEach((signal) => {
  process.once(signal, () => {
    console.log(`Shutting down (${signal})...`);
    process.exit(0);
  });
});
