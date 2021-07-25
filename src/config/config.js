export const config = {
  secretKeyJwt: process.env.secretKeyJwt || 'secretKeyJwt',
  secretKeyRefreshToken:
    process.env.secretKeyRefreshToken || 'secretKeyRefreshToken',
  defaultLang: process.env.defaultLang || 'es',
  versionApi: process.env.versionApi || '/api/v1',
  minExpiredSession: process.env.minExpiredSession || 3600000 * 3,
};
