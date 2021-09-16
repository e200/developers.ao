const publicPath = process.env.NODE_ENV === 'production'
  ? '/build/'
  : '/'

module.exports = {
  publicPath: publicPath,
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/variables.sass";'
      }
    }
  }
}
