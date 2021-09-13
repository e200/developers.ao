import http from "../../services/http";

export default {
  namespaced: true,
  state: {
    page: 1,
    limit: 32,
    items: [],
  },
  mutations: {
    incrementPage(state) {
      state.page++
    },
    users(state, users) {
      state.items = state.items.concat(users)
    }
  },
  actions: {
    async fetch({ commit, state }, pagination) {
      const { page } = state
      const { limit } = pagination

      const result = await http.get(
        `/search/users?q=%20location:Angola+location:luanda&sort=&per_page=${limit}&page=${page}`
      )

      const { data } = result

      commit('users', data.items)
      commit('incrementPage')
    },
  }
}
