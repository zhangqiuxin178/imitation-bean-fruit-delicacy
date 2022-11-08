import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ClassroomView from '../views/ClassroomView.vue'
import ShoppingView from '../views/ShoppingView.vue'
import FavoritesView from '../views/FavoritesView.vue'
import MineView from '../views/MineView.vue'
import RecipeSelection from '../views/RecipeSelection.vue'
import SearchView from '../views/SearchView.vue'
import MenuView from '../views/MenuView.vue'
import NoteDetails from '../views/NoteDetails.vue'
import CookbookList from '../views/CookbookList.vue'
import MotherView from '../views/MotherView.vue'
// import MyView from '../views/MyView.vue'
// import loginView from '../views/loginView.vue'

Vue.use(VueRouter)



const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { showNav: true }
  },
  {
    path: '/class',
    name: 'class',
    component: ClassroomView,
    meta: { showNav: true }
  },
  {
    path: '/shopping',
    name: 'shopping',
    component: ShoppingView,
    meta: { showNav: true }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView,
    meta: { showNav: true }
  },
  {
    path: '/mine',
    name: 'mine',
    component: MineView,
    meta: { showNav: true }
  },
  // {
  //   path: '/my',
  //   name: 'my',
  //   component: MyView,
  //   meta: { showNav: true }
  // },

  {
    path: '/recipe',
    name: 'recipe',
    component: RecipeSelection
  },
  {
    path: '/search',
    name: 'search',
    component: SearchView
  },
  {
    path: '/menu',
    name: 'menu',
    component: MenuView
  },
  {
    path: '/note',
    name: 'note',
    component: NoteDetails
  },
  {
    path: '/cookbook',
    name: 'cookbook',
    component: CookbookList
  },
  {
    path: '/mother',
    name: 'mother',
    component: MotherView
  }

]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
