<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
export default {
  name: "Layout",
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f4f4f4;
  .content {
    overflow: auto;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>