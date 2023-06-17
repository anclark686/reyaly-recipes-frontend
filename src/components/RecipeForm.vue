<template>
  <div class="new-recipe" :class="{ needPadding: active }">
    <h1 v-if="formType === 'create'">Create a New Recipe</h1>
    <h1 v-else-if="formType === 'update'">Update {{ title }}</h1>
    <div v-if="loading" class="container">
      <h1 class="loading">Loading...</h1>
    </div>
    <form
      action="submit"
      @submit.prevent="onSubmit"
      @keydown.enter.prevent=""
      class="container"
    >
      <div class="recipe-info">
        <div class="input-form">
          <label for="recipe-title" class="recipe-info-label">Title</label>
          <input type="text" id="recipe-title" v-model="title" />
          <div v-if="missingTitle" class="error">
            <p>Title is required!</p>
          </div>
        </div>
        <div class="input-form">
          <label for="recipe-description" class="recipe-info-label"
            >Description</label
          >
          <input type="text" id="recipe-description" v-model="description" />
          <div v-if="missingDescription" class="error">
            <p>Description is required!</p>
          </div>
        </div>
      </div>

      <h3 class="subheaders">Ingredients</h3>
      <div class="ingredients">
        <ul class="ingredient-list">
          <li
            v-for="(ingredient, i) in ingredients"
            v-bind:key="i"
            :class="i % 2 !== 0 ? 'list-item every-other' : 'list-item'"
          >
            <p>{{ `${ingredient.quantity} of ${ingredient.name}` }}</p>
            <button
              class="del-btn"
              @click.prevent="deleteIngredientRow(i)"
              @keyup.enter.prevent=""
            >
              X
            </button>
          </li>
        </ul>
      </div>
      <h4 class="main-labels">Add New Ingredient</h4>
      <div class="inputs">
        <div class="input-form">
          <label for="quantity-input" class="inner-labels">Quantity</label>
          <input id="quantity-input" type="text" v-model="quantity" />
        </div>

        <div class="input-form">
          <label for="ingredient-input" class="inner-labels"
            >Ingredient Name</label
          >
          <input
            id="ingredient-input"
            type="text"
            v-model="name"
            @keyup.enter="onEnterIngredients"
          />
        </div>
      </div>
      <div v-if="missingQuantOrIng" class="error">
        <p>Quantity and ingredient are required!</p>
      </div>
      <div v-if="missingIngredients" class="error">
        <p>Please add at least one ingredient.</p>
      </div>
      <button class="add-btn" @click.prevent="addIngredient">Add New</button>

      <h3 class="subheaders">Instructions</h3>
      <div class="instructions">
        <ul class="instruction-list">
          <li
            v-for="(instruction, i) in instructions"
            v-bind:key="i"
            :class="i % 2 !== 0 ? 'list-item every-other' : 'list-item'"
          >
            <p class="instruction-item">
              {{ `${instruction.step}: ${instruction.body}` }}
            </p>
            <button
              class="del-btn"
              @click.prevent="deleteInstructionRow(i, instruction)"
            >
              X
            </button>
          </li>
        </ul>
      </div>
      <h4 class="main-labels">Add New Instruction</h4>
      <div class="inputs">
        <div class="input-form">
          <label for="step-input" class="inner-labels">Step #</label>
          <input id="step-input" type="number" v-model="step" />
        </div>

        <div class="input-form">
          <label for="instruction-input" class="inner-labels"
            >Instruction</label
          >
          <input
            id="instruction-input"
            type="text"
            v-model="body"
            @keyup.enter="onEnterInstruction"
          />
        </div>
      </div>
      <div v-if="missingStepOrIns" class="error">
        <p>Step and instruction are required!</p>
      </div>
      <div v-if="duplicateStep" class="error">
        <p>Step {{ badStep }} has already been added!</p>
      </div>
      <div v-if="missingInstructions" class="error">
        <p>Please add at least one instruction.</p>
      </div>
      <button class="add-btn" @click.prevent="addInstruction">Add New</button>

      <div class="add-recipe-button">
        <div v-if="formNotReady" class="final-error">
          <p>Please complete required fields</p>
        </div>
        <button v-if="formType === 'create'" id="add-recipe" type="submit">
          Add Recipe
        </button>
        <button
          v-else-if="formType === 'update'"
          id="edit-recipe"
          type="submit"
        >
          Submit Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Axios from "axios";
import router from "../router";

