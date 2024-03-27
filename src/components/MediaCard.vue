<script setup>
defineProps({
  item: {
    id: String,
    platform: String,
    title: String,
    subtitle: String,
    coverImg: String
  }
})
</script>

<template>
  <router-link custom v-slot="{ navigate }" :to="{ name: 'PlaylistView', params: { playlistID: item.id }, query: { platform: item.platform } }">
    <div
      class="media-card-container"
      @click="navigate"
    >
      <div class="cover-group">
        <div class="img-group">
          <img :src="item.coverImg" :alt="item.title" onload="this.style.opacity=1">
        </div>
        <div class="shadow" :style="{
          background: `url(${item.coverImg})`
        }"></div>
        <div class="play-btn-group">
          <button><f-icon icon="play" /></button>
        </div>
      </div>
      <div class="desc-group">
        <div class="title-box"><span>{{ item.title }}</span></div>
        <div class="subtitle-box"><span>{{ item.subtitle }}</span></div>
      </div>
    </div>
  </router-link>
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
    position: relative;
    margin-bottom: 12px;
    transition: .1s;
    &:has(.play-btn-group:hover) {
      transform: translateY(-2px);
      margin-bottom: 2px;
      .shadow {
        opacity: 1;
      }
    }
    .img-group {
      position: relative;
      img {
        border-radius: 6px;
        width: 100%;
        background: #000;
        opacity: 0;
        transition: .2s;
      }
    }
    .shadow {
      position: absolute;
      z-index: -1;
      top: 12px;
      transition: .4s;
      height: 100%;
      width: 100%;
      opacity: 0;
      filter: blur(16px) opacity(0.6);
      transform: scale(0.92, 0.96);
      border-radius: 6px;
      background-size: cover;
      border-radius: 0.75em;
    }
    &:hover .play-btn-group {
      opacity: 1;
    }
    .play-btn-group {
      position: absolute;
      top: calc(50% - 24px);
      left: calc(50% - 24px);
      height: 48px;
      width: 48px;
      border-radius: 48px;
      opacity: 0;
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 48px;
        width: 48px;
        border-radius: 48px;
        background: #ffffff87;
        backdrop-filter: blur(8px);
        color: #fff;
        font-size: 24px;
        padding-left: 3px;
        box-shadow: 0 8px 8px #00000052;
        transition: .1s;
        &:hover {
          transform: scale(1.06);
        }
      }
    }
  }
  .desc-group {
    height: 64px;
    .title-box {
      padding-bottom: 5px;
      span {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
        overflow: hidden;
        width: 95%;
        font-weight: 600;
        font-size: 1rem;
      }
    }
    .subtitle-box {
      span {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
        overflow: hidden;
        width: 85%;
        color: @color-text-sub;
        font-weight: 100;
      }
    }
  }
}

@media screen and (max-width: 1200px) {
  .media-card-container {
    flex-basis: 25%;
  }
}
</style>
