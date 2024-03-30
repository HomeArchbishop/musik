<script setup>
import { useStore } from 'vuex'

const store = useStore()

const props = defineProps({
  index: Number,
  item: {
    title: String,
    subtitle: String,
    id: String,
    album: {
      id: String,
      title: String,
      coverImg: String
    },
    artists: [{
      name: String,
      id: String
    }]
  }
})

function playMedia () {
  store.commit('storage/updatePlayerPlaylist', { type: 'unshift', media: props.item })
  store.commit('storage/updateCurrentPlayingIndex', { nextIndex: 0 })
}
</script>

<template>
  <div class="media-line-card-container" @click="playMedia">
    <div class="icon-group">
      <span class="index-icon">{{ index }}</span>
    </div>
    <div class="cover-title-artist-group">
      <div class="cover-group">
        <img :src="item.album.coverImg" :alt="index" onload="this.style.opacity=1">
      </div>
      <div class="title-and-artist-group">
        <div class="title-box"><span>{{ item.title }}</span></div>
        <div class="artist-box">
          <span>{{ item.artists[0].name }}</span>
        </div>
      </div>
    </div>
    <div class="album-group">
      <div class="album-box"><span>{{ item.album.title }}</span></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.media-line-card-container {
  display: grid;
  grid-template-columns: 16px minmax(120px,6fr) minmax(120px,4fr) minmax(120px,3fr) minmax(120px,1fr);
  grid-gap: 16px;
  padding: 0 16px;
  height: 56px;
  padding: 0 16px;
  border-radius: 4px;
  &:hover {
    background: @color-block-1;
  }
  .icon-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    span.index-icon {
      display: inline-block;
      color: @color-text-sub;
      font-size: 14px;
      font-family: CircularSpTitle-Bold;
    }
  }
  .cover-title-artist-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    .cover-group {
      img {
        flex-shrink: 0;
        width: 40px;
        transition: 0.8s;
        opacity: 0;
        background: #000;
        border-radius: 4px;
        margin-right: 14px;
      }
    }
    .title-and-artist-group {
      display: grid;
      grid-template-rows: 55% 45%;
      height: 40px;
      .title-box span {
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
        font-weight: 400;
        overflow: hidden;
        font-size: 14px;
      }
      .artist-box span {
        display: -webkit-inline-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-all;
        font-weight: 400;
        overflow: hidden;
        font-size: 14px;
        color: @color-text-sub;
      }
    }
  }
  .album-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    .album-box span {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      white-space: unset;
      word-break: break-all;
      overflow: hidden;
      font-size: 14px;
      color: @color-text-sub;
    }
  }
}
</style>
