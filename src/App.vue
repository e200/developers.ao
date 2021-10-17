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
        <github-users
          v-if="!isFirstFetch && users"
          :users="users"
          :has-users="hasUsers"
        />
        <spinner v-else class="spinner" />
      </transition>

      <br />
      <br />
    </div>
  </main>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import FlagColors from './components/FlagColors'
import GithubUsers from './components/GithubUsers'
import Spinner from './components/Spinner'
import AppBar from './components/AppBar'

import store from './store'

export default {
  name: 'App',
  components: {
    FlagColors,
    GithubUsers,
    Spinner,
    AppBar,
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