export default {
  props: {
    formType: String,
  },
  data() {
    return {
      loading: true,
      active: false,
      title: "",
      description: "",
      quantity: "",
      name: "",
      step: 1,
      steps: [],
      body: "",
      ingredients: [],
      instructions: [],
      missingTitle: false,
      missingDescription: false,
      missingQuantOrIng: false,
      missingIngredients: false,
      missingStepOrIns: false,
      duplicateStep: false,
      missingInstructions: false,
      badStep: 0,
      formNotReady: false,
    };
  },
  computed: {
    recipe() {
      const recipe = {
        title: this.title,
        description: this.description,
        ingredients: this.ingredients,
        instructions: this.instructions,
      };
      return recipe;
    },
    id() {
      const url = window.location.href;
      const id = url.split("/").slice(-2)[0];
      return id;
    },
  },
  methods: {
    deleteIngredientRow(e) {
      this.ingredients.splice(e, 1);
    },
    deleteInstructionRow(e, ins) {
      const index = this.steps.indexOf(ins.step);
      if (index !== -1) {
        this.steps.splice(index, 1);
        this.step = ins.step;
      }
      this.instructions.splice(e, 1);
    },
    addIngredient(e) {
      if (!this.quantity || !this.name) {
        this.missingQuantOrIng = true;
      } else {
        this.missingIngredients = false;
        this.missingQuantOrIng = false;
        this.ingredients.push({
          quantity: this.quantity,
          name: this.name,
        });
        this.quantity = "";
        this.name = "";
      }
    },
    addInstruction(e) {
      if (!this.step || !this.body) {
        this.missingStepOrIns = true;
      } else if (this.steps.includes(this.step)) {
        this.duplicateStep = true;
        this.badStep = this.step;
      } else {
        this.badStep = 0;
        this.duplicateStep = false;
        this.missingInstructions = false;
        this.missingStepOrIns = false;
        this.instructions.push({
          step: this.step,
          body: this.body,
        });
        this.steps.push(this.step);
        this.steps.sort((a, b) => {
          return a - b;
        });
        this.step = this.steps.at(-1) + 1;
        this.body = "";
        this.instructions.sort((a, b) => {
          return a.step - b.step;
        });
      }
    },
    onEnterIngredients() {
      this.addIngredient();
    },
    onEnterInstruction() {
      this.addInstruction();
    },
    validateFields() {
      if (!this.title) {
        this.missingTitle = true;
      }
      if (!this.description) {
        this.missingDescription = true;
      }
      if (this.ingredients.length === 0) {
        this.missingIngredients = true;
      }
      if (this.instructions.length === 0) {
        this.missingInstructions = true;
      }
    },
    Add() {
      if (
        this.title &&
        this.description &&
        this.ingredients.length >= 1 &&
        this.instructions.length >= 1
      ) {
        this.formNotReady = false;
        Axios.post("http://localhost:3000/recipes", this.recipe)
          .then((res) => {
            router.push({ name: "recipe", params: { id: res.data.id } });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.formNotReady = true;
        this.validateFields();
      }
    },
    Edit() {
      if (
        this.title &&
        this.description &&
        this.ingredients.length >= 1 &&
        this.instructions.length >= 1
      ) {
        this.formNotReady = false;
        this.recipe.id = this.id;

        Axios.put(`http://localhost:3000/recipes/${this.id}`, this.recipe)
          .then((res) => {
            router.push({
              name: "recipe",
              params: { id: res.data.id },
              query: { success: true },
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        this.formNotReady = true;
        this.validateFields();
      }
    },
    onSubmit() {
      if (this.formType === "create") {
        this.Add();
      } else if (this.formType === "update") {
        this.Edit();
      }
    },
    getinfo() {
      Axios.get(`http://localhost:3000/recipes/${this.id}`)
        .then((res) => {
          this.loading = false;
          this.title = res.data.data.recipe.title;
          this.description = res.data.data.recipe.description;
          this.ingredients = res.data.data.ingredients;
          this.instructions = res.data.data.instructions;
          this.instructions.sort((a, b) => {
            return a.step - b.step;
          });
          for (const i of this.instructions) {
            this.steps.push(i.step);
          }
          this.step = this.steps.at(-1) + 1;
        })
        .catch((error) => {
          console.log(error);
          router.push({ name: "404" });
        });
    },
  },

  mounted() {
    if (this.formType === "update") {
      this.getinfo()
    } else {
      this.loading = false;
    }
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
.needPadding {
  padding-top: 78px;
}

h1 {
  text-align: center;
  margin: 50px;
}

.container {
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: 0px auto 100px auto;
  background-color: white;
  padding: 50px;
  border-radius: 10px;
}

.recipe-info {
  width: 50%;
  margin: 0 auto 30px auto;
}

#recipe-title,
#recipe-description {
  border: 2px solid black;
  border-radius: 5px;
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
}

.instruction-item {
  padding: 5px
}

.del-btn {
  background-color: black;
  color: white;
  border-radius: 5px;
  max-height: 1.5rem;
  align-self: center;
}

.main-labels {
  text-align: center;
  margin-bottom: 20px;
}

.inputs {
  text-align: center;
  display: flex;
  justify-content: center;
}

.input-form {
  display: flex;
  flex-direction: column;
}

#quantity-input {
  width: 100px;
  margin: 0px 10px;
  text-align: center;
  border: 2px solid black;
  border-radius: 5px;
}

#ingredient-input {
  width: 200px;
  margin: 0px 10px;
  text-align: center;
  border: 2px solid black;
  border-radius: 5px;
}

#step-input {
  width: 50px;
  margin: 0px 10px;
  text-align: center;
  border: 2px solid black;
  border-radius: 5px;
}

#instruction-input {
  width: 500px;
  margin: 0px 10px;
  border: 2px solid black;
  border-radius: 5px;
}

.add-btn {
  background-color: rgb(129, 12, 10);
  color: white;
  width: 100px;
  margin: 20px auto;
  border-radius: 5px;
}

.add-recipe-button {
  margin: 50px auto;
}

#add-recipe,
#edit-recipe {
  background-color: rgb(129, 12, 10);
  color: white;
  height: 50px;
  font-size: larger;
  margin: auto;
  text-align: center;
  border-radius: 5px;
}

#add-recipe {
  width: 125px;
}

#edit-recipe {
  width: 200px;
}

.error,
.final-error {
  background-color: rgb(247, 216, 222);
  color: rgb(129, 12, 10);
  margin: 10px auto;
}

.error {
  width: 60%;
}
</style>
