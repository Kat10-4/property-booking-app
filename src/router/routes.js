export const ROUTE_NAMES = {
  PROPERTY_LIST: 'propertyList',
  PROPERTY_ITEM: 'propertyItem',
  RESERVATION: 'reservation',
}

export const ROUTE_PATHS = {
  PROPERTY_LIST: ['/propertyList', '/properties', '/listings'],
  PROPERTY_ITEM: (id) => ({
    name: `${ROUTE_NAMES.PROPERTY_LIST}.${ROUTE_NAMES.PROPERTY_ITEM}`,
    params: { id },
  }),
  RESERVATION: (id) => `/reservation/${id}`,
}
