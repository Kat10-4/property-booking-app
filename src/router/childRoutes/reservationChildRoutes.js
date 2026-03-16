const reservationChildRoutes = () => [
  {
    path: '/reservation/:id',
    name: '',
    component: () => import('../../views/ReservationForm.vue'),
    meta: {
      title: 'Book Property',
      requiresAuth: false,
    },
  },
]

export default reservationChildRoutes
