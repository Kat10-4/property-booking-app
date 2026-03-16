import { ROUTE_NAMES } from '../routes'

//componets imports
const PropertyItem = () => import('../../views/PropertyItem.vue')

const propertyChildRoutes = (prop) => [
  {
    path: 'propertyItem/:id',
    name: `${prop}.${ROUTE_NAMES.PROPERTY_ITEM}`,
    component: PropertyItem,
    meta: {
      title: 'Property Details',
      requiresAuth: false,
    },
  },
]

export default propertyChildRoutes
