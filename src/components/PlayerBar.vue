<script setup>
</script>

<template>
  <nav class="player-bar-container"></nav>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.player-bar-container {
  position: absolute;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: @color-background-playerbar;
  height: 64px;
}
</style>
