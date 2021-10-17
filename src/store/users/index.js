import http from '../../services/http'

import filters from './filters'

export default {
  namespaced: true,
  state: {
    isFirstFetch: true,
    isFetching: false,
    count: null,
    error: null,
    users: [],
  },
  mutations: {
    isFirstFetch(state, value) {
      state.isFirstFetch = value
    },
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

      state.isFirstFetch = true

      state.filters.page = 0
    },
  },
  getters: {
    hasUsers(state) {
      return state.count > state.users.length
    }
  },
  actions: {
    async fetch({ state, commit }) {
      commit('isFetching', true)

      const { order, sort, page, limit, search } = state.filters

      const nextPage = page + 1

      try {
        const result = await http.get(
          `/search/users?q=${search ? search + '+' : ''}location:Angola&order=${order}&sort=${sort}&per_page=${limit}&page=${nextPage}`
        )

        const { data } = result

        const { items: users, total_count: count } = data

        commit('appendUsers', users)
        commit('count', count)

        commit('filters/page', nextPage)

        if (state.isFirstFetch) {
          commit('isFirstFetch', false)
        }
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
