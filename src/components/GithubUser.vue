<template>
  <a class="github-user-link" :href="`https://github.com/${user.login}`" target="_blank">
    <div class="github-user">
      <div class="github-user-picture-wrapper">
        <img
          class="github-user-picture"
          :src="user.avatar_url"
          :alt="user.login"
        />
      </div>

      <h3 class="github-user-name">@{{ user.login }}</h3>
    </div>
  </a>
</template>

<script>
export default {
  props: {
    user: {
      required: true,
    },
  },
};
</script>


<style lang="scss">
$absolute-position: -8px;

@keyframes github-user-border-animation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.github-user {
  display: flex;
  cursor: pointer;
  flex-direction: column;
  text-align: center;
  margin-bottom: 3em;
  
  &-link {
    text-decoration: none;
    color: inherit;
  }

  &-picture {
    max-width: 150px;
    border-radius: 100%;
    box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.1);

    &-wrapper {
      position: relative;
      display: flex;
      cursor: pointer;
      max-width: 150px;
      margin: 0 auto;

      &::before {
        position: absolute;
        content: "";
        top: $absolute-position - $absolute-position;
        left: $absolute-position - $absolute-position;
        bottom: $absolute-position - $absolute-position;
        right: $absolute-position - $absolute-position;
        border-radius: 100%;
        border-width: 0;
        border-style: solid;
        border-top-color: red;
        border-left-color: yellow;
        border-right-color: yellow;
        border-bottom-color: black;
        transition: 0.15s linear;
        animation: github-user-border-animation 3s ease-in-out infinite;
      }
    }
  }

  &:hover &-picture-wrapper::before {
    border-width: 4px;
    top: $absolute-position;
    left: $absolute-position;
    bottom: $absolute-position;
    right: $absolute-position;
  }

  &-name {
    font-size: 1em;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
