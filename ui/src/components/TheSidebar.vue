<template>
  <el-menu
    :default-active="activeItemPath"
    :collapse="true"
    class="el-menu-vertical"
    router
    background-color="#545c64">
    <router-link to="/">
      <div id="zinka-logo">
        <svgicon
          :original="true"
          name="zinka"
          width="64"
          height="64"/>
      </div>
    </router-link>
    <el-menu-item
      v-for="item in appRoutes"
      :index="item.path"
      :key="item.index">
      <i :class="item.icon"/> <!-- TODO: change to mdi-svg icons -->
      <span slot="title">{{ item.title }}</span>
    </el-menu-item>
  </el-menu>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  name: 'TheSidebar',
  computed: {
    ...mapGetters([
      'appRoutes'
    ]),
    // Returns only app URL eg /lokacije insted of /lokacije/ljna/elenergija/...
    activeItemPath () {
      var routePath = this.$route.path.split('/')
      return '/' + routePath[1]
    },
    route () {
      return this.$route
    }
  }
}
</script>

<style lang="scss">
.el-menu {
  border-right: 0px !important;
}
</style>

<style lang="scss" scoped>
.el-menu-item.is-active {
  // transition: all 0.5s ease;
  background-color: #f5f5f5 !important;
  box-shadow: -4px 13px 7px -10px rgba(0, 0, 0, 0.2) inset;
  i {
    filter: drop-shadow(0px 1.5px 1.2px rgba(0, 0, 0, 0.3));
  }
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
#zinka-logo {
  filter: drop-shadow(0px 1px 1px rgba(0,0,0,0.3)) grayscale(60%);
  &:hover {
    filter: grayscale(0%);
    transition: all 2s ease;
  }
}
</style>
