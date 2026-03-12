import { createRouter, createWebHistory } from 'vue-router'
import PropertyList from '../views/PropertyList.vue'
import { ROUTE_NAMES } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE_NAMES.PROPERTY_LIST,
      component: PropertyList,
    },
    {
      path: '/propertyItem/:id',
      name: ROUTE_NAMES.PROPERTY_ITEM,
      component: () => import('../views/PropertyItem.vue'),
    },
    {
      path: '/reservation/propertyId',
      name: ROUTE_NAMES.RESERVATION,
      component: () => import('../views/ReservationForm.vue'),
    },
  ],
})

export default router
