<template>
  <section class="github-users">
    <div class="row">
      <template v-if="users.length > 0">
        <div
          class="col-6 col-lg-2 col-md-3 col-sm-4"
          v-for="user in users"
          :key="user.login"
        >
          <github-user :user="user" />
        </div>
      </template>

      <!--<p class="github-users-no-results" v-else>Sem resultados...</p>-->

      <spinner v-if="hasUsers" class="spinner" />
    </div>
  </section>
</template>

<script>
import GithubUser from './GithubUser.vue'
import Spinner from './Spinner'

export default {
  props: {
    hasUsers: {
      required: true,
      type: Boolean,
    },
    users: {
      required: true,
      type: Object,
    },
  },
  components: {
    GithubUser,
    Spinner,
  },
}
</script>

<style lang="scss">
.github-users {
  &-no-results {
    color: grey;
    text-align: center;
    margin: 0 auto;
  }
}
</style>
