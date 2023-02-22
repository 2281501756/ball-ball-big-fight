import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userName: '',
    userGender: '',
    userPhoto: '',
    animationId: 0,
    gameGrade: 1,
  },
  mutations: {
    getphoto(state) {
      return state.userPhoto
    },
    setBackgroundMusic(name) {
      if (name = '2') {
        audios[0].src =  './assets/audio/main2.mp3'        
      }
    }
    
  },
  actions: {
    addUserData(context, data) {
      context.state.userName = data.name
      context.state.userGender = data.gender
      context.state.userPhoto = data.photo
    }
  },
  getters: {

  },
  modules: {

  }
})
export default store