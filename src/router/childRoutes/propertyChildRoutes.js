import { ROUTE_NAMES, ROUTE_PATHS } from '../routes'

//componets imports
const PropertyList = () => import('../../views/PropertyList.vue')
const PropertyItem = () => import('../../views/PropertyItem.vue')

const propertyChildRoutes = () => [
  {
    path: '/',
    name: ROUTE_NAMES.PROPERTY_LIST,
    component: PropertyList,
    alias: ROUTE_PATHS.PROPERTY_LIST,
    meta: {
      title: 'My Properties',
      requiresAuth: false,
    },
  },
  {
    path: 'propertyItem/:id',
    name: ROUTE_NAMES.PROPERTY_ITEM,
    component: PropertyItem,
    meta: {
      title: 'Property Details',
      requiresAuth: false,
    },
  },
]

export default propertyChildRoutes
