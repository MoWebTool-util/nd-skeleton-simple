import request from 'superagent'
import _debug from 'debug'

const debug = _debug('app:server:webpack-dispatcher')

export default options => {
  debug('Enable Webpack Request Dispatcher.')

  let cachedBearer = null
  const cachedSuid = {}
  const url = 'https://ucbetapi.101.com/v0.93'

  const { login_name, password } = options

  if (!login_name || !password) {
    throw new Error('need login_name and password')
  }

  const getBearerToken = () => {
    return new Promise((resolve, reject) => {
      if (cachedBearer) {
        return resolve(cachedBearer)
      }

      request
      .post(url + '/bearer_tokens')
      .send({
        login_name: login_name,
        password: password
      })
      .end((err, res) => {
        if (err) {
          debug(err)
          reject((cachedBearer = null))
        } else {
          resolve(cachedBearer = {
            token: res.body
          })
        }
      })
    })
  }

  const getSuid = (authorization, host, method, api) => {
    return new Promise((resolve, reject) => {
      const macToken = {}

      authorization.trim().split(',').forEach(s => {
        const index = s.indexOf('=')
        if (index > -1) {
          const key = s.substring(0, index).trim()
          let value = s.substring(index + 1).trim()
          value = value.substring(1, value.length - 1)
          macToken[key] = value
        }
      })

      const accessToken = macToken['MAC id']
      const mac = macToken.mac
      const nonce = macToken.nonce
      let suid = cachedSuid[accessToken]

      if (suid) {
        return resolve(suid)
      }

      request
      .post(url + '/tokens/' + accessToken + '/actions/valid')
      .send({ mac, nonce,
        host: host,
        http_method: method,
        request_uri: '/v0.1/dispatcher' + api
      })
      .end((err, res) => {
        if (err) {
          debug(err)
          reject((suid = null))
        } else {
          resolve((cachedSuid[accessToken] = res.body.user_id))
        }
      })
    })
  }

  return function * dispatcher (next) {
    if (!/\/dispatcher\//.test(this.url) ||
      !this.headers.dispatcher) {
      yield* next
      return
    }

    yield getBearerToken().then(({ token }) => {
      const { dispatcher, authorization } = this.headers
      const dispatcherHost = this.headers.host
      const dispatcherObj = JSON.parse(dispatcher)
      const { protocol, host, ver, vars } = dispatcherObj

      let { api } = dispatcherObj

      api = decodeURIComponent(api)

      if (vars) {
        Object.keys(vars).forEach(key => {
          api = api.replace(new RegExp('{' + key.replace(/\$/g, '\\$') + '}', 'img'), vars[key])
        })
      }

      return getSuid(authorization, dispatcherHost, this.method, api)
      .then(suid => {
        if (api.indexOf('?') === -1) {
          api += '?suid=' + suid
        } else {
          api += '&suid=' + suid
        }

        const METHOD_MAP = {
          'DELETE': 'del',
          'GET': 'get',
          'HEAD': 'head',
          'OPTION': 'option',
          'PATCH': 'patch',
          'POST': 'post',
          'PUT': 'put'
        }

        return new Promise((resolve, reject) => {
          request[METHOD_MAP[this.method]](protocol + host + '/' + ver + api)
          .set('Authorization', 'Bearer "' + token.access_token + '"')
          .send(this.request.body)
          .end((err, res) => {
            if (err) {
              debug(err)
            }
            resolve(res)
          })
        })
      })
      .then(({ status, header, body }) => {
        this.status = status
        this.type = header['content-type']
        this.body = body
      })
    }, ({body}) => {
      debug(body)
    })
  }
}
