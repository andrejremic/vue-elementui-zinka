import axios from 'axios'

// initial state
const state = {
  loading: false,
  table: {
    drawCount: 0,
    data: undefined,
    currentRowData: undefined,
    currentRowKey: undefined
  },
  selectedUnitData: {},
  isLoadingUnitData: false,
  dialog: {
    visible: false,
    unitId: null
  }
}

// actions
const actions = {
  getUnitTable ({
    commit
  }, paramObj) {
    commit('isLoading', true)
    axios.post(__webpack_public_path__ + 'fake/unit_lokacija', paramObj, { // eslint-disable-line no-undef, camelcase
      timeout: 5000
    })
      .then(function (response) {
        commit('updateUnitTable', response.data)
        commit('isLoading', false)
      })
      .catch(function (error) {
        console.log(error)
        commit('updateErrorResponse', error.response, {
          root: true
        })
        commit('isLoading', false)
      })
  },
  getUnitData ({
    state,
    commit
  }, unitId) {
    commit('isLoadingUnitData', true)
    return new Promise((resolve, reject) => {
      axios.get(__webpack_public_path__ + 'fake/unit_lokacija/' + unitId, { // eslint-disable-line no-undef, camelcase
        timeout: 3000
      })
        .then(function (response) {
          if (!response.data.success) {
            commit('updateNotification', {
              title: 'Ni uspelo!',
              message: response.data.error ? ('ID: ' + response.data.unit_id + ' - ' + response.data.error) : 'Neznana napaka',
              type: 'error'
            }, {
              root: true
            })
            commit('isLoadingUnitData', false)
          } else if (response.data.success) {
            resolve(response.data.item)
            commit('updateSelectedUnitData', response.data.item)
            commit('isLoadingUnitData', false)
          }
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
          commit('updateErrorResponse', error.response, {
            root: true
          })
          commit('isLoadingUnitData', false)
        })
    })
  },
  putUnit ({
    getters,
    commit,
    dispatch
  }, payload) {
    return new Promise((resolve, reject) => {
      axios.put(__webpack_public_path__ + 'ajax/unit', payload, { // eslint-disable-line no-undef, camelcase
        timeout: 3000
      })
        .then((response) => {
          if (!response.data.success) {
            reject(response.data.error)
            commit('updateNotification', {
              title: 'Ni uspelo!',
              message: response.data.error ? ('Napaka: ' + response.data.error) : 'Neznana napaka',
              type: 'error'
            }, {
              root: true
            })
          } else if (response.data.success) {
            commit('updateNotification', {
              title: 'Sprememba shranjena!',
              message: 'ID: ' + response.data.unit_id,
              type: 'success'
            }, {
              root: true
            })
            resolve(response.data)
            commit('updateCurrentRowKey', response.data.unit_id)
          }
        })
        .catch(function (error) {
          console.log(error)
          commit('updateErrorResponse', error.response, {
            root: true
          })
        })
    })
  },
  deleteUnit ({
    state,
    commit,
    dispatch
  }, unitId) {
    commit('isLoading', true)
    commit('deleteUnitFromTable', unitId) // First delit from local store, for better UX
    axios.delete(__webpack_public_path__ + 'ajax/unit/' + unitId, { // eslint-disable-line no-undef, camelcase
      timeout: 3000
    })
      .then((response) => {
        if (!response.data.success) {
          commit('updateNotification', {
            message: 'Brisnje ni uspelo! Napaka: ' + response.data.error,
            type: 'error'
          }, {
            root: true
          })
        } else if (response.data.success) {
          commit('updateNotification', {
            message: 'Unit izbrisan! ID: ' + response.data.unit_id,
            type: 'success'
          }, {
            root: true
          })
          // clear currentRowKey if unit deleted
          commit('updateCurrentRowKey', null)
          commit('editUnit', {
            visible: false,
            unitId: null
          })
          dispatch('getUnitTable')
        }
      })
      .catch(function (error) {
        console.log(error)
        commit('updateErrorResponse', error.response, {
          root: true
        })
        commit('isLoading', false)
      })
  }
}

// mutations
const mutations = {
  updateUnitTable (state, UnitData) {
    state.table.data = UnitData
  },
  deleteUnitFromTable (state, unitId) {
    let oldDataList = state.table.data.list
    state.table.data.list = oldDataList.filter(obj => !(obj.unit_id === unitId))
  },
  isLoading (state, payload) {
    state.loading = payload
  },
  editUnit (state, payload) {
    state.dialog.visible = payload.visible
    state.dialog.unitId = payload.unitId
  },
  isLoadingUnitData (state, payload) {
    state.isLoadingUnitData = payload
  },
  updateCurrentRowData (state, payload) {
    state.table.currentRowData = payload
  },
  updateCurrentRowKey (state, payload) {
    state.table.currentRowKey = payload
  },
  updateSelectedUnitData (state, payload) {
    state.selectedUnitData = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
