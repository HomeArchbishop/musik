<script setup>
import { reactive, ref } from 'vue'
import { neteaseApi } from '@/apis'

import MediaCard from '@/components/MediaCard.vue'

const neteaseTopPlaylistLimitPerPage = 50
const neteaseTopPlaylistCurrentPage = ref(1)
const neteaseTopPlaylistCardInfo = reactive([])

;(async () => {
  try {
    const data = await neteaseApi.topPlaylist({ limit: neteaseTopPlaylistLimitPerPage, offset: (neteaseTopPlaylistCurrentPage.value - 1) * neteaseTopPlaylistLimitPerPage })
    console.log(data)
    neteaseTopPlaylistCardInfo.push(
      ...data.playlists.map(item => ({
        title: item.name,
        subtitle: item.description,
        id: item.id,
        coverImg: item.coverImgUrl
      }))
    )
  } catch (error) {
    console.error(error.cause)
  }
})()

</script>

<template>
  <div class="home-view-container">
    <div class="media-card-list">
      <media-card v-for="item in neteaseTopPlaylistCardInfo" :key="item.id" :item="item" />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.home-view-container {
  .media-card-list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
