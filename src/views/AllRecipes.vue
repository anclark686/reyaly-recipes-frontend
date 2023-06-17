<template>
  <main class="all-recipes" :class="{ needPadding: active }">
    <h1>All recipes</h1>
    <div class="recipe-container">
      <div v-if="recipes.length !== 0" class="found-recipes">
        <table class="recipe-table">
          <tr>
            <th>Recipe</th>
            <th>Description</th>
          </tr>
          <tr v-for="recipe in recipes" v-bind:key="recipe.id">
            <td>
              <a :href="'/recipes/' + recipe.id" class="recipe-link">
                {{ recipe.title }}
              </a>
            </td>
            <td>{{ recipe.description }}</td>
          </tr>
        </table>
      </div>
      <div v-else class="none-found">
        <h3>Uh oh! No recipes found.</h3>
        <button id="add-new">
          <RouterLink to="/new">Add New Recipe</RouterLink>
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import Axios from "axios";
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      active: false,
      recipes: [],
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

    Axios.get("http://localhost:3000/recipes")
      .then((res) => {
        console.log(res.data)
        this.recipes = res.data.data;
        // console.log(this.recipes);
        for (const recipe of this.recipes) {
          console.log(recipe.title);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped>
.needPadding {
  padding-top: 78px;
}

h1 {
  text-align: center;
  margin: 50px;
}

.recipe-container {
  width: 50%;
  margin: 0px auto 100px auto;
  background-color: white;
  padding: 50px;
  border-radius: 10px;
}

.found-recipes {
  display: flex;
  flex-direction: column;
}

.recipe-table {
  text-align: center;
  border-collapse:collapse;
}

th {
  border-bottom: 2px solid black;
}
.recipe-link {
  color: rgb(129, 12, 10);
}

.none-found {
  text-align: center;
}

#add-new {
  background-color: rgb(129, 12, 10);
  height: 50px;
  width: 175px;
  font-size: larger;
  margin: 50px auto;
  text-align: center;
  border-radius: 5px;
}

#add-new a {
  color: white;
  text-decoration: none;
}
</style>
