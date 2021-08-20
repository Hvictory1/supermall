<template>
  <div id="detail">
    <detail-nav
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav>
    <scroll
      class="content"
      :pull-up-load="true"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :topImages="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imgLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :paramInfo="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommendInfo"></goods-list>
    </scroll>
    <detail-bot-bar @addCarting="addCarting"></detail-bot-bar>
  </div>
</template>

<script>
import DetailNav from "./childCom/detailNav.vue";
import DetailSwiper from "./detailSwiper/detailSwiper.vue";
import DetailBaseInfo from "./childCom/DetailBaseInfo.vue";
import DetailShopInfo from "./childCom/DetailShopInfo.vue";
import DetailGoodsInfo from "./childCom/DetailGoodsInfo.vue";
import DetailParamInfo from "./childCom/DetailParamInfo.vue";
import DetailBotBar from "./childCom/DetailBotBar.vue";
import DetailCommentInfo from "./childCom/DetailCommentInfo.vue";

import GoodsList from "components/content/goods/goodsList.vue";
import Scroll from "components/common/scroll/scroll.vue";

import { getDetail, Goods, Shop, Param, getRecommend } from "network/detail.js";
export default {
  name: "detail",
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodsList,
    DetailBotBar,
  },
  props: {},
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {}, //详情的图片和文字
      paramInfo: {}, //参数
      commentInfo: [], //评论
      recommendInfo: [], //推荐
      themeTopYs: [], //页面布局高度的数组
      getThemeY: null,
      currentIndex: 0,
    };
  },
  watch: {},
  computed: {},
  methods: {
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
    imageLoad() {
      this.$refs.scroll.refresh();

      this.getThemeY();
    },
    /**
     * 详情页面nav传过来的点击 index是下标值
     */
    titleClick(index) {
      console.log("index", index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500);
    },
    /**
     *滚动组件传过来的滚动事件 传入position
     */
    contentScroll(position) {
      const positionY = -position.y;
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
    },
    /**
     * 加入购物车
     */
    addCarting() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车内
      this.$store.dispatch("addBuy", product).then((res) => {
        console.log(res);
      });
    },
  },
  created() {
    // 1.保存iid
    this.iid = this.$route.query.id;
    console.log("detail打印", this.iid);
    // 2.根据iid来进行请求数据
    getDetail(this.iid).then((res) => {
      // 1.获取顶部图片轮播数据
      console.log("12", res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 3.创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      //4.保存商品的详情数据
      this.detailInfo = data.detailInfo;

      // 5.获取参数的信息
      this.paramInfo = new Param(data.itemParams.info, data.itemParams.rule);

      // 6.取出评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list;
        console.log("reer", this.commentInfo);
      }
      /*
      // 1.这里的offsetTop值不对是因为$el没有渲染出来
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopYs);

      // 2.保证数据渲染完之后在执行  dom渲染完成图片没有加载完全 导致offsetTop的值不对
      this.$nextTick(() => {
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
        console.log(this.themeTopYs);
      });
      */
    });

    //3.请求推荐数据
    getRecommend().then((res) => {
      console.log("resres", res);
      this.recommendInfo = res.data.list;
    });

    //4.给getThemeY赋值   debounce是返回一个函数 则在上面 imgload内执行
    this.getThemeY = this.debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log("themeTopYs", this.themeTopYs);
    }, 100);
  },
  mounted() {},
};
</script>
<style lang="scss" scoped>
#detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
  .detail-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }
}
.content {
  height: calc(100% - 93px);
}
</style>