module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/build/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/variables.sass";'
      }
    }
  }
}
