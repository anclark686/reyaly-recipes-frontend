<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderBar from './components/HeaderBar.vue';
import FooterBar from './components/FooterBar.vue';


</script>

<template>
  <div class="app">
    <HeaderBar />
    <RouterView />
    <FooterBar />
  </div>
  
</template>

<style scoped>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    background-color: #E4E4E4;
  }

</style>
