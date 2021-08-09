<template>
  <div class="recommend-wrap">
    <div class="img-item" v-for="(item, index) in recommendList" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" />
        <div class="recommend-title">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    recommendList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
};
</script>
<style lang="scss" scoped>
.recommend-wrap {
  width: 100%;
  display: flex;
  margin-top: 10px;
  font-size: 14px;
  padding-bottom: 20px;
  border-bottom: 10px #f5f5f5 solid;
  .img-item {
    flex: 1;
    text-align: center;
    a {
      color: inherit;
      text-decoration: none;
    }
    img {
      height: 70px;
      width: 70px;
    }
    .recommend-title {
      margin-top: 3px;
    }
  }
}
</style>