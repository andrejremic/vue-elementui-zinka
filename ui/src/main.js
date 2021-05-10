import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import './plugins/element.js'

import { resMixin } from '@/mixins/returnEmptyString.js'

import * as VueSVGIcon from 'vue-svgicon'
import ZLoading from './components/ZLoading'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(VueSVGIcon)

// Global Zinka .VUE components:
Vue.component('z-loading', ZLoading)

// MIXINS
Vue.mixin(resMixin)

Vue.config.productionTip = false

Vue.prototype.isMatch = function (string1, string2) {
  if (string1 && string2) {
    return string1.toLowerCase().indexOf(string2.toLowerCase()) > -1 // How many caracters maches the query? => -1 means no chracter maches
  } else {
    return false
  }
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
