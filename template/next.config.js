module.exports = {
  //subpath routing, per https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ['en-US', 'fr', 'es'],
    defaultLocale: 'en-US',
  },
  env: {
    BIGCOMMERCE_API_TOKEN: process.env.BIGCOMMERCE_API_TOKEN,
    BIGCOMMERCE_API_URL: process.env.BIGCOMMERCE_API_URL
  }
}
