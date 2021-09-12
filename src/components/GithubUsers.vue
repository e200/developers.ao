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
import http from "../services/http";

import GithubUser from "./GithubUser.vue";

export default {
  data() {
    return {
      page: 0,
      limit: 32,
      users: [],
    };
  },
  components: {
    GithubUser,
  },
  methods: {
    async fetchUsers(page, limit) {
      const result = await http.get(
        `/search/users?q=%20location:Angola+location:luanda&sort=&per_page=${limit}&page=${page}`
      )

      const { data } = result

      this.users = this.users.concat(data.items)
    },
  },
  mounted() {
    this.fetchUsers(0, 30);
  },
}
</script>
