<template>
  <el-container direction="horizontal">
    <el-main>
      <el-container direction="vertical">
        <app-header>
          <template slot="header-left">
            <span
              v-loading="loading"
              element-loading-background="rgba(245,245,245,0.7)"
              element-loading-spinner="el-icon-loading"><h2>Enote</h2></span>
            <div class="filter">
              <select-lokacija/>
              <select-lokacija/>
            </div>
          </template>
          <template slot="header-right">
            <h2 class="el-dropdown-link">
              <!-- <i class="el-icon- mdi mdi-plus"/> -->
            </h2>
            <el-button
              type="text"
              class="large"
              icon="el-icon- mdi mdi-plus"
              @click="addUnit"/>
          </template>
        </app-header>
        <unit-table/>
        <unit-edit :key="editUnitId"/>
      </el-container>
    </el-main>
    <!-- <el-aside
      v-if="currentRowKey"
      width="600px"> -->
    <el-aside
      width="50%">
      <!-- <unit-view v-if="!isLoadingUnitData"/> -->
      <unit-view/>
      <!-- <z-loading v-else/> -->
    </el-aside>
  </el-container>
</template>
<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import AppHeader from '@/components/AppHeader'
import UnitTable from '@/components/UnitTable'
import UnitEdit from '@/components/UnitEdit'
import UnitView from '@/components/UnitView'
import SelectLokacija from '@/components/SelectLokacija'

export default {
  name: 'UnitDomov',
  components: {
    AppHeader,
    UnitTable,
    SelectLokacija,
    UnitView,
    UnitEdit
  },
  computed: {
    ...mapState('unit', {
      editUnitId: state => state.dialog.unitId,
      loading: state => state.loading,
      table: state => state.table,
      isLoadingUnitData: state => state.isLoadingUnitData,
      currentRowKey: state => state.table.currentRowKey
    })
    // dataTablesQuerry () {
    //   var q = {
    //     table_properties: {
    //       draw: this.table.drawCount,
    //       start: 0, // offset
    //       length: 40 // limit
    //     },
    //     filter_by: {
    //       tabela: 'unit'
    //     }
    //   }
    //   return q
    // }
  },
  created () {
  },
  methods: {
    ...mapMutations('unit', [
      'editUnit'
    ]),
    ...mapActions('unit', [
      'getUnitTable'
    ]),
    addUnit () {
      this.editUnit({ visible: true, unitId: null })
    }
  }
}
</script>

<style lang="scss">
.el-form-item {
    margin-bottom: 4px !important;
}
.el-form--label-top .el-form-item__label {
    padding: 0 0 2px 0 !important;
}
</style>

<style lang="scss" scoped>
.el-container {
  height: calc(100% - #{$--main-header-height});
  > .el-main {
    height: 100%;;
    > .el-container {
      height: 100%;
      > .unit-table {
      height: calc(100% - #{$--app-header-height});
      }
    }
  }
}
</style>
