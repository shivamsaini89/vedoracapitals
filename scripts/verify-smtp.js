import 'dotenv/config';
import nodemailer from 'nodemailer';

const secure = process.env.SMTP_SECURE === 'true';
const required = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS', 'SMTP_FROM', 'ENQUIRY_TO'];
const missing = required.filter((key) => !process.env[key]?.trim());

if (missing.length > 0) {
  console.error(`Missing SMTP settings: ${missing.join(', ')}`);
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || (secure ? 465 : 587),
  secure,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

try {
  await transporter.verify();
  console.log('SMTP connection and authentication verified. No email was sent.');
} catch (error) {
  console.error('SMTP verification failed:', error.code || error.name, error.responseCode || '', error.message);
  process.exitCode = 1;
} finally {
  transporter.close();
}