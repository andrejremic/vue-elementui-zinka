import axios from 'axios'

// initial state
const state = {
  selectedPredloga: {},
  predlogaFakeResponse: {
    success: true,
    item: {
      predloga_id: 10,
      tabela: 'unit',
      json: {
        help: '# Predloga za vnos mikrovalovne zveze. \n',
        json: [{
          id: 'oznaka',
          help: 'Izberi ustrezno oznako: \n  * tr: link (mikrovalovna zveza)',
          type: 'select',
          label: 'oznaka',
          rules: [{
            required: true
          }],
          default: 'tr',
          options: [{
            label: 'tr',
            value: 'tr'
          }]
        }, {
          id: 'proizvajalec',
          help: 'Izberi proizvajalca.',
          type: 'select',
          label: 'proizvajalec',
          rules: [{
            required: true
          }],
          options: [{
            label: 'nera',
            value: 'nera'
          }, {
            label: 'ceragon',
            value: 'ceragon'
          }, {
            label: 'nec',
            value: 'nec'
          }]
        }, {
          id: 'model',
          help: 'Vpiši model naprave (npr. iPASOLINK 400).',
          type: 'input',
          label: 'model',
          rules: [{
            required: true
          }]
        }, {
          id: 'frekvenca',
          help: 'Vpiši model naprave (npr. 4Ghz - 4 giga, 13Ghz - 13 giga).',
          type: 'input',
          label: 'frekvenca',
          rules: [{
            required: false
          }]
        }, {
          el: {
            type: 'textarea',
            maxlength: 200,
            'show-word-limit': true
          },
          id: 'komentar',
          help: 'Napiši nekaj o napravi, kar bi bilo še dobro dodati.',
          type: 'input',
          label: 'komentar',
          rules: [{
            message: 'Napiši nekaj o napravi, kar bi bilo še dobro dodati.',
            trigger: 'blur',
            required: false
          }]
        }, {
          el: {
            type: 'datetime',
            placeholder: 'izberi',
            'value-format': 'yyyy-MM-ddT00:00:00.000+02:00'
          },
          id: 'datum_proizvodnje',
          help: 'Vnesi datum proizvodnje in ne datum montaže!',
          type: 'date-picker',
          label: 'datum proizvodnje',
          rules: [{
            message: 'Izberi datum.',
            trigger: 'change',
            required: false
          }]
        }, {
          id: 'osnovno_napajanje',
          help: 'Potrebna napetost za delovanje.',
          type: 'select',
          label: 'osnovno napajanje',
          rules: [{
            required: true
          }],
          options: [{
            label: 'AC',
            value: 'AC'
          }, {
            label: 'DC-48V',
            value: 'DC-48V'
          }]
        }, {
          id: 'dvojno_napajanje',
          help: 'Opcija za vnos dodatnega napajalnika.',
          type: 'switch',
          label: 'dvojno napajanje'
        }, {
          el: {
            clearable: true
          },
          id: 'dodatno_napajanje',
          help: 'Potrebna napetost za delovanje.',
          type: 'select',
          label: 'dodatno napajanje',
          rules: [{
            required: false
          }],
          options: [{
            label: 'AC',
            value: 'AC'
          }, {
            label: 'DC-48V',
            value: 'DC-48V'
          }],
          enableWhen: {
            'dvojno_napajanje': true
          }
        }, {
          id: 'software_verzija',
          help: 'Če naprava ima ta podatek ga vpiši.',
          type: 'input',
          label: 'software verzija',
          rules: [{
            message: 'Če gre za pametno stikalo ima tudi ta podatek.',
            required: false
          }]
        }, {
          id: 'tovarniska_stevilka',
          help: 'Običajno ima vsaka naprava serijsko številko ali številko produkta.',
          type: 'input',
          label: 'tovarniška številka',
          rules: [{
            message: 'NJ10894920001',
            required: false
          }]
        }, {
          id: 'nadzor',
          help: 'Izberi:\n  * IP - ima naprava svoj web vmesnik.\n  * GPIO - se nadzoruje preko druge napave (npr. Barix) - GPIO.\n  * BREZ NADZORA - ni nadzorovana.',
          type: 'select',
          label: 'nadzor',
          rules: [{
            required: true
          }],
          options: [{
            label: 'IP',
            value: 'IP'
          }, {
            label: 'GPIO',
            value: 'GPIO'
          }, {
            label: 'BREZ NADZORA',
            value: 'BREZ NADZORA'
          }]
        }],
        name: 'Mikrovalovna zveza'
      }
    }
  },
  isLoadingPredloga: false,
  dialog: {
    visible: false,
    predlogaId: null
  }
}

// actions
const actions = {
  getPredloga ({
    state,
    commit
  }, predlogaId) {
    commit('isLoadingPredloga', true)
    if (typeof (predlogaId) === 'number') {
      return new Promise((resolve, reject) => {
        axios.get(__webpack_public_path__ + 'ajax/predloga/' + predlogaId, { // eslint-disable-line no-undef, camelcase
          timeout: 3000
        })
          .then(function (response) {
            if (!response.data.success) {
              commit('updateNotification', {
                title: 'Ni uspelo!',
                message: response.data.error ? ('ID: ' + response.data.predloga_id + ' - ' + response.data.error) : 'Neznana napaka',
                type: 'error'
              }, {
                root: true
              })
              commit('isLoadingPredloga', false)
            } else if (response.data.success) {
              resolve(response.data.item)
              commit('updateSelectedPredloga', response.data.item)
              commit('isLoadingPredloga', false)
            }
          })
          .catch(function (error) {
            console.log(error)
            reject(error)
            commit('updateErrorResponse', error.response, {
              root: true
            })
            commit('isLoadingPredloga', false)
          })
      // // FAKE RESPONSE
      // setTimeout(() => {
      //   resolve(state.predlogaFakeResponse.item)
      //   commit('updateSelectedPredloga', state.predlogaFakeResponse.item)
      // }, 1000)
      })
    }
  }
}

// mutations
const mutations = {
  isLoadingPredloga (state, payload) {
    state.isLoadingPredloga = payload
  },
  updateSelectedPredloga (state, payload) {
    state.selectedPredloga = payload
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
