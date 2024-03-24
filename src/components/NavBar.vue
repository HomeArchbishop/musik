<script setup>
</script>

<template>
  <nav class="nav-bar-container">
    <div class="left">
      <div class="routes-area">
        <div class="routes-group">
          <button class="route-btn"><f-icon icon="chevron-left"/></button>
          <button class="route-btn"><f-icon icon="chevron-right"/></button>
        </div>
      </div>
      <div class="search-area">
        <div class="search-group">
          <div class="search-icon"><f-icon icon="magnifying-glass"/></div>
          <div class="search-input"><input type="text"></div>
        </div>
      </div>
    </div>
    <div class="right">
      <div class="tools-area">
        <div class="tools-group">
          <button class="route-btn"><f-icon icon="gear"/></button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.navbar-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 4px;
  font-size: 16px;
  border-radius: 10px;
  width: 40px;
  height: 40px;
  color: @color-text-default;
  transition: .2s;
  &:hover {
    background-color: @color-block-1;
  }
}

nav.nav-bar-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 200px;
  right: 0;
  background-color: @color-background-navbar;
  height: 62px;
  padding: 0 4vw;
  backdrop-filter: saturate(180%) blur(20px);
  .right, .left {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .routes-area {
    .routes-group {
      display: flex;
      flex-direction: row;
      .route-btn {
        .navbar-btn;
      }
    }
  }
  .search-area {
    padding: auto;
    .search-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: @color-block-1;
      color: @color-text-sub;
      height: 36px;
      border-radius: 10px;
      .search-icon {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 16px;
        margin: 0 12px;
      }
      .search-input {
        display: flex;
        justify-content: center;
        align-items: center;
        input {
          font-size: 16px;
          width: 180px;
          transition: .2s;
          font-weight: 600;
          color: @color-text-default;
          &:focus {
            width: 320px;
          }
        }
      }
    }
  }
  .tools-area {
    .tools-group {
      display: flex;
      flex-direction: row;
      .route-btn {
        .navbar-btn;
        font-size: 20px;
      }
    }
  }
}
</style>
