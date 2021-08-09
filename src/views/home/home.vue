
<template>
  <div>
    <navbar class="nav-bk">
      <div slot="center">购物车</div>
    </navbar>
    <banner :bannerList="banners"></banner>
    <recommend-view :recommendList="recommends" />
    <feature-view></feature-view>
    <tab-control
      class="tab-control-wrap"
      :titles="['流行', '新款', '精选']"
      @itemClick="itemClick"
    ></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </div>
</template>
<script>
import Navbar from "components/common/navbar/navbar.vue";
import Banner from "components/content/banner/banner.vue";
import TabControl from "components/content/tabControl/tabControl.vue";
import GoodsList from "components/content/goods/goodsList.vue";

import RecommendView from "./recommendView.vue";
import FeatureView from "./featureView.vue";

import { getHomeMultidata, getHoomGoods } from "network/home";

export default {
  name: "Home",
  components: {
    Navbar,
    Banner,
    TabControl,
    RecommendView,
    FeatureView,
    GoodsList,
  },
  data() {
    return {
      //轮播图数据
      banners: null,
      recommends: null,
      currentType: "pop",
      // 首页商品数据
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
    };
  },

  computed: {
    /**
     * 判断点击首页中的哪一个分类 来传递数据进行变更
     */
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    //请求多个数据
    this.getHomeMultidata();

    //请求首页商品信息
    this.getHoomGoods("pop");
    this.getHoomGoods("new");
    this.getHoomGoods("sell");
  },
  methods: {
    /**
     * 子组件tabcontrol传过来的方法
     */
    itemClick(index) {
      switch(index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
      }
    },
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHoomGoods(type) {
      const page = this.goods[type].page + 1;
      getHoomGoods(type, page).then((res) => {
        // console.log(res)
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.nav-bk {
  background-color: #ff8198;
  color: #ffffff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
}
.tab-control-wrap {
  position: sticky;
  top: 44px;
  z-index: 10;
}
</style>
