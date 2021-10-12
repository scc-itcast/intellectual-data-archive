const CompressionWebpackPlugin = require('compression-webpack-plugin')
const VueFilenameInjector = require('@d2-projects/vue-filename-injector')
const ThemeColorReplacer = require('webpack-theme-color-replacer')
const forElementUI = require('webpack-theme-color-replacer/forElementUI')
const { set, each, compact, map, keys } = require('lodash')

const resolve = dir => require('path').join(__dirname, dir)

// Add environment variable
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

// Build configuration for multiple pages
const pages = {
  index: {
    entry: 'src/main.js',
    template: 'public/index.html',
    filename: 'index.html',
    chunks: [
      'manifest',
      'index',
      'chunk-index',
      'chunk-vendor',
      'chunk-common',
      'chunk-vue',
      'chunk-element'
    ]
  },
  mobile: {
    entry: 'src.mobile/main.js',
    template: 'public/mobile.html',
    filename: 'mobile.html',
    chunks: ['manifest', 'mobile', 'chunk-mobile', 'chunk-vendor', 'chunk-common', 'chunk-vue']
  }
}

// Set up the external dependency package introduced by the method of using CDN
// For example
// if you set the Axios related link configuration here
// Axios will no longer participate in the packaging during the construction. Finally
// the external link you configured will be used to import Axios in the build result
const cdn = {
  // Which external dependencies related to index page are introduced in the form of CDN links
  index: [
    // {
    //   name: 'axios',
    //   library: 'axios',
    //   js: 'https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
    //   css: ''
    // }
  ],
  // Which external dependencies related to mobile page are introduced in the form of CDN links
  mobile: [
    // {
    //   name: 'axios',
    //   library: 'axios',
    //   js: 'https://cdn.jsdelivr.net/npm/axios@0.19.0/dist/axios.min.js',
    //   css: ''
    // }
  ]
}

// Set external dependent packages that do not participate in the build
const externals = {}
keys(pages).forEach(name => {
  cdn[name].forEach(p => {
    externals[p.name] = p.library
  })
})

