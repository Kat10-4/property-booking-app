import { createRouter, createWebHistory } from 'vue-router'
import propertyChildRoutes from './childRoutes/propertyChildRoutes'
import reservationChildRoutes from './childRoutes/reservationChildRoutes'
import MainLayout from '../layouts/MainLayout.vue'
import ReservationLayout from '../layouts/reservationLayout.vue'

const DEFAULT_PAGE_TITLE = 'Property Rentals'

//componets imports
const NotFound = () => import('../views/NotFound.vue')

const routes = [
  {
    path: '/',
    component: MainLayout, // Use layout for all routes
    children: propertyChildRoutes(),
  },
  {
    path: '/reservation/:id',
    component: ReservationLayout,
    children: reservationChildRoutes(),
  },

  // 404 fallback
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound,
    meta: {
      title: 'Page Not Found',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

//global hook for page title changing
router.afterEach((to) => {
  document.title = to.meta?.title || DEFAULT_PAGE_TITLE
})

export default router
