import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/NewRecipe.vue')
    },
    {
      path: '/recipes',
      name: 'recipes',
      component: () => import('../views/AllRecipes.vue')
    },
    {
      path: '/recipes/:id',
      name: 'recipe',
      component: () => import('../views/RecipePage.vue')
    },
    {
      path: '/recipes/:id/edit',
      name: 'editRecipe',
      component: () => import('../views/EditRecipe.vue')
    },
  ]
})

export default router