// eslint-disable-next-line no-undef
process.env.VUE_APP_BUILD_TIME = new Date()

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].template = 'node_modules/@vue/cli-service/lib/config/index-default.html'
        return args
      })
  },
  lintOnSave: false,
  publicPath: process.env.BASE_URL,
  assetsDir: 'static',
  indexPath: 'app.php',
  devServer: {
    proxy: {
      // proxy all requests starting with /ajax to URL+port defined in Vagrant file, to make Zinka PHP Ajax calls work in dev enviroment
      '/ajax': {
        target: 'http://localhost:8888'
      },
      '/fake': {
        target: 'http://localhost:8888'
      },
      '/dokumenti/': {
        target: 'http://localhost:8888'
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
