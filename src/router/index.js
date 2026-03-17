import { createRouter, createWebHistory } from 'vue-router'
import propertyChildRoutes from './childRoutes/propertyChildRoutes'
import { ROUTE_NAMES } from './routes'
import MainLayout from '../layouts/MainLayout.vue'

const DEFAULT_PAGE_TITLE = 'Property Rentals'

//componets imports
const NotFound = () => import('../views/NotFound.vue')
const ReservationForm = () => import('../views/ReservationForm.vue')

const routes = [
  {
    path: '/',
    component: MainLayout, // Use layout for all routes
    children: propertyChildRoutes(),
  },
  {
    path: '/reservation/:id',
    name: ROUTE_NAMES.RESERVATION,
    component: ReservationForm,
    meta: {
      title: 'Book Property',
      requiresAuth: false,
    },
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
