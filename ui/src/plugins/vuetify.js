import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import sl from 'vuetify/lib/locale/sl'

Vue.use(Vuetify)

export default new Vuetify({
  lang: {
    locales: { sl },
    current: 'sl'
  },
  icons: {
    iconfont: 'mdi'
  }
})
