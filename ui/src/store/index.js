
import Vue from 'vue'
import Vuex from 'vuex'
import ticket from './modules/ticket'
import unit from './modules/unit'
import predloga from './modules/predloga'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  // strict: process.env.NODE_ENV !== 'production',
  modules: {
    ticket,
    unit,
    predloga
  },
  state: {
    userData: {
      selectedLocationId: '',
      selectedDate: '',
      routeObj: ''
    },
    userAA: {},
    globalComponent: {
      props: {},
      name: null
    },
    lokacije: [],
    elenMeritve: {},
    elenPoraba: [],
    dokumenti: {
      list: [],
      avaliableOptions: [],
      selctedOptions: []
    },
    errorResponse: {},
    message: {},
    notification: {}
  },
  getters,
  actions,
  mutations
})
