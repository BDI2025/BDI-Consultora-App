exports.handler = async (event) => {
  const allowedOrigins = [
    'https://bdiconsultora.com',
    'https://www.bdiconsultora.com',
  ];
  const origin = (event.headers || {}).origin || '';
  const isPreviewOrigin =
    /^https:\/\/[a-z0-9-]+\.netlify\.app$/i.test(origin) ||
    /^https:\/\/deploy-preview-\d+--[a-z0-9-]+\.netlify\.app$/i.test(origin);
  const isLocalOrigin = /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(origin);
  const corsOrigin = allowedOrigins.includes(origin) || isPreviewOrigin || isLocalOrigin
    ? origin
    : allowedOrigins[0];

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': corsOrigin,
      'Vary': 'Origin',
      'Cache-Control': 'private, no-store',
    },
    body: JSON.stringify({
      url: process.env.SUPABASE_URL || '',
      anonKey: process.env.SUPABASE_ANON_KEY || '',
    }),
  };
};
