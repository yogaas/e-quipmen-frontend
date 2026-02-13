const env = import.meta.env;

export const ENV = {
  MODE: env.MODE as 'development' | 'production',
  APP_NAME: env.VITE_APP_NAME,
  API_URL: env.VITE_API_URL,
  ENABLE_LOGGER: env.VITE_ENABLE_LOGGER === 'true',
  IS_DEV: env.MODE === 'development',
  IS_PROD: env.MODE === 'production',
} as const;

// Optional: validation
if (!ENV.API_URL) {
  throw new Error('VITE_API_URL is not defined');
}
