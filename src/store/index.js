import { createStore } from 'vuex'

import users from './users'

export default createStore({
  state: {
    themeMode: 'light',
  },
  mutations: {
    themeMode(state, value) {
      state.themeMode = value
    }
  },
  actions: {
  },
  modules: {
    users,
  }
})
