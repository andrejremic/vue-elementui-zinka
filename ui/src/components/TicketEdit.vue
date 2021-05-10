<template>
  <div>
    <el-dialog
      :visible="visible"
      :title="dialogTitle"
      @close="closeEditTicket">
      <!-- TODO: validation -->
      <el-form
        ref="formOpravilo"
        :disabled="formSavingLoading"
        :model="formData"
        label-position="left"
        label-width="90px">
        <el-form-item
          label="Naslov"
          prop="naslov"
          required>
          <el-input v-model="formData.naslov"/>
        </el-form-item>
        <el-form-item
          label="Datum"
          prop="termin">
          <el-date-picker
            v-model="formInputTermin"
            type="date"
            value-format="yyyy-MM-ddT00:00:00.000+02:00"
            format="dd. MM. yyyy"
            placeholder="Izberi datum"/>
        </el-form-item>
        <el-form-item
          label="Lokacija"
          prop="lokacija">
          <select-lokacija
            v-model="formData.lokacija"
            :pre-selected="ticketData.lokacija"/>
            <!-- <el-select
            v-model="formInputLokacija"
            :remote-method="remoteMethod"
            :disabled="notEmptyArrayMixin(formData.unit_lokacija, formData.servis_lokacija)"
            remote
            value-key="lokacija_id"
            filterable
            clearable
            no-data-text="Ni podatkov..."
            placeholder="Poišči lokacijo"
            @focus="atFocus('lokacija')">
            <el-option
              v-for="(item) in formSuggestions.lokacija"
              :key="item.lokacija_id"
              :label="item.oznaka"
              :value="item">
              <span style="float: left">{{ item.ime }}</span>
              <span
                v-if="item.oznaka !== item.ime"
                style="float: right; color: #8492a6; font-size: 13px">{{ item.oznaka }}</span>
            </el-option>
          </el-select> -->
        </el-form-item>
        <el-form-item
          label="Enote"
          prop="unit_lokacija">
          <!-- <el-select
            v-model="formData.unit_lokacija"
            :remote-method="remoteMethod"
            :loading="formSuggestionsLoading"
            remote
            value-key="unit_lokacija_id"
            filterable
            multiple
            default-first-option
            no-data-text="Enota ne obstaja"
            placeholder="Poišči enoto"
            @focus="atFocus('unit')">
            <el-option
              v-for="item in formSuggestions.unit"
              :key="item.unit_lokacija_id"
              :label="item.oznaka"
              :value="item"
              :disabled="formSuggestionsLoading"/>
          </el-select> -->
        </el-form-item>
        <el-form-item
          label="Servisi"
          prop="servis_lokacija">
          <!-- <el-select
            v-model="formData.servis_lokacija"
            :remote-method="remoteMethod"
            remote
            value-key="servis_lokacija_id"
            filterable
            multiple
            default-first-option
            no-data-text="Servis ne obstaja"
            placeholder="Poišči servis"
            @focus="atFocus('servis')">
            <el-option
              v-for="item in formSuggestions.servis"
              :key="item.servis_lokacija_id"
              :label="item.ime"
              :value="item"/>
          </el-select> -->
        </el-form-item>
        <el-form-item
          label="Opis"
          prop="opis">
          <el-input
            :autosize="{ minRows: 2, maxRows: 4}"
            v-model="formData.opis"
            type="textarea"
            placeholder="Opišite načrtovana dela"/>
        </el-form-item>
        <!-- EDIT ticket -->
        <template v-if="formData.ticket_id">
          <el-form-item
            v-if="notEmptyArrayMixin(selectedTicketData.sodelujoc)"
            label="Sodelujoči:"
            prop="sodelujoc">
            <ticket-osebe :sodelujoc="selectedTicketData.sodelujoc"/>
          </el-form-item>
        </template>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer">
        <!-- EDIT ticket -->
        <template v-if="formData.ticket_id">
          <el-button @click="closeEditTicket">Prekliči</el-button>
          <el-button
            :disabled="formSavingLoading"
            type="primary"
            @click="addOpravilo('formOpravilo')">Shrani</el-button>
        </template>
        <!-- ADD ticket -->
        <template v-else>
          <el-button
            type="info"
            @click="clearForm('formOpravilo')">Počisti polja</el-button>
          <el-button @click="closeEditTicket">Prekliči</el-button>
          <el-button
            :disabled="formSavingLoading"
            type="primary"
            @click="addOpravilo('formOpravilo')">Dodaj</el-button>
        </template>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import TicketOsebe from '@/components/TicketOsebe'
import SelectLokacija from '@/components/SelectLokacija'
import { notEmptyArrayMixin } from '@/mixins/notEmptyArray'
import { notEmptyObjectMixin } from '@/mixins/notEmptyObject'

