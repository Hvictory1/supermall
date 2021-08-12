<template>
  <div>
    <mt-swipe :auto="4000" class="mt-swipe">
      <mt-swipe-item :key="index" v-for="(item, index) in topImages">
        <!-- //图片轮播中的宽度不是width:100% -->
        <img :src="item" @load="imageLoad" />
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "About",
  data() {
    return {
      isLoad: false,
    };
  },
  props: {
    topImages: {
      type: Array,
      default: [],
    },
  },

  mounted() {
    new Swiper(".swiper-container", {
      loop: true,
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },
    });
  },
  methods: {
    imageLoad() {
      if (!this.isLoad) {
        this.$emit("swiperItemImgLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 300px;
  overflow: hidden;
  .mint-swipe-item {
    text-align: center;
  }
  img {
    //全部的轮播图都是高度100%；
    width: 100%;
  }
  .mint-swipe-indicators .is-active {
    width: 20rpx;
    background-color: #e8561a;
    border-radius: 20px;
  }
}
</style>