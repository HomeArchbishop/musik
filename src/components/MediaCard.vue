<script setup>
defineProps({
  item: {
    title: String,
    subtitle: String,
    coverImg: String
  }
})
</script>

<template>
  <div class="media-card-container">
    <div class="cover-group">
      <div class="img-group">
        <img :src="item.coverImg" alt="">
      </div>
    </div>
    <div class="desc-group">
      <div class="title-box"><span>{{ item.title }}</span></div>
      <div class="subtitle-box"><span>{{ item.subtitle }}</span></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.media-card-container {
  display: inline-flex;
  flex-direction: column;
  justify-content: space-between;
  flex-basis: 20%;
  border-radius: 6px;
  cursor: pointer;
  padding: 12px;
  transition: .1s;
  &:hover {
    background-color: @color-block-1;
  }
  .cover-group {
    margin-bottom: 12px;
    .img-group {
      position: relative;
      img {
        border-radius: 6px;
        width: 100%;
      }
    }
  }
  .desc-group {
    height: 64px;
    .title-box {
      span {
        display: inline-block;
        width: 180px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-weight: 600;
        font-size: 1rem;
      }
    }
    .subtitle-box {
      span {
        display: inline-block;
        width: 120px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: @color-text-sub;
        font-weight: 100;
      }
    }
  }
}

@media screen and (max-width: 1400px) {
  .media-card-container {
    flex-basis: 25%;
    .desc-group {
      .title-box {
        span {
          width: 120px;
        }
      }
    }
  }
}
</style>
