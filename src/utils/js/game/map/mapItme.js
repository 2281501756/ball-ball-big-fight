import HPChangeNumber from "../player/HPChangeNumber"

export default class MapItem {
  constructor(playground) {
    this.playground = playground
    let outer = this
    setInterval(() => {
      outer.getPlayStatus()
    }, 1000)
   
  }
  getPlayStatus() {
    for (let i = 0; i < this.playground.player.length; i++) {
      let play = this.playground.player[i]
      let x = play.x + 1.5
      let y = play.y + 1.5
      if (x < 0 || x > 4 || y < 0 || y > 4) {
        play.onAttack(0, 0, 10)
        new HPChangeNumber(this.playground, play, -10)
        continue
      }
      let data = this.playground.map.mapData[Math.floor(y / 4 * 20)][Math.floor(x / 4 * 20)]
      if (data != 4 && play.friction !== 1) {
        setTimeout(() => {
          play.friction = 1
          if (play.character === 'me') {
            this.playground.map.canvas.classList.remove('canvas_shadow_blue')
          }
        }, 3000);
       
      }

      if (data === 1) {
        play.status = ''
      } else if (data === 2) {
        play.status = 'on_grass'
        if (play.HP < play.HPMAX) {
          play.HP += Math.min(5, play.HPMAX - play.HP)
          new HPChangeNumber(this.playground, play, 5)
        }
      } else if (data === 3) {
        play.status = 'on_fire'
        play.onAttack(0, 0, 10)
      } else if (data === 4) {
        play.status = 'on_water'
        play.friction = 10
        if (play.character === 'me') {
          this.playground.map.canvas.classList.add('canvas_shadow_blue')          
        }
      } else if (data === 5) {
        play.status = 'on_soil'
      }
    }
  }
}