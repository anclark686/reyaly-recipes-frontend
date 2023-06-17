<template>
    <footer class="footer">
        <div class="footer-links">
            <a href="https://www.ancportfolio.link">Portfolio</a>
        </div>
        <p>Copyright &copy; Reyaly Tech 2023</p>
    </footer>
</template>

<script>  
import { RouterLink, RouterView } from 'vue-router'
export default {   
}  
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
        
    }
</style>