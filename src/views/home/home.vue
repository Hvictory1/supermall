<template>
  <div id="home">
    <navbar class="nav-bk">
      <div slot="center">购物街</div>
    </navbar>
    <tab-control
      class="tab-control-wrap"
      :titles="['流行', '新款', '精选']"
      @itemClick="itemClick"
      ref="tabControl1"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <banner
        :bannerList="banners"
        @swiperItemImgLoad="swiperItemImgLoad"
      ></banner>
      <recommend-view :recommendList="recommends" />
      <feature-view></feature-view>
      <tab-control
        class="tab-control-wrap"
        :titles="['流行', '新款', '精选']"
        @itemClick="itemClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
<script>
import Navbar from "components/common/navbar/navbar.vue";
import Banner from "components/content/banner/banner.vue";
import TabControl from "components/content/tabControl/tabControl.vue";
import GoodsList from "components/content/goods/goodsList.vue";
import Scroll from "components/common/scroll/scroll.vue";
import BackTop from "components/content/backTop/backTop.vue";

import RecommendView from "./recommendView.vue";
import FeatureView from "./featureView.vue";

import { getHomeMultidata, getHoomGoods } from "network/home";

export default {
  name: "Home",

  components: {
    Navbar,
    Banner,
    Scroll,
    BackTop,
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
      isShowBackTop: false, //是否展示返回顶部箭头
      tabOffsetTop: 0,
      isTabFixed: false,
      savaY:0,
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
  mounted() {
    const refresh = this.debounce(this.$refs.scroll.refresh, 200);
    //监听item中图片加载完成
    this.$bus.$on("itemImageLoad", () => {
      refresh();
    });
  },
  destoryed(){
    console.log('destroy')
  },
  activated(){
    this.$refs.scroll.scrollTo(0,this.savaY,0)
    this.$refs.scroll.refresh()
  },
  deactivated(){
    this.savaY = this.$refs.scroll.scroll.y
  },
  methods: {
    /**
     * 获取tabControl的offsetTop  所有的组件都有一个属性$el:用于获取组件中的元素
     */
    swiperItemImgLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      console.log(this.tabOffsetTop);
    },
    /**
     *事件防抖
     */
    debounce(func, delay) {
      let timer = null;
      return function (...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };
    },
    /**
     * 子组件tabcontrol传过来的方法
     */
    itemClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    /**
     * backtop组件点击事件
     */
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    /**
     * scroll组件传过来的方法
     */
    contentScroll(position) {
      // content滚动判断backtop是否出现
      this.isShowBackTop = position.y < -1000 ? true : false;
      // 2.tab是否吸顶
      if (this.tabOffsetTop > 44) {
        this.isTabFixed = position.y < (-this.tabOffsetTop) ? true: false;
      }
    },
    /**
     * scroll组件传过来的方法 判断上拉加载更多
     */
    loadMore() {
      console.log("上拉加载更多");
      this.getHoomGoods(this.currentType);
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

        //上拉加载更多后要进行 finishPullUp才可以继续上拉刷新
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>
<style scoped lang="scss">
#home {
  height: 100vh;
  position: relative;
}
.nav-bk {
  background-color: #ff8198;
  color: #ffffff;
}
.content {
  height: calc(100% - 93px);
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
}
.tab-control-wrap {
  position: relative;
  z-index: 9;
}
</style>
