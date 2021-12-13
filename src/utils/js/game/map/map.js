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
    this.ctx.fillStyle = "rgba(0,0,0,0.2)"
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
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
