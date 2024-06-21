<template>
  <footer class="footer">
    <div class="footer-links">
      <a href="https://www.ancportfolio.link">Portfolio</a>
      <a href="https://github.com/anclark686" target="_blank" rel="noreferrer">
        <img alt="github" src="../assets/github.png" class="social-icon" />
      </a>
      <a
        href="https://www.linkedin.com/in/anclark686/"
        target="_blank"
        rel="noreferrer"
      >
        <img alt="linkedin" src="../assets/linkedin.png" class="social-icon" />
      </a>
    </div>
    <p>Copyright &copy; Reyaly Tech {{ today }}</p>
  </footer>
</template>

<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  data() {
    return {
      today: new Date().getFullYear(),
    };
  },
};
</script>

<style scoped>
.footer {
  background-color: rgb(129, 12, 10);
  padding: 15px;
  color: white;
  text-align: center;
  margin-top: auto;
  justify-self: flex-end;
}

.footer a {
  color: white;
  vertical-align: text-top;
}

.social-icon {
  height: 25px;
  width: 25px;
  margin: auto 5px;
}
</style>
