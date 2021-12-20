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
      } else if (data.event === 'move_to') {
        this.receive_move_to(data)
      } else if (data.event === 'shoot_fireball') {
        this.receive_shoot_fireball(data)
      } else if (data.event === 'on_attack') {
        this.receive_on_attack(data)
      } else if (data.event === 'player_stop') {
        this.receive_player_stop(data)
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
    let play = new Player(this.playground, 0.5 * this.playground.width / this.playground.height, 0.5, 0.05, 0.2, 'white', 'enemy', data.userphoto, data.username)
    play.uuid = data.uuid
    this.playground.player.push(play)
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
  send_on_attack(uuid, attackid, fireballid, x, y, angle) {
    this.socket.send(JSON.stringify({
      "event": "on_attack",
      "uuid": uuid,
      "attackid": attackid,
      "fireballid": fireballid,
      "x": x,
      "y": y,
      "angle": angle,
    }))
  }
  receive_on_attack(data) {
    let play = this.getPlay(data.attackid)
    let attacker = this.getPlay(data.uuid)
    if (play && this.uuid !== data.uuid) {
      for (let i = 0; i < attacker.fireballs.length; i++) {
        if (attacker.fireballs[i].uuid === data.fireballid) {
          attacker.fireballs[i].destroy()
          attacker.fireballs.splice(i, 1)
          break
        }
      }
      play.x = data.x
      play.y = data.y
      play.onAttack(data.angle)
    }
  }
  send_player_stop(x, y) {
    this.socket.send(JSON.stringify({
      "event": "player_stop",
      "uuid": this.uuid,
      "x": x,
      "y": y,
    }))
  }
  receive_player_stop(data) {
    console.log('停止');
    let play = this.getPlay(data.uuid)
    if (play && this.uuid !== data.uuid) {
      play.x = data.x
      play.y = data.y
      play.vx = 0
      play.vy = 0
      play.moveLength = 0
    }
  }
}