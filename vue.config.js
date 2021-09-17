module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/devs.ao/build/'
    : '/',
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/variables.sass";'
      }
    }
  }
}
