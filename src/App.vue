<template>
  <main class="main">
    <flag-colors />

    <div class="container">
      <header class="home-header">
        <img
          class="home-header-logo"
          src="./assets/github.png"
          alt="Github logo"
        />

        <h1 class="home-header-title flag-color-animation">
          Angolanos no Github
        </h1>
        <h2 class="home-header-subtitle">
          Angolanos que contribuem para projectos Open-Source
        </h2>

        {{ total }} desenvolvedores residentes em Angola. Saiba quem são:
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
import FlagColors from "./components/FlagColors";
import GithubUsers from "./components/GithubUsers";
import Spinner from "./components/Spinner";

import store from "./store";

export default {
  name: "App",
  components: {
    FlagColors,
    GithubUsers,
    Spinner,
  },
  computed: {
    users() {
      return store.state.users.items;
    },
    hasUsers() {
      return this.users && this.total !== this.users.length;
    },
    total() {
      return store.state.users.total;
    },
  },
  methods: {
    fetchUsers() {
      store.dispatch("users/fetch", {
        limit: 36,
      });
    },
    registerReachedScrollBottomListener() {
      const me = this;

      setTimeout(() => {
        window.onscroll = function () {
          // https://stackoverflow.com/a/44077777/6362415
          const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;

          if (scrollHeight == window.scrollY && me.hasUsers) {
            store.dispatch("users/fetch", {
              limit: 36,
            });
          }
        };
      }, 3000); // Timeout to give time for the opening animation
    },
  },
  mounted() {
    this.registerReachedScrollBottomListener();

    this.fetchUsers();
  },
};
</script>

<style lang="scss">
@import "./styles/app.scss";

.home {
  &-header {
    text-align: center;
    margin-bottom: 3em;

    &-logo {
      margin-top: 35px;
      max-width: 130px;
    }

    &-subtitle {
      color: #5e5e5e;
    }
  }
}
</style>
