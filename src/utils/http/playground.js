import { get } from './request'

export function getMapData() {
  return new Promise((resolve, reject) => {
    get('/playground/getmapdata/').then(Response => {
        resolve(Response.data)
    }).catch(e => {
        reject(e.data)
      })
    })
}