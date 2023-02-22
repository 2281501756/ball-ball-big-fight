import { get } from './request'

export function login(username, password) {
  return new Promise((resolve, reject) => {
    // get(`/setting/login/?username=${username}&password=${password}`).then(Response => {
    //   resolve(Response.data)
    // }).catch(e => {
    //   reject(e.data)
    // })
    resolve({
      result: 'success',
      name: '随便玩玩',
      gender: '男',
      photo: 'https://cdn.acwing.com/media/user/profile/photo/67937_lg_b3096b1d39.png',
    })
  })
}

export function logout() {
  return new Promise((resolve, reject) => {
    // get('/setting/logout/')
    //   .then((Response) => {
    //     resolve(Response.data)
    //   })
    //   .catch((e) => {
    //     reject(e.data)
    //   })
    resolve({
      result: 'success',
      name: '随便玩玩',
      gender: '男',
      photo: 'https://cdn.acwing.com/media/user/profile/photo/67937_lg_b3096b1d39.png',
    })
  })
}

export function register(username, password1, password2) {
  return new Promise((resolve, reject) => {
    get(`/setting/register/?username=${username}&password1=${password1}&password2=${password2}`)
      .then((Response) => {
        resolve(Response.data)
      })
      .catch((e) => {
        reject(e.data)
      })
  })
}

export function getinfo() {
  return new Promise((resolve, reject) => {
    resolve({
      result: 'success',
      name: '随便玩玩',
      gender: '男',
      photo: 'https://cdn.acwing.com/media/user/profile/photo/67937_lg_b3096b1d39.png',
    })
    // get(`/setting/getinfo/`)
    //   .then((Response) => {
    //     resolve(Response.data)
    //   })
    //   .catch((e) => {
    //     reject(e.data)
    //   })
  })
}

export function persenSettingSave(newName, url, gender) {
  return new Promise((resolve, reject) => {
    get(`/setting/personSettingSave/?name=${newName}&url=${url}&gender=${gender}`)
      .then((Response) => {
        resolve(Response.data)
      })
      .catch((e) => {
        reject(e.data)
      })
  })
}
