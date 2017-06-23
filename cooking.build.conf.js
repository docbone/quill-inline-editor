var path = require('path');
var cooking = require('cooking');

cooking.set({
  entry: {
    editor: ['./src/index.js']
  },
  dist: './dist',
  template: false,

  devServer: {
    port: 8080,
    publicPath: '/'
  },
  format: 'umd',
  moduleName: 'QuillInlineEditor',

  // production
  clean: true,
  hash: false,
  sourceMap: 'SourceMap',
  minimize: true,
  chunk: false, // see https://cookingjs.github.io/zh-cn/configuration.html#chunk
  postcss: [
    // require('...')
  ],
  publicPath: '/dist/',
  assetsPath: 'static',
  urlLoaderLimit: 10000,
  extractCSS: '[name].css',
  alias: {
    'src': path.join(__dirname, 'src')
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  extends: ['vue2', 'lint', 'sass', 'autoprefixer']
});

module.exports = cooking.resolve();
