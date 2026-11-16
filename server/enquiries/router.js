import { Router } from 'express';
import { createEnquiryEmail } from '../mail/enquiryEmail.js';
import { hasHoneypotValue, validateEnquiry } from './validation.js';

const submissionResults = new Map();

export function createEnquiriesRouter({ transporter, from, to }) {
  const router = Router();

  router.post('/', async (request, response) => {
    let enquiry;
    try {
      if (!request.body || typeof request.body !== 'object' || Array.isArray(request.body)) {
        return response.status(400).json({ error: 'Invalid enquiry request.' });
      }
      if (hasHoneypotValue(request.body)) return response.json({ ok: true });
      enquiry = validateEnquiry(request.body);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }

    const existing = submissionResults.get(enquiry.submissionId);
    if (existing) {
      if (existing instanceof Promise) await existing;
      return response.json({ ok: true, duplicate: true });
    }

    if (!transporter) {
      return response.status(503).json({ error: 'The enquiry email service is not configured. Please contact us directly.' });
    }

    const email = createEnquiryEmail(enquiry);
    const delivery = transporter.sendMail({
      from,
      to,
      replyTo: enquiry.email || undefined,
      subject: `New loan enquiry: ${enquiry.fullName}`,
      ...email,
    });
    submissionResults.set(enquiry.submissionId, delivery);

    try {
      await delivery;
      submissionResults.set(enquiry.submissionId, Date.now() + 24 * 60 * 60 * 1000);
      for (const [id, expiry] of submissionResults) {
        if (typeof expiry === 'number' && expiry < Date.now()) submissionResults.delete(id);
      }
      return response.json({ ok: true });
    } catch (error) {
      submissionResults.delete(enquiry.submissionId);
      console.error('Enquiry email delivery failed:', error.message);
      return response.status(502).json({ error: 'We could not deliver your enquiry email. Your entries are still here; please try again.' });
    }
  });

  return router;
}