export default {
  name: 'TicketEdit',
  components: {
    TicketOsebe,
    SelectLokacija
  },
  mixins: [notEmptyArrayMixin, notEmptyObjectMixin],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
    // ticketId: {
    //   type: Number,
    //   require: false,
    //   default () {
    //     return {}
    //   }
    // },
    // new: {
    //   type: Boolean,
    //   required: true,
    //   default: false
    // }
  },
  data () {
    return {
      formSuggestionsLoading: false,
      formSavingLoading: false,
      formSuggestions: {},
      formFocusElement: '',
      formData: {
        ticket_id: null,
        naslov: '',
        opis: '',
        termin: [null, null],
        izpad_tip_id: null,
        izpad_obdobje: [null, null],
        lokacija: null,
        unit_lokacija: [],
        servis_lokacija: []
      },
      ticketData: {}
    }
  },
  computed: {
    ...mapState('ticket', {
      // visible: state => state.dialog.visible,
      ticketId: state => state.dialog.ticketId,
      selectedTicketData: state => state.selectedTicketData
    }),
    dialogTitle () {
      if (this.formData.ticket_id) {
        return 'Urejanje opravila #' + this.formData.ticket_id
      } else {
        return 'Dodaj opravilo'
      }
    },
    formDataForAPI () {
      // let obj = {
      //   ticket_id: this.formData.ticket_id,
      //   naslov: this.formData.naslov,
      //   opis: this.formData.opis,
      //   termin: this.formData.termin,
      //   izpad_tip_id: this.formData.izpad_tip_id,
      //   izpad_obdobje: this.formData.izpad_obdobje,
      //   tip_id: this.formData.tip_id,
      //   ...this.formDataAPIFind
      // }
      return this.formData
    },
    // formDataAPIFind () {
    //   let obj = {
    //     lokacija_id: this.notEmptyObjectMixin(this.formData.lokacija)
    //       ? this.formData.lokacija.map(obj => obj.lokacija_id)
    //       : [],
    //     unit_lokacija_id: this.formData.unit_lokacija
    //       ? this.formData.unit_lokacija.map(obj => obj.unit_lokacija_id)
    //       : [],
    //     servis_lokacija_id: this.formData.servis_lokacija
    //       ? this.formData.servis_lokacija.map(obj => obj.servis_lokacija_id)
    //       : []
    //   }
    //   return obj
    // },
    // formInputLokacija: {
    //   set (payload) {
    //     this.formData.lokacija = [payload]
    //   },
    //   get () {
    //     return this.notEmptyArrayMixin(this.formData.lokacija)
    //       ? this.formData.lokacija[0]
    //       : {}
    //   }
    // },
    formInputTermin: {
      set (payload) {
        this.formData.termin = [payload]
      },
      get () {
        return (this.formData.termin[0] !== null) ? new Date(this.formData.termin[0]) : '' // el-date-picker requires date object (created with new Date())
      }
    }
  },
  created: function () {
    if (typeof (this.ticketId) === 'number') {
      this.getData()
    }
    this.atFocus('lokacija')
  },
  methods: {
    ...mapMutations([
      'setGlobalComponent'
    ]),
    ...mapMutations('ticket', [
      'editTicket'
    ]),
    ...mapActions('ticket', [
      'putTicket',
      'getTicketData'
    ]),
    getData () {
      this.getTicketData(this.ticketId).then((response) => {
        this.ticketData = response
        this.formData = {
          ticket_id: response.ticket_id,
          naslov: response.naslov,
          opis: response.opis,
          termin: response.termin,
          izpad_tip_id: response.izpad_tip_id,
          izpad_obdobje: response.izpad_obdobje,
          tip_id: response.tip_id
        }
      })
    },
    atFocus (focusElement) {
      this.formFocusElement = focusElement
      // this.remoteMethod()
    },
    handleSelect (item) {
      console.log(item)
    },
    closeEditTicket () {
      // this.editTicket({ visible: false, ticketId: null })
      this.setGlobalComponent({
        name: 'TicketEdit',
        props: {
          visible: false
        }
      })
    },
    addOpravilo (formName) {
      this.formSavingLoading = true
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.putTicket(this.formDataForAPI).then((response) => {
            this.editTicket({ visible: false, ticketId: null })
            this.getTicketData(response.ticket_id)
            this.formSavingLoading = false
          }).catch(() => {
            this.formSavingLoading = false
          })
        } else {
          console.log('error submit: ' + formName)
          return false
        }
      })
    },
    clearForm (formName) {
      this.$refs[formName].resetFields()
    }
    // remoteMethod (querry) {
    //   this.formSuggestionsLoading = true
    //   this.find({
    //     qstr: querry,
    //     search_in: [this.formFocusElement],
    //     filter_by: this.formDataAPIFind
    //   }).then((response) => {
    //     this.formSuggestions = response
    //     this.formSuggestionsLoading = false
    //   }).catch(() => {
    //     this.formSuggestionsLoading = false
    //   })
    // }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
