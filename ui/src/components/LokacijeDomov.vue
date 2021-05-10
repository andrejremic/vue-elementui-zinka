<template>
  <el-container direction="horizontal">
    <keep-alive>
      <app-nav :key="$route.params.lsig">
        <div
          v-if="$store.state.userData.selectedLocationId && !lokacijeIzberiVisible"
          @mouseover="lokacijeIzberiVisible = true">
          <span class="title">{{ selectedLocationObj.lsig }}</span>
          <!-- TODO: bug - problem if too long  -->
          <span class="sub-title">{{ selectedLocationObj.ime }} {{ selectedLocationObj.ime2 ? ('/ ' + selectedLocationObj.ime2) : '' }}</span>
        </div>
        <lokacije-izberi
          :hidden="!lokacijeIzberiVisible"
          @mouseleave.native="lokacijeIzberiVisible = false" />
      </app-nav>
    </keep-alive>
    <transition
      v-if="selectedLocationObj"
      name="fade"
      mode="out-in">
      <router-view
        :selected-location-obj="selectedLocationObj"
        :key="$route.params.lsig"/>
    </transition>
  </el-container>
</template>

<script>
import AppNav from '@/components/AppNav'
import LokacijeIzberi from '@/components/LokacijeIzberi'

export default {
  name: 'LokacijeDomov',
  components: {
    AppNav,
    LokacijeIzberi
  },
  data () {
    return {
      value: '',
      ready: false,
      lokacijeIzberiVisible: false
    }
  },
  computed: {
    selectedLocationObj () {
      return this.$store.getters.selectedLocationObj
    }
  },
  beforeRouteEnter (from, to, next) {
    next(vm => {
      vm.$store.dispatch('getLokacije').then(() => {
        if (from.params.lsig) {
          var lok = vm.$store.getters.findLocationObj(from.params.lsig)
          vm.$store.dispatch('updateSelectedLocationId', lok.id_l)
        }
      })
    })
  },
  beforeMount () {
    this.$store.dispatch('updateRouteObj', this.$route)
  }
}
</script>

<style scoped>
.title {
  font-size: 20px;
  text-transform: uppercase;
}
.sub-title {
  color: #8492a6;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
