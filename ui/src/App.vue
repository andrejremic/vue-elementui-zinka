<template>
  <div id="app">
    <el-container direction="horizontal">
      <transition
        name="fade"
        mode="out-in">
        <keep-alive>
          <router-view name="sidebar"/>
        </keep-alive>
      </transition>
      <el-container direction="vertical">
        <transition
          name="fade"
          mode="out-in">
          <keep-alive>
            <router-view name="header"/>
          </keep-alive>
        </transition>
        <transition
          name="fade"
          mode="out-in">
          <keep-alive>
            <router-view/>
          </keep-alive>
        </transition>
      </el-container>
      <the-dynamic-global-component/>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TheDynamicGlobalComponent from '@/components/TheDynamicGlobalComponent'
// GENERAL IMPROVMENTS
// TODO: To improve UX we can show "loading" only if it takes long to load data, so there will be no flickerng when data fetching is fast... (use Promise.race() with setTimeout())

export default {
  name: 'App',
  components: {
    TheDynamicGlobalComponent
  },
  computed: {
    ...mapState({
      errorResponse: state => state.errorResponse,
      notification: state => state.notification,
      message: state => state.message
    })
  },
  watch: {
    message: function (newMessage, oldMessage) {
      this.$message(newMessage)
    },
    notification: function (newNotification, oldNotification) {
      this.$notify(newNotification)
    },
    errorResponse: function (newError, previousError) {
      if (!newError) {
        this.$message({
          message: 'Ni odziva s strežnika!',
          type: 'warning',
          center: true
        })
      } else {
        switch (newError.status) {
          case 401:
            this.$message({
              message: 'Avtentikacija ni bil uspešna!',
              type: 'warning',
              center: true
            })
            break
          case 403:
            this.$message({
              message: 'Ni ustreznih pravic!',
              type: 'warning',
              center: true
            })
            break
          case 404:
            this.$message({
              message: 'Hmm... strežnik ne pozna odgovora na vašo zahtevo!',
              type: 'error',
              center: true
            })
            break
          case 405:
            this.$message({
              message: 'Hmm... napaka na strežniku!',
              type: 'error',
              center: true
            })
            break
          default:
            this.$message({
              message: 'Ups... nekaj je narobe!',
              type: 'error',
              center: true
            })
            break
        }
      }
    }
  }
}
</script>

<style lang="scss">

body {
  margin: unset;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f5f5;
}

html,body,#app {
  height: 100%;
  margin: 0;
  padding: 0;
}

#app > .el-container {
  height: 100%;
  > .el-container {
    height: 100%;
  }
}

.center {
  margin: 0px auto;
}

.text-center {
  text-align: center;
}

.panel {
  max-width: 300px;
}

/* Font size classes */
.h1 {
  font-size: 22px;
}
.h2 {
  font-size: 18px;
}
.h3 {
  font-size: 16px;
}
h1, h2, h3 {
  font-weight: normal;
}
.text-regular {
  font-size: 14px;
}
.text-small {
  font-size: 13px;
}
.text-smaller {
  font-size: 12px;
}
.text-strong {
  font-weight: 600;
}
/* colors */
.color-dark-light {
  color: #99a9bf;
}

/* Layout */

.z-section {
  padding: 10px 10px 5px 10px;
}
.z-main {
  min-width: 402px;
  height: 100%;
  padding: 0px 20px !important;
  overflow: hidden;
}
.z-app-header {
  padding: 5px 0px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: all .2s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}

/* recommended css code for vue-svgicon */
.svg-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  color: inherit;
  vertical-align: middle;
  fill: none;
  stroke: currentColor;
}

.svg-fill {
  fill: currentColor;
  stroke: none;
}

.svg-up {
    /*default*/
  transform: rotate(0deg);
}

.svg-right {
  transform: rotate(90deg);
}

.svg-down {
  transform: rotate(180deg);
}

.svg-left {
  transform: rotate(-90deg);
}

/* Element UI override */
.el-table--mini td, .el-table--mini th {
  padding: 2px 0;
}
.el-button {
  &.xx-large {
    font-size: xx-large;
  }
  &.x-large {
    font-size: x-large;
  }
  &.larger {
    font-size: larger;
  }
  &.large {
    font-size: large;
  }
}

</style>
