<template>
  <el-select
    v-show="!selectedLocationObj || !myHidden"
    ref="select"
    v-model="selectedLocationValue"
    :remote-method="locationFilter"
    :loading="loading"
    size="large"
    filterable
    default-first-option
    placeholder="Vpišite ime lokacije"
    no-match-text="Ne najdem..."
    no-data-text="Ne najdem..."
    remote
    @change="redirectToLokacije"
    @click.native="atClick">
    <el-option
      v-for="(locationObj, index) in locationOptionsFiltered"
      :key="index"
      :label="locationObj.lsig"
      :value-key="locationObj.id_l"
      :value="locationObj">
      <span style="float: left; min-width: 45px; padding-right: 4px; text-transform: uppercase">{{ locationObj.lsig }}</span>
      <span style="float: left; color: #8492a6;">{{ locationObj.ime }} {{ locationObj.ime2 ? ('/ ' + locationObj.ime2) : '' }}</span>
    </el-option>
  </el-select>
</template>

<script>
export default {
  name: 'LokacijeIzberi',
  props: {
    hidden: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      locationOptionsFiltered: [],
      loading: false
    }
  },
  computed: {
    selectedLocationValue: {
      get () {
        if (this.$store.getters.selectedLocationObj) {
          return this.$store.getters.selectedLocationObj.lsig
        } else {
          return ''
        }
      },
      // we rearly use setters in computed prop see: https://www.udemy.com/vuejs-2-the-complete-guide/learn/v4/t/lecture/5976780?start=0
      set (selectedLocationObj) {
        return this.$store.dispatch('updateSelectedLocationId', selectedLocationObj.id_l)
      }
    },
    locationData () {
      return this.$store.getters.locationData
    },
    selectedLocationObj () {
      return this.$store.getters.selectedLocationObj
    },
    myHidden () {
      return this.hidden
    }
  },
  methods: {
    atClick () {
      this.locationOptionsFiltered = this.locationData
      this.$store.commit('updateSelectedLocationId', '')
    },
    redirectToLokacije (selectedLocationObj) {
      var lsig = selectedLocationObj.lsig
      this.$router.push({ name: 'lokacije', params: { lsig } })
    },
    locationFilter (query) {
      if (query !== '') {
        // this.loading = true
        setTimeout(() => {
          // this.loading = false
          this.locationOptionsFiltered = this.locationData.filter(item => {
            if (this.isMatch(item.lsig, query)) {
              return true
            } else if (this.isMatch(item.ime, query)) {
              return true
            } else if (this.isMatch(item.ime2, query)) {
              return true
            } else {
              return false
            }
          })
        }, 200)
      } else {
        this.locationOptionsFiltered = this.locationData
        // this.loading = false
      }
    }
  }
}
</script>

<style>
</style>
