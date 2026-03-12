export const ROUTE_NAMES = {
  PROPERTY_LIST: 'propertyList',
  PROPERTY_ITEM: 'propertyItem',
  RESERVATION: 'reservation',
}

export const ROUTE_PATHS = {
  PROPERTY_LIST: '/',
  PROPERTY_ITEM: (id) => `/propertyItem/${id}`,
  RESERVATION: (id) => `/reservation/${id}`,
}
