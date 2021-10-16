export default {
  namespaced: true,
  state: {
    page: 0,
    order: 'desc',
    sort: '',
    limit: 36,
    search: '',
  },
  mutations: {
    page(state, value) {
      state.page = value
    },
    order(state, value) {
      state.order = value
    },
    sort(state, value) {
      state.sort = value
    },
    limit(state, value) {
      state.limit = value
    },
    search(state, value) {
      state.search = value
    },
  }
}
