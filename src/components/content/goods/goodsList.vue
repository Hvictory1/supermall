<template>
  <div class="goods">
    <goods-list-item
      v-for="(item, index) in goods"
      :key="index"
      :goods-item="item"
    ></goods-list-item>
  </div>
</template>
<script>
import GoodsListItem from "components/content/goods/goodsListItem.vue";
export default {
  components: { GoodsListItem },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style scoped lang="scss">
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
 
  padding: 2px;
}
</style>