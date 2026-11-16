# SMTP Setup

The form submits to the same-origin `POST /api/enquiries` route. The Node server validates the data and sends a branded HTML email with a plain-text fallback. The Vedora logo is attached inline. SMTP credentials are read from server environment variables only.

## Configure local SMTP

1. Copy `.env.example` to `.env` in the project root.
2. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, and `SMTP_PASS` to the values from your mail provider.
3. Set `SMTP_FROM` to a sender address authorized by the provider and `ENQUIRY_TO` to the inbox that should receive enquiries.
4. Run `npm run smtp:verify`. This checks connection and authentication without sending an email.
5. Restart `npm run dev` after changing `.env`.

For Gmail, use a Google App Password with 2-Step Verification enabled; a regular Google account password will not work. `SMTP_SECURE=true` is typically for implicit TLS on port 465. STARTTLS commonly uses port 587 with `SMTP_SECURE=false`; follow the provider's instructions.

Never put credentials in `VITE_*` variables, frontend files, or a public repository. `.env` is ignored by Git; `.env.example` must contain placeholders only. If a credential was exposed, revoke it and create a replacement.

`GET /api/health` reports whether required settings are present; it does not authenticate with the provider. A successful form response is returned only after SMTP accepts the message. SMTP acceptance does not guarantee final inbox delivery.