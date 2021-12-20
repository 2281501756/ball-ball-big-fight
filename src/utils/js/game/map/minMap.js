export default class MinMap {
  constructor(playground) {
    this.playground = playground
    this.minMap = document.createElement('canvas')
    this.canvas = this.minMap
    this.minMap.classList = 'minMap'
    this.minMap.style.position = 'absolute'
    this.minMap.style.right = '50%'
    this.minMap.style.bottom = '50%'
    this.minMap.style.transform = `translate(${this.playground.width / 2}px, ${this, this.playground.height / 2}px)`
    this.height = this.playground.height * 0.25
    this.width = this.playground.height * 0.25
    playground.appendChild(this.minMap)
    this.canvas = this.minMap
    this.ctx = this.canvas.getContext('2d')

    const dpr = window.devicePixelRatio
    const logicalWidth = this.width
    const logicalHeight = this.height
    this.canvas.width = logicalWidth * dpr
    this.canvas.height = logicalHeight * dpr
    this.canvas.style.width = logicalWidth + 'px'
    this.canvas.style.height = logicalHeight + 'px'
    this.ctx.scale(dpr, dpr)
    this.start()

  }
  start() {
    this.ctx.fillStyle = 'rgba(0,0,0,0.4)'
    this.ctx.fillRect(0, 0, this.height, this.width)
    setInterval(() => {
      this.render()
    }, 100)
  }
  render() {
    this.ctx.clearRect(0, 0, this.height, this.width)
    this.ctx.fillStyle = 'rgba(0,0,0,0.4)'
    this.ctx.fillRect(0, 0, this.height, this.width)
    for (let i = 0; i < this.playground.player.length; i++) {
      let play = this.playground.player[i]
      let x = (play.x + 1.5) / 4
      let y = (play.y + 1.5) / 4
      let image = new Image()
      image.src = play.photo

      this.ctx.save();
      this.ctx.beginPath()
      this.ctx.arc(x * this.height, y * this.height, this.height * 0.05, 0, Math.PI * 2, false)
      if (play.photo === '') {
        this.ctx.fillStyle = 'red'
      }
      this.ctx.fill()

      this.ctx.stroke();
      this.ctx.clip();

      this.ctx.drawImage(image, (x - 0.05) * this.height, (y - 0.05) * this.height, 0.1 * this.height, 0.1 * this.height)
      this.ctx.fill()
      this.ctx.restore();
      this.ctx.closePath()
    }

  }
  resize() {
    this.minMap.style.height = `${this.playground.height * 0.3}px`
    this.minMap.style.width = `${this.playground.height * 0.3}px`
    this.minMap.style.transform = `translate(${this.playground.width / 2}px, ${this, this.playground.height / 2}px)`
  }
}