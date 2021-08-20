<template>
  <div class="cart-wrap">
    <!-- 导航 -->
    <navbar class="cartNav">
      <div slot="center">购物车({{ cartLength }})</div>
    </navbar>

    <!-- 购物车bar -->
    <cart-list></cart-list>
    <cart-bot-bar></cart-bot-bar>
    <!-- <cart-list></cart-list>
		<cart-bot-bar></cart-bot-bar> -->
  </div>
</template>

<script>
import Navbar from "components/common/navbar/navbar.vue";
import CartList from './childCopm/CartList.vue';
import CartBotBar from './childCopm/CartBotBar.vue';

export default {
  name: "Cart",
  components: {
    Navbar,
    CartList,
    CartBotBar,
  },
  computed: {
    cartLength() {
      // getters里面的方法不用加()
      return this.$store.getters.cartLength;
    },
  },
};
</script>

<style lang="scss" scoped="scoped">
.cartNav {
  color: #fff;
  background-color: var(--color-high-text);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
}
</style>
