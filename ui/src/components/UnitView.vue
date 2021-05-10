<template>
  <div>
    <app-header>
      <template slot="header-left">
        <div>
          <small>inv. 1829374</small>
          <h2>SWC11-LJNA</h2>
        </div>
      </template>
    </app-header>
    <el-tabs
      v-model="activeName"
      @tab-click="handleClick">
      <el-tab-pane
        label="Podatki"
        name="first">User</el-tab-pane>
      <el-tab-pane
        label="Dnevnik"
        name="second">
        <ticket-card/>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { notEmptyObjectMixin } from '@/mixins/notEmptyObject'
import AppHeader from '@/components/AppHeader'
import TicketCard from '@/components/TicketCard'

export default {
  name: 'UnitView',
  components: {
    AppHeader,
    TicketCard
  },
  mixins: [notEmptyObjectMixin],
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
