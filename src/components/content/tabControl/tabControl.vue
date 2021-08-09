<template>
  <div class="tab-control">
    <div
      v-for="(item, index) in titles"
      :key="index"
      @click="tabClick(index)"
      class="tab-control-item"
      :class="{ 'tab-active': currentIndex === index }"
    >
      <span>{{ item }}</span>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  methods: {
    tabClick(index) {
      this.currentIndex = index
      this.$emit('itemClick',index)
    },
  },
};
</script>
<style scoped lang="scss">
.tab-control {
  display: flex;
  .tab-control-item {
    flex: 1;
    text-align: center;
    height: 40px;
    line-height: 40px;
    background-color: #FFFFFF;
    font-size: 15px;
  }
  .tab-active {
    color: rgb(219, 89, 150);
    transition: color 0.2s;
  }
  .tab-active span {
    border-bottom: 2px solid rgb(219, 89, 150);
    padding: 5px;
  }
}
</style>