module.exports = {
  reactStrictMode: true,
  publicRuntimeConfig: {
      apiUrl: process.env.NODE_ENV === 'development'
  }
}