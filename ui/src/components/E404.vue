<template>
  <div class="center text-center">
    <el-main>
      <svgicon
        :original="true"
        name="zinka"
        width="150"
        height="150"/>
      <h1>404</h1>
      <p>{{ $route.fullPath }}</p>
      <h3>Stran ne obstaja!</h3>
    </el-main>
  </div>
</template>

<script>
import '@/compiled-icons/zinka'

export default {
  name: 'E404'
}
</script>

<style scoped>
h1 {
  font-size: 50px;
}
svg {
    -webkit-filter: grayscale(80%); /* Safari 6.0 - 9.0 */
    filter: grayscale(80%);
}
</style>
