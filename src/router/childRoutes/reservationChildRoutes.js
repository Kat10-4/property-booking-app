import { ROUTE_NAMES } from '../routes'

//componets imports
const ReservationForm = () => import('../../views/ReservationForm.vue')

const reservationChildRoutes = () => [
  {
    path: '/reservation/:id',
    name: ROUTE_NAMES.RESERVATION,
    component: ReservationForm,
    meta: {
      title: 'Book Property',
      requiresAuth: false,
    },
  },
]

export default reservationChildRoutes
