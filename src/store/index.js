import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchedIngredients:""
  },
  mutations: {
    changeIngredients(state, payload){
      state.searchedIngredients = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
