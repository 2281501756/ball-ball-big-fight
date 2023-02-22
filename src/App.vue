<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
    <!-- <audio src="/audio/main1.mp3" loop="loop"></audio> -->
    <!-- <audio src="/assets/audio/main2.mp3" loop="loop"></audio> -->
    <audio :src="main1" loop="loop"></audio>
    <audio :src="main2" loop="loop"></audio>
  </div>
</template>

<script>
import { getinfo } from './utils/http/index'
import main1 from './assets/audio/main1.mp3'
import main2 from './assets/audio/main2.mp3'
export default {
  name: 'App',
  components: {},
  data() {
    return {
      isRouterAlive: true,
      music: '',
      main1,
      main2,
    }
  },
  provide() {
    return {
      reload: this.reload,
      setBackground: this.setBackground,
    }
  },
  mounted() {
    getinfo().then((Response) => {
      if (Response.result === 'succeed') {
        this.$store.state.userName = Response.name
        this.$store.state.userGender = Response.gender
        this.$store.state.userPhoto = Response.photo
        console.log('有账号')
      } else {
        console.log('没有账号')
        if (this.$route.path !== '/login') this.$router.push('/login')
      }
    })

    let audio = document.querySelectorAll('audio')
    // audio[0].play()

    // let app = document.querySelector('#app')
    // app.addEventListener('mousemove', () => {
    //   if (this.music === '') {
    //     audio[0].play()
    //   }
    // })
    window.addEventListener('keydown', (e) => {
      if (e.key === 'm') {
        if (this.music === true || this.music === '') {
          audio[0].pause()
          this.music = false
        } else {
          audio[0].play()
          this.music = true
        }
      }
    })
  },
  methods: {
    setBackground(num) {
      // let audio = document.querySelectorAll('audio')
      // audio[0].src = url
      let audio = document.querySelectorAll('audio')
      if (num === 2) {
        audio[0].pause()
        audio[1].play()
      } else {
        audio[1].pause()
        audio[0].play()
      }
    },
    reload() {
      this.isRouterAlive = false //先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
  beforeCreate() {},
}
</script>

<style>
@import './assets/font/iconfont.css';
@import './utils/css/zbase.css';
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
