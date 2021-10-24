<template>
  <div class="search-bar" :class="classes">
    <form class="search-bar-form">
      <input
        ref="input"
        class="search-bar-input"
        placeholder="Procurar..."
        v-model="searchText"
      />

      <button class="search-bar-button" @click.prevent="resolve">
        <transition mode="out-in" name="fade">
          <i v-if="active" class="fa fa-close"></i>
          <i v-else class="fa fa-search"></i>
        </transition>
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: false,
      searchText: '',
    }
  },
  computed: {
    classes() {
      return {
        active: this.active,
      }
    },
  },
  methods: {
    resolve() {
      if (this.searchText !== '') {
        this.searchText = ''
      } else {
        this.active = !this.active
      }

      this.$emit('onChange', this.searchText)
    },
  },
  watch: {
    searchText() {
      this.$emit('onChange', this.searchText)
    },
  },
}
</script>

<style lang="scss">
.search-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  height: 50px;
  margin: 15px;
  display: flex;
  flex-direction: row;
  border-radius: 35px;
  z-index: 500;

  &.active &-input {
    width: 200px;
    padding: 0 20px;
    opacity: 1;
  }

  &-input {
    width: 0;
    height: 50px;
    padding: 0;
    opacity: 0;
    background-color: transparent;
    font-family: $font-family;
    font-weight: 600;
    border: none;
    outline: none;
    border-radius: 35px;
    transition: 0.3s;
  }

  &-button {
    cursor: pointer;
    width: 50px;
    height: 50px;
    padding: 15px;
    color: grey;
    background: transparent;
    outline: none;
    border: none;
  }
}
</style>
