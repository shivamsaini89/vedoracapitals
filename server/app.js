import express from 'express';
import rateLimit from 'express-rate-limit';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { mailConfigured, mailSettings, transporter } from './config.js';
import { createEnquiriesRouter } from './enquiries/router.js';

const projectRoot = path.dirname(fileURLToPath(new URL('../package.json', import.meta.url)));
const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '16kb' }));

app.get('/api/health', (_request, response) => {
  response.json({ ok: true, mailConfigured });
});

app.use('/api/enquiries', rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  skipFailedRequests: true,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'Too many enquiries were submitted from this connection. Please wait a few minutes before trying again.' },
}));

app.use('/api/enquiries', createEnquiriesRouter({
  transporter,
  from: mailSettings.from,
  to: mailSettings.to,
}));

app.use(express.static(path.join(projectRoot, 'dist')));
app.use((request, response, next) => {
  if (request.method !== 'GET' || request.path.startsWith('/api/')) return next();
  return response.sendFile(path.join(projectRoot, 'dist', 'index.html'), (error) => {
    if (error) next(error);
  });
});

app.use((error, _request, response, next) => {
  if (error instanceof SyntaxError && 'body' in error) {
    return response.status(400).json({ error: 'Invalid JSON request.' });
  }
  console.error('Server request failed:', error.message);
  return next(error);
});

export default app;