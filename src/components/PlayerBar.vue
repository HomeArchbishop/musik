<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

import { second2Readable } from '@/utils/second2Readable'

const store = useStore()

const playlist = computed(() => store.state.storage.player.playlist)
const currentPlayingIndex = computed(() => store.state.storage.player.currentPlayingIndex)
const playtime = computed(() => second2Readable(store.state.storage.player.playtime))
const totaltime = computed(() => second2Readable(store.state.storage.player.totaltime))

</script>

<template>
  <div class="player-bar-container">
    <div class="media-info-group">
      <div class="cover-box">
        <img v-if="currentPlayingIndex + 1" :src="playlist[currentPlayingIndex].album.coverImg" alt="">
        <div class="placeholder" v-else></div>
      </div>
      <div class="title-artist-group">
        <div class="title-box"><span>{{ playlist[currentPlayingIndex]?.title ?? $t('player.noSong') }}</span></div>
        <div class="artist-box" v-if="currentPlayingIndex + 1"><span>{{  playlist[currentPlayingIndex].artists.join(',') }}</span></div>
      </div>
    </div>
    <div class="controller-group">
      <div class="pause-controller-group">
        <div class="controller-left-group">
          <button class="play-mode-btn"><f-icon icon="repeat" /></button>
          <button class="back-media-btn"><f-icon icon="backward-step" /></button>
        </div>
        <button class="pause-btn"><f-icon icon="pause" /></button>
        <div class="controller-right-group">
          <button class="next-media-btn"><f-icon icon="forward-step" /></button>
          <button class="playlist-btn"><f-icon icon="bars" /></button>
        </div>
      </div>
      <div class="progress-controller-group">
        <div class="progress-playtime-box"><span>{{ playtime }}</span></div>
        <div class="progress-bar-box">
          <div class="progress-bar-mask">
            <div class="progress-bar-track"></div>
            <div class="progress-bar-thumb"></div>
          </div>
          <div class="progress-bar-head"></div>
        </div>
        <div class="progress-totaltime-box"><span>{{ totaltime }}</span></div>
      </div>
    </div>
    <div class="tool-group">
      <div class="volume-group">
        <button class="volume-btn"><f-icon icon="volume-off" /></button>
        <div class="volume-bar-box">
          <div class="volume-bar-mask">
            <div class="volume-bar-track"></div>
            <div class="volume-bar-thumb"></div>
          </div>
          <div class="volume-bar-head"></div>
        </div>
      </div>
      <button class="lyrics-view-btn"><f-icon icon="angle-up" /></button>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.player-bar-container {
  display: grid;
  grid-template-columns: 30% 40% 30%;
  flex-direction: row;
  align-items: center;
  position: absolute;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: @color-background-playerbar;
  height: 72px;
  .media-info-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    align-items: center;
    flex: 1;
    padding-left: 16px;
    .cover-box {
      .placeholder {
        width: 56px;
        height: 56px;
        border-radius: 4px;
        background: @color-block-1;
      }
      img {
        width: 56px;
        height: 56px;
        border-radius: 4px;
      }
    }
    .title-artist-group {
      margin-left: 12px;
      .title-box span {
        font-size: 15px;
        font-weight: 300;
      }
      .artist-box span {
        font-size: 12px;
        font-weight: 100;
        color: @color-text-1;
      }
    }
  }
  .controller-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .pause-controller-group {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      column-gap: 16px;
      height: 32px;
      width: 100%;
      margin-bottom: 8px;
      .__controller-group {
        display: flex;
        flex-direction: row;
        column-gap: 8px;
        flex: 1;
      }
      .controller-left-group {
        .__controller-group;
        justify-content: flex-end;
      }
      .controller-right-group {
        .__controller-group;
        justify-content: flex-start;
      }
      .play-mode-btn,
      .back-media-btn,
      .next-media-btn,
      .playlist-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        color: @color-text-1;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          color: @color-text-default;
        }
      }
      .pause-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 32px;
        height: 32px;
        transition: none 33ms cubic-bezier(.3,0,0,1);
        color: @color-text-reverse;
        background-color: @color-block-3;
        border-radius: 32px;
        font-size: 18px;
        cursor: pointer;
        &:hover {
          transform: scale(1.06);
        }
      }
    }
    .progress-controller-group {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      column-gap: 8px;
      height: 16px;
      width: 100%;
      .__progress-time-box--span {
        font-size: 12px;
        font-family: CircularSpTitle-Bold;
        color: @color-text-1;
        width: 40px;
      }
      .progress-playtime-box span {
        .__progress-time-box--span;
        text-align: right;
      }
      .progress-totaltime-box span {
        .__progress-time-box--span;
        text-align: left;
      }
      .progress-bar-box {
        position: relative;
        height: 4px;
        flex: 1;
        .progress-bar-mask {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 4px;
          border-radius: 4px;
          overflow: hidden;
          .progress-bar-track {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 4px;
            background-color: @color-block-1;
          }
          .progress-bar-thumb {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 4px;
            border-radius: 4px;
            background-color: @color-block-3;
            transform: translateX(-40%);
          }
        }
        .progress-bar-head {
          position: absolute;
          top: -4px;
          right: calc(40% - 6px);
          width: 12px;
          height: 12px;
          border-radius: 12px;
          background-color: @color-block-3;
          cursor: pointer;
        }
        &:hover .progress-bar-thumb {
          background-color: @theme-color;
        }
      }
    }
  }
  .tool-group {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    column-gap: 8px;
    padding: 0 16px;
    .__btn {
      display: inline-block;
      font-size: 16px;
      color: @color-text-1;
      cursor: pointer;
      &:hover {
        color: @color-text-default;
      }
    }
    .volume-group {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      column-gap: 8px;
      height: 16px;
      width: 94px;
      .volume-btn {
        .__btn;
      }
      .volume-bar-box {
        position: relative;
        height: 4px;
        flex: 1;
        .volume-bar-mask {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 4px;
          border-radius: 4px;
          overflow: hidden;
          .volume-bar-track {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 4px;
            background-color: @color-block-1;
          }
          .volume-bar-thumb {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 4px;
            border-radius: 4px;
            background-color: @color-block-3;
            transform: translateX(-40%);
          }
        }
        .volume-bar-head {
          position: absolute;
          top: -4px;
          right: calc(40% - 6px);
          width: 12px;
          height: 12px;
          border-radius: 12px;
          background-color: @color-block-3;
          cursor: pointer;
        }
      }
      &:hover .volume-bar-thumb,
      & .volume-btn:hover + div .volume-bar-thumb {
        background-color: @theme-color !important;
      }
    }
    .lyrics-view-btn {
      .__btn;
      margin-left: 32px;
      margin-right: 8px;
    }
  }
}
</style>
