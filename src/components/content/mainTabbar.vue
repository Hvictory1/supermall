<!--
 * @Author: 何超
 * @LastEditors: 何超
 * @Description: 
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <tab-bar>
      <tab-bar-item path="/home">
        <img slot="item-icon" src="~assets/img/tabbar/home-select.png" alt="" />
        <img slot="item-icon-active" src="~assets/img/tabbar/home-selected.png" alt=""/>
        <div slot="item-text">首页</div>
      </tab-bar-item>
       <tab-bar-item path="/category">
        <img slot="item-icon" src="~assets/img/tabbar/cart-select.png" alt="" />
          <img slot="item-icon-active" src="~assets/img/tabbar/cart-selected.png" alt=""/>
        <div slot="item-text">分类</div>
      </tab-bar-item>
       <tab-bar-item path="cart">
        <img slot="item-icon" src="~assets/img/tabbar/category-select.png" alt="" />
         <img slot="item-icon-active" src="~assets/img/tabbar/category-selected.png" alt=""/>
        <div slot="item-text">购物车</div>
      </tab-bar-item>
      <!-- 可以传选中颜色 -->
       <!-- <tab-bar-item path="profile" activeColor="blue"> -->
         <tab-bar-item path="profile">
        <img slot="item-icon" src="~assets/img/tabbar/mine-select.png" alt="" />
         <img slot="item-icon-active" src="~assets/img/tabbar/mine-selected.png" alt=""/>
        <div slot="item-text">我的</div>
      </tab-bar-item>
     
    </tab-bar>
</template>
<script>
import TabBar from "components/common/tabbar/tabbar.vue";
import TabBarItem from "components/common/tabbar/tabbar-item.vue";

export default {
  data(){
    return{

    }
  },
  components:{
    TabBar,
    TabBarItem
  }
}
</script>
<style scoped>

</style>