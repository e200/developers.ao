<template>
  <flag-colors />

  <main class="main" :class="classes">
    <div class="container">      
      <header class="home-header">
        <img
          class="home-header-logo"
          src="./assets/github-light.png"
          alt="Github logo"
        />

        <h1 class="home-header-title">
          Angolanos no Github
        </h1>
        <h2 class="home-header-subtitle">
          Conheça os Angolanos que contribuem para projectos Open-Source
        </h2>

        <h3 class="home-header-description">
          {{ total }} desenvolvedores residentes em Angola. Conheça eles:
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
import FlagColors from './components/FlagColors'
import GithubUsers from './components/GithubUsers'
import Spinner from './components/Spinner'

import store from './store'

export default {
  name: 'App',
  components: {
    FlagColors,
    GithubUsers,
    Spinner,
  },
  computed: {
    users() {
      return store.state.users.items
    },
    hasUsers() {
      return this.users && this.total !== this.users.length
    },
    total() {
      return store.state.users.total
    },
    classes() {
      return {
        'theme-dark': true,
      }
    }
  },
  methods: {
    fetchUsers() {
      store.dispatch('users/fetch', {
        limit: 36,
      })
    },
    fetchUsersOnScrollToBottom() {
      // https://stackoverflow.com/a/44077777/6362415
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight

      if (
        scrollHeight == window.scrollY &&
        this.hasUsers &&
        !store.state.users.isFetching
      ) {
        this.fetchUsers()
      }
    },
  },
  mounted() {
    window.onscroll = this.fetchUsersOnScrollToBottom

    this.fetchUsers()
  }
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
