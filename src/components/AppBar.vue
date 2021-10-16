<template>
  <div class="app-bar">
    <div class="container">
      <button class="app-bar-button" @click="toggleTheme">
        <span class="material-icons"
          >{{ themeMode === 'dark' ? 'light' : 'dark' }}_mode</span
        >
      </button>

      <a class="app-bar-home-link" href="/"
        ><i class="fa fa-github" aria-hidden="true"></i
      ></a>

      <button class="app-bar-button" @click="toggleMenuVisibility">
        <span class="material-icons">menu</span>
      </button>

      <slide-up-down v-model="isMenuVisible" :duration="1000">
        <div class="app-bar-menu">
          <div class="container">
            <div class="app-bar-search-form">
              <input
                class="app-bar-menu-search-input"
                placeholder="Procurar programadores..."
              />
            </div>

            <div class="app-bar-menu-filters">
              <div class="app-bar-menu-filters-wrapper">
                <span class="app-bar-menu-filters-title">Lista</span>

                <div class="app-bar-menu-filters-tags">
                  <filter-tag
                    class="app-bar-menu-filters-tag"
                    v-for="(key, value) in sortOptions"
                    :key="key"
                    :title="key"
                    :active="value === sort"
                    @click="updateSort(value)"
                  />
                </div>
              </div>

              <div class="app-bar-menu-filters-wrapper">
                <span class="app-bar-menu-filters-title">Ordem</span>

                <div class="app-bar-menu-filters-tags">
                  <filter-tag
                    class="app-bar-menu-filters-tag"
                    v-for="(key, value) in orderOptions"
                    :key="key"
                    :title="key"
                    :active="value === order"
                    @click="updateOrder(value)"
                  />
                </div>
              </div>
            </div>

            <ul class="app-bar-menu-list">
              <li>
                <a
                  class="app-bar-menu-list-link"
                  href="https://t.me/joinchat/Sq9PhrG161A3ceTP"
                  target="_blank"
                  >Nosso Telegram</a
                >
              </li>
              <li>
                <a
                  class="app-bar-menu-list-link"
                  href="https://github.com/e200/developers.ao"
                  target="_blank"
                  >Ver código</a
                >
              </li>
            </ul>
          </div>
        </div>
      </slide-up-down>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import SlideUpDown from 'vue3-slide-up-down'
import FilterTag from '../components/FilterTag'

export default {
  components: {
    SlideUpDown,
    FilterTag,
  },
  data() {
    return {
      isMenuVisible: false,
      sortOptions: {
        '': 'Padrão',
        joined: 'Recentes',
        followers: 'Seguidores',
        repositories: 'Repositórios',
      },
      orderOptions: {
        asc: 'Ascendente',
        desc: 'Descendente',
      },
    }
  },
  computed: {
    ...mapState(['themeMode']),
    ...mapState('users/filters', ['sort', 'order']),
  },
  methods: {
    toggleMenuVisibility() {
      this.isMenuVisible = !this.isMenuVisible
    },
    toggleTheme() {
      const oldThemeMode = this.themeMode
      const newThemeMode = oldThemeMode === 'light' ? 'dark' : 'light'

      document.body.classList.remove(`theme-${oldThemeMode}`)
      document.body.classList.add(`theme-${newThemeMode}`)

      this.$store.commit('themeMode', newThemeMode)
    },
    updateSort(sort) {
      this.$store.commit('users/clearUsers')

      this.$store.commit('users/filters/sort', sort)

      this.$store.dispatch('users/fetch')
    },
    updateOrder(order) {
      this.$store.commit('users/clearUsers')

      this.$store.commit('users/filters/order', order)

      this.$store.dispatch('users/fetch')
    },
  },
}
</script>

<style lang="scss">
$menu-color: #1e2124;

@keyframes appBarSlideOut {
  to {
    height: $app-bar-height;
  }
}

.app-bar {
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  height: 100%;
  font-weight: 600;
  background: $menu-color;
  box-shadow: 0 0 4px #00000078;
  animation: appBarSlideOut 1s;
  animation-delay: 3s;
  animation-fill-mode: forwards;
  z-index: 999;

  & > .container {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &-home-link {
    color: $white;
    font-size: 26px;
  }

  &-button {
    cursor: pointer;
    outline: none;
    border: none;
    background: transparent;

    > .material-icons {
      color: #e6e6e6;
    }
  }

  &-logo {
    width: 40px;
  }

  .slide-up-down__container {
    position: absolute;
    top: $app-bar-height - 16px;
    left: 0;
    right: 0;

    @media (min-width: 560px) {
      max-width: 300px;
      left: auto;
      right: 0;
    }
  }

  &-menu {
    background: $menu-color;
    box-shadow: 0 0 4px #00000078;

    @media (min-width: 560px) {
      border-radius: 0 0 5px 5px;
    }

    &-search-input {
      width: 100%;
      padding: 10px;
      margin: 10px 0;
      background-color: #f3f3f3;
      border-radius: 5px;
      border: 1px solid #000;
      
      &:placeholder {
        font-family: $font-family;
        font-weight: 600;
      }
    }

    &-filters {
      font-size: 0.8em;
      font-weight: 600;

      &-title {
        display: inline;
        margin-bottom: 0.5em;
        margin-right: 0.5em;
        color: #888888;
      }

      &-tags {
        display: inline;
      }
    }

    &-list {
      list-style: none;
      margin: 0;
      padding: 0;

      &-link {
        display: block;
        color: $white;
        text-decoration: none;
        padding: 10px 0;
        border-top: 1px solid #252525;
      }
    }
  }
}
</style>
