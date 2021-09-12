<template>
    <flag-colors />
    <div class="container">
      <header class="home-header">
        <img
          class="home-header-logo"
          src="./assets/github.png"
          alt="Github logo"
        />

        <h1 class="home-header-title">Angolanos no Github</h1>
        <h2 class="home-header-subtitle">
          Angolanos que contribuem para projectos Open-Source
        </h2>
        
        We are 1610 developers based in Angola. Get to know us:
      </header>

      <github-users />

      <spinner class="spinner" />

    </div>
  </main>
</template>

<script>
import FlagColors from "./components/FlagColors";
import GithubUsers from "./components/GithubUsers";
export default {
  name: "App",
    FlagColors,
    GithubUsers,
};
</script>

<style lang="scss">
@import "./styles/app.scss";

.home {
  &-header {
    text-align: center;

    &-logo {
      margin-top: 35px;
      max-width: 130px;
    }
    
    &-title {
      color: #1d1d1d;
    }
    
    &-subtitle {
      color: #5e5e5e;
    }
  }
}
</style>
