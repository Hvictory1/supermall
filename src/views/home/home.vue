
<template>
  <div>
    <navbar class="nav-bk">
      <div slot="center">购物车</div>
    </navbar>
    <banner :bannerList="banners"></banner>
  </div>
</template>
<script>
import Navbar from "components/common/navbar/navbar.vue";
import { getHomeMultidata } from "network/home";
import Banner from "components/content/banner/banner.vue";
export default {
  name: "Home",
  components: {
    Navbar,
    Banner,
  },
  data() {
    return {
      //轮播图数据
      banners: null,
      recommends: null,
    };
  },
  created() {
    //请求多个数据
    getHomeMultidata().then((res) => {
      console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>
<style scoped lang="scss">
.nav-bk {
  background-color: #ff8198;
  color: #ffffff;
}
</style>
