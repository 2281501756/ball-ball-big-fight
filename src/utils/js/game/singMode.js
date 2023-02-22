import GameObject from './game_object'
import Map from './map/map';
import Player from './player/player';
import Multiplayer from '../../socket/multiplayer';
import MinMap from './map/minMap';
import MapItem from './map/mapItme';

export default function (store, root, grade) {
  let m = new Multiplayer()

  let box = document.createElement('div')
  box.classList = 'playground'
  box.style.height = '100vh'
  box.style.width = '100vw'
  box.style.position = 'absolute'
  root.appendChild(box)
  let playground = document.querySelector('.playground')
  get_unit(playground)
  let map = new Map(playground)
  playground.map = map
  playground.minMap = new MinMap(playground)
  playground.mapItem = new MapItem(playground)
  playground.scale = playground.height
  playground.player = []
  playground.viewX = 0
  playground.viewY = 0
  playground.view_lock_y = true
  playground.view_lock_blank = false
  playground.player.push(new Player(playground, 0.5 * playground.width / playground.height, 0.5, 0.05, 0.2, 'white', 'me', store.state.userPhoto, store.state.userName, 50))
  add_game_grade(playground, grade)
  add_Window_listenr(playground, map, playground.minMap)
  add_GAME_ANIMATION(store)
}
function add_game_grade(playground, grade) {
  if (grade === 1) {
    for (let i = 0; i < 3; i++) {
      let x = (Math.random() * 4 - 1.5)
      let y = (Math.random() * 4 - 1.5)
      let color = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
      playground.player.push(new Player(playground, x, y, 0.05, 0.15, color, 'robot', '', '电脑', 25))
    }
  } else if (grade === 2) {
    for (let i = 0; i < 6; i++) {
      let x = (Math.random() * 4 - 1.5)
      let y = (Math.random() * 4 - 1.5)
      let color = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
      playground.player.push(new Player(playground, x, y, 0.05, 0.15, color, 'robot', '', '电脑', 75))
    }
  } else if (grade === 3) {
    for (let i = 0; i < 9; i++) {
      let x = (Math.random() * 4 - 1.5)
      let y = (Math.random() * 4 - 1.5)
      let color = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
      playground.player.push(new Player(playground, x, y, 0.05, 0.15, color, 'robot', '', '电脑', 100))
    }
    let x = (Math.random() * 4 - 1.5)
    let y = (Math.random() * 4 - 1.5)
    let color = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
    playground.player.push(new Player(playground, x, y, 0.03, 0.50, color, 'robot', '', '电脑 急速', 20))

  } else {
    for (let i = 0; i < 10; i++) {
      let x = (Math.random() * 4 - 1.5)
      let y = (Math.random() * 4 - 1.5)
      let color = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
      playground.player.push(new Player(playground, x, y, 0.05, 0.15, color, 'robot', '', '电脑', 150))
    }
    for (let i = 0; i < 5; i++) {
      let x = (Math.random() * 4 - 1.5)
      let y = (Math.random() * 4 - 1.5)
      let color = `rgb(${Math.random() * 256}, ${Math.random() * 256}, ${Math.random() * 256})`
      playground.player.push(new Player(playground, x, y, 0.03, 0.5, color, 'robot', '', '电脑 急速', 30))
    }
  }
}
function get_unit(playground) {
  playground.height = playground.clientHeight
  playground.width = playground.clientWidth
  let unit = Math.min(playground.width / 16, playground.height / 9)
  playground.height = unit * 9
  playground.width = unit * 16
}
function add_Window_listenr(playground, map, minMap) {
  window.onresize = function () {
    get_unit(playground)
    playground.scale = playground.height
    map.resize()
    minMap.resize()
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