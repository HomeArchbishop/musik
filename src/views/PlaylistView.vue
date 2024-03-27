<script setup>
import { reactive, ref } from 'vue'
import { neteaseApi } from '@/apis'
import { useRoute } from 'vue-router'
import { getThemeColor } from '@/utils/getThemeColor'

import MediaLineCard from '@/components/MediaLineCard.vue'

const route = useRoute()

const props = defineProps({
  playlistID: String
})

console.log(props.playlistID, route.query.platform)

const headBackgroundThemeColor = ref('transparent')

const neteasePlaylistInfo = reactive({ showable: false })

;(async () => {
  if (route.query.platform === 'netease') {
    try {
      const data = await neteaseApi.playlistDetail({ id: props.playlistID })
      console.log(data)
      neteasePlaylistInfo.title = data.playlist.name
      neteasePlaylistInfo.coverImg = data.playlist.coverImgUrl
      neteasePlaylistInfo.subtitle = data.playlist.description
      neteasePlaylistInfo.id = data.playlist.id
      neteasePlaylistInfo.mediaList = data.playlist.tracks.map(t => ({
        title: t.name,
        subtitle: t.alia[0] ?? '',
        album: {
          id: String(t.al?.id ?? ''),
          title: t.al?.name ?? '',
          coverImg: t.al?.picUrl ?? ''
        },
        artists: t.ar?.map(a => ({
          name: a.name,
          id: String(a.id)
        })) ?? []
      }))
      headBackgroundThemeColor.value = await getThemeColor(neteasePlaylistInfo.coverImg)
      neteasePlaylistInfo.showable = true
    } catch (error) {
      console.error(error)
      console.error(error.cause)
    }
  }
})()
</script>

<template>
  <div class="playlist-view-container">
    <div class="playlist-head" v-if="neteasePlaylistInfo.showable">
      <div class="head-background"></div>
      <div class="head-background noise"></div>
      <div class="cover-group">
        <div class="img-group">
          <img
            :src="neteasePlaylistInfo.coverImg" :alt="neteasePlaylistInfo.title"
            onload="this.style.opacity=1"
          >
        </div>
      </div>
      <div class="title-group">
        <h1 class="title">{{ neteasePlaylistInfo.title }}</h1>
      </div>
    </div>
    <div class="playlist-head loading" v-else></div>
    <div class="playlist-body" v-if="neteasePlaylistInfo.showable">
      <div class="background-shadow"></div>
      <div class="tool-group"></div>
      <div class="media-list-group">
        <media-line-card class="media-item-line-card" v-for="(item, index) in neteasePlaylistInfo.mediaList" :key="item.id" :item="item" :index="index + 1" />
      </div>
    </div>
    <div class="playlist-body" v-else>
      <div class="loading-box loading"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.playlist-view-container {
  .playlist-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    position: relative;
    height: 254px;
    padding: 24px;
    .head-background {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      background: v-bind(headBackgroundThemeColor);
      filter: brightness(110%);
      &.noise {
        background: linear-gradient(transparent 0, rgba(0,0,0,.5) 100%), @background-noise;
      }
    }
    .cover-group {
      height: 187px;
      width: 187px;
      flex-shrink: 0;
      box-shadow: 0 4px 60px rgba(0,0,0,.5);
      .img-group {
        height: 0;
        padding-bottom: 100%;
        img {
          width: 100%;
          border-radius: 6px;
          transition: 0.2s;
          opacity: 0;
          background: #000;
        }
      }
    }
    .title-group {
      display: flex;
      flex-direction: column;
      justify-content: end;
      height: 187px;
      margin-left: 20px;
      h1.title {
        color: #fff;
        font-weight: 600;
        font-size: clamp(12px, calc(20px + 1vw), 36px);
      }
    }
  }
  .playlist-body {
    position: relative;
    .loading-box {
      width: 100%;
      height: 140px;
      margin-top: 36px;
    }
    .background-shadow {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: -1;
      height: 232px;
      background-color: v-bind(headBackgroundThemeColor);
      background-image: linear-gradient(rgba(0, 0, 0, .6) 0, @color-background-main 100%), @background-noise;
    }
    .tool-group {
      display: flex;
      height: 100px;
    }
  }
}
</style>
