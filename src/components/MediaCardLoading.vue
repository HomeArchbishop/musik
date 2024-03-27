<script setup></script>

<template>
  <div class="media-card-loading-container">
    <div class="cover-group loading"></div>
    <div class="desc-group">
      <div class="title loading"></div>
      <div class="subtitle loading"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.media-card-loading-container {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 20%;
  border-radius: 6px;
  cursor: pointer;
  padding: 12px;
  transition: .1s;
  .cover-group {
    position: relative;
    margin-bottom: 12px;
    border-radius: 6px;
    height: 0;
    padding-bottom: 100%;
  }
  .desc-group {
    height: 64px;
    .title {
      margin-bottom: 10px;
      height: 19px;
      border-radius: 4px;
      animation-delay: .05s;
    }
    .subtitle {
      height: 35px;
      border-radius: 4px;
      animation-delay: .06s;
    }
  }
}

@media screen and (max-width: 1200px) {
  .media-card-container {
    flex-basis: 25%;
  }
}
</style>
