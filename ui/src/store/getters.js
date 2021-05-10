import router from '../router'

export default {
  // if statement are needed to avoid err on console, caused by undefined properties. When we fragment router with modules this is not needed.
  appRouterObj: state => {
    if (state.userData.routeObj) {
      return router.options.routes.find(o => o.path === state.userData.routeObj.matched[0].path)
    }
  },
  appRoutes: () => {
    return router.options.routes.filter(route => route.icon)
  },
  selectedLocationObj: state => {
    if (state.userData.selectedLocationId) {
      return state.lokacije.find(location => location.id_l === state.userData.selectedLocationId)
    }
  },
  findLocationObj: (state) => (lsig) => {
    if (state.lokacije) {
      return state.lokacije.find(location => location.lsig === lsig)
    }
  },
  locationData: state => {
    return state.lokacije
  },
  elenMeritve: state => {
    return state.elenMeritve
  },
  elenPoraba: state => {
    return state.elenPoraba
  },
  userAA: state => {
    return state.userAA
  }
}
