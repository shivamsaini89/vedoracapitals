# Deployment

The website and enquiry API are served by one Node.js process. Deploy the complete project to a Node.js host; static-only hosting cannot run the SMTP API.

## Node host

1. Use Node.js `20.19+` or `22.12+`.
2. Install with `npm ci`.
3. Build with `npm run build`.
4. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`, and `ENQUIRY_TO` as private runtime environment variables in the host dashboard. Do not set SMTP values as `VITE_*` variables.
5. Start with `npm start`. The host may provide `PORT`; otherwise the server defaults to `3001`.
6. Check `/api/health` after deploy. It reports configuration presence, not provider authentication. Run `npm run smtp:verify` in the deployed environment or review delivery logs to verify SMTP.

Set the provider's build command to `npm ci && npm run build` and start command to `npm start` when those fields are available.

## Docker

The root `Dockerfile` builds the frontend and installs only production dependencies in the runtime image. Build and run it without baking credentials into the image:

```sh
docker build -t vedora .
docker run --rm -p 3001:3001 \
  -e SMTP_HOST -e SMTP_PORT -e SMTP_SECURE \
  -e SMTP_USER -e SMTP_PASS -e SMTP_FROM -e ENQUIRY_TO \
  vedora
```

Provide those variables through your deployment platform's secret manager in production. Do not pass an `.env` file into a public image or commit it.

## Local production smoke test

```sh
npm ci
npm run build
npm start
```

Open the server URL and check `/api/health`. For development, `npm run dev` runs Vite and the API together, and Vite proxies `/api` to the Node process.