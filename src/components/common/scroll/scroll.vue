<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import Pullup from '@better-scroll/pull-up'
BScroll.use(ObserveDOM);
BScroll.use(Pullup);


export default {
  components: {},
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  watch: {},
  computed: {},
  methods: {
    scrollTo(x, y, time = 500) {
      this.scroll.scrollTo(x, y, time);
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    //图片加载完刷新一下
    refresh(){
      this.scroll.refresh()
    }
  },
  created() {},
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      //这两个属性不加上移动端会有很多bug
      observeDOM: true,
      click: true,
      probeType: this.probeType, //传入这个值得页面才可以监听滚动位置
      pullUpLoad: this.pullUpLoad,
    });

    // 2.监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });

    // 3.上啦加载更多
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });

    
  },
};
</script>
<style lang="scss" scoped>
</style>