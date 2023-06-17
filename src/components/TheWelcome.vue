<script>
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      active: false,
    };
  },
  mounted() {
    window.document.onscroll = () => {
      let navBar = document.getElementById("nav");
      if (window.scrollY <= 200) {
        navBar.classList = "header";
        this.active = false;
      } else if (window.scrollY > navBar.offsetTop) {
        navBar.classList = "header sticky";
        this.active = true;
      }
    };
  },
};
</script>

<template>
  <main class="welcome" :class="{ needPadding: active }">
    <h1 class="main-header">Reyaly Recipes</h1>
    <div class="container">
      <h3>Select one of the following options to get started!</h3>
      <div class="nav-btns">
        <button class="nav-btn">
          <RouterLink to="/recipes">View All Recipes</RouterLink>
        </button>
        <button class="nav-btn">
          <RouterLink to="/new">Add New Recipe</RouterLink>
        </button>
      </div>
    </div>
  </main>
</template>

<style>
.needPadding {
  padding-top: 78px;
}

.main-header {
  width: 400px;
  text-align: center;
  margin: 50px auto;
}

.container {
  width: 50%;
  margin: 50px auto 100px auto;
  background-color: white;
  padding: 50px;
  border-radius: 10px;
  text-align: center;
}

.nav-btn {
  background-color: rgb(129, 12, 10);
  height: 50px;
  width: 200px;
  font-size: larger;
  margin: 50px 20px;
  text-align: center;
  border-radius: 5px;
}

.nav-btn a {
  color: white;
  text-decoration: none;
}

@media only screen and (max-width: 600px) {
  .needPadding {
    padding-top: 0px;
  }
  .nav-btn {
    margin: 20px auto 0px auto;
  }
}
</style>
