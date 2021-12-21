import GameObject from "../game_object";
export default class Fireball extends GameObject {
  static cd = 300
  static speed = 0.5
  constructor(playground, player, x, y, vx, vy, radius, speed, length, color) {
    super()
    this.playground = playground
    this.player = player
    this.x = x
    this.y = y
    this.vx = vx
    this.vy = vy
    this.radius = radius
    this.speed = speed
    this.length = length
    this.color = color
    this.ctx = this.playground.map.ctx
    this.cd = 300
  }
  start() {

  }
  update() {
    if (this.playground.mode == 'multi') {
      if (this.player === this.playground.player[0]) {
        for (let i = 1; i < this.playground.player.length; i++) {
          let play = this.playground.player[i]
          if (this.getDist(play.x, play.y, this.x, this.y) < this.radius + play.radius) {
            this.attack(play)
            break
          }
        }
      }
    } else {
      for (let i = 0; i < this.playground.player.length; i++) {
        let play = this.playground.player[i]
        if (play !== this.player && this.getDist(play.x, play.y, this.x, this.y) < this.radius + play.radius) {
          this.attack(play)
          break
        }
      }
    }

    if (this.length < 0.01) {
      this.destroy()
    } else {
      this.length -= this.speed * this.timestamp / 1000
      this.x += this.speed * this.vx * this.timestamp / 1000
      this.y += this.speed * this.vy * this.timestamp / 1000
    }

    this.render()
  }
  getDist(x1, y1, x2, y2) {
    let t1 = x1 - x2
    let t2 = y1 - y2
    return Math.sqrt(t1 * t1 + t2 * t2)
  }
  attack(player) {
    let angle = Math.atan2(player.y - this.y, player.x - this.x)
    player.onAttack(angle, 0.5, 1)
    if (this.playground.mode === 'multi') {
      this.playground.ws.send_on_attack('fireball', this.player.uuid, player.uuid, this.uuid, player.x, player.y, angle, 1)
    }
    this.destroy()
  }
  render() {
    let scale = this.playground.height
    let x = (this.x - this.playground.viewX) * scale
    let y = (this.y - this.playground.viewY) * scale
    this.ctx.beginPath()
    this.ctx.arc(x, y, this.radius * scale, 0, Math.PI * 2, false)
    this.ctx.fillStyle = this.color
    this.ctx.fill()
  }
  destroy() {
    super.destroy()
  }

}