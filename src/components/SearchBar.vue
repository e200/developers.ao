<template>
  <div class="search-bar">
    <form class="search-bar-form">
      <input
        :class="classes"
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

        if (this.active) {
          this.$refs.input.focus()
        }
      }

      this.$emit('change', this.searchText)
    },
  },
  watch: {
    searchText(value) {
      this.$emit('change', value)
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
  background-color: $white;
  box-shadow: 0 1px 4px rgba(black, 0.2);
  border-radius: 35px;

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
    transition: 1s;

    &.active {
      width: 200px;
      padding: 0 20px;
      opacity: 1;
    }
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
