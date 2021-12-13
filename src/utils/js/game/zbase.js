import GameObject from './game_object'
import Map from './map/map';
import Player from './player/player';
export default function (store, root) {
  let box = document.createElement('div')
  box.classList = 'playground'
  box.style.height = '100vh'
  box.style.width = '100vw'
  root.appendChild(box)
  let playground = document.querySelector('.playground')
  get_unit(playground)
  let map = new Map(playground)
  playground.map = map
  playground.scale = playground.height
  playground.player = []
  playground.player.push(new Player(playground, 0.5 * playground.width / playground.height, 0.5, 0.05, 0.15, 'white', true, store.state.userPhoto))
  for (let i = 0; i < 6; i++) {
    let x = Math.random() * playground.width / playground.scale
    let y = Math.random()
    let color = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
    playground.player.push(new Player(playground, x, y, 0.05, 0.15, color, false, ''))
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