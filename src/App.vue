<template>
  <div id="app">
    <router-view/>
    <main-tabbar/>
  </div>
</template>

<script>
import MainTabbar from 'components/content/mainTabbar.vue';
export default {
  name: "App",
  components: {
    MainTabbar
  },

};
</script>

    MainTabbar
<style>
@import "assets/css/base.css";
</style>
