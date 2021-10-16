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
          {{ count }} desenvolvedores residentes em Angola. Conheça eles:
        </h3>
      </header>

      <transition name="fade" mode="out-in">
        <github-users v-if="users" :users="users" />
        <spinner v-else class="spinner" />
      </transition>

      <br />
      <br />
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex'

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
    ...mapState('users', ['users', 'count', 'isFetching']),
  },
  methods: {
    fetchUsers() {
      this.$store.dispatch('users/fetch')
    },
    fetchUsersOnScrollToBottom() {
      // https://stackoverflow.com/a/44077777/6362415
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight

      if (
        scrollHeight == window.scrollY &&
        !this.isFetching
      ) {
        this.fetchUsers()
      }
    },
  },
  mounted() {
    window.onscroll = this.fetchUsersOnScrollToBottom

    this.fetchUsers()
  },
  store,
}
</script>

<style lang="scss">
@import './styles/app.scss';

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
