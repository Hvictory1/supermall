<template>
  <div id="app">
    <!-- 保持缓存  exclude是除外 detail是组件中的name -->
    <keep-alive exclude="detail">
      <router-view />
    </keep-alive>
    <main-tabbar />
  </div>
</template>

<script>
import MainTabbar from "components/content/mainTabbar.vue";
export default {
  name: "App",
  components: {
    MainTabbar,
  },
};
</script>
<style>
@import "assets/css/base.css";
@import "assets/css/reset.css";
</style>
