import http from '../../services/http'

import filters from './filters'

export default {
  namespaced: true,
  state: {
    isFetching: false,
    count: null,
    error: null,
    users: [],
  },
  mutations: {
    isFetching(state, value) {
      state.isFetching = value
    },
    count(state, value) {
      state.count = value
    },
    error(state, value) {
      state.error = value
    },
    appendUsers(state, users) {
      state.users = state.users.concat(users)
    },
    clearUsers(state) {
      state.users = []
      
      state.filters.page = 0
    },
  },
  actions: {
    async fetch({ state, commit, }) {
      commit('isFetching', true)
      
      const { order, sort, page, limit } = state.filters
      
      const nextPage = page + 1

      try {
        const result = await http.get(
          `/search/users?q=location:Angola&order=${order}&sort=${sort}&per_page=${limit}&page=${nextPage}`
        )

        const { data } = result

        const { items: users, total_count: count } = data

        commit('appendUsers', users)
        commit('count', count)

        commit('filters/page', nextPage)
      } catch (error) {
        commit('error', error)
      } finally {

        commit('isFetching', false)
      }
    },
  },
  modules: {
    filters,
  }
}
