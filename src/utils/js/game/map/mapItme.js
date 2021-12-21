import HPChangeNumber from "../player/HPChangeNumber"

export default class MapItem {
  constructor(playground) {
    this.playground = playground
    let outer = this
    setInterval(() => {
      outer.getPlayStatus()
    }, 1000)
    setInterval(() => {
      outer.destroyFireballOnSoil()
    }, 10)
  }
  getPlayStatus() {
    for (let i = 0; i < this.playground.player.length; i++) {
      let play = this.playground.player[i]
      let x = play.x + 1.5
      let y = play.y + 1.5
      let data = this.playground.map.mapData[Math.floor(y / 0.4)][Math.floor(x / 0.4)]

      if (data === 1) {
        play.status = ''
        play.friction = 1
      } else if (data === 2) {
        play.status = 'on_grass'
        play.friction = 1
        if (play.HP < play.HPMAX) {
          play.HP++
          new HPChangeNumber(this.playground, play, 1)
        }
      } else if (data === 3) {
        play.status = 'on_soil'
        play.friction = 1
      } else if (data === 4) {
        play.status = 'on_fire'
        play.onAttack(0, 0, 1)
        if (play.HP === 0) {
          play.destroy()
        }
        new HPChangeNumber(this.playground, play, -1)
      } else if (data === 5) {
        play.status = 'on_water'
        play.friction = 10
      }
    }
  }
  destroyFireballOnSoil() {
    for (let i = 0; i < this.playground.player.length; i++) {
      let play = this.playground.player[i]
      for (let j = 0; j < play.fireballs.length; j++) {
        let fireball = play.fireballs[j]
        let ball_x = fireball.x + 1.5
        let ball_y = fireball.y + 1.5
        if (ball_x < 0 || ball_x > 4) return
        if (ball_y < 0 || ball_y > 4) return
        let ball_data = this.playground.map.mapData[Math.floor(ball_y / 0.4)][Math.floor(ball_x / 0.4)]
        if (ball_data === 3) fireball.destroy()
      }
    }
  }
}