<script setup>
import { reactive, ref } from 'vue'
import { neteaseApi } from '@/apis'

import MediaCard from '@/components/MediaCard.vue'
import MediaCardLoading from '@/components/MediaCardLoading.vue'

const neteaseTopPlaylistLimitPerPage = 50
const neteaseTopPlaylistCurrentPage = ref(1)
const neteaseTopPlaylistCardInfo = reactive([])
const neteaseTopPlaylistLoading = ref(true)

;(async () => {
  try {
    const data = await neteaseApi.topPlaylist({ limit: neteaseTopPlaylistLimitPerPage, offset: (neteaseTopPlaylistCurrentPage.value - 1) * neteaseTopPlaylistLimitPerPage })
    console.log(data)
    neteaseTopPlaylistCardInfo.push(
      ...data.playlists.map(item => ({
        title: item.name,
        subtitle: item.description,
        id: item.id,
        coverImg: item.coverImgUrl,
        platform: 'netease'
      }))
    )
    neteaseTopPlaylistLoading.value = false
  } catch (error) {
    console.error(error)
    console.error(error.cause)
  }
})()

</script>

<template>
  <div class="home-view-container">
    <div class="top-playlist-area">
      <div class="media-card-list" v-if="neteaseTopPlaylistCardInfo.length === 0">
        <media-card-loading v-for="i in 20" :key="i" />
      </div>
      <div class="media-card-list" v-else>
        <media-card v-for="item in neteaseTopPlaylistCardInfo" :key="item.id" :item="item"/>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.home-view-container {
  .media-card-list {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    .loading-holder {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
    }
  }
}
</style>
