import axios from 'axios'
import qs from 'qs'

export default {
  getLokacije ({
    state,
    commit
  }, paramObj) {
    return new Promise((resolve, reject) => {
      axios.get(__webpack_public_path__ + 'ajax/lokacije', { // eslint-disable-line no-undef, camelcase
        params: paramObj,
        timeout: 3000
      })
        .then(function (response) {
          commit('updateLocationData', response.data)
          resolve()
        })
        .catch(function (error) {
          commit('updateErrorResponse', error.response)
          reject(error)
        })
    })
  },
  getElenMeritve ({
    state,
    commit
  }, paramObj) {
    return new Promise((resolve, reject) => {
      axios.get(__webpack_public_path__ + 'ajax/elen/meritve', { // eslint-disable-line no-undef, camelcase
        params: paramObj,
        timeout: 3000
      })
        .then(function (response) {
          commit('updateElenMeritve', response.data)
          resolve(response.data.success)
        })
        .catch(function (error) {
          commit('updateErrorResponse', error.response)
          reject(error)
        })
    })
  },
  getElenPoraba ({
    state,
    commit
  }, paramObj) {
    return new Promise((resolve, reject) => {
      axios.get(__webpack_public_path__ + 'ajax/elen/poraba', { // eslint-disable-line no-undef, camelcase
        params: paramObj,
        timeout: 3000
      })
        .then(function (response) {
          commit('updateElenPoraba', response.data)
          resolve(response.data.success)
        })
        .catch(function (error) {
          commit('updateErrorResponse', error.response)
          reject(error)
        })
    })
  },
  getDoc ({
    state,
    commit
  }, paramObj) {
    return new Promise((resolve, reject) => {
      axios.get(__webpack_public_path__ + 'ajax/dokumenti', { // eslint-disable-line no-undef, camelcase
        params: paramObj,
        timeout: 3000
      })
        .then(function (response) {
          commit('updateDocData', response.data.list)
          resolve()
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  },
  getDocOptions ({
    state,
    commit
  }, paramObj) {
    return new Promise((resolve, reject) => {
      axios.get(__webpack_public_path__ + 'ajax/dokumenti', { // eslint-disable-line no-undef, camelcase
        params: paramObj,
        timeout: 3000
      })
        .then(function (response) {
          commit('updateDocAvaliableOptions', response.data.options)
          resolve()
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  },
  postDocEdit ({
    state,
    commit
  }, paramObj) {
    return new Promise((resolve, reject) => {
      axios.post(__webpack_public_path__ + 'ajax/dokumenti', qs.stringify(paramObj), { // eslint-disable-line no-undef, camelcase
        timeout: 3000
      })
        .then(function (response) {
          resolve(response)
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
        })
    })
  },
  updateSelectedLocationId ({
    commit
  }, locationId) {
    commit('updateSelectedLocationId', locationId)
  },
  updateDocSelectedOptions ({
    commit
  }, selectedOptionsObj) {
    commit('updateDocSelectedOptions', selectedOptionsObj)
  },
  updateRouteObj ({
    commit
  }, routeObj) {
    commit('updateRouteObj', routeObj)
  },
  getUserAA ({
    state,
    commit
  }, paramObj) {
    return new Promise((resolve, reject) => {
      axios.get(__webpack_public_path__ + 'ajax/user', { // eslint-disable-line no-undef, camelcase
        params: paramObj,
        timeout: 3000
      })
        .then(function (response) {
          commit('updateUserAA', response.data)
          resolve(response)
        })
        .catch(function (error) {
          // commit('updateErrorResponse', error.response) // Error Handling is in TheLogin component
          reject(error)
        })
    })
  },
  postUserAA ({
    state,
    commit
  }, paramObj) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef, camelcase
      axios.post(__webpack_public_path__ + 'ajax/login', qs.stringify(paramObj), { // https://github.com/axios/axios#browser
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        timeout: 2000
      })
        .then(function (response) {
          commit('updateUserAA', response.data)
          resolve(response)
        })
        .catch(function (error) {
          commit('updateErrorResponse', error.response)
          reject(error)
        })
    })
  },
  userLogOut ({
    state,
    commit
  }) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef, camelcase
      axios.get('/zinka?logout', { // TODO: '/zinka?logout' - configure API and change
        timeout: 2000
      })
        .then(function (response) {
          commit('updateUserAA', {})
          resolve(response)
        })
        .catch(function (error) {
          commit('updateErrorResponse', error.response)
          reject(error)
        })
    })
  },
  suggest ({ commit }, payload) {
    return new Promise((resolve, reject) => {
      axios.post(
        __webpack_public_path__ + 'fake' + payload.apiUrl, // eslint-disable-line no-undef, camelcase
        payload)
        .then(function (response) {
          resolve(response.data.list)
        })
        .catch(function (error) {
          reject(error)
          commit('updateErrorResponse', error)
        })
    })
  }
}
