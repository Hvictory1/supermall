<template>
  <div class="cart-list-wrap">
    <scroll class="content" :probe-type="3" :pull-up-load="true">
      <cart-list-item :cartList="cartList"></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/scroll.vue";
import CartListItem from "./CartListItem.vue";
export default {
  name: "CartList",
  computed: {
    cartList() {
      return this.$store.state.cartList;
    },
  },
  components: {
    CartListItem,
    Scroll,
  },
};
</script>

<style lang="scss" scoped="scoped">
.cart-list-wrap {
  position: relative;
  top: 44px;
  bottom: 89px;
  background-color: #fff;
  height: 100vh;
}
.content{
  height: calc(100% - 133px);
}
</style>