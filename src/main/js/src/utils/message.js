import $ from 'jquery'

const _container = '#msgbox'
const _duration = 2000

function createMsg (type, msg) {
  const typeClass = type === 'error' ? 'ui-message-danger' : 'ui-message-success'
  return `<div class="ui-message ${typeClass}">
    <div class="message">${msg}</div>
  </div>`
}

function show (str, d) {
  const duration = d || _duration
  const $container = $(_container)
  $container.html(str).show()

  setTimeout(() => {
    $container.empty()
  }, duration)
}

export const error = (msg, duration) => {
  const type = 'error'

  show(createMsg(type, msg), duration)
}

export const success = (msg, duration) => {
  const type = 'success'

  show(createMsg(type, msg), duration)
}
