<template>
  <el-alert
    v-if="elenMeritve.meritve === undefined || elenMeritve.meritve.length == 0"
    :title="'Za to lokacijo še ni shranjenih meritev!'"
    :closable="false"
    type="info"
    show-icon>
    <upload/>
  </el-alert>
  <el-container
    v-else
    direction="vertical">
    <app-header class="z-app-header">
      <template slot="header-left">
        <el-select
          v-model="selectedDatum"
          @change="changeDatum">
          <el-option
            v-for="meritev in elenMeritve.meritve"
            :key="meritev.id_meritev"
            :value="meritev.datum"
            :label="meritev.datum"/>
        </el-select>
      </template>
      <template slot="header-right">
        <upload/>
      </template>
    </app-header>
    <el-table
      :data="elenPoraba.poraba"
      size="small">
      <el-table-column
        prop="porabnik.naziv"
        label="Porabnik"/>
      <el-table-column
        prop="meritev[0].moc"
        label="Odčitek moči [kW]"
        align="center"/>
      <el-table-column
        v-if="elenPoraba.poraba[0].meritev[1]"
        :label="'Δ (' + elenPoraba.poraba[0].meritev[1].datum + ')'"
        align="center">
        <template slot-scope="scope">
          {{ diffMoc(scope.row.meritev) }}
          <span
            :class="scope.row.meritev[0].diffWarning"
            class="diffMoc">{{ scope.row.meritev[0].diff }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
</template>

<script>
import AppHeader from '@/components/AppHeader'
import Upload from '@/components/LokacijeEnergijaUpload'

export default {
  name: 'LokacijeEnergijaPoraba',
  components: {
    AppHeader,
    Upload
  },
  props: {
    elenMeritve: {
      type: Object,
      required: true
    },
    elenPoraba: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      mySelectedDatum: null
    }
  },
  computed: {
    selectedDatum: {
      get () {
        return this.elenPoraba.poraba[0].meritev[0].datum
      },
      set (selectedDatum) {
        this.mySelectedDatum = selectedDatum
      }
    }
  },
  methods: {
    // TODO: get this from API
    diffMoc (meritev) {
      if (meritev[1] && meritev[0]) {
        var diff = meritev[0].moc - meritev[1].moc
        var diffTrashold = 10 // TODO: To be configurable by user
        if (diff >= diffTrashold) {
          meritev[0].diffWarning = 'diffHigh'
          meritev[0].diff = '+' + diff
        }
        if (diff <= -diffTrashold) {
          meritev[0].diffWarning = 'diffLow'
          meritev[0].diff = diff
        }
      } else {
        return ''
      }
    },
    changeDatum (mySelectedDatum) {
      this.$emit('update:datum', mySelectedDatum) // we creted event to pass selectedDatum to parent component when it changes
    }
  }
}
</script>

<style lang="scss" scoped>
.el-table
  .moc {
    width: 70px;
  }
  .diffMoc {
    width: 30px;
    &.diffHigh {
      color: rgb(233, 32, 5);
      font-weight: bold;
    }
    &.diffLow {
    color: #3a4369;
    font-weight: bold;
    }
}
</style>
