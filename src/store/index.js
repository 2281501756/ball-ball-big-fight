import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userName: '',
    userGender: '',
    userPhoto: '',
    animationId: 0,
  },
  mutations: {
    getphoto(state) {
      return state.userPhoto
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