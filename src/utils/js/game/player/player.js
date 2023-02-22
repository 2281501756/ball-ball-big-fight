import GameObject from "../game_object";
import Fireball from "../skill/fireball";
import HPChangeNumber from "./HPChangeNumber";
import Particle from "../particle/zbase"
export default class Player extends GameObject {
  constructor(playground, x, y, radius, speed, color, character, photo, name, HP) {
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
    this.friction = 1
    this.status = ''
    this.HP = HP
    this.HPMAX = HP
    this.q_is_cd = false
    this.q_coldtime = 0
    this.f_is_cd = false
    this.f_coldtime = 0
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
      // 添加左键射击
      this.playground.map.canvas.addEventListener('mousedown', e => {
       if (e.which === 1) {
          outer.attack_mouse = setInterval(() => {
            let mx = outer.mousetEvent.offsetX / outer.playground.height + outer.playground.viewX
            let my = outer.mousetEvent.offsetY / outer.playground.height + outer.playground.viewY
            let ball = outer.shoot_fireball(mx, my)
            if (outer.playground.mode === 'multi') {
              outer.playground.ws.send_shoot_fireball(ball.uuid, mx, my)
            }
          }, Fireball.cd)
       } else if (e.which === 3) {
         let x = (e.offsetX) / outer.playground.height + outer.playground.viewX
        let y = (e.offsetY) / outer.playground.height + outer.playground.viewY
         outer.move_to(x, y)
         if (outer.playground.mode === 'multi') {
          outer.playground.ws.send_move_to(x, y)
          }
        }
      })
      // 获取鼠标位置
      window.addEventListener('mousemove', event => {
        outer.mousetEvent = event
      })
      // 添加左键发射炮弹
      this.playground.map.canvas.addEventListener('mouseup', e => {
        if (e.which === 1) {
          clearInterval(outer.attack_mouse)
        }
      })
      //添加键盘监听
      this.playground.map.canvas.addEventListener('keydown', e => {
        if (e.key === 'q' && outer.q_is_cd === false) {
          outer.q_is_cd = true
          outer.q_coldtime = Fireball.cd / 1000
          let mx = outer.mousetEvent.offsetX / outer.playground.height + outer.playground.viewX
          let my = outer.mousetEvent.offsetY / outer.playground.height + outer.playground.viewY
          let ball = outer.shoot_fireball(mx, my)
          if (outer.playground.mode === 'multi') {
            outer.playground.ws.send_shoot_fireball(ball.uuid, mx, my)
          }
          setTimeout(() => {
            outer.q_is_cd = false
          }, Fireball.cd);
        } else if (e.key === 'f' && outer.f_is_cd === false) {
          console.log('闪现');
          outer.f_is_cd = true
          outer.f_coldtime = 5
          let mx = outer.mousetEvent.offsetX / outer.playground.height + outer.playground.viewX
          let my = outer.mousetEvent.offsetY / outer.playground.height + outer.playground.viewY
          outer.blink(mx, my)
          if (this.playground.mode === 'multi') {
            outer.playground.ws.send_blink(mx, my)
          }
          setTimeout(() => {
            outer.f_is_cd = false
          }, 5000);
        } else if (e.key === 'w') {
          this.wEnter = true
        } else if (e.key === 's') {
          this.sEnter = true
        } else if (e.key === 'a') {
          this.aEnter = true
        } else if (e.key === 'd') {
          this.dEnter = true
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
      this.playground.map.canvas.addEventListener('keyup', (e) => {
        if (e.key === ' ') {
          this.playground.view_lock_blank = false
        } else if (e.key === 'w') {
          this.wEnter = false
        } else if (e.key === 's') {
          this.sEnter = false
        } else if (e.key === 'a') {
          this.aEnter = false
        } else if (e.key === 'd') {
          this.dEnter = false
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
  blink(x, y) {
    this.x = x
    this.y = y
  }
  onAttack(angle, speed, hurt) {
    if (this.character === 'me') {
    this.playground.map.canvas.classList.add('canvas_shadow_red')
    if (this.onAttackCssTime) {
      clearTimeout(this.onAttackCssTime)
    }
    this.onAttackCssTime = setTimeout(() => {
      this.playground.map.canvas.classList.remove('canvas_shadow_red')
    }, 1000);

    }
   
    this.repel_vx = Math.cos(angle)
    this.repel_vy = Math.sin(angle)
    this.repel_speed = speed * this.friction


    for (let i = 0; i < 10 + Math.random() * 10; i++) {
      let x = this.x, y = this.y;
      let radius = this.radius * Math.random();
      let angle = Math.PI * 2 * Math.random();
      let vx = Math.cos(angle), vy = Math.sin(angle);
      let color = this.color;
      let speed = this.speed * 10;
      let move_length = this.radius * Math.random() * 10;
      new Particle(this.playground, x, y, radius, vx, vy, color, speed, move_length);
  }              

    this.HP -= hurt
    if (this.HP <= 0) {
      this.destroy()
    }
    let scale = this.playground.height
    let x = this.x - this.playground.viewX
    let y = this.y - this.playground.viewY
    new HPChangeNumber(this.playground, this, '-' + hurt)

    this.ctx.beginPath()
    this.ctx.arc(x * scale, y * scale, this.radius * scale, 0, Math.PI * 2, false)
    this.ctx.fillStyle = "#eee"
    this.ctx.fill()
  }
  update_skill_time() {
    this.q_coldtime -= this.timestamp / 1000
    this.q_coldtime = Math.max(this.q_coldtime, 0)
    this.f_coldtime -= this.timestamp / 1000
    this.f_coldtime = Math.max(this.f_coldtime, 0)

  }
  update() {
    //人物移动
    if (this.character === 'me') {
      if (this.playground.view_lock_blank === true || this.playground.view_lock_y === true) {
        this.playground.viewX = this.x - 0.5 * this.playground.width / this.playground.scale
        this.playground.viewY = this.y - 0.5
      }
      if (this.playground.mode !== 'multi') {
        if (this.wEnter === true) {
          if (this.dEnter === true) {
          this.y -= this.speed / Math.sqrt(2) * this.timestamp / 1000
          } else if (this.aEnter === true) {
          this.y -= this.speed / Math.sqrt(2) * this.timestamp / 1000
          } else {
            this.y -= this.speed * this.timestamp / 1000          
          }
        }
        if (this.sEnter === true) {
          if (this.aEnter === true) {
          this.y += this.speed / Math.sqrt(2) * this.timestamp / 1000
          } else if (this.dEnter) {
          this.y += this.speed / Math.sqrt(2) * this.timestamp / 1000
          } else {
            this.y += this.speed * this.timestamp / 1000
          }
        }
        if (this.aEnter === true) {
          if (this.wEnter) {
          this.x -= this.speed / Math.sqrt(2) * this.timestamp / 1000
          } else if (this.sEnter) {
          this.x -= this.speed / Math.sqrt(2) * this.timestamp / 1000
          } else {
            this.x -= this.speed * this.timestamp / 1000
          }
        }
        if (this.dEnter === true) {
          if (this.wEnter === true) {
          this.x += this.speed / Math.sqrt(2) * this.timestamp / 1000
          } else if(this.sEnter){
          this.x += this.speed / Math.sqrt(2) * this.timestamp / 1000
          } else {
            this.x += this.speed * this.timestamp / 1000
          }
        }
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
    } else if (this.character === 'robot') { //电脑射击
      if (this.moveLength === 0) {
        this.move_to(this.playground.player[0].x + Math.random() * 1 - 0.5, this.playground.player[0].y + Math.random() * 1 - 0.5)
      } else {
        let move = Math.min(this.moveLength, this.speed * this.timestamp / 1000)
        this.x += move * this.vx
        this.y += move * this.vy
        this.moveLength -= move
      }
      if (Math.random() < (1 / 180)) {
        let play = this.playground.player[0]
        this.shoot_fireball(play.x, play.y)
      }
    } else if (this.character === 'enemy') {
      if (this.moveLength < 0.01) { //移动
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
    if (this.character === 'me') {
      this.render_skill()
      this.update_skill_time()
    }
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
    this.ctx.fillRect((x - this.radius) * scale, (y - this.radius * 1.6) * scale, this.radius * scale * 2 * (this.HP / this.HPMAX), this.radius * scale * 0.3)
    this.ctx.stroke()
    this.ctx.closePath()

  }
  render_skill() {
    let fireball_img = new Image();
    fireball_img.src = "https://cdn.acwing.com/media/article/image/2021/12/02/1_9340c86053-fireball.png";

    let blink_img = new Image();
    blink_img.src = "https://cdn.acwing.com/media/article/image/2021/12/02/1_daccabdc53-blink.png";
    let scale = this.playground.scale
    
    let x = 0.8, y = 0.92, r = 0.04;
    this.playground.map.ctx.save();
    this.playground.map.ctx.beginPath();
    this.playground.map.ctx.arc(x * scale, y * scale, r * scale, 0, Math.PI * 2, false);
    this.playground.map.ctx.stroke();
    this.playground.map.ctx.clip();
    this.playground.map.ctx.drawImage(fireball_img, (x - r) * scale, (y - r) * scale, r * 2 * scale, r * 2 * scale);
    this.playground.map.ctx.restore();

    if (this.q_coldtime > 0) {
      this.playground.map.ctx.beginPath();
      this.playground.map.ctx.moveTo(x * scale, y * scale);
      this.playground.map.ctx.arc(x * scale, y * scale, r * scale, 0 - Math.PI / 2, Math.PI * 2 * (1 - this.q_coldtime / 0.3) - Math.PI / 2, true);
      this.playground.map.ctx.lineTo(x * scale, y * scale);
      this.playground.map.ctx.fillStyle = "rgba(0, 0, 255,0.6)";
      this.playground.map.ctx.fill();
      this.playground.map.ctx.restore();
    } 

    x = 0.95, y = 0.92, r = 0.04;

    this.playground.map.ctx.save();
    this.playground.map.ctx.beginPath();
    this.playground.map.ctx.arc(x * scale, y * scale, r * scale, 0, Math.PI * 2, false);
    this.playground.map.ctx.stroke();
    this.playground.map.ctx.clip();
    this.playground.map.ctx.drawImage(blink_img, (x - r) * scale, (y - r) * scale, r * 2 * scale, r * 2 * scale);
    this.playground.map.ctx.restore();

    if (this.f_coldtime > 0) {
      this.playground.map.ctx.beginPath();
      this.playground.map.ctx.moveTo(x * scale, y * scale);
      this.playground.map.ctx.arc(x * scale, y * scale, r * scale, 0 - Math.PI / 2, Math.PI * 2 * (1 - this.f_coldtime / 5) - Math.PI / 2, true);
      this.playground.map.ctx.lineTo(x * scale, y * scale);
      this.playground.map.ctx.fillStyle = "rgba(0, 0, 255,0.6)";
      this.playground.map.ctx.fill();
      this.playground.map.ctx.restore();
    } 
   

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