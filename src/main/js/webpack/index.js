import webpack from 'webpack'
import cssnano from 'cssnano'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from '../config'
import _debug from 'debug'

const debug = _debug('app:webpack:config')
const paths = config.utils_paths
const {__DEV__, __PROD__, __TEST__} = config.globals

debug('Create configuration.')
const webpackConfig = {
  name: 'client',
  target: 'web',
  devtool: config.compiler_devtool,
  resolve: {
    root: paths.base(config.dir_client),
    extensions: ['', '.js', '.css'],
    modulesDirectories: ['node_modules']
  },
  module: {},
  node: {
    fs: 'empty'
  }
}
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY_PATH = paths.client('index.js')

webpackConfig.entry = {
  app: __DEV__
    ? [APP_ENTRY_PATH, 'webpack-hot-middleware/client?path=/__webpack_hmr']
    : [APP_ENTRY_PATH],
  vendor: config.compiler_vendor
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  filename: `[name].[${config.compiler_hash_type}].js`,
  path: paths.base(config.dir_dist),
  publicPath: config.compiler_public_path
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new HtmlWebpackPlugin({
    template: paths.client('template/index.tmpl'),
    hash: false,
    favicon: paths.client('static/favicon.ico'),
    filename: 'index.html',
    inject: true,
    minify: {
      collapseWhitespace: config.compiler_html_minify,
      minifyJS: config.compiler_html_minify
    },
    title: config.pkg.description,
    env: config.target_env,
    appname: config.pkg.name,
    version: config.pkg.version,
    author: config.pkg.author,
    timestamp: Date.now(),
    description: config.pkg.description
  }),
  new CopyWebpackPlugin([{
    from: 'src/static'
  }], {
    ignore: ['*.ico', '*.md']
  })
]

if (__DEV__) {
  debug('Enable plugins for live development (HMR, NoErrors).')
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  debug('Enable plugins for production (OccurenceOrder, Dedupe & UglifyJS).')
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
  webpackConfig.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor']
  }))
}

// ------------------------------------
// Pre-Loaders
// ------------------------------------
webpackConfig.module.preLoaders = [{
  test: /\.js$/,
  loader: 'eslint',
  exclude: [/node_modules/],
  query: {
    configFile: paths.base('.eslintrc'),
    emitWarning: __DEV__
  }
}]

// ------------------------------------
// Loaders
// ------------------------------------

webpackConfig.module.loaders = []

// JavaScript
webpackConfig.module.loaders.push({
  // files in app, use bundle-loader
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel',
  query: {
    cacheDirectory: true,
    plugins: [
      'transform-runtime',
      'add-module-exports',
      'transform-decorators-legacy'
    ],
    presets: ['es2015-loose', 'stage-0']
  }
})

// JSON
webpackConfig.module.loaders.push({
  test: /\.json$/,
  loader: 'json'
})

// HTML
webpackConfig.module.loaders.push({
  test: /\.html$/,
  loader: 'html'
})

// Handlebars
webpackConfig.module.loaders.push({
  test: /\.handlebars$/,
  loader: 'raw'
})

// CSS
webpackConfig.module.loaders.push({
  test: /\.css$/,
  exclude: [paths.base('src/app')],
  loaders: [
    'style',
    'css?sourceMap&-minimize',
    'postcss'
  ]
})

webpackConfig.module.loaders.push({
  test: /\.css$/,
  include: [paths.base('src/app')],
  loaders: [
    'raw'
  ]
})

webpackConfig.postcss = [
  require('postcss-import'),
  require('postcss-nested'),
  require('postcss-mixins'),
  require('postcss-each'),
  require('postcss-simple-vars'),
  require('postcss-color-function'),
  require('postcss-sprites')['default']({
    spritePath: paths.client('theme/default/images'),
    relativeTo: 'rule',
    filterBy: image => {
      return /sprites\//.test(image.url) ? Promise.resolve() : Promise.reject()
    },
    groupBy: image => {
      return Promise.resolve(image.url.split('/').reverse()[1])
    }
  }),
  require('postcss-url'),
  require('postcss-cssnext'),
  require('postcss-browser-reporter'),
  require('postcss-reporter'),
  cssnano({
    sourcemap: true,
    autoprefixer: {
      add: true,
      remove: true,
      browsers: ['last 2 versions']
    },
    safe: true,
    discardComments: {
      removeAll: true
    }
  })
]

// File loaders
webpackConfig.module.loaders.push(
  {
    test: /\.woff(\?.*)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?.*)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff2'
  },
  {
    test: /\.otf(\?.*)?$/,
    loader: 'file?limit=10000&mimetype=font/opentype'
  },
  {
    test: /\.ttf(\?.*)?$/,
    loader: 'url?limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?.*)?$/,
    loader: 'file'
  },
  {
    test: /\.svg(\?.*)?$/,
    loader: 'url?limit=10000&mimetype=image/svg+xml'
  },
  {
    test: /\.(gif|png|jpg)$/,
    loader: 'url?limit=8192'
  }
)

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809
if (!__DEV__) {
  debug('Apply ExtractTextPlugin to CSS loaders.')
  webpackConfig.module.loaders.filter(loader => loader.loaders && loader.loaders.find(name => /css/.test(name.split('?')[0]))
  ).forEach(loader => {
    const [first, ...rest] = loader.loaders
    loader.loader = ExtractTextPlugin.extract(first, rest.join('!'))
    delete loader.loaders
  })

  webpackConfig.plugins.push(
    new ExtractTextPlugin('[name].[contenthash].css', {
      allChunks: true
    })
  )
}

export default webpackConfig
