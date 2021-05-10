<template>
  <el-aside
    width="50%">
    <app-header>
      <template slot="header-left">
        <div>
          <small>opravilo / #7382</small>
          <h2>Menjava stikala

          </h2>
        </div>
        <el-dropdown
          placement="top-start"
          trigger="click">
          <el-button
            type="text"
            class="xx-large el-dropdown-link"
            icon="el-icon- mdi mdi-dots-horizontal"
            @click="addUnit"/>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>Uredi</el-dropdown-item>
            <el-dropdown-item>Dodaj sodelujočega</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </template>
    </app-header>
    <el-tabs
      v-model="activeTabName"
      @tab-click="handleClick">
      <el-tab-pane
        label="Komunikacija"
        name="first">
        <ticket-log/>
      </el-tab-pane>
      <el-tab-pane
        label="Enote"
        name="second">
        <unit-table/>
      </el-tab-pane>
      <el-tab-pane
        label="Servis"
        name="third">Servis</el-tab-pane>
    </el-tabs>
    <!-- <table>
      <tr>
        <td>predloga_id</td>
        <td>{{ res(selectedUnitData.predloga_id) }}</td>
      </tr>
      <tr>
        <td>unit_id</td>
        <td>{{ res(selectedUnitData.unit_id) }}</td>
      </tr>
      <tr>
        <td>nad_unit_id</td>
        <td>{{ res(selectedUnitData.nad_unit_id) }}</td>
      </tr>
      <tr>
        <td>posodobil_oseba_id</td>
        <td>{{ res(selectedUnitData.posodobil_oseba_id) }}</td>
      </tr>
      <tr>
        <td>organizacija_id</td>
        <td>{{ res(selectedUnitData.organizacija_id) }}</td>
      </tr>
      <tr>
        <td>tip_id</td>
        <td>{{ res(selectedUnitData.tip_id) }}</td>
      </tr>
      <tr>
        <td>nakup</td>
        <td>{{ res(selectedUnitData.nakup) }}</td>
      </tr>
      <tr>
        <td>garancija</td>
        <td>{{ selectedUnitData.garancija }}</td>
      </tr>
      <tr>
        <td>inventarna</td>
        <td>{{ res(selectedUnitData.inventarna) }}</td>
      </tr>
      <tr>
        <td>opomba</td>
        <td>{{ res(selectedUnitData.opomba) }}</td>
      </tr>
      <tr>
        <td>zgodovina</td>
        <td>{{ res(selectedUnitData.zgodovina) }}</td>
      </tr>
      <tr>
        <td>unit_lokacija_id</td>
        <td>{{ res(selectedUnitData.unit_lokacija_id) }}</td>
      </tr>
      <tr>
        <td>oznaka</td>
        <td>{{ res(selectedUnitData.oznaka) }}</td>
      </tr>
      <tr>
        <td>omara</td>
        <td>{{ res(selectedUnitData.omara) }}</td>
      </tr>
      <tr>
        <td>prostor</td>
        <td>{{ res(selectedUnitData.prostor) }}</td>
      </tr>
      <tr>
        <td>lokacija</td>
        <td>{{ res(selectedUnitData.lokacija.oznaka) }}</td>
      </tr>
      <tr
        v-for="item in selectedUnitDataArray"
        :key="item[0]">
        <td>{{ res(item[0]) }}</td>
        <td>{{ item[1]===true ? 'DA' : res(item[1]) }}</td>
      </tr>
    </table> -->
  </el-aside>
</template>

<script>
import { mapState } from 'vuex'
import { notEmptyObjectMixin } from '@/mixins/notEmptyObject'
import AppHeader from '@/components/AppHeader'
import TicketLog from '@/components/TicketLog'
import UnitTable from '@/components/UnitTable'

export default {
  name: 'UnitView',
  components: {
    AppHeader,
    UnitTable,
    TicketLog
  },
  mixins: [notEmptyObjectMixin],
  data () {
    return {
      activeTabName: 'komunikacija'
    }
  },
  computed: {
    ...mapState('unit', {
      selectedUnitData: state => state.selectedUnitData
    }),
    selectedUnitDataArray () {
      if (this.notEmptyObjectMixin(this.selectedUnitData.detail)) {
        return Object.entries(this.selectedUnitData.detail)
      } else {
        console.info('[Zinka] no detail data in: ', this.selectedUnitData)
      }
    }
  }
}
</script>

<style lang="scss">
.el-aside {
  height: 100%;
  // background-color: rgba(255, 0, 0, 0.479);
  overflow: hidden !important;
  > .el-tabs {
    height: calc(100% - #{$--app-header-height});
    // background-color: rgb(121, 184, 39, 0.5);
    > .el-tabs__content {
        height: 100%;
        // border: solid 2px rgba(0, 0, 255, 0.466);
        > .el-tab-pane {
          height: 100%;
          // background-color: rgba(137, 43, 226, 0.534);
        }
    }
  }
}
</style>
