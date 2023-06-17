import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NewRecipe from '../views/NewRecipe.vue';
import AllRecipes from '../views/AllRecipes.vue';
import RecipePage from '../views/RecipePage.vue';
import EditRecipe from '../views/EditRecipe.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/new',
      name: 'new',
      component: NewRecipe
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: AllRecipes
    },
    {
      path: '/recipes/:id',
      name: 'recipe',
      component: RecipePage
    },
    {
      path: '/recipes/:id/edit',
      name: 'editRecipe',
      component: EditRecipe
    },
    {
      path: '/notfound',
      name: '404',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NoRecipe.vue')
    },
  ]
})

export default router
