<template>
  <div
    class="flag-color-lines"
    :class="{ animate: animate }"
    v-if="showFlagLines"
  >
    <div class="flag-color-line red"></div>
    <div class="flag-color-line yellow"></div>
    <div class="flag-color-line black"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animate: false,
    }
  },
  computed() {
    return {
      showFlagLines() {
        return process.env.NODE_ENV === 'production'
      },
    }
  },
  mounted() {
    const me = this

    setTimeout(() => {
      me.animate = true
    }, 1000)
  },
}
</script>

<style lang="scss">
@import '../styles/variables.sass';

$animation-duration-in-seconds: 1;

$color-list: (
  0: 'red',
  1: 'yellow',
  2: 'black',
);

.flag-color-lines {
  height: 100%;

  &.animate {
    height: 4px;
    transition: height #{$animation-duration-in-seconds}s ease-out;
    transition-delay: #{$animation-duration-in-seconds * length($color-list) - 1}s;

    .flag-color-line {
      height: 4px;
    }
  }
}

.flag-color-line {
  position: relative;
  height: 4px;
  width: 100%;
  transition: height #{$animation-duration-in-seconds}s ease-out;

  &.red {
    background-color: red;
    height: 100%;
    z-index: 999;
  }
  &.yellow {
    background-color: yellow;
    height: 100%;
    z-index: 998;
  }
  &.black {
    background-color: black;
    height: 100%;
    z-index: 997;
  }

  @each $property, $value in $color-list {
    &.#{$value} {
      transition-delay: #{$animation-duration-in-seconds * $property}s;
    }
  }
}
</style>
