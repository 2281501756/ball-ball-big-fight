<template>
  <div class="multiMode">
    <div class="menu" v-if="showMenu">
      <button class="menu_item" @click="backGame">返回游戏</button>
      <button class="menu_item" @click="refreshGame">从新开始</button>
      <button class="menu_item" @click="exitGame">退出游戏</button>
    </div>
    <div class="chat_list"></div>
    <input type="text" class="chat_input" v-model="message" @keyup.enter="inputEnter()" />
  </div>
</template>

<script>
import gameInit from '@/utils/js/game/multiMode'
export default {
  data() {
    return {
      showMenu: false,
      message: '',
      name: '未加载',
      input: false,
      timeid: null,
    }
  },
  inject: ['reload', 'setBackground'],
  mounted() {
    this.setBackground(2)
    if (this.$store.state.userPhoto != '') {
      cancelAnimationFrame(this.$store.state.animationId)
      let root = document.querySelector('.multiMode')
      gameInit(this.$store, root)
      this.name = this.$store.state.userName
    } else {
      setTimeout(() => {
        cancelAnimationFrame(this.$store.state.animationId)
        let root = document.querySelector('.multiMode')
        gameInit(this.$store, root)
        this.name = this.$store.state.userName
      }, 500)
    }
    window.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.showMenu = !this.showMenu
        if (this.showMenu === true) {
          setTimeout(() => {
            let menu = document.querySelector('.menu')
            menu.addEventListener('contextmenu', (e) => {
              if (e.which === 3) {
                e.preventDefault()
                return false
              }
            })
          }, 100)
        } else {
        }
      } else if (e.key === 'Enter') {
        if (this.input === false) {
          clearTimeout(this.timeid)
          let input = document.querySelector('.chat_input')
          let list = document.querySelector('.chat_list')
          document.querySelector('.chat_input').focus()
          input.classList.add('chat_show')
          list.classList.add('chat_show')
          this.input = true
        }
      }
    })
    window.chat_init = function () {
      let chat_list = document.querySelector('.chat_list')
      let chat_input = document.querySelector('.chat_input')
      let w = document.body.clientWidth / 16
      let h = document.body.clientHeight / 9
      let x = 0
      if (w < h) {
        x = w
      } else {
        x = h
      }
      chat_list.style.left = '50%'
      chat_list.style.top = '50%'
      chat_list.style.position = 'absolute'
      chat_input.style.left = '50%'
      chat_input.style.top = '50%'
      chat_input.style.position = 'absolute'
      chat_list.style.height = x * 3 + 'px'
      chat_list.style.width = x * 4.5 + 'px'
      chat_list.style.transform = `translate(${-x * 8}px, ${x}px)`
      chat_input.style.height = x * 0.5 + 'px'
      chat_input.style.width = x * 4.5 + 'px'
      chat_input.style.transform = `translate(${-x * 8}px, ${x * 4}px)`
    }
    window.chat_init()
  },
  methods: {
    inputEnter() {
      if (this.input === true) {
        if (this.message === '') {
          let chat_input = document.querySelector('.chat_input')
          chat_input.classList.remove('chat_show')
          window.canvas.focus()
          this.chatlist_hide()
          setTimeout(() => {
            this.input = false
          }, 100)
        } else {
          this.chat_add_data(this.name, this.message)
          window.ws.send_chat(this.name, this.message)
          this.message = ''
        }
      }
    },
    chatlist_hide() {
      if (this.timeid) {
        clearTimeout(this.timeid)
        this.timeid = setTimeout(() => {
          let chat_list = document.querySelector('.chat_list')
          chat_list.classList.remove('chat_show')
        }, 3000)
      } else {
        this.timeid = setTimeout(() => {
          let chat_list = document.querySelector('.chat_list')
          chat_list.classList.remove('chat_show')
        }, 2000)
      }
    },
    chat_add_data(name, message) {
      let box = document.querySelector('.chat_list')
      let div = document.createElement('div')
      div.style.width = '100%'
      div.innerHTML = `<span class="chat_item" style="color: #2c80c5">${name}</span>: ${message}`
      box.appendChild(div)
      box.scrollTop = box.scrollHeight
    },
    send_chat_add_data(name, message) {
      let box = document.querySelector('.chat_list')
      let div = document.createElement('div')
      div.style.width = '100%'
      div.innerHTML = `<span class="chat_item" style="color: red;">${name}</span>: ${message}`
      box.appendChild(div)
      box.scrollTop = box.scrollHeight
      let list = document.querySelector('.chat_list')
      list.classList.add('chat_show')
      this.chatlist_hide()
    },
    backGame() {
      this.showMenu = !this.showMenu
    },
    refreshGame() {
      cancelAnimationFrame(this.$store.state.animationId)
      location.reload()
    },
    exitGame() {
      this.setBackground('http://82.157.165.74:8000/static/audio/main1.mp3')
      this.$router.push('/menu')
      setTimeout(() => {
        location.reload()
      }, 200)
    },
  },
}
</script>

<style scoped>
.chat_item {
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
.multiMode {
  height: 100vh;
  width: 100vw;
  background: url(~@/assets/image/background/image5.jpg) no-repeat center/cover;
  display: flex;
  justify-items: center;
}
.menu {
  position: absolute;
  color: white;
  width: 30%;
  height: 50%;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
}

.menu_item {
  display: block;
  margin-bottom: 5%;
  width: 100%;
  height: 25%;
}
.chat_show {
  z-index: 2;
}
::-webkit-scrollbar {
  width: 0; /*滚动条宽度*/
  height: 16px; /*滚动条高度*/
}
.chat_list {
  color: #ddd;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: scroll;
  pointer-events: none;
}
</style>
>
