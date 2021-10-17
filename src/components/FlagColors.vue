<template>
  <div class="flag-color-line red"></div>
  <div class="flag-color-line yellow"></div>
</template>

<style lang="scss">
@import '../styles/variables.sass';

@keyframes flagLineSlideOut {
  to {
    height: 2px;
  }
}

.app-ready {
  .flag-color-line {
    position: fixed;
    
    &.red {
      top: 0;
    }
    
    &.yellow {
      top: 2px;
    }
  }
}

.flag-color-line {
  position: relative;
  width: 100%;
  height: 100%;
  animation: flagLineSlideOut 1s ease-out;
  animation-fill-mode: forwards;

  &.red {
    background-color: red;
    animation-delay: 1s;
    z-index: 999;
  }

  &.yellow {
    background-color: yellow;
    animation-delay: 2s;
    z-index: 998;
  }
}
</style>
