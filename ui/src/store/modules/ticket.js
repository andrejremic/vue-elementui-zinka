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
  map: {
    skupina: {
      1: 'Nagios',
      2: 'Razvoj',
      3: 'PTV'
    }
  },
  selectedTicketData: '',
  isLoadingTicketData: false,
  dialog: {
    visible: false,
    ticketId: null
  }
}

// actions
const actions = {
  getTicketTable ({
    commit
  }, paramObj) {
    commit('isLoading', true)
    axios.post(__webpack_public_path__ + 'fake/ticket', paramObj, { // eslint-disable-line no-undef, camelcase
      timeout: 5000
    })
      .then(function (response) {
        commit('updateTicketTable', response.data)
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
  getTicketData ({
    state,
    commit
  }, ticketId) {
    commit('isLoadingTicketData', true)
    return new Promise((resolve, reject) => {
      axios.get(__webpack_public_path__ + 'fake/ticket/' + ticketId, { // eslint-disable-line no-undef, camelcase
        timeout: 3000
      })
        .then(function (response) {
          if (!response.data.success) {
            commit('updateNotification', {
              title: 'Ni uspelo!',
              message: response.data.error ? ('ID: ' + response.data.item.ticket_id + ' - ' + response.data.error) : 'Neznana napaka',
              type: 'error'
            }, {
              root: true
            })
            commit('isLoadingTicketData', false)
          } else if (response.data.success) {
            resolve(response.data.item)
            commit('updateSelectedTicketData', response.data.item)
            commit('isLoadingTicketData', false)
          }
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
          commit('updateErrorResponse', error.response, {
            root: true
          })
          commit('isLoadingTicketData', false)
        })
    })
  },
  putTicket ({
    getters,
    commit,
    dispatch
  }, payload) {
    return new Promise((resolve, reject) => {
      axios.put(__webpack_public_path__ + 'ajax/ticket', payload, { // eslint-disable-line no-undef, camelcase
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
              message: 'ID: ' + response.data.ticket_id,
              type: 'success'
            }, { root: true })
            resolve(response.data)
            commit('updateCurrentRowKey', response.data.ticket_id)
            dispatch('getTicketTable')
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
  putTicketLog ({
    commit,
    dispatch
  }, payload) {
    return new Promise((resolve, reject) => {
      axios.put(__webpack_public_path__ + 'ajax/ticket_log', payload, { // eslint-disable-line no-undef, camelcase
        timeout: 3000
      })
        .then((response) => {
          if (!response.data.success) {
            commit('updateNotification', {
              title: 'Ni uspelo!',
              message: response.data.error ? ('Napaka: ' + response.data.error) : 'Neznana napaka',
              type: 'error'
            }, {
              root: true
            })
            reject(response.data.error)
          } else if (response.data.success) {
            resolve()
            console.info('ZINKA: Ticket log record saved! ID: ' + response.data.ticket_log_id)
          }
        })
        .catch(function (error) {
          console.log(error)
          reject(error)
          commit('updateErrorResponse', error.response, {
            root: true
          })
          commit('isLoadingTicketData', false)
        })
    })
  },
  deleteTicket ({
    state,
    commit,
    dispatch
  }, payload) {
    commit('isLoading', true)
    commit('deleteTicketFromTable', payload.ticket_id) // First delit from local store, for better UX
    axios.delete(__webpack_public_path__ + 'ajax/ticket/' + payload.ticket_id, { // eslint-disable-line no-undef, camelcase
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
            message: 'Ticket izbrisan! ID: ' + response.data.ticket_id,
            type: 'success'
          }, {
            root: true
          })
          // clear currentRowKey if ticket deleted
          if (state.table.currentRowKey === response.data.ticket_id) {
            commit('updateCurrentRowKey', null)
          }
          dispatch('getTicketTable')
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
  updateTicketTable (state, TicketData) {
    state.table.data = TicketData
  },
  deleteTicketFromTable (state, ticketId) {
    let oldDataList = state.table.data.list
    state.table.data.list = oldDataList.filter(obj => !(obj.ticket_id === ticketId))
  },
  isLoading (state, payload) {
    state.loading = payload
  },
  editTicket (state, payload) {
    state.dialog.visible = payload.visible
    state.dialog.ticketId = payload.ticketId
  },
  isLoadingTicketData (state, payload) {
    state.isLoadingTicketData = payload
  },
  updateCurrentRowData (state, payload) {
    state.table.currentRowData = payload
  },
  updateCurrentRowKey (state, payload) {
    state.table.currentRowKey = payload
  },
  updateSelectedTicketData (state, payload) {
    state.selectedTicketData = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
