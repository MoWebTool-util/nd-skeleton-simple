import request from 'superagent'
import _debug from 'debug'

const debug = _debug('app:server:webpack-tokens')

export default () => {
  debug('Enable Webpack Tokens.')

  return function * tokens (next) {
    if (this.method !== 'POST' || !/\/tokens/.test(this.url)) {
      yield* next
      return
    }

    yield new Promise((resolve, reject) => {
      request
      .post('https://ucbetapi.101.com/v0.93/tokens')
      .send(this.request.body)
      .end((err, res) => {
        if (err) {
          debug(err)
        }
        resolve(res)
      })
    }).then(({ status, body }) => {
      this.status = status
      this.body = body
    })
  }
}
