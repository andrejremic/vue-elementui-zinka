<template>
  <div
    v-loading="true"
    :style="{ height: height + 'px' }"
    element-loading-background="transparent"/>
</template>

<script>
export default {
  name: 'ZLoading',
  props: {
    height: {
      type: Number,
      default: 100
    }
  }
}
</script>

<style>
</style>
