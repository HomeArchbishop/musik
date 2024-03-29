<script setup>
import { reactive, ref } from 'vue'
import { neteaseApi } from '@/apis'

import MediaCard from '@/components/MediaCard.vue'
import MediaCardLoading from '@/components/MediaCardLoading.vue'
import LargeTipCard from '@/components/LargeTipCard.vue'
import SmallTipCard from '@/components/SmallTipCard.vue'

const neteaseTopPlaylistLimitPerPage = 50
const neteaseTopPlaylistCurrentPage = ref(1)
const neteaseTopPlaylistCardInfo = reactive([])
const neteaseTopPlaylistLoading = ref(false)
const isNeteaseTopPlaylistLoadFailed = ref(false)

async function getTopPlaylist () {
  if (neteaseTopPlaylistLoading.value) { return }
  neteaseTopPlaylistLoading.value = true
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
    neteaseTopPlaylistCurrentPage.value++
  } catch (error) {
    console.error(error)
    console.error(error.cause)
    isNeteaseTopPlaylistLoadFailed.value = true
  }
  neteaseTopPlaylistLoading.value = false
}

getTopPlaylist()

</script>

<template>
  <div class="home-view-container">
    <div class="top-playlist-area">
      <div class="media-card-list" v-if="!neteaseTopPlaylistCardInfo.length && !isNeteaseTopPlaylistLoadFailed">
        <media-card-loading v-for="i in 20" :key="i" />
      </div>
      <div class="media-card-list" v-else>
        <large-tip-card
          v-if="!neteaseTopPlaylistCardInfo.length && isNeteaseTopPlaylistLoadFailed"
          :title="$t('tips.somethingWrong')"
        >
          <small-tip-card background="transparent" @click.prevent="getTopPlaylist">{{ $t('tips.tryAgain') }}</small-tip-card>
        </large-tip-card>
        <media-card v-for="item in neteaseTopPlaylistCardInfo" :key="item.id" :item="item"/>
      </div>
      <div class="tip-box">
        <small-tip-card @click.prevent="getTopPlaylist" v-if="neteaseTopPlaylistCardInfo.length && !neteaseTopPlaylistLoading">{{ $t('tips.more') }}</small-tip-card>
        <small-tip-card :clickable="false" v-if="neteaseTopPlaylistCardInfo.length && neteaseTopPlaylistLoading">{{ $t('tips.loading') }}</small-tip-card>
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
  }
  .tip-box {
    display: flex;
    justify-content: center;
    width: 100%;
  }
}
</style>
