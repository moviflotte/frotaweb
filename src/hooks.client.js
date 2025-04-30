import { handleErrorWithSentry } from "@sentry/sveltekit";
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
  dsn: 'https://bad6baf4fb2072316e0edf5a1a15e994@o4507747429974016.ingest.us.sentry.io/4507857547231232',


});

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
