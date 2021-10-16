<template>
  <span class="filter-tag" :class="classes">
    {{ title }}
  </span>
</template>

<script>
export default {
  props: {
    title: String,
    active: Boolean,
  },
  computed: {
    classes() {
      return {
        'active': this.active
      }
    }
  }
}
</script>

<style lang="scss">
.filter-tag {
  display: inline-block;
  color: white;
  padding: 5px 10px;
  margin-right: 0.5em;
  margin-bottom: 0.5em;
  background: #2f2f2f;
  border-radius: 5px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, .1);

  &.active {
    background: #7b2626;
  }
}
</style>
