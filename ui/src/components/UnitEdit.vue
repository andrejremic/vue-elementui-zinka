<template>
  <div>
    <el-dialog
      :visible="visible"
      :title="dialogTitle"
      :close-on-click-modal="false"
      top="5vh"
      @close="closeEditUnit">
      <template v-show="!isLoadingUnitData">
        <el-form
          ref="formUnit"
          :disabled="formSavingLoading"
          :model="formUnitData"
          label-position="left"
          label-width="140px">
          <el-form-item
            label="Inventarna št."
            prop="inventarna">
            <el-input-number
              v-model="formUnitData.inventarna"/>
          </el-form-item>
          <el-form-item
            label="Datum nakupa"
            prop="nakup">
            <el-date-picker
              v-model="formUnitData.nakup"
              type="date"
              value-format="yyyy-MM-ddT00:00:00.000+02:00"
              format="dd. MM. yyyy"
              placeholder="Izberi datum"/>
          </el-form-item>
          <el-form-item
            label="Lokacija"
            prop="lokacija">
            <el-select
              v-model="formUnitData.lokacija"
              :remote-method="remoteMethod"
              remote
              value-key="lokacija_id"
              filterable
              clearable
              no-data-text="Ni podatkov..."
              placeholder="Poišči lokacijo"
              @focus="atFocus('lokacija')">
              <el-option
                v-for="(item, index) in formSuggestions.lokacija"
                :key="index"
                :label="item.oznaka"
                :value="item">
                <span style="float: left">{{ item.ime }}</span>
                <span
                  v-if="item.oznaka !== item.ime"
                  style="float: right; color: #8492a6; font-size: 13px">{{ item.oznaka }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Opomba"
            prop="opomba">
            <el-input
              :autosize="{ minRows: 2, maxRows: 4}"
              v-model="formUnitData.opomba"
              type="textarea"
              placeholder="Opišite načrtovana dela"/>
          </el-form-item>
          <el-form-item
            label="Tip enote"
            prop="predloga">
            <el-select
              v-model="formUnitData.predloga"
              :remote-method="remoteMethod"
              remote
              filterable
              clearable
              no-data-text="Ni podatkov..."
              placeholder="Izberi tip naprave..."
              @focus="atFocus('predloga')"
              @change="changePredloga">
              <el-option
                v-for="item in formSuggestions.predloga"
                :key="item.predloga_id"
                :label="item.json.name"
                :value="item.predloga_id"/>
            </el-select>
          </el-form-item>
        </el-form>
        <el-form-renderer
          v-show="notEmptyObjectMixin(selectedPredloga)"
          ref="formUnitRender"
          :content="selectedPredlogaForRender"
          :key="selectedPredloga.predloga_id"
          :disabled="formSavingLoading"
          label-position="left"
          label-width="140px"/>
        <z-loading v-show="!notEmptyObjectMixin(selectedPredloga)&&!isNewUnit"/>
        <span
          slot="footer"
          class="dialog-footer">
          <!-- EDIT unit -->
          <template v-if="!isNewUnit">
            <el-button
              type="danger"
              icon="el-icon-delete"
              title="izbriši"
              @click.once.stop="deleteUnit(unitId)">
              Izbriši enoto
            </el-button>
            <el-button @click="closeEditUnit">Prekliči</el-button>
            <el-button
              :disabled="formSavingLoading"
              type="primary"
              @click="addUnit('formUnit')">Shrani</el-button>
          </template>
          <!-- ADD unit -->
          <template v-else>
            <el-button
              type="info"
              @click="clearForm('formUnit')">Počisti polja</el-button>
            <el-button @click="closeEditUnit">Prekliči</el-button>
            <el-button
              :disabled="formSavingLoading"
              type="primary"
              @click="addUnit('formUnit')">Dodaj</el-button>
          </template>
        </span>
      </template>
      <z-loading v-show="isLoadingUnitData"/>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import { notEmptyArrayMixin } from '@/mixins/notEmptyArray'
import { notEmptyObjectMixin } from '@/mixins/notEmptyObject'
import ElFormRenderer from '@femessage/el-form-renderer'

export default {
  name: 'UnitEdit',
  components: {
    ElFormRenderer
  },
  mixins: [notEmptyArrayMixin, notEmptyObjectMixin],
  data () {
    return {
      formSavingLoading: false,
      formSuggestions: {},
      formSuggestionsLoading: false,
      formFocusElement: '',
      formUnitData: {
        predloga_id: null,
        unit_id: null,
        nad_unit_id: null,
        posodobil_oseba_id: 1,
        organizacija_id: null,
        tip_id: 1,
        nakup: null,
        garancija: null,
        inventarna: null,
        opomba: null,
        zgodovina: '',
        oznaka: '',
        omara: '',
        prostor: '',
        lokacija: {
          lokacija_id: null,
          oznaka: '',
          ime: null
        },
        detail: {}
      }
    }
  },
  computed: {
    ...mapState('unit', {
      visible: state => state.dialog.visible,
      unitId: state => state.dialog.unitId,
      selectedUnitData: state => state.selectedUnitData,
      isLoadingUnitData: state => state.isLoadingUnitData
    }),
    ...mapState('predloga', {
      selectedPredloga: state => state.selectedPredloga,
      isLoadingPredloga: state => state.isLoadingPredloga
    }),
    isNewUnit () {
      if (typeof (this.unitId) === 'number') {
        return false
      } else {
        return true
      }
    },
    selectedPredlogaForRender () {
      if (this.notEmptyObjectMixin(this.selectedPredloga.json)) {
        if (this.notEmptyArrayMixin(this.selectedPredloga.json.json)) {
          return this.selectedPredloga.json.json
        } else {
          console.info('[Zinka] Propety "json" in predloga ID:' + this.selectedPredloga.predloga_id + ' expected to be Array. Got: ', this.selectedPredloga.json.json)
        }
      }
      return []
    },
    dialogTitle () {
      if (this.isNewUnit) {
        return 'Dodaj enoto'
      } else {
        return 'Urejanje enote #' + this.res(this.formUnitData.unit_id)
      }
    },
    formDataForAPI () {
      let obj = {
        predloga_id: this.formUnitData.predloga_id,
        unit_id: this.formUnitData.unit_id,
        nad_unit_id: this.formUnitData.nad_unit_id,
        posodobil_oseba_id: this.formUnitData.posodobil_oseba_id,
        organizacija_id: this.formUnitData.organizacija_id,
        tip_id: this.formUnitData.tip_id,
        nakup: this.formUnitData.nakup,
        garancija: this.formUnitData.garancija,
        inventarna: this.formUnitData.inventarna,
        opomba: this.formUnitData.opomba,
        zgodovina: this.formUnitData.zgodovina,
        oznaka: this.formUnitData.oznaka,
        omara: this.formUnitData.omara,
        prostor: this.formUnitData.prostor,
        detail: this.formUnitData.detail,
        ...this.formDataAPIFind
      }
      return obj
    },
    formDataAPIFind () {
      let obj = {
        lokacija_id: this.formUnitData.lokacija.lokacija_id,
        tabela: 'unit'
      }
      return obj
    }
  },
  created: function () {
    if (!this.isNewUnit) {
      this.getUnitData(this.unitId).then((response) => {
        this.formUnitData = response
        this.formSuggestions = {
          lokacija: [response.lokacija]
        }
        this.getPredloga(response.predloga_id).then(() => {
          this.updateValueForm()
        })
      })
    }
  },
  methods: {
    ...mapMutations('unit', [
      'editUnit',
      'updateCurrentRowKey'
    ]),
    ...mapMutations('predloga', [
      'updateSelectedPredloga'
    ]),
    ...mapActions('unit', [
      'putUnit',
      'getUnitData',
      'deleteUnit',
      'getUnitTable'
    ]),
    ...mapActions('predloga', [
      'getPredloga'
    ]),
    ...mapActions([
      'find'
    ]),
    atFocus (focusElement) {
      this.formFocusElement = focusElement
      this.remoteMethod()
    },
    closeEditUnit () {
      this.editUnit({ visible: false, unitId: null })
      this.clearForm()
      this.updateSelectedPredloga({})
    },
    addUnit (formName) {
      this.getFormValue()
      this.$refs['formUnit'].validate((valid1) => {
        this.$refs['formUnitRender'].validate((valid2) => {
          if (valid1 && valid2) {
            this.formSavingLoading = true
            this.putUnit(this.formDataForAPI).then((response) => {
              this.editUnit({ visible: false, unitId: null })
              this.getUnitData(response.unit_id)
              this.updateCurrentRowKey(response.unit_id)
              this.getUnitTable() // add filter data to store and add it to payload to preserve filter
              this.formSavingLoading = false
            }).catch(() => {
              this.formSavingLoading = false
            })
          } else {
            console.log('error submit: ' + formName)
            this.formSavingLoading = false
            return false
          }
        })
      })
    },
    clearForm () {
      this.$refs['formUnit'].resetFields()
      this.$refs['formUnitRender'].resetFields()
    },
    remoteMethod (querry) {
      this.formSuggestionsLoading = true
      this.find({
        qstr: querry,
        search_in: [this.formFocusElement],
        filter_by: this.formDataAPIFind
      }).then((response) => {
        this.formSuggestions = response
        this.formSuggestionsLoading = false
      }).catch(() => {
        this.formSuggestionsLoading = false
      })
    },
    changePredloga (currentPredlogaValue) {
      this.updateSelectedPredloga({})
      this.getPredloga(currentPredlogaValue)
    },
    // Rendered form
    updateValueForm () {
      this.$refs['formUnitRender'].updateForm(this.formUnitData.detail)
    },
    getFormValue () {
      this.formUnitData.detail = this.$refs['formUnitRender'].getFormValue()
    }
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
