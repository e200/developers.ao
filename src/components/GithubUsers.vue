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

      <transition name="fade" mode="out-in">
        <div v-if="error" class="github-users-error">
          <div class="github-users-error-message">
            Ocorreu um erro ao carregar a lista
          </div>
          <button
            class="github-users-error-retry-button"
            v-if="error"
            @click="$emit('onRetry')"
          >
            Tentar novamente
          </button>
        </div>
        <spinner v-else-if="hasUsers" />
      </transition>
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
    error: { required: true },
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

  &-error {
    margin: 0 auto;
    text-align: center;

    &-message {
      padding: 15px;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 5px;
      margin-bottom: 1em;
    }

    &-retry-button {
      padding: 10px;
      border: none;
      border-radius: 5px;
      background: #db4646;
      color: white;
      font-weight: 500;
    }
  }
}
</style>
