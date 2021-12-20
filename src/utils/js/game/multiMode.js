import GameObject from './game_object'
import Map from './map/map';
import Player from './player/player';
import Multiplayer from '../../socket/multiplayer';
import MinMap from './map/minMap';

export default function (store, root) {
  let box = document.createElement('div')
  box.classList = 'playground'
  box.style.height = '100vh'
  box.style.width = '100vw'
  root.appendChild(box)
  let playground = document.querySelector('.playground')
  get_unit(playground)
  let map = new Map(playground)
  playground.minMap = new MinMap(playground)
  playground.map = map
  playground.scale = playground.height
  playground.mode = 'multi'
  playground.viewX = 0
  playground.viewY = 0
  playground.view_lock_y = false
  playground.view_lock_blank = false
  playground.player = []
  playground.player.push(new Player(playground, 0.5 * playground.width / playground.height, 0.5, 0.05, 0.2, 'white', 'me', store.state.userPhoto, store.state.userName))
  playground.ws = new Multiplayer(playground, playground.player[0].uuid)
  playground.ws.socket.onopen = () => {
    playground.ws.send_create_user(store.state.userName, store.state.userPhoto)
  }


  add_Window_listenr(playground, map)
  add_GAME_ANIMATION(store)
}

function get_unit(playground) {
  playground.height = playground.clientHeight
  playground.width = playground.clientWidth
  let unit = Math.min(playground.width / 16, playground.height / 9)
  playground.height = unit * 9
  playground.width = unit * 16
}
function add_Window_listenr(playground, map) {
  window.onresize = function () {
    get_unit(playground)
    playground.scale = playground.height
    map.resize()
  }
}
function add_GAME_ANIMATION(store) {
  let last_timestamp = 0
  let GAME_ANIMATION = function (timestamp) {
    for (let i = 0; i < GameObject.GAMEOBJECT.length; i++) {
      let obj = GameObject.GAMEOBJECT[i]
      obj.timestamp = timestamp - last_timestamp
      if (obj.has_start) {
        obj.update()
      } else {
        obj.start()
        obj.has_start = true
      }
    }

    last_timestamp = timestamp
    let id = requestAnimationFrame(GAME_ANIMATION)
    store.state.animationId = id
  }
  requestAnimationFrame(GAME_ANIMATION)
}