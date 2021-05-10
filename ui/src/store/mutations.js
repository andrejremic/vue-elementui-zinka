export default {
  updateSelectedLocationId: (state, locationId) => {
    state.userData.selectedLocationId = locationId
  },
  updateSelectedDate: (state, selectateDate) => {
    state.userData.selectedDate = selectateDate
  },
  updateRouteObj: (state, routeObj) => {
    state.userData.routeObj = routeObj
  },
  updateLocationData (state, locationData) {
    if (state.userData.selectedLocationId) {
      locationData.forEach((location, index, obj) => {
        state.lokacije.find(function (element, index) {
          if (element.id_l === location.id_l) {
            Object.assign(element, location)
          }
        })
      })
    } else {
      state.lokacije = locationData
    }
  },
  updateDocData (state, docData) {
    state.dokumenti.list = docData
  },
  updateElenMeritve (state, elenMeritve) {
    state.elenMeritve = elenMeritve
  },
  updateElenPoraba (state, elenPoraba) {
    state.elenPoraba = elenPoraba
  },
  updateDocAvaliableOptions (state, docOptions) {
    state.dokumenti.avaliableOptions = docOptions
  },
  updateDocSelectedOptions (state, docOptions) {
    state.dokumenti.selectedOptions = docOptions
  },
  updateUserAA (state, userAA) {
    state.userAA = userAA
  },
  updateErrorResponse (state, errorResponse) {
    console.info('[Zinka] updateErrorResponse', errorResponse)
    state.errorResponse = errorResponse
  },
  updateMessage (state, messageObject) {
    console.info('[Zinka] updateMessage', messageObject)
    state.message = messageObject
  },
  updateNotification (state, notificationObject) {
    console.info('[Zinka] updateupdateNotification', notificationObject)
    state.notification = notificationObject
  },
  setGlobalComponent (state, payload) {
    state.globalComponent.name = payload.name
    state.globalComponent.props = payload.props
  }
}
