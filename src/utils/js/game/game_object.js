export default class GameObject {
  static GAMEOBJECT = []
  constructor() {
    GameObject.GAMEOBJECT.push(this)
    this.has_start = false
    this.timestamp = 0
    this.uuid = ""
    for (let i = 0; i < 20; i++) {
      this.uuid += Math.floor(Math.random() * 10)
    }
  }
  start() {

  }
  update() {

  }
  destroy() {

    this.on_destroy()
    for (let i = 0; i < GameObject.GAMEOBJECT.length; i++) {
      if (this === GameObject.GAMEOBJECT[i]) {
        GameObject.GAMEOBJECT.splice(i, 1)
        break
      }
    }
  }
  on_destroy() {

  }

}