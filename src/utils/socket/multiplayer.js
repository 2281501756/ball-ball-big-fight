import { get } from "../http/request"
import  vue  from "../../view/playground/MultiMode"
import Player from "../js/game/player/player"

export default class Multiplayer {
  constructor(playground, uuid) {
    this.playground = playground
    this.uuid = uuid
    this.socket = new WebSocket("ws://82.157.165.74:8000/wss/multiplayer/")
    this.start()
  }

  start() {
    this.socket.onerror = (e) => {
      console.log(e);
    }
    this.socket.onmessage = (e) => {
      let data = JSON.parse(e.data)
      if (data.event === 'create_user') {
        this.receive_create_user(data)
      } else if (data.event === 'user_lever') {
        this.receive_user_lever(data)
      } else if (data.event === 'move_to') {
        this.receive_move_to(data)
      } else if (data.event === 'shoot_fireball') {
        this.receive_shoot_fireball(data)
      } else if (data.event === 'on_attack') {
        this.receive_on_attack(data)
      } else if (data.event === 'player_stop') {
        this.receive_player_stop(data)
      } else if (data.event === 'player_init') {
        this.recevie_player_init(data)
      } else if (data.event === 'chat') {
        this.receive_chat(data)
      } else if (data.event === 'blink') {
        this.receive_blink(data)
      }
    }
  }
  getPlay(uuid) {
    let play = null
    for (let i = 0; i < this.playground.player.length; i++) {
      if (this.playground.player[i].uuid === uuid) {
        return this.playground.player[i]
      }
    }
    return play
  }
  send_create_user(username, userphoto) {
    this.socket.send(JSON.stringify({
      "event": "create_user",
      "uuid": this.uuid,
      "username": username,
      "userphoto": userphoto,
    }))
  }
  receive_create_user(data) {
    if (data.uuid === this.uuid) return
    let play = new Player(this.playground, 0.5 * this.playground.width / this.playground.height, 0.5, 0.05, 0.2, 'white', 'enemy', data.userphoto, data.username, 50)
    play.uuid = data.uuid
    this.playground.player.push(play)
  }
  receive_user_lever(data) {
    let play = this.getPlay(data.uuid)
    if (play) {
      for (let i = 0; i < this.playground.player.length; i++) {
        if (play === this.playground.player[i]) {
          this.playground.player.splice(i, 1)
          break
        }
      }
      play.destroy()
    }
  }
  send_move_to(x, y) {
    this.socket.send(JSON.stringify({
      "event": "move_to",
      "uuid": this.uuid,
      "x": x,
      "y": y,
    }))
  }
  receive_move_to(data) {
    let play = this.getPlay(data.uuid)
    if (play && data.uuid !== this.uuid) {
      play.move_to(data.x, data.y)
    }
  }
  send_shoot_fireball(ballid, x, y) {
    this.socket.send(JSON.stringify({
      "event": "shoot_fireball",
      "uuid": this.uuid,
      "ballid": ballid,
      "x": x,
      "y": y
    }))
  }
  receive_shoot_fireball(data) {
    let play = this.getPlay(data.uuid)
    if (play && play.uuid != this.uuid) {
      let ball = play.shoot_fireball(data.x, data.y)
      ball.uuid = data.ballid
    }
  }
  send_on_attack(attack_event, uuid, attackid, fireballid, x, y, angle, hurt) {
    this.socket.send(JSON.stringify({
      "event": "on_attack",
      "attack_event": attack_event,
      "uuid": uuid,
      "attackid": attackid,
      "fireballid": fireballid,
      "hurt": hurt,
      "x": x,
      "y": y,
      "angle": angle,
    }))
  }
  receive_on_attack(data) {
    let play = this.getPlay(data.attackid)
    let attacker = this.getPlay(data.uuid)
    let repel_speed = 0
    if (!play || this.uuid === data.uuid) return
    if (data.attack_event === 'fireball') {
      repel_speed = 0.5
      for (let i = 0; i < attacker.fireballs.length; i++) {
        if (attacker.fireballs[i].uuid === data.fireballid) {
          attacker.fireballs[i].destroy()
          attacker.fireballs.splice(i, 1)
          break
        }
      }
    }
    play.x = data.x
    play.y = data.y
    play.onAttack(data.angle, repel_speed, data.hurt)

  }
  send_player_stop(x, y, HP) {
    this.socket.send(JSON.stringify({
      "event": "player_stop",
      "uuid": this.uuid,
      "x": x,
      "y": y,
      "HP": HP,
    }))
  }
  receive_player_stop(data) {
    let play = this.getPlay(data.uuid)
    if (play && this.uuid !== data.uuid) {
      play.x = data.x
      play.y = data.y
      play.vx = 0
      play.vy = 0
      play.HP = data.HP
      play.moveLength = 0
    }
  }
  send_player_init(x, y, HP) {
    this.socket.send(JSON.stringify({
      "event": "player_init",
      "uuid": this.uuid,
      "x": x,
      "y": y,
      "HP": HP,
    }))
  }
  recevie_player_init(data) {
    let play = this.getPlay(data.uuid)
    if (play && this.uuid !== data.uuid) {
      play.x = data.x
      play.y = data.y
      play.HP = data.HP
    }
  }
  send_chat(name, message) {
    this.socket.send(JSON.stringify({
      "event": "chat",
      "uuid": this.uuid,
      "name": name,
      "message": message,
    }))
  }
  receive_chat(data) {
    if (this.uuid !== data.uuid) {
      vue.methods.send_chat_add_data(data.name, data.message)      
    }
  }
  send_blink(mx, my) {
    this.socket.send(JSON.stringify({
      "event": "blink",
      "uuid": this.uuid,
      "x": mx,
      "y": my,
    }))
  }
  receive_blink(data) {
    if (this.uuid !== data.uuid) {
      let play = this.getPlay(data.uuid)
      play.blink(data.x, data.y)
    }
  }
}