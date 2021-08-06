<!--
 * @Author: 何超
 * @LastEditors: 何超
 * @Description: 
 * 可以输入预定的版权声明、个性签名、空行等
-->
<template>
  <div class="tab-bar">
    <slot></slot>
  </div>
</template>
<script>
export default {
  
};
</script>
<style scoped>
.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #f2f2f2;
  box-shadow: 0 -1px 2px rgba(0, 0, 0, 0.1);
}

</style>