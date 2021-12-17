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
      console.log(data);
    }
  }
  send_create_user(username, userphoto) {
    this.socket.send(JSON.stringify({
      "event": "create_user",
      "uuid": this.uuid,
      "username": username,
      "userphoto": userphoto,
    }))
  }



}