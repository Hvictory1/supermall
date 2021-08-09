<template>
  <div>
    <mt-swipe :auto="4000" class="mt-swipe">
      <mt-swipe-item :key="index" v-for="(item, index) in bannerList">
        <!-- //图片轮播中的宽度不是width:100% -->
        <img :src="item.image" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "About",
  data() {
    return {};
  },
  props: {
    bannerList: [],
  },

  mounted() {
    new Swiper(".swiper-container", {
      loop: true,
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },
      // 如果需要前进后退按钮
      // nextButton: ".swiper-button-next",
      // prevButton: ".swiper-button-prev",
      // 如果需要滚动条
      // scrollbar: '.swiper-scrollbar',
      //如果需要自动切换海报
      // autoplay: {
      //   delay: 3000,//时间 毫秒
      //   disableOnInteraction: false,//用户操作之后是否停止自动轮播默认true
      // },
    });
  },
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  margin-top: 44px;
  .mint-swipe-item {
    text-align: center;
  }
  img {
    //全部的轮播图都是高度100%；
    height: 100%;
    width: 100%;
  }
  // .mint-swipe-indicator .is-active {
  //   width: 20rpx;
  //   background-color: #e8561a;
  //   border-radius: 20px;
  // }
}
</style>