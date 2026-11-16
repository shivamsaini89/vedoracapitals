import app from './app.js';
import { port, transporter } from './config.js';

const server = app.listen(port, () => {
  console.log(`Vedora enquiry server listening on port ${port}`);
});

function shutdown(signal) {
  console.log(`Received ${signal}; shutting down Vedora server.`);
  server.close(() => {
    transporter?.close();
    process.exit(0);
  });
  setTimeout(() => process.exit(1), 10000).unref();
}

process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));