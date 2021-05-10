import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store'
import HelloZinka from '@/components/HelloZinka'
import E404 from '@/components/E404'
import TheLogin from '@/components/TheLogin'
import MainHeader from '@/components/MainHeader'
import TheSidebar from '@/components/TheSidebar'
// import LokacijeIzberi from '@/components/LokacijeIzberi'
import LokacijeDomov from '@/components/LokacijeDomov'
import LokacijeEnergija from '@/components/LokacijeEnergija'
import DokumentiDomov from '@/components/DokumentiDomov'
import FormBuilder from '@/components/FormBuilder'
import TicketDomov from '@/components/TicketDomov'
import UnitDomov from '@/components/UnitDomov'

// eslint-disable-next-line no-undef, camelcase
Vue.prototype.$publicPath = __webpack_public_path__ // to make publicPath avalible in in Vue instence to use it in components

Vue.use(Router)

function requireAuth (to, from, next) {
  store.dispatch('getUserAA')
    .then(() => {
      if (!store.state.userAA) {
        console.warn('User is not authenticated!')
        next({
          path: '/prijava',
          query: { redirect: to.fullPath }
        })
      } else {
        // console.info('User: ' + store.state.userAA.name + ' is authenticated!')
        next()
      }
    })
    .catch((error) => {
      console.warn('User is not authenticated!', error)
      // delete user if not logged in
      store.commit('updateUserAA', {})
      next({
        path: '/prijava',
        query: { redirect: to.fullPath }
      })
    })
}

export default new Router({
  base: __webpack_public_path__, // eslint-disable-line no-undef
  mode: 'history', // https://router.vuejs.org/en/essentials/history-mode.html
  routes: [
    {
      path: '/',
      components: { default: HelloZinka },
      beforeEnter: requireAuth
    },
    {
      path: '/prijava',
      components: { default: TheLogin }
    },
    {
      path: '/lokacije',
      components: { header: MainHeader, sidebar: TheSidebar, default: LokacijeDomov },
      icon: 'el-icon- mdi mdi-map-marker',
      title: 'Lokacije'
    },
    {
      path: '/lokacije/:lsig(\\w{4})', // route matches only 4 word characters => (\[RegEx])
      components: { header: MainHeader, sidebar: TheSidebar, default: LokacijeDomov },
      name: 'lokacije',
      children: [
        {
          path: 'elenergija', // enter directly to energija until it is the only one, later: path: 'elenergija',
          component: LokacijeEnergija,
          name: 'elenergija',
          title: 'Energija'
        }
      ],
      beforeEnter: requireAuth
    },
    {
      path: '/dokumenti',
      components: { header: MainHeader, sidebar: TheSidebar, default: DokumentiDomov },
      title: 'Dokumenti',
      icon: 'el-icon- mdi mdi-file-document',
      beforeEnter: requireAuth
    },
    {
      path: '/planiranje',
      components: { header: MainHeader, sidebar: TheSidebar, default: TicketDomov },
      title: 'Planiranje',
      icon: 'el-icon- mdi mdi-timetable',
      beforeEnter: requireAuth
    },
    {
      path: '/szip',
      components: { header: MainHeader, sidebar: TheSidebar, default: UnitDomov },
      title: 'SZIP',
      icon: 'el-icon- mdi mdi-domain',
      beforeEnter: requireAuth
    },
    {
      path: '/obrazci',
      components: { header: MainHeader, sidebar: TheSidebar, default: FormBuilder },
      title: 'Obrazci',
      icon: 'el-icon- mdi mdi-square-edit-outline',
      beforeEnter: requireAuth
    },
    {
      path: '*',
      components: { default: E404 }
    }
  ]
})
