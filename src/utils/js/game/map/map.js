import GameObject from "../game_object";
import { getMapData } from "../../../http/playground";
export default class Map extends GameObject {
  constructor(playground) {
    super()
    playground.innerHTML = `<canvas tabindex=0 style="position: relative; left: 50%; top: 50%; transform: translate(-50%, -50%);"></canvas>`
    this.playground = playground
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    window.canvas = this.canvas
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
    2 表示回血
    3 表示火地
    4 表示冰面
    */
    // this.mapData = [
    //   [1, 1, 1, 1, 1, 1, 1, 3, 1, 1],
    //   [1, 1, 1, 1, 4, 1, 1, 3, 1, 1],
    //   [1, 2, 2, 1, 1, 1, 1, 3, 1, 1],
    //   [1, 2, 3, 1, 5, 1, 1, 3, 3, 1],
    //   [1, 2, 4, 1, 1, 1, 5, 2, 1, 1],
    //   [1, 1, 1, 2, 1, 1, 3, 1, 1, 1],
    //   [5, 5, 5, 5, 4, 5, 5, 5, 5, 5],
    //   [1, 3, 1, 4, 4, 4, 1, 1, 1, 1],
    //   [1, 1, 1, 1, 4, 1, 1, 2, 1, 1],
    //   [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // ]
    this.mapData = [
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1],
      [1,1,1,4,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1,3,3,3,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,4,1,1,1,3,1,3,1],
      [1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1,3,3,3,1],
      [1,1,1,1,1,1,1,1,4,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
      [1,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,4,1],
      [1,1,1,1,1,1,1,1,1,4,1,1,1,1,1,2,1,1,1,1],
      [1,4,1,1,1,1,1,1,2,1,1,1,1,1,1,1,1,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,3,1,1,1],
      [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,1,1,1],
      [1,1,1,3,1,1,1,1,1,1,3,1,1,1,1,1,1,1,1,1],
    ]
    if (this.playground.mode !== 'multi') {
      for (let i = 0; i < 40; i++) {
        this.mapData[Math.floor(Math.random() * 20)][Math.floor(Math.random() * 20)] = Math.floor(Math.random() * 4) + 1
      }

    } else {
     
    }
   
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
    this.ctx.strokeStyle = '#111'
    this.ctx.lineWidth = 10
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (this.mapData[i][j] === 1) {
          this.ctx.fillStyle = `#333`
        } else if (this.mapData[i][j] === 2) {
          this.ctx.fillStyle = '#57c038'
        } else if (this.mapData[i][j] === 3) {
          this.ctx.fillStyle = '#da3030'
        } else if (this.mapData[i][j] === 4) {
          this.ctx.fillStyle = '#4875e7'
        } else if (this.mapData[i][j] === 5) {
          
        }
        this.ctx.fillRect((x - this.playground.viewX + 4 / 20 * j) * this.playground.scale, (y - this.playground.viewY + 4 / 20 * i) * this.playground.scale, this.playground.scale * 4 / 20, this.playground.scale * 4 / 20)
        this.ctx.lineWidth = 1
        this.ctx.strokeRect((x - this.playground.viewX + 4 / 20 * j) * this.playground.scale, (y - this.playground.viewY + 4 / 20 * i) * this.playground.scale, this.playground.scale * 4 / 20, this.playground.scale * 4 / 20)
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
