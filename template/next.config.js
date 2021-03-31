const STUDIO_REWRITE = {
  source: '/studio/:path*',
  destination:
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3333/studio/:path*'
      : '/studio/index.html',
}

module.exports = {
  //subpath routing, per https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ['en-US', 'fr', 'es'],
    defaultLocale: 'en-US',
  },
  env: {
    BIGCOMMERCE_API_TOKEN: process.env.BIGCOMMERCE_API_TOKEN,
    BIGCOMMERCE_API_URL: process.env.BIGCOMMERCE_API_URL
  },
  rewrites: () => [STUDIO_REWRITE]
}
