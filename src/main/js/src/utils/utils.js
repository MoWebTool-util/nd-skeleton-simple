//  获取参数
function getUrlParam (name) {
  return decodeURIComponent(
    (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) ||
    ['', ''])[1].replace(/\+/g, '%20')) || null
}

function getAllUrlParams () {
  const params = {}
  const reg = /([^&?;]*?)=([^&?;]*)/g
  let match = reg.exec(location.search)

  while (match) {
    if (match[1]) {
      const name = decodeURIComponent(match[1])
      const value = match[2] ? decodeURIComponent(match[2]) : null
      params[name] = value
    }
    match = reg.exec(location.search)
  }

  return params
}

export default {
  getUrlParam,
  getAllUrlParams
}
