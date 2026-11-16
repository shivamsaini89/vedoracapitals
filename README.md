# Vedora Capital Services

React/Vite website with a Node.js API for SMTP-backed loan enquiries. SMTP credentials remain on the server and are never included in the frontend bundle.

## Requirements

- Node.js `20.19+` or `22.12+`
- npm
- SMTP credentials from your mail provider

## Local development

1. Run `npm ci` to install the locked dependencies.
2. Copy `.env.example` to `.env` and fill in the SMTP values. Keep `.env` private; it is gitignored.
3. Run `npm run smtp:verify` to test SMTP login without sending an email.
4. Run `npm run dev` to start Vite and the API together.
5. Open the URL printed by Vite (normally `http://localhost:5173`).

## Production

Run `npm ci`, `npm run build`, then `npm start`. The Node server serves `dist/` and `/api/enquiries` on the same origin. Configure the SMTP environment variables in the hosting provider, not in frontend build variables. See [Deployment](docs/deployment.md) and [SMTP setup](docs/smtp-integration.md).

## Project structure

```text
src/                    React pages, components, styles, and site data
public/                 Public favicon and brand assets
server/
	app.js                Express middleware, health route, static hosting
	index.js              Process entrypoint and graceful shutdown
	config.js             Runtime and SMTP configuration
	enquiries/            Enquiry validation and API route
	mail/                 Branded email template and inline logo
scripts/                SMTP verification utility
docs/                   Deployment and SMTP setup
```

`npm run lint` checks the code and `npm run build` creates the production frontend bundle.
