<template>
  <div class="center text-center">
    <el-main>
      <svgicon
        :original="true"
        name="zinka"
        width="150"
        height="150"/>
      <h2>Živjo! Jaz sem Zinka!</h2>
      <h3>Pripravila sem ti zanimiv pripomoček:</h3>
      <div>
        <router-link
          v-for="item in appRoutes"
          :to="item.path"
          :key="item.path">
          <el-button
            :route="item.path"
            :icon="item.icon"
            type="text"
            class="icon-big"
          >
            <div>{{ item.title }}</div>
          </el-button>
        </router-link>
      </div>
    </el-main>
  </div>
</template>

<script>
import '@/compiled-icons/zinka'
import { mapGetters } from 'vuex'

export default {
  name: 'HelloZinka',
  computed: {
    ...mapGetters([
      'appRoutes'
    ])
  }
}
</script>

<style scoped>
.el-button {
  font-size: 70px;
  margin: 30px;
}
.el-button div {
  font-size: 30px;
}
</style>
