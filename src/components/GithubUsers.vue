<template>
  <section class="github-users">
    <div class="row">
      <div
        class="col-6 col-lg-2 col-md-3 col-sm-4"
        v-for="user in users"
        :key="user.login"
      >
        <github-user :user="user" />
      </div>
    </div>
  </section>
</template>

<script>
import GithubUser from "./GithubUser.vue";

export default {
  props: {
    users: {
      required: true,
      type: Object,
    }
  },
  components: {
    GithubUser,
  },
}
</script>
