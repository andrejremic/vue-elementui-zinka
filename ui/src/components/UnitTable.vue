<template>
  <el-table
    v-if="table.data"
    ref="unitTable"
    :data="table.data.list"
    :current-row-key="currentRowKey"
    row-key="unit_id"
    highlight-current-row
    @current-change="updateCurrentRow"
    @cell-dblclick="clickEditUnit">
    <el-table-column
      v-for="(col, index) in columnsProp"
      :key="index"
      :prop="col.prop"
      :label="col.label"
      :width="col.width"
      :width-min="col.widthMin"
      show-overflow-tooltip/>
  </el-table>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import { notEmptyArrayMixin } from '@/mixins/notEmptyArray'

export default {
  name: 'UnitTable',
  components: {
  },
  mixins: [notEmptyArrayMixin],
  data () {
    return {
      // Table
      columnsProp: [
        // { label: 'ID', prop: 'unit_id', width: '40' },
        { label: 'Inventarna št.', prop: 'inventarna', width: '100' },
        { label: 'Oznaka', prop: 'oznaka', width: '100' },
        { label: 'Lokacija', prop: 'lokacija.oznaka', width: '70' },
        { label: 'Prostor', prop: 'prostor', width: '70' },
        { label: 'Omara', prop: 'omara', width: '70' },
        { label: 'Opomba', prop: 'opomba', widthMin: '150' },
        { label: 'Tip', prop: 'tip_id', widthMin: '130' },
        // { label: 'Posodobljeno', prop: 'zgodovina', width: '130' },
        { label: 'Posodobil', prop: 'posodobil_oseba_id', width: '130' },
        { label: 'Ustvarjeno', prop: 'insert_timestamp', width: '130' }
      ]
    }
  },
  computed: {
    ...mapState('unit', {
      loading: state => state.loading,
      table: state => state.table,
      currentRowKey: state => state.table.currentRowKey
    }),
    formDataForAPI () {
      let obj = {
        qstr: this.filter.searchQuerry,
        filter_by: {
          ...this.formDataAPIFind
        },
        table_properties: {
          draw: this.table.drawCount,
          start: 0, // offset
          length: 40 // limit
        }
      }
      return obj
    },
    formDataAPIFind () {
      let obj = {
        table: 'unit'
      }
      return obj
    }
  },
  created () {
    this.getUnitTable()
  },
  methods: {
    ...mapMutations('unit', [
      'editUnit',
      'updateCurrentRowKey',
      'updateCurrentRowData'
    ]),
    ...mapActions('unit', [
      'getUnitTable',
      'getUnitData',
      'deleteUnit'
    ]),
    updateCurrentRow (payload) {
      if (payload) {
        this.updateCurrentRowData(payload)
        this.updateCurrentRowKey(payload.unit_id)
        this.getUnitData(payload.unit_id)
      }
    },
    clickEditUnit (rowData) {
      this.editUnit({ visible: true, unitId: rowData.unit_id })
      this.updateCurrentRowKey(rowData.unit_id)
    },
    changeFilter () {
      this.getUnitTable(this.formDataForAPI)
    }
  }
}
</script>
<style lang="scss" scoped>
.bottom-col {
  height: 36px;
}
.bottom-element {
  position: absolute;
  bottom: 0%;
}
.el-table {
  width: 100%;
  min-width: 402px;
  height:100%;
  overflow-y: scroll;
}
</style>
