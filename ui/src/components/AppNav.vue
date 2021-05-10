<template>
  <el-aside
    v-if="appRouterObj"
    width="201px">
    <el-header class="app-nav-header">
      <slot/>
    </el-header>
    <el-menu
      v-if="$store.state.userData.selectedLocationId"
      :key="$store.state.userData.selectedLocationId"
      class="el-menu-vertical-app"
      background-color="#F5F5F5"
      unique-opened
      router>
      <template v-for="(child, index) in appRouterObj.children">
        <!-- if app has submenues -->
        <el-submenu
          v-if="child.children"
          :index="child.path"
          :key="index">
          <template slot="title">
            <span>{{ child.title }}</span>
          </template>
          <!-- TODO: add 'lsig' in route object -->
          <el-menu-item
            v-for="(baby, index) in child.children"
            :index="baby.path"
            :route="'/' + 'lokacije' + '/' + $store.getters.selectedLocationObj.lsig + '/' + child.path + '/' + baby.path"
            :key="index"> {{ baby.title }}
          </el-menu-item>
        </el-submenu>
        <!-- if app doesn't have submenues -->
        <el-menu-item
          v-else
          :index="child.path"
          :key="index"
          :route="'/' + 'lokacije' + '/' + $store.getters.selectedLocationObj.lsig + '/' + child.path">
          <span>{{ child.title }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </el-aside>
</template>

<script>
// TODO: refactor to use props and get all data before load component
export default {
  name: 'AppNav',
  computed: {
    appRouterObj () {
      return this.$store.getters.appRouterObj
    }
  },
  beforeMount () {
    this.$store.dispatch('updateRouteObj', this.$route)
  },
  activated () {
    if (this.appRouterObj.children) {
      this.$router.push({ name: 'elenergija' }) // load first item in app-menu
    }
  }
}
</script>

<style lang="scss">
.app-nav-header, .app-nav-header > div {
  display: flex;
  flex-direction: column;
  padding-top: 5px !important;
  min-height: 48px;
  padding: 4px !important;
}
</style>
<style lang="scss" scoped>
  .el-menu-vertical-app {
    width: 201px;
  }
  .el-aside {
    height: 100%;
  }
</style>
