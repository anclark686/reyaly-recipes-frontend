<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h3 name="header">Are you sure?</h3>
          </div>
          <hr />
          <div class="modal-body">
            <p name="body">Are you sure you want to delete</p>
            <p name="body" id="recipe-title">{{ recipeName }}?</p>
          </div>

          <div class="modal-footer">
            <button class="modal-btn" id="cancel" @click="$emit('close')">
              Cancel
            </button>
            <button class="modal-btn" id="delete" @click="$emit('delRecipe')">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    recipeName: String,
  },
  methods: {
    onClickButton(event) {
      this.$emit("clicked", "someValue");
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: rgb(129, 12, 10);
}

.modal-body {
  margin: 20px 0;
  text-align: center;
}

#recipe-title {
  font-style: italic;
  font-weight: bold;
}

.modal-footer {
  text-align: center;
}

.modal-btn {
  color: white;
  width: 100px;
  margin: 20px 10px;
  border-radius: 5px;
}

#cancel {
  background-color: rgb(129, 12, 10);
}

#delete {
  background-color: black;
}

/*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
