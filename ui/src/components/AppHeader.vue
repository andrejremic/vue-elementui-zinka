<template>
  <el-header>
    <div class="header-left">
      <slot name="header-left"/>
    </div>
    <div class="header-center">
      <slot name="header-center"/>
    </div>
    <div class="header-right">
      <slot name="header-right"/>
    </div>
  </el-header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped lang="scss">
.el-header {
  height: $--app-header-height !important;;
  display: flex;
  justify-content: space-between;
  padding: 5px 0px;
  // border-bottom: solid 1px #e6e6e6;

  .header-left {
    min-width: 170px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    > :first-child {
      margin-right: 15px;
    }
  }

  .header-center {
    justify-content: flex-start;
    align-items: center;
    display: flex;
    > :first-child {
      margin-right: 15px;
    }
  }

  .header-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    > :first-child {
      margin-right: 15px;
    }
  }
}
</style>
<style lang="scss">
.el-loading-spinner {
  margin-top: -9px !important;
}
</style>
