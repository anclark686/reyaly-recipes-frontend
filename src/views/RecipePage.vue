<template>
  <main class="recipe-page" :class="{ needPadding: active }">
    <div v-if="editSuccess" id="success">
      <p>Record successfully saved!</p>
    </div>
    <div v-if="loading" class="recipe-container">
      <h1 class="loading">Loading...</h1>
    </div>
    <div v-else class="recipe-container">
      <div class="info">
        <h1 class="header">{{ title }}</h1>
        <p class="description">{{ description }}</p>
      </div>
      <div class="list-items">
        <h3 class="subheaders">Ingredients</h3>
        <ul class="ingredient-list">
          <li 
            v-for="(ingredient, i) in ingredients" 
            v-bind:key="ingredient.id"
            :class="i % 2 !== 0 ? 'list-item every-other' : 'list-item'"
          >
            {{ `${ingredient.quantity} of ${ingredient.name}` }}
          </li>
        </ul>
        <h3 class="subheaders">Instructions</h3>
        <ul class="instruction-list">
          <li 
            v-for="(instruction, i) in instructions" 
            v-bind:key="instruction.id"
            :class="i % 2 !== 0 ? 'list-item every-other' : 'list-item'"
          >
            {{ `${instruction.step}: ${instruction.body}` }}
          </li>
        </ul>
      </div>
      <button id="edit-recipe">
        <a :href="'/recipes/' + id + '/edit'" class="recipe-link">
          Edit Recipe
        </a>
      </button>
    </div>
  </main>
</template>

<script>
import Axios from "axios";
import { RouterLink } from "vue-router";
import router from "../router";

export default {
  data() {
    return {
      loading: true,
      active: false,
      title: "",
      description: "",
      ingredients: [],
      instructions: [],
      editSuccess: false,
    };
  },
  computed: {
    id() {
      const url = window.location.href;
      const id = url.split("/").slice(-1)[0];
      return id;
    },
  },
  methods: {
    removeSuccessURL() {
      const url = window.location.href;
      if (url.includes("success")) {
        this.editSuccess = true;
      }
      const newURL = location.href.split("?")[0];
      window.history.pushState("object", document.title, newURL);
    },
    hideSuccess() {
      if (this.editSuccess) {
        setTimeout(() => {
          this.editSuccess = false;
        }, 5000);
      }
    },
    getInfo() {
      Axios.get(`https://reyaly-recipes-backend-8a8ce5084368.herokuapp.com/recipes/${this.id}`)
      .then((res) => {
        this.loading = false;
        this.title = res.data.data.recipe.title;
        this.description = res.data.data.recipe.description;
        this.ingredients = res.data.data.ingredients;
        this.instructions = res.data.data.instructions;
      })
      .catch((error) => {
        console.log(error);
        router.push({ name: "404" });
      });
    },
  },
  mounted() {
    this.removeSuccessURL();
    this.hideSuccess();
    this.getInfo()

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
#success {
  text-align: center;
  font-size: 25px;
  margin-top: 50px;
  color: green;
}

.header, .loading {
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

.ingredient-list,
.instruction-list {
  list-style-type: none;
  text-align: left;
  margin: 0 auto 20px auto;
  padding: 0;
  border: 1px solid #E4E4E4;
  border-radius: 8px;
}

.ingredient-list {
  width: 50%;
}

.instruction-list {
  width: 75%;
}

.every-other {
  background-color: rgb(242, 227, 227);
}

.list-item {
  padding: 10px;
}

#edit-recipe {
  background-color: rgb(129, 12, 10);
  color: white;
  height: 50px;
  width: 125px;
  font-size: larger;
  margin: auto;
  text-align: center;
  border-radius: 5px;
}

#edit-recipe a {
  color: white;
  text-decoration: none;
}
</style>
