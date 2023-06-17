<template>
  <header>
    <div class="pic-header"></div>
    <div id="nav" class="header">
      <h1 class="brand">Reyaly Recipes</h1>
      <div class="header-links">
        <RouterLink to="/">Home</RouterLink>
        <span class="divider"> | </span>
        <RouterLink to="/recipes">All Recipes</RouterLink>
        <span class="divider"> | </span>
        <RouterLink to="/new">New Recipe</RouterLink>
      </div>
    </div>
  </header>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  data() {
    return {
      active: false,
    };
  },
};
</script>

<style scoped>
.pic-header {
  min-height: 200px;
  background-image: url("../assets/food_background.jpg");
  background-size: contain;
}
.header {
  background-color: rgb(129, 12, 10);
  padding: 15px;
  color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.header a {
  color: white;
}

.sticky {
  position: fixed;
  top: 0;
  width: 98.1%;
  margin-bottom: 100px;
}

@media only screen and (max-width: 600px) {
  .header {
    justify-content: space-around;
  }
  .sticky {
    position: relative;
    padding: 15px;
    margin-bottom: 0px;
    width: 93.4%;
  }
}
.header-links {
  display: flex;
  flex-direction: column;
  text-align: right;
}

.divider {
  display: none;
}
</style>
