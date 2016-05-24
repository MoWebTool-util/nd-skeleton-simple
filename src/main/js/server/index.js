import Koa from 'koa'
import convert from 'koa-convert'
import webpack from 'webpack'
import webpackConfig from '../webpack'
import historyApiFallback from 'koa-connect-history-api-fallback'
import bodyParser from 'koa-bodyparser'
import json from 'koa-json'
import serve from 'koa-static'
import _debug from 'debug'
import config from '../config'

const debug = _debug('app:server')
const paths = config.utils_paths
const app = new Koa()

// This rewrites all routes requests to the root /index.html file
// (ignoring file requests). If you want to implement isomorphic
// rendering, you'll want to remove this middleware.
app.use(convert(historyApiFallback({
  verbose: false
})))

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (config.env === 'development' || config.env === 'test') {
  const compiler = webpack(webpackConfig)

  // Enable webpack-dev and webpack-hot middleware
  const { publicPath } = webpackConfig.output

  // app.use(bodyParser())
  app.use(require('./middleware/webpack-dev')(compiler, publicPath))
  app.use(require('./middleware/webpack-hmr')(compiler))

  app.use(convert(bodyParser()))
  app.use(convert(json()))

  app.use(convert(require('./middleware/webpack-dispatcher')(require('../.shouldnotpublic'))))
  app.use(convert(require('./middleware/webpack-tokens')()))

  // Serve api mocks from ~/mocks
  app.use(convert(require('./middleware/webpack-mock')(paths.base('mocks'), {
    // match non dispatcher requests
    matcher: /^\/v\d+(\.\d+)+(?!\/dispatcher\/)/,
    // trim version in request path
    reducer: /^\/v\d+(\.\d+)\/+/
  })))

  // Serve static assets from ~/src/static since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(convert(serve(paths.client('static'))))
} else {
  debug(
    'Server is being run outside of live development mode. This starter kit ' +
    'does not provide any production-ready server functionality. To learn ' +
    'more about deployment strategies, check out the "deployment" section ' +
    'in the README.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(convert(serve(paths.base(config.dir_dist))))
}

export default app
