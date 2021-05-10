<template>
  <el-header class="main-header">
    <div class="main-header-left">
      <el-tag
        v-if="NODE_ENV==='development'"
        type="warning">development</el-tag>
      <span v-if="NODE_ENV==='production' && BASE_URL==='/'">
        <el-tag
          type="success">production</el-tag>
        <span><small> Built <b>{{ buildedAgo }}</b> ago. Run: <strong><code>vagrant ssh;cd ui;yarn build</code></strong> to rebuild.</small></span>
      </span>
    </div>
    <div class="main-header-center">
      <middlebar/>
    </div>
    <div class="main-header-right">
      <ul>
        <li>
          <el-dropdown>
            <span
              class="el-dropdown-link"
              style="white-space:nowrap">
              {{ $store.getters.userAA.name || "Neprijavljen" }}<svgicon name="mdi/account"/>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logOut">Odjava</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </li>
      </ul>
    </div>
  </el-header>
</template>

<script>
import '@/compiled-icons/mdi/account'
import Middlebar from '@/components/Middlebar'
import { distanceInWords } from 'date-fns'
// import sl from 'date-fns/locale/sl'

export default {
  name: 'MainHeader',
  components: {
    Middlebar
  },
  data () {
    return {
      NODE_ENV: process.env.NODE_ENV,
      BASE_URL: process.env.BASE_URL,
      VUE_APP_BUILD_TIME: process.env.VUE_APP_BUILD_TIME
    }
  },
  computed: {
    buildedAgo () {
      var result = distanceInWords(
        new Date(),
        this.VUE_APP_BUILD_TIME,
        { includeSeconds: true }
      )
      return result
    }
  },
  methods: {
    logOut () {
      this.$store.dispatch('userLogOut')
      this.$router.push({ path: `/prijava` })
    }
  }
}
</script>

<style lang="scss">
.main-header {
  height: $--main-header-height !important;
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
  box-shadow: 0px 1px 6px 2px rgba(0, 0, 0, 0.1);
  .main-header-left {
  justify-content: flex-start;
  }
  .main-header-center {
    justify-content: center;
  }
  .main-header-right {
    justify-content: flex-end;
  }
  ul {
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    > li {
      padding: 0 4px;
    }
  }
}
</style>
