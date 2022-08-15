import { createStore } from 'vuex'

export default createStore({
  strict: true,
  state: {
    token: null,
    user: null,
    admin: null,
    isUserLoggedIn: false,
    isAdminLoggedIn: false
  },
  getters: {
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      if(token && state.user) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
      if(token && state.admin) {
        state.isAdminLoggedIn = true
      } else {
        state.isAdminLoggedIn = false
      }
    },
    setUser(state, user) {
      state.user = user
    },
    setAdmin(state, admin) {
      state.admin = admin
    }
  },
  actions: {
    setToken({commit}, token) {
      commit('setToken', token)
    },
    setUser({commit}, user) {
      commit('setUser', user)
    },
    setAdmin({commit}, admin) {
      commit('setAdmin', admin)
    }
  },
  modules: {
  }
})
