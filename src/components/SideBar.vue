<script setup>
</script>

<template>
  <div class="side-bar-container"></div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.side-bar-container {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  background-color: @color-background-sidebar;
  width: 200px;
}
</style>
