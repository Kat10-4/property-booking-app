import { createRouter, createWebHistory } from 'vue-router'
import PropertyList from '../views/PropertyList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'propertyList',
      component: PropertyList,
    },
    {
      path: '/propertyItem/:id',
      name: 'propertyItem',
      component: () => import('../views/PropertyItem.vue'),
    },
    {
      path: '/reservation/propertyId',
      name: 'reservation',
      component: () => import('../views/ReservationForm.vue'),
    },
  ],
})

export default router
