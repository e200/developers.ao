<template>
  <flag-colors />

  <app-bar />

  <main class="main">
    <div class="container">
      <header class="home-header">
        <h1 class="home-header-title">Angolanos no Github</h1>
        <h2 class="home-header-subtitle">
          Conheça os Angolanos que contribuem para projectos Open-Source
        </h2>

        <h3 class="home-header-description">
          {{ count }} desenvolvedor{{ count !== 1 ? 'es' : '' }} residente{{
            count !== 1 ? 's' : ''
          }}
          em Angola. Conheça eles:
        </h3>
      </header>

      <transition name="fade" mode="out-in">
        <spinner v-if="isFirstFetch && !users" class="spinner" />
        <github-users v-else :users="users" :has-users="hasUsers" />
      </transition>

      <br />
      <br />

      <search-bar @change="searchUsers" />
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import FlagColors from './components/FlagColors'
import GithubUsers from './components/GithubUsers'
import Spinner from './components/Spinner'
import AppBar from './components/AppBar'
import SearchBar from './components/SearchBar'

import store from './store'

export default {
  name: 'App',
  data() {
    return {
      timeOutInstance: null,
    }
  },
  components: {
    FlagColors,
    GithubUsers,
    Spinner,
    AppBar,
    SearchBar,
  },
  computed: {
    ...mapGetters('users', ['hasUsers']),
    ...mapState('users', ['users', 'count', 'isFirstFetch']),
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch('users/fetch')
    },
    fetchUsersOnScrollToBottom() {
      // https://stackoverflow.com/a/44077777/6362415
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight

      if (scrollHeight == window.scrollY && !this.isFetching && this.hasUsers) {
        this.fetchUsers()
      }
    },
    searchUsers(text) {
      const _me = this

      if (this.timeOutInstance) {
        clearTimeout(this.timeOutInstance)
      }

      this.timeOutInstance = setTimeout(() => {
        if (_me.$store.state.users.filters.search !== text) {
          _me.$store.commit('users/clearUsers')

          _me.$store.commit('users/filters/search', text)

          _me.$store.dispatch('users/fetch')
        }
      }, 300)
    },
  },
  mounted() {
    window.onscroll = this.fetchUsersOnScrollToBottom

    setTimeout(() => {
      document.body.classList.add('app-ready')
    }, 5000)

    this.fetchUsers()
  },
  store,
}
</script>

<style lang="scss">
@import './styles/app.scss';

.app-ready #app {
  // 4px = 2px red flag line + 2px yellow flag line
  margin-top: $app-bar-height + 4px;
}

.home {
  &-header {
    text-align: center;
    max-width: 668px;
    margin: 0 auto;
    margin-bottom: 3em;

    &-logo {
      margin-top: 35px;
      max-width: 100px;
    }
  }
}
</style>
