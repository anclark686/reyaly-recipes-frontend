<template>
  <main class="all-recipes" :class="{ needPadding: active }">
    <h1>All recipes</h1>
    <div v-if="loading" class="recipe-container">
      <h1 class="loading">Loading...</h1>
    </div>
    <div v-else class="recipe-container">
      <div v-if="recipes.length !== 0" class="found-recipes">
        <table class="recipe-table">
          <tr id="table-header">
            <th>Recipe</th>
            <th>Description</th>
            <th>Modify</th>
          </tr>
          <tr
            v-for="(recipe, i) in recipes"
            v-bind:key="recipe.id"
            class="recipe-row"
          >
            <td>
              <a :href="'/recipes/' + recipe.id" class="recipe-link">
                {{ recipe.title }}
              </a>
            </td>
            <td>{{ recipe.description }}</td>
            <td class="modify-btns">
              <button class="modify-btn">
                <a
                  :href="'/recipes/' + recipe.id + '/edit'"
                  class="recipe-link"
                >
                  Edit
                </a>
              </button>
              <button
                class="modify-btn"
                id="show-modal"
                @click="preDelete(recipe.id, i, recipe.title)"
              >
                Delete
              </button>
              <!-- @click="deleteRecipe(recipe.id, i)" -->
            </td>
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
    <DeleteModal
      v-if="showModal"
      @close="showModal = false"
      @delRecipe="deleteRecipe"
      :recipeName="deleteInfo.title"
    />
  </main>
</template>

<script>
import Axios from "axios";
import { RouterLink } from "vue-router";
import DeleteModal from "../components/DeleteModal.vue";

export default {
  components: { DeleteModal },
  data() {
    return {
      loading: true,
      active: false,
      showModal: false,
      recipes: [],
      deleteInfo: {},
    };
  },
  methods: {
    preDelete(id, idx, title) {
      this.showModal = true;
      this.deleteInfo = { id: id, idx: idx, title: title };
    },
    deleteRecipe() {
      this.showModal = false;
      this.recipes.splice(this.deleteInfo.idx, 1);

      Axios.delete(
        `https://reyaly-recipes-backend-8a8ce5084368.herokuapp.com/recipes/${this.deleteInfo.id}`
      )
        .then((res) => {
          console.log(res);
        })
        .catch((error) => {
          console.log(error);
        });
      this.deleteInfo = {};
    },
    getinfo() {
      Axios.get(
        "https://reyaly-recipes-backend-8a8ce5084368.herokuapp.com/recipes"
      )
        .then((res) => {
          this.loading = false;
          this.recipes = res.data.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  mounted() {
    window.document.onscroll = () => {
      let navBar = document.getElementById("nav");
      if (window.scrollY <= 200) {
        navBar.classList = "header";
        // this.active = false;
      } else if (window.scrollY > navBar.offsetTop) {
        navBar.classList = "header sticky";
        this.active = true;
      }
    };
    this.getinfo();
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
  border-collapse: collapse;
}

th {
  border-bottom: 2px solid black;
}

tr {
  border-bottom: 1px solid #e4e4e4;
}
.recipe-link {
  color: rgb(129, 12, 10);
}

.modify-btns {
  width: 150px;
}

.modify-btn {
  background-color: rgb(129, 12, 10);
  color: white;
  width: 70px;
  border-radius: 5px;
}

.modify-btn a {
  color: white;
  text-decoration: none;
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

@media only screen and (max-width: 600px) {
  .needPadding {
    padding-top: 0px;
  }

  .recipe-container {
    width: 75%;
    padding: 10px;
  }

  th,
  #table-header {
    display: none;
  }

  .recipe-row {
    display: flex;
    flex-direction: column;
    padding: 5px;
  }

  .modify-btns {
    text-align: center;
    margin: 5px auto;
  }
  .modify-btn {
    text-align: center;
    margin: 2px;
  }
}
</style>
