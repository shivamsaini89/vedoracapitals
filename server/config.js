import 'dotenv/config';
import nodemailer from 'nodemailer';

export const port = Number(process.env.PORT) || 3001;

export const mailSettings = {
  host: process.env.SMTP_HOST?.trim(),
  port: Number(process.env.SMTP_PORT) || (process.env.SMTP_SECURE === 'true' ? 465 : 587),
  secure: process.env.SMTP_SECURE === 'true',
  user: process.env.SMTP_USER?.trim(),
  pass: process.env.SMTP_PASS?.trim(),
  from: process.env.SMTP_FROM?.trim(),
  to: process.env.ENQUIRY_TO?.trim(),
};

export const mailConfigured = Boolean(
  mailSettings.host && mailSettings.user && mailSettings.pass && mailSettings.from && mailSettings.to,
);

export const transporter = mailConfigured
  ? nodemailer.createTransport({
    host: mailSettings.host,
    port: mailSettings.port,
    secure: mailSettings.secure,
    auth: { user: mailSettings.user, pass: mailSettings.pass },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 20000,
  })
  : null;