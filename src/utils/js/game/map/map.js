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
    /*
    1 表示默认方块
    2 表示草丛
    3 表示墙
    4 表示火地
    5 表示冰面
    */
    this.mapData = [
      [1, 1, 1, 1, 1, 1, 1, 3, 1, 1],
      [1, 1, 1, 1, 4, 1, 1, 3, 1, 1],
      [1, 2, 2, 1, 1, 1, 1, 3, 1, 1],
      [1, 2, 3, 1, 1, 1, 1, 3, 3, 1],
      [1, 2, 2, 1, 1, 1, 1, 1, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      [5, 5, 5, 5, 4, 5, 5, 5, 5, 5],
      [1, 3, 1, 4, 4, 4, 1, 1, 1, 1],
      [1, 1, 1, 1, 4, 1, 1, 2, 1, 1],
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    ]
  }
  update() {
    this.render()
  }
  render() {
    this.ctx.fillStyle = "#badbfa"
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    let x = -1.5
    let y = -1.5
    this.ctx.beginPath()
    this.ctx.strokeStyle = '#aaa'
    this.ctx.lineWidth = 10
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (this.mapData[i][j] === 1) {
          this.ctx.fillStyle = `#333`
        } else if (this.mapData[i][j] === 2) {
          this.ctx.fillStyle = '#57c038'
        } else if (this.mapData[i][j] === 3) {
          this.ctx.fillStyle = '#a86933'
        } else if (this.mapData[i][j] === 4) {
          this.ctx.fillStyle = '#da3030'
        } else if (this.mapData[i][j] === 5) {
          this.ctx.fillStyle = '#4875e7'
        }
        this.ctx.fillRect((x - this.playground.viewX + 4 / 10 * j) * this.playground.scale, (y - this.playground.viewY + 4 / 10 * i) * this.playground.scale, this.playground.scale * 4 / 10, this.playground.scale * 4 / 10)
        this.ctx.strokeRect((x - this.playground.viewX + 4 / 10 * j) * this.playground.scale, (y - this.playground.viewY + 4 / 10 * i) * this.playground.scale, this.playground.scale * 4 / 10, this.playground.scale * 4 / 10)
        this.ctx.stroke()
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
