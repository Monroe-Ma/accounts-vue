<template>
  <nav>
    <router-link class="item" to="/account" active-class="selected">
      <Icon name="write" />记账
    </router-link>
    <router-link class="item" to="/book" active-class="selected">
      <Icon name="book" />账本
    </router-link>
    <router-link class="item" to="/labels" active-class="selected">
      <Icon name="tags" />标签
    </router-link>
    <router-link class="item" to="/statistics" active-class="selected">
      <Icon name="analysis" />统计
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
      fill: #333;
    }
  }
  > .item.selected {
    color: red;
  }
}
</style>