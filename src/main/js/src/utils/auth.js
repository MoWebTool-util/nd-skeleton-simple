const authKey = 'AUTH-AUTH'

const storage = window.localStorage

const setAuth = auth => {
  if (auth === null) {
    storage.removeItem(authKey)
  } else {
    storage.setItem(authKey, JSON.stringify(auth))
  }
}

const getAuth = key => {
  let auth = storage.getItem(authKey)

  if (auth) {
    auth = JSON.parse(auth)

    if (key) {
      auth = auth[key]
    }
  }

  return auth
}

export default {
  setAuth,
  getAuth
}
