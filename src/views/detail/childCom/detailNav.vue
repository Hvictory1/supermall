<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="back">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
      <div slot="center" class="title-wrap">
        <div
          class="title-item"
          :class="{ active: currentIndex === index }"
          @click="itemClick(index)"
          v-for="(item, index) in titles"
          :key="index"
        >
          {{ item }}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/navbar.vue";
export default {
  components: { NavBar },
  props: {},
  data() {
    return {
      titles: ["商品", "参数", "评价", "推荐"],
      currentIndex: 0,
    };
  },
  watch: {},
  computed: {},
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit("titleClick", index);
    },
    back() {
      this.$router.back();
    },
  },
  created() {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
.back {
  line-height: 52px;
}
.title-wrap {
  display: flex;
}
.title-item {
  flex: 1;
  text-align: center;
  font-size: 15px;
  transition: color 0.2s;
}
.active {
  color: rgb(236, 55, 124);
}
</style>