module.exports = {
  // publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',  // 基本路径
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static',
  lintOnSave: false, // eslint-loader 是否在保存的时候检查
  productionSourceMap: false,
  devServer: {
    publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
    disableHostCheck: process.env.NODE_ENV === 'development'
  },
  css: {
    loaderOptions: {
      // postcss: {
      //   plugins: [
      //     require("postcss-plugin-px2rem")({
      //       rootValue: 192, //换算基数， 默认100  ，这样的话把根标签的字体规定为1rem为50px,这样就可以从设计稿上量出多少个px直接在代码中写多上px了。
      //       // unitPrecision: 5, //允许REM单位增长到的十进制数字。
      //       //propWhiteList: [],  //默认值是一个空数组，这意味着禁用白名单并启用所有属性。
      //       // propBlackList: [], //黑名单
      //       exclude: /(node_module)/, //默认false，可以（reg）利用正则表达式排除某些文件夹的方法，例如/(node_module)\/如果想把前端UI框架内的px也转换成rem，请把此属性设为默认值
      //       // selectorBlackList: [], //要忽略并保留为px的选择器
      //       // ignoreIdentifier: false,  //（boolean/string）忽略单个属性的方法，启用ignoreidentifier后，replace将自动设置为true。
      //       // replace: true, // （布尔值）替换包含REM的规则，而不是添加回退。
      //       mediaQuery: false, //（布尔值）允许在媒体查询中转换px。
      //       minPixelValue: 3 //设置要替换的最小像素值(3px会被转rem)。 默认 0
      //     })
      //   ]
      // },
      sass: {
        additionalData: '@use "@/assets/style/public.scss" as *;'
      },
      less: {
        lessOptions: {
          modifyVars: {
            blue: '#2262AB'
          }
        }
      }
    }
  },
  pages,
  configureWebpack: config => {
    const configNew = {}
    if (process.env.NODE_ENV === 'production') {
      configNew.externals = externals
      // configNew.plugins = [
      //   // gzip
      //   new CompressionWebpackPlugin({
      //     filename: '[path].gz[query]',
      //     test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
      //     threshold: 10240,
      //     minRatio: 0.8,
      //     deleteOriginalAssets: false
      //   })
      // ]
    }
    return configNew
  },
  // default: https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-service/lib/config/base.js
  chainWebpack: config => {
    config.optimization.runtimeChunk({
      name: 'manifest'
    })
    config.optimization.splitChunks({
      cacheGroups: {
        // External dependencies common to all pages
        libs: {
          name: 'chunk-vendor',
          chunks: 'initial',
          minChunks: 1,
          test: /[\\/]node_modules[\\/]/,
          priority: 1,
          reuseExistingChunk: true,
          enforce: true
        },
        // Code common to all pages
        common: {
          name: 'chunk-common',
          chunks: 'initial',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 2,
          reuseExistingChunk: true,
          enforce: true
        },
        // External dependencies that are only used by the index page
        index: {
          name: 'chunk-index',
          chunks: 'all',
          minChunks: 1,
          test: /[\\/]node_modules[\\/](sortablejs|screenfull|nprogress|hotkeys-js|fuse\.js|better-scroll|lowdb|shortid)[\\/]/,
          priority: 3,
          reuseExistingChunk: true,
          enforce: true
        },
        // External dependencies that are only used by the mobile page
        mobile: {
          name: 'chunk-mobile',
          chunks: 'all',
          minChunks: 1,
          test: /[\\/]node_modules[\\/](vant)[\\/]/,
          priority: 3,
          reuseExistingChunk: true,
          enforce: true
        },
        // Vue family packages
        vue: {
          name: 'chunk-vue',
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
          chunks: 'all',
          priority: 3,
          reuseExistingChunk: true,
          enforce: true
        },
        // only element-ui
        element: {
          name: 'chunk-element',
          test: /[\\/]node_modules[\\/]element-ui[\\/]/,
          chunks: 'all',
          priority: 3,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    })
    // Add the CDN settings to the settings of the htmlwebpackplugin plug-in
    keys(pages).forEach(name => {
      const packages = cdn[name]
      config.plugin(`html-${name}`).tap(options => {
        const setting = {
          css: compact(map(packages, 'css')),
          js: compact(map(packages, 'js'))
        }
        set(options, '[0].cdn', process.env.NODE_ENV === 'production' ? setting : [])
        return options
      })
    })
    // Remove prefetch preload settings for lazy load modules
    each(keys(pages), name => {
      config.plugins.delete(`prefetch-${name}`)
      config.plugins.delete(`preload-${name}`)
    })
    // webpack-theme-color-replacer
    config.plugin('theme-color-replacer').use(ThemeColorReplacer, [
      {
        fileName: 'css/theme-colors.[contenthash:8].css',
        matchColors: [
          ...forElementUI.getElementUISeries(process.env.VUE_APP_ELEMENT_COLOR) // Element-ui主色系列
        ],
        externalCssFiles: ['./node_modules/element-ui/lib/theme-chalk/index.css'], // optional, String or string array. Set external css files (such as cdn css) to extract colors.
        changeSelector: forElementUI.changeSelector
      }
    ])
    config
      // The development environment sourcemap does not contain column information
      .when(process.env.NODE_ENV === 'development', config => config.devtool('cheap-source-map'))
      // Add file name
      .when(process.env.VUE_APP_SCOURCE_LINK === 'TRUE', config =>
        VueFilenameInjector(config, {
          propName: process.env.VUE_APP_SOURCE_VIEWER_PROP_NAME
        })
      )
    // markdown
    config.module
      .rule('md')
      .test(/\.md$/)
      .use('text-loader')
      .loader('text-loader')
      .end()
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'd2-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude.add(resolve('src/assets/svg-icons/icons'))
      .end()
    // set alias
    config.resolve.alias.set('@.mobile', resolve('src.mobile'))
  },
  // 不输出 map 文件
  productionSourceMap: false,
  // i18n
  pluginOptions: {
    i18n: {
      locale: 'zh-chs',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
