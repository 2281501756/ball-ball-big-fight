import GameObject from "../game_object";
export default class Map extends GameObject {
  constructor(playground) {
    super()
    playground.innerHTML = `<canvas style="position: relative; left: 50%; top: 50%; transform: translate(-50%, -50%);"></canvas>`
    this.playground = playground
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    const dpr = window.devicePixelRatio
    const logicalWidth = this.playground.width
    const logicalHeight = this.playground.height
    this.canvas.width = logicalWidth * dpr
    this.canvas.height = logicalHeight * dpr
    this.canvas.style.width = logicalWidth + 'px'
    this.canvas.style.height = logicalHeight + 'px'
    this.ctx.scale(dpr, dpr)

  }
  start() {
  }
  update() {
    this.render()
  }
  render() {
    this.ctx.fillStyle = "#badbfa"
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    let x = -1.5
    let y = -1.5
    this.ctx.strokeStyle = 'red'
    this.ctx.beginPath()
    for (let i = 0; i < 25; i++) {
      for (let j = 0; j < 25; j++) {
        this.ctx.fillStyle = `rgba(${Math.floor((i * 7) % 255)},${Math.floor((j * 3) % 255)},${Math.floor((j * 7) % 255)}, 1)`
        this.ctx.fillRect((x - this.playground.viewX + 4 / 25 * i) * this.playground.scale, (y - this.playground.viewY + 4 / 25 * j) * this.playground.scale, this.playground.scale * 4 / 25, this.playground.scale * 4 / 25)
      }
    }
    this.ctx.lineWidth = 10
    this.ctx.strokeRect((x - this.playground.viewX) * this.playground.scale, (y - this.playground.viewY) * this.playground.scale, this.playground.scale * 4, this.playground.scale * 4)
    this.ctx.lineWidth = 1
    this.ctx.closePath()
  }
  resize() {
    const dpr = window.devicePixelRatio
    const logicalWidth = this.playground.width
    const logicalHeight = this.playground.height
    this.canvas.width = logicalWidth * dpr
    this.canvas.height = logicalHeight * dpr
    this.canvas.style.width = logicalWidth + 'px'
    this.canvas.style.height = logicalHeight + 'px'
    this.ctx.scale(dpr, dpr)

    this.ctx.fillStyle = "rgba(0,0,0,1)"
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
  }
}
