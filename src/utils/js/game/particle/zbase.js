import GameObject from "../game_object"
export default class Particle extends GameObject {
  constructor(playground, x, y, radius,vx, vy, color, speed, move_length) {
      super()
      this.x = x                          //粒子中心x坐标
      this.y = y                          //粒子中心y坐标
      this.vx = vx                        //粒子速度
      this.vy = vy                        //粒子速度
      this.radius = radius                //粒子半径
      this.speed = speed                  //粒子的速度
      this.color = color                  //粒子颜色
      this.move_length = move_length //粒子移动距离
      this.friction = 0.94                //粒子的摩擦力
      this.playground = playground        //游戏界面
      this.ctx = this.playground.map.ctx
  }
  start() {
  }
  update() {
      if(this.speed < 0.1) {
          this.destroy()
          return false
      }
      let moved = Math.min(this.move_length , this.speed * this.timestamp / 1000)
       this.x += this.vx * moved
      this.y += this.vy * moved
      this.move_length -= moved
    //
    this.speed *= 0.95
    
      this.render()
  }
  render() {
    let x = this.x - this.playground.viewX
    let y = this.y - this.playground.viewY
    let scale = this.playground.scale
    this.ctx.beginPath();
    this.ctx.arc(x * scale, y * scale, this.radius * scale * 0.15 , 0, Math.PI * 2, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}