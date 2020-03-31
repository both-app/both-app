export const getCurrentRouteName = (route: any) => {
  return route.state
    ? route.state.routes[route.state.index].name
    : route.params?.screen || ''
}
