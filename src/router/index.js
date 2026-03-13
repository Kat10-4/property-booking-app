import { createRouter, createWebHistory } from 'vue-router'
import PropertyList from '../views/PropertyList.vue'
import { ROUTE_NAMES } from './routes'

const DEFAULT_PAGE_TITLE = 'Property Rentals'

const routes = [
  {
    path: '/',
    name: ROUTE_NAMES.PROPERTY_LIST,
    component: PropertyList,
    meta: {
      title: 'My Properties',
      requiresAuth: false,
    },
  },
  {
    path: '/propertyItem/:id',
    name: ROUTE_NAMES.PROPERTY_ITEM,
    component: () => import('../views/PropertyItem.vue'),
    meta: {
      title: 'Property Details',
      requiresAuth: false,
    },
  },
  {
    path: '/reservation/:id',
    name: ROUTE_NAMES.RESERVATION,
    component: () => import('../views/ReservationForm.vue'),
    meta: {
      title: 'Book Property',
      requiresAuth: false,
    },
  },
  // 404 fallback - если страница не найдена
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../views/NotFound.vue'),
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
