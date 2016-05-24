import BASE from 'nd-base'
import Promise from 'nd-promise'
import $ from 'jquery'
import Browser from 'nd-browser'
import ENV from 'utils/env'
import { getAuth } from 'utils/auth'

/**
 * options' structure
 * {
 *   // 提交数据
 *   data: {
 *     page: 1,
 *     size: 20
 *   },
 *   // 根据 REST 规范，直接添加到 uri 末尾
 *   id: 123,
 *   // 替换请求地址中的 `{xyz}`
 *   vars: {
 *     xyz: 'abc'
 *   }
 * }
 */

const DELETE = 'DELETE'
const GET = 'GET'
const PATCH = 'PATCH'
const POST = 'POST'
const PUT = 'PUT'

const encode = window.encodeURIComponent

const addParams = (url, params, hasDispatcher) => {
  const arr = $.map(params, (item, key) => {
    return encode(key) + '=' + (hasDispatcher ? ('{' + key + '}') : encode(params[key]))
  }).join('&')

  if (!arr) {
    return url
  }

  return url + (url.indexOf('?') !== -1 ? '&' : '?') + arr
}

const getDispatcher = options => {
  // 未开启代理
  if (!ENV.DISPATCHER) {
    return false
  }

  // 模拟环境下，跳过代理
  if (ENV.ENV === ENV.SIMULATION) {
    return false
  }

  // 本地接口，跳过代理
  if (ENV.DISPATCHER.res === options.res) {
    return false
  }

  // 存在白名单
  if (ENV.DISPATCHER.whitelist) {
    // 不在白名单
    if (ENV.DISPATCHER.whitelist.indexOf(options.res) === -1) {
      return false
    }
  }

  return ENV.DISPATCHER
}

const processIdAndData = (options, hasDispatcher) => {
  const { id, data, method } = options
  let { api, vars = {} } = options

  if (typeof id !== 'undefined') {
    if (hasDispatcher) {
      api += '/{' + options.idVar + '}'
      // 保存到 vars
      vars[options.idVar] = id
    } else {
      api += '/' + id
    }
  }

  if (data) {
    if (/^GET|DELETE$/i.test(method)) {
      api = addParams(api, data, hasDispatcher)

      if (hasDispatcher) {
        vars = { ...vars, ...data }
      }
    } else {
      options.data = JSON.stringify(data)
    }
  }

  // disable cache
  if (!ENV.CACHE_ENABLED) {
    if (hasDispatcher) {
      options.headers[Browser.browser === 'IE' ? 'Pragma' : 'Cache-Control'] = 'no-cache'
    } else {
      // waf DOES NOT support cors Cache-Control header currently
      // would be REMOVED after waf updated
      api += api.indexOf('?') === -1 ? '?' : '&'
      api += '_=' + new Date().getTime()
    }
  }

  options.api = api
  options.vars = vars
}

const processDispatcher = (options, dispatcher) => {
  const { res, api, vars, headers } = options
  $.each(vars, (key, item) => {
    vars[key] = encode(vars[key])
  })
  headers.Dispatcher = JSON.stringify({
    ...res,
    api: encodeURIComponent(api), // not encode by wuzj
    // use vars, NOT var any more
    vars: vars
  })

  // 修改 res
  options.res = dispatcher.res

  // 修改 api
  options.api = '/' + dispatcher.api + api
}

const processAuth = options => {
  const auth = getAuth()

  if (auth) {
    options.headers.orgname = auth.orgname
    if (auth.vorg) {
      options.headers.vorg = auth.vorg
    }
  }
}

const processFinally = options => {
  const { vars } = options
  let { api } = options

  // always replace vars at last
  if (vars) {
    $.each(vars, (key, item) => {
      api = api.replace(new RegExp('{' + key.replace(/\$/g, '\\$') + '}', 'img'), vars[key])
    })
  }

  options.api = api
}

const getConfigForAjax = options => {
  const { res, api, data, method, headers } = options

  return {
    url: res.protocol + res.host + '/' + res.ver + api,
    method,
    data,
    headers
  }
}

const ajax = options => {
  return new Promise((resolve, reject) => {
    $.ajax(options).then(data => {
      resolve(data)
    }, err => {
      reject(err)
    })
  })
}

const REST = BASE.extend({
  resource: {
    // res: {
    //   protocol
    //   host
    //   ver
    // }
    // api
    // vars
    // id
  },
  idVar: 'id',
  request: function (_options, method) {
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: {}
    }

    Object.assign(options, this.resource)
    options.idVar = options.idVar || this.idVar

    // 转换直接传入 ID 值的情况
    if (typeof _options === 'string' || typeof _options === 'number') {
      options.id = _options
    } else {
      if (_options) {
        Object.assign(options, _options)
      }
    }

    const dispatcher = getDispatcher(options)

    // id, data, vars, etc
    processIdAndData(options, !!dispatcher)
    // dispatcher
    if (dispatcher) {
      processDispatcher(options, dispatcher)
    }
    // 处理权限
    processAuth(options)
    // 处理直接访问
    processFinally(options)
    return ajax(getConfigForAjax(options))
      .then(data => {
        return data
      }, err => {
        throw err
      })
  },
  'DELETE': function (options) {
    return this.request(options, DELETE)
  },
  'GET': function (options) {
    return this.request(options, GET)
  },
  'PATCH': function (options) {
    return this.request(options, PATCH)
  },
  'POST': function (options) {
    return this.request(options, POST)
  },
  'PUT': function (options) {
    return this.request(options, PUT)
  }
})

export default REST
