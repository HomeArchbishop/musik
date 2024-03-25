<script setup>
defineProps({
  index: Number,
  item: {
    title: String,
    subtitle: String,
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
</script>

<template>
  <div class="media-line-card-container">
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
          <span v-for="artist in item.artists" :key="artist.id">{{ artist.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.media-line-card-container {
  display: grid;
  grid-template-columns: [index] 16px [first] minmax(120px,6fr) [var1] minmax(120px,4fr) [var2] minmax(120px,3fr) [last] minmax(120px,1fr);
  grid-gap: 16px;
  padding: 0 16px;
  height: 56px;
  padding: 0 16px;
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
        font-size: 14px;
        font-weight: 300;
      }
      .artist-box span {
        font-size: 12px;
        font-weight: 100;
      }
    }
  }
}
</style>
