<template>
  <el-container direction="horizontal">
    <el-main class="z-main">
      <div v-if="loadingMeritve || loadingPoraba"><z-loading/></div>
      <poraba
        v-else
        :elen-meritve="$store.getters.elenMeritve"
        :elen-poraba="$store.getters.elenPoraba"
        :datum.sync="selectedDatum"
        :key="$route.params.lsig"
        @update:datum="getElenPoraba"/>
    </el-main>
    <el-aside>
      <template v-if="loadingSelectedLocationObj"><z-loading/></template>
      <podatki
        v-else
        :merilno-mesto="$store.getters.selectedLocationObj.elenergija.merilno_mesto"
        :key="$route.params.lsig"/>
    </el-aside>
  </el-container>
</template>

<script>
import Podatki from '@/components/LokacijeEnergijaPodatki'
import Poraba from '@/components/LokacijeEnergijaPoraba'

export default {
  name: 'LokacijeEnergija',
  components: {
    Podatki,
    Poraba
  },
  props: {
    selectedLocationObj: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      selectedDatum: null,
      loadingSelectedLocationObj: true,
      loadingMeritve: true,
      loadingPoraba: true
    }
  },
  mounted () {
    this.updateSelectedLocationObj()
    this.getElenMeritve()
    this.getElenPoraba()
  },
  methods: {
    updateSelectedLocationObj () {
      var that = this
      this.loadingSelectedLocationObj = true
      this.$store.dispatch('getLokacije', {
        id: that.selectedLocationObj.id_l,
        addinfo: 'elenergija'
      }).then(function () {
        that.loadingSelectedLocationObj = false
      })
    },
    getElenMeritve () {
      var that = this
      this.loadingMeritve = true
      this.$store.dispatch('getElenMeritve', {
        id_l: this.$store.getters.selectedLocationObj.id_l
      }).then(function () {
        that.loadingMeritve = false
      })
    },
    getElenPoraba (selectedDatum) {
      var that = this
      this.loadingPoraba = true
      this.$store.dispatch('getElenPoraba', {
        id_l: this.$store.getters.selectedLocationObj.id_l,
        before_date: selectedDatum
      }).then(function () {
        that.loadingPoraba = false
      })
    }
  }
}
</script>

<style scoped>
.el-main {
    padding: 0px;
}
</style>
