<template>
  <nav>
    <router-link class="item" to="/account" active-class="selected">
      <Icon name="tianjia" />记账
    </router-link>
    <router-link class="item" to="/book" active-class="selected">
      <Icon name="jizhangben" />账本
    </router-link>
    <router-link class="item" to="/labels" active-class="selected">
      <Icon name="fenlei" />标签
    </router-link>
    <router-link class="item" to="/statistics" active-class="selected">
      <Icon name="board" />统计
    </router-link>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  flex-direction: row;
  font-size: 14px;
  color: #d8d8d8;
  > .item {
    padding: 2px 0;
    width: 33.33333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected {
    color: #fe9c3c;
    .icon {
      fill: #fe9c3c;
    }
  }
}
</style>