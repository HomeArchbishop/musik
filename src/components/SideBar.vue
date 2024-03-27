<script setup>
</script>

<template>
  <div class="side-bar-container">
    <div class="upper-group">
      <div class="btn-box">
        <button @click="$router.push({ name: 'HomeView' })" :class="{ actived: $route.name == 'HomeView' }">
          <f-icon icon="house"/>
          <span>{{ $t('sidebar.home') }}</span>
        </button>
      </div>
    </div>
    <div class="down-group"></div>
  </div>
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
  width: 250px;
  row-gap: 8px;
  padding: 8px;
  .upper-group {
    padding: 8px 16px;
    .btn-box {
      button {
        display: flex;
        flex-direction: row;
        align-items: center;
        column-gap: 20px;
        width: 100%;
        height: 48px;
        padding: 4px 12px;
        font-size: 24px;
        color: @color-text-sub;
        span {
          font-size: 17px;
          font-weight: 700;
        }
        &:hover {
          color: @color-text-default;
        }
        &.actived {
          color: @color-text-default;
        }
      }
    }
  }
}
</style>
