import http from "../../services/http";

export default {
  namespaced: true,
  state: {
    isFetching: false,
    page: 1,
    limit: 32,
    total: undefined,
    error: undefined,
    items: [],
  },
  mutations: {
    total(state, value) {
      state.total = value
    },
    error(state, value) {
      state.error = value
    },
    isFetching(state, value) {
      state.isFetching = value
    },
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

      commit('isFetching', true)

      try {
        const result = await http.get(
          `/search/users?q=%20location:Angola+location:luanda&sort=&per_page=${limit}&page=${page}`
        )

        const { data } = result
        const { items, total_count } = data

        commit('users', items)
        commit('total', total_count)

        commit('incrementPage')
      } catch (error) {
        commit('error', error)
      } finally {

        commit('isFetching', false)
      }
    },
  }
}
