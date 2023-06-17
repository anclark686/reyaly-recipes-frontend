<template>
  <main class="recipe-page" :class="{ needPadding: active }">
    <div class="recipe-container">
      <div class="info">
        <h1 class="header">{{ title }}</h1>
        <p class="description">{{ description }}</p>
      </div>
      <div class="list-items">
        <h3 class="subheaders">Ingredients</h3>
        <ul class="list">
          <li v-for="ingredient in ingredients" v-bind:key="ingredient.id">
            {{ `${ingredient.quantity} of ${ingredient.name}` }}
          </li>
        </ul>
        <h3 class="subheaders">Instructions</h3>
        <ul class="list">
          <li v-for="instruction in instructions" v-bind:key="instruction.id">
            {{ `${instruction.step}: ${instruction.body}` }}
          </li>
        </ul>
      </div>
    </div>
  </main>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      active: false,
      title: "",
      description: "",
      ingredients: [],
      instructions: [],
    };
  },
  async mounted() {
    const url = window.location.href;
    const id = url.split("/").slice(-1)[0];
    console.log(id);

    await Axios.get(`http://localhost:3000/recipes/${id}`)
      .then((res) => {
        console.log(res.data);
        this.title = res.data.data.recipe.title;
        this.description = res.data.data.recipe.description;
        this.ingredients = res.data.data.ingredients;
        this.instructions = res.data.data.instructions;
        console.log(res.data.data);
        console.log(this.title);
        console.log(this.description);
      })
      .catch((error) => {
        console.log(error);
      });

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

<style scoped>
.header {
  text-align: center;
}

.description {
  text-align: center;
  margin-bottom: 20px;
}

.recipe-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 50px auto 100px auto;
  background-color: white;
  padding: 50px;
  border-radius: 10px;
}

.subheaders {
  text-align: center;
  margin-bottom: 20px;
}

.list {
  list-style-type: none;
  text-align: left;
  width: 50%;
  margin: 0 auto 20px auto;
}

</style>
