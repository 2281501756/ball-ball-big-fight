import { get } from './request'

export function login(username, password) {
  return new Promise((resolve, reject) => {
    get(`/setting/login/?username=${username}&password=${password}`).then(Response => {
      resolve(Response.data)
    }).catch(e => {
      reject(e.data)
    })
  })
}

export function logout() {
  return new Promise((resolve, reject) => {
    get('/setting/logout/').then(Response => {
      resolve(Response.data)
    }).catch(e => {
      reject(e.data)
    })
  })
}

export function register(username, password1, password2) {
  return new Promise((resolve, reject) => {
    get(`/setting/register/?username=${username}&password1=${password1}&password2=${password2}`).then(Response => {
      resolve(Response.data)
    }).catch(e => {
      reject(e.data)
    })
  })
}

export function getinfo() {
  return new Promise((resolve, reject) => {
    get(`/setting/getinfo/`).then(Response => {
      resolve(Response.data)
    }).catch(e => {
      reject(e.data)
    })
  })
}

export function persenSettingSave(newName, url, gender) {
  return new Promise((resolve, reject) => {
    get(`/setting/personSettingSave/?name=${newName}&url=${url}&gender=${gender}`).then(Response => {
      resolve(Response.data)
    }).catch(e => {
      reject(e.data)
    })
  })
}

