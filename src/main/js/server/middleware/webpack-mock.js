import { join, sep } from 'path'
import assert from 'assert'
import _debug from 'debug'
import send from 'koa-send'

const debug = _debug('app:server:webpack-mock')

/**
 * Serve mocks from `root`.
 *
 * @param {String} root
 * @return {Function}
 * @api public
 */

export default (root, options) => {
  debug('Enable Webpack API Mocking.')

  assert(root, 'root directory is required to serve api mocks')

  let lastMatcher = () => true
  let lastReducer = dest => dest

  const { matcher, reducer } = options

  if (matcher) {
    if (typeof matcher === 'function') {
      lastMatcher = matcher
    } else if (matcher.constructor === RegExp) {
      lastMatcher = url => matcher.test(url)
    }
  }

  if (reducer) {
    if (typeof reducer === 'function') {
      lastReducer = reducer
    } else if (reducer.constructor === RegExp) {
      lastReducer = url => url.replace(reducer, '')
    }
  }

  return function * mock (next) {
    if (lastMatcher(this.url)) {
      // reduce path
      let dest = lastReducer(this.path)
      // mock exactly
      if (yield send(this, join(dest, this.method + '.json'), { root })) return
      // mock wildcards
      dest = dest.split(sep)
      let size = dest.length
      while (size--) {
        const _dest = [...dest]
        // alias of `*`
        _dest[size] = '_'
        if (yield send(this, join(_dest.join(sep), this.method + '.json'), { root })) return
      }
    }
    yield* next
  }
}
