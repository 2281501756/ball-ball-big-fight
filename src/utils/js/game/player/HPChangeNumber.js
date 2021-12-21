import GameObject from "../game_object";

export default class HPChangeNumber extends GameObject {
  constructor(playground, play, num) {
    super()
    this.playground = playground
    this.play = play
    this.x = play.x
    this.y = play.y
    this.num = num
  }
  start() {
    let outer = this
    if (this.num >= 0) {
      this.num = '+' + this.num
    }
    setTimeout(() => {
      outer.destroy()
    }, 500)
  }
  update() {
    this.render()
  }
  render() {
    this.y -= 1 / 1000
    if (this.num < 0) {
      this.playground.map.ctx.fillStyle = '#ff3a02'
    } else {
      this.playground.map.ctx.fillStyle = 'green'
    }
    this.playground.map.ctx.beginPath()
    this.playground.map.ctx.fillText(`${this.num}HP`, (this.x - this.playground.viewX - 0.5 * this.play.radius) * this.playground.scale, (this.y - this.playground.viewY - 2.5 * this.play.radius) * this.playground.scale)
    this.playground.map.ctx.fill()
    this.playground.map.ctx.closePath()
  }
  destroy() {
    super.destroy()
  }
}