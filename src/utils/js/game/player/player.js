import GameObject from "../game_object";
import Fireball from "../skill/fireball";
export default class Player extends GameObject {
  constructor(playground, x, y, radius, speed, color, character, photo, name) {
    super()
    this.playground = playground
    this.ctx = playground.map.ctx
    this.x = x
    this.y = y
    this.color = color
    this.radius = radius
    this.speed = speed
    this.character = character
    this.photo = photo
    this.repel_speed = 0
    this.moveLength = 0
    this.name = name
    this.fireballs = []
    this.q_is_cd = false
    this.HP = 10
  }
  start() {
    this.addd_event_listening()
  }
  addd_event_listening() {
    if (this.character === 'me') {
      let outer = this
      this.playground.map.canvas.addEventListener('contextmenu', function (e) {
        e.preventDefault()
        return false
      })
      this.playground.minMap.canvas.addEventListener('contextmenu', function (e) {
        e.preventDefault()
        return false
      })
      // 添加右键移动
      this.playground.map.canvas.addEventListener('mousedown', e => {
        if (e.which === 3) {
          let x = (e.offsetX) / outer.playground.height + outer.playground.viewX
          let y = (e.offsetY) / outer.playground.height + outer.playground.viewY
          outer.move_to(x, y)
          if (outer.playground.mode === 'multi') {
            outer.playground.ws.send_move_to(x, y)
          }
        }
      })
      // 获取鼠标位置
      this.playground.map.canvas.addEventListener('mousemove', event => {
        outer.mousetEvent = event
      })
      //添加键盘监听
      window.addEventListener('keydown', e => {
        if (e.key === 'q' && outer.q_is_cd === false) {
          outer.q_is_cd = true
          let mx = outer.mousetEvent.offsetX / outer.playground.height + outer.playground.viewX
          let my = outer.mousetEvent.offsetY / outer.playground.height + outer.playground.viewY
          let ball = outer.shoot_fireball(mx, my)
          if (outer.playground.mode === 'multi') {
            outer.playground.ws.send_shoot_fireball(ball.uuid, mx, my)
          }
          setTimeout(() => {
            outer.q_is_cd = false
          }, Fireball.cd);
        } else if (e.key === 's') {
          if (this.playground.mode === 'multi') {
            this.playground.ws.send_player_stop(this.x, this.y)
          }
          outer.vx = 0
          outer.vy = 0
          outer.moveLength = 0
        } else if (e.key === 'ArrowUp') {
          outer.playground.viewY -= 0.1
        } else if (e.key === 'ArrowDown') {
          outer.playground.viewY += 0.1
        } else if (e.key === 'ArrowLeft') {
          outer.playground.viewX -= 0.1
        } else if (e.key === 'ArrowRight') {
          outer.playground.viewX += 0.1
        } else if (e.key === ' ') {
          this.playground.view_lock_blank = true
        } else if (e.key === 'y') {
          this.playground.view_lock_y = !this.playground.view_lock_y
        }
      }, false)
      window.addEventListener('keyup', (e) => {
        if (e.key === ' ') {
          this.playground.view_lock_blank = false
        }
      })
    }
  }
  shoot_fireball(x, y) {
    let angle = Math.atan2(y - this.y, x - this.x)
    let vx = Math.cos(angle)
    let vy = Math.sin(angle)
    let fireball = new Fireball(this.playground, this, this.x, this.y, vx, vy, 0.015, Fireball.speed, 1, 'orange')
    this.fireballs.push(fireball)
    return fireball
  }
  move_to(x, y) {
    this.moveLength = this.get_dist(this.x, this.y, x, y)
    let angle = Math.atan2(y - this.y, x - this.x)
    this.vx = Math.cos(angle)
    this.vy = Math.sin(angle)
  }
  get_dist(x1, y1, x2, y2) {
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2))
  }
  onAttack(angle) {
    this.repel_vx = Math.cos(angle)
    this.repel_vy = Math.sin(angle)
    this.repel_speed = 0.2

    this.HP--
    if (this.HP <= 0) {
      this.destroy()
    }
    let scale = this.playground.height
    let x = this.x - this.playground.viewX
    let y = this.y - this.playground.viewY

    this.ctx.beginPath()
    this.ctx.arc(x * scale, y * scale, this.radius * scale, 0, Math.PI * 2, false)
    this.ctx.fillStyle = "#eee"
    this.ctx.fill()
  }
  update() {
    //人物移动 和 电脑射击
    if (this.character === 'me') {
      if (this.playground.view_lock_blank === true || this.playground.view_lock_y === true) {
        this.playground.viewX = this.x - 0.5 * this.playground.width / this.playground.scale
        this.playground.viewY = this.y - 0.5
      }
      if (this.moveLength < 0.01) {
        this.vx = 0
        this.vy = 0
        this.moveLength = 0
      } else {
        if (this.x + this.radius >= 2.5 && this.vx > 0) {
          this.vx = 0
          this.vy = 0
          this.moveLength = 0
        } else if (this.x - this.radius <= -1.5 && this.vx < 0) {
          this.vx = 0
          this.vy = 0
          this.moveLength = 0
        } else if (this.y + this.radius >= 2.5 && this.vy > 0) {
          this.vx = 0
          this.vy = 0
          this.moveLength = 0
        } else if (this.y - this.radius <= -1.5 && this.vy < 0) {
          this.vx = 0
          this.vy = 0
          this.moveLength = 0
        } else {
          let move = Math.min(this.moveLength, this.speed * this.timestamp / 1000)
          this.x += move * this.vx
          this.y += move * this.vy
          this.moveLength -= move
        }
      }
    } else if (this.character === 'robot') {
      if (this.moveLength === 0) {
        this.move_to(Math.random() * this.playground.width / this.playground.scale, Math.random())
      } else {
        let move = Math.min(this.moveLength, this.speed * this.timestamp / 1000)
        this.x += move * this.vx
        this.y += move * this.vy
        this.moveLength -= move
      }
      if (Math.random() < (1 / 300)) {
        let play = this.playground.player[Math.floor(Math.random() * this.playground.player.length)]
        if (play === this) return
        this.shoot_fireball(play.x, play.y)
      }
    } else if (this.character === 'enemy') {
      if (this.moveLength < 0.01) {
        this.vx = 0
        this.vy = 0
        this.moveLength = 0
      } else {
        let move = Math.min(this.moveLength, this.speed * this.timestamp / 1000)
        this.x += move * this.vx
        this.y += move * this.vy
        this.moveLength -= move
      }
    }
    //击退效果
    if (this.repel_speed < 0.01) {
      this.repel_speed = 0
    } else {
      this.x += this.repel_speed * this.timestamp / 1000 * this.repel_vx
      this.y += this.repel_speed * this.timestamp / 1000 * this.repel_vx
      this.repel_speed *= 0.95
    }

    this.render()
  }
  render() {
    let scale = this.playground.scale
    this.img = new Image();
    this.img.src = this.photo;
    let x = this.x - this.playground.viewX
    let y = this.y - this.playground.viewY

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(x * scale, y * scale, this.radius * scale, 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color
    this.ctx.fill()
    this.ctx.strokeStyle = this.color
    this.ctx.stroke();
    this.ctx.clip();
    this.ctx.drawImage(this.img, (x - this.radius) * scale, (y - this.radius) * scale, this.radius * scale * 2, this.radius * scale * 2);
    this.ctx.restore();
    this.ctx.fillStyle = '#fff'
    this.ctx.font = "small-caps normal 2.8vh Arial";
    this.ctx.fillText(this.name, (x - this.radius) * scale, (y - this.radius * 1.8) * scale)
    this.ctx.rect((x - this.radius) * scale, (y - this.radius * 1.6) * scale, this.radius * scale * 2, this.radius * scale * 0.3)
    this.ctx.fillStyle = '#11d845'
    this.ctx.fillRect((x - this.radius) * scale, (y - this.radius * 1.6) * scale, this.radius * scale * 2 * (this.HP / 10), this.radius * scale * 0.3)
    this.ctx.stroke()
    this.ctx.closePath()
  }
  destroy() {
    super.destroy()
    for (let i = 0; i < this.playground.player.length; i++) {
      let play = this.playground.player[i]
      if (play === this) {
        this.playground.player.splice(i, 1)
        break
      }
    }
  }
}