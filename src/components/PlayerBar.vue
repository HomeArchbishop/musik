<script setup>
import { useStore } from 'vuex'
import { computed, ref, watch } from 'vue'

import { second2Readable } from '@/utils/second2Readable'
import { getThemeColor } from '@/utils/getThemeColor'

import DragBar from '@/components/DragBar.vue'

const store = useStore()

const playerbarBackgroundColorDefault = 'var(--color-block-3)'
const playerbarBackgroundColor = ref(playerbarBackgroundColorDefault)

const isShowPlayistView = ref(false)
const isShowLyricsView = computed(() => store.state.runtime.isShowLyricsView)
const playlist = computed(() => store.state.storage.player.playlist)
const currentPlayingIndex = computed(() => store.state.storage.player.currentPlayingIndex)
const playingMedia = computed(() => playlist.value[currentPlayingIndex])
const playtime = computed(() => store.state.storage.player.playtime)
const totaltime = computed(() => store.state.storage.player.totaltime)
const volume = computed(() => store.state.storage.player.volume)
const playtimeString = computed(() => second2Readable(playtime.value))
const totaltimeString = computed(() => second2Readable(totaltime.value))
const playtimePercentage = computed(() => ~~(playtime.value / totaltime.value * 100))

const isShowPronunciationLyrics = ref(false)
const isShowTranslationLyrics = ref(false)

function updatePlayerbarBackgroundColor () {
  if (playlist.value.length) {
    getThemeColor(playingMedia.value.album.coverImg)
      .then(colorStr => { playerbarBackgroundColor.value = colorStr })
      .catch(() => {
        playerbarBackgroundColor.value = playerbarBackgroundColorDefault
      })
  } else {
    playerbarBackgroundColor.value = playerbarBackgroundColorDefault
  }
}

function changePlaytime (nextPlaytimePercentage) {
  const nextPlaytime = ~~(nextPlaytimePercentage / 100 * totaltime.value)
  store.commit('storage/setPlaytime', { nextPlaytime })
}

function changeVolume (nextVolume) {
  store.commit('storage/setVolume', { nextVolume })
}

function toggleLyricsView () {
  if (!isShowLyricsView.value) {
    isShowPlayistView.value = false
  }
  store.commit('runtime/setLyricsView', { nextValue: !isShowLyricsView.value })
}

function togglePlaylistView () {
  isShowPlayistView.value = !isShowPlayistView.value
}

watch(playingMedia, () => {
  updatePlayerbarBackgroundColor()
})
</script>

<template>
  <div class="player-bar-container">
    <transition name="jumpout">
      <div class="fullscreen-area" v-show="isShowLyricsView">
        <div class="background"></div>
        <div class="background noise"></div>
        <div class="main-area">
          <div class="left">
            <div class="cover-group">
              <div class="cover-img-box">
                <img v-if="currentPlayingIndex + 1" :src="playingMedia.album.coverImg" alt="" onload="this.style.opacity=1">
                <div class="placeholder" v-else></div>
              </div>
            </div>
            <div class="info-group">
              <div class="title-box"><span>{{ playingMedia?.title ?? $t('player.noSong') }}</span></div>
              <div class="artist-album-box" v-if="currentPlayingIndex + 1">
                <span>{{ playingMedia.artists[0]?.name ?? '' }}</span>
                <span class="sep" v-if="playingMedia.artists.length && playingMedia.album.name">-</span>
                <span>{{ playingMedia.album.name }}</span>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="lyrics-words-group">
              <div class="placeholder-head"></div>
              <div
                class="lyric-piece"
                :class="{ actived: false /* TODO: active */ }"
                v-for="(originLyric, i) in store.state.runtime.lyrics.origin" :key="i"
              >
                <div class="main-line"><span>{{ originLyric }}</span></div>
                <div class="sub-line" v-if="isShowPronunciationLyrics"><span>{{ store.state.runtime.lyrics.pronunciation[i] }}</span></div>
                <div class="sub-line" v-if="isShowTranslationLyrics"><span>{{ store.state.runtime.lyrics.translation[i] }}</span></div>
              </div>
              <div class="placeholder-tail"></div>
            </div>
            <div class="tool-group"></div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="fadein">
      <div class="playlist-cover" v-show="isShowPlayistView" @click="togglePlaylistView"></div>
    </transition>
    <transition name="slideup">
      <div class="playlist-area" v-show="isShowPlayistView" :lyric-mode="isShowLyricsView">
        <div class="head">
          <h1>{{
            playlist.length ?
            $tc('player.cnt', playlist.length, [playlist.length]) :
            $t('player.playlist')
          }}</h1>
        </div>
        <div class="main-list">
          <div
            class="media-item-box"
            :class="{ actived: i === currentPlayingIndex }"
            v-for="(item, i) in playlist" :key="i"
          >
            <div class="title-group">{{ item.title }}</div>
            <div class="artist-group">{{ item.artists[0].name }}</div>
            <div class="tool-group">
              <button class="remove-btn">{{ $t('player.remove') }}</button>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <div class="footer-area" :lyric-mode="isShowLyricsView">
      <div class="media-info-group" :lyric-mode="isShowLyricsView">
        <div class="cover-box">
          <img v-if="currentPlayingIndex + 1" :src="playingMedia.album.coverImg" alt="">
          <div class="placeholder" v-else></div>
        </div>
        <div class="title-artist-group">
          <div class="title-box"><span>{{ playingMedia?.title ?? $t('player.noSong') }}</span></div>
          <div class="artist-box" v-if="currentPlayingIndex + 1"><span>{{  playingMedia.artists.map(a => a.name).join(',') }}</span></div>
        </div>
      </div>
      <div class="controller-group" :lyric-mode="isShowLyricsView">
        <div class="pause-controller-group">
          <div class="controller-left-group">
            <button class="back-media-btn"><f-icon icon="backward-step" /></button>
          </div>
          <button class="pause-btn"><f-icon icon="pause" /></button>
          <div class="controller-right-group">
            <button class="next-media-btn"><f-icon icon="forward-step" /></button>
          </div>
        </div>
        <div class="progress-controller-group">
          <div class="progress-playtime-box"><span>{{ playtimeString }}</span></div>
          <drag-bar :value="playtimePercentage" @change="changePlaytime" />
          <div class="progress-totaltime-box"><span>{{ totaltimeString }}</span></div>
        </div>
      </div>
      <div class="tool-group" :lyric-mode="isShowLyricsView">
        <button
          class="playlist-btn"
          :class="{ actived: isShowPlayistView }"
          @click="togglePlaylistView"
          v-show="!isShowLyricsView"
        ><f-icon icon="bars" /></button>
        <button class="play-mode-btn"><f-icon icon="repeat" /></button>
        <div class="volume-group">
          <button class="volume-btn"><f-icon icon="volume-off" /></button>
          <drag-bar :value="volume" @change="changeVolume" />
        </div>
        <button
          class="lyrics-view-btn"
          :class="{ 'upside-down': isShowLyricsView }"
          @click="toggleLyricsView"
        ><f-icon icon="angle-up" /></button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

@footer-area-height: 72px;

.player-bar-container {
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 10;
  bottom: 0;
  left: 0;
  right: 0;
  .fullscreen-area { /* show by v-show */
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: -1;
      background-color: v-bind(playerbarBackgroundColor);
      filter: brightness(110%);
      &.noise {
        background: linear-gradient(transparent 0, @color-background-playerbar calc(100% - @footer-area-height)), @background-noise;
      }
    }
    .main-area {
      display: flex;
      flex-direction: row;
      height: 100%;
      padding: 32px 0 24px+@footer-area-height 0;
      .left {
        display: flex;
        flex-direction: column;
        align-items: center;
        flex-basis: 40%;
        height: 100%;
        padding: 135px 20px 0 140px;
        transition: .2s;
        --cover-size: 360px;
        @media screen and (max-width: 1250px) {
          padding-left: 40px;
        }
        @media screen and (max-height: 830px) {
          padding-top: 70px;
        }
        @media screen and (max-height: 630px) {
          --cover-size: 220px;
        }
        @cover-size: var(--cover-size);
        .cover-group {
          width: @cover-size;
          height: @cover-size;
          .cover-img-box {
            img {
              width: @cover-size;
              height: @cover-size;
              border-radius: 10px;
              opacity: 0;
              background: @color-block-1;
            }
            .placeholder {
              width: @cover-size;
              height: @cover-size;
              border-radius: 10px;
              background: @color-block-1;
            }
          }
        }
        .info-group {
          display: flex;
          flex-direction: column;
          width: @cover-size;
          margin-top: 32px;
          @media screen and (max-height: 830px) {
            margin-top: 24px;
            .title-box span {
              font-size: 20px !important;
            }
          }
          .title-box span {
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            font-size: 24px;
            overflow: hidden;
            margin-bottom: 12px;
            font-weight: 600;
          }
          .artist-album-box span {
            font-size: 12px;
            font-weight: 400;
            color: @color-text-sub;
            &.sep::before,
            &.sep::after {
              content: '';
              margin: 0 4px;
            }
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        flex-basis: 60%;
        position: relative;
        height: 100%;
        padding: 0 24px;
        .lyrics-words-group {
          height: 100%;
          padding: 0 20%;
          flex-basis: 100%;
          overflow: auto;
          scrollbar-width: none;
          transition: .2s;
          @media screen and (max-width: 1250px) {
            padding: 0 10%;
          }
          .lyric-piece {
            margin: 24px 0;
            .main-line {
              font-size: 20px;
              font-weight: 600;
              margin: 8px;
            }
            .sub-line {
              font-size: 15px;
              font-weight: 400;
              margin: 8px;
            }
            &.actived {
              .main-line {
                font-size: 28px;
              }
              .sub-line {
                font-size: 21px;
              }
            }
          }
          .placeholder-head {
            width: 100%;
            height: 40%;
          }
          .placeholder-tail {
            width: 100%;
            height: 50%;
          }
        }
        .tool-group {
          position: absolute;
          bottom: 0;
          right: 24px;
          width: 48px;
          height: 48px;
        }
      }
    }
  }
  .playlist-cover {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: @color-shadow-mask;
  }
  .playlist-area {
    position: absolute;
    right: 16px;
    bottom: @footer-area-height + 16px;
    width: 530px;
    height: 500px;
    border-radius: 10px;
    background: @color-block-4;
    backdrop-filter: saturate(180%) blur(20px);
    .head {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      padding: 30px;
      h1 {
        padding: 0 20px;
        font-size: 24px;
        font-weight: 600;
      }
    }
    .main-list {
      padding: 0 30px;
      overflow: auto;
      height: 370px;
      scrollbar-width: none;
      .media-item-box {
        display: flex;
        align-items: center;
        height: 50px;
        border-radius: 10px;
        padding: 10px 10px 10px 20px;
        transition: .3s;
        &:hover {
          background: @color-block-2;
        }
        &.actived {
          background: @color-block-2;
        }
        .title-group {
          flex-basis: 70%;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 15px;
          font-weight: 400;
          padding-right: 10px;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .artist-group {
          flex: 1;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-size: 13px;
          font-weight: 400;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
        .tool-group {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 30px;
          .__btn {
            height: 30px;
            width: 30px;
            font-size: 24px;
            color: @color-text-sub;
            cursor: pointer;
            &:hover {
              color: @color-text-default;
            }
          }
          .__text-btn {
            width: fit-content !important;
            font-size: 12px !important;
          }
          .remove-btn {
            .__btn;
            .__text-btn;
          }
        }
      }
    }
  }
  .footer-area {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: @footer-area-height;
    background-color: @color-background-playerbar;
    transition: background-color linear .2s;
    &[lyric-mode=true] {
      background-color: transparent;
    }
    .media-info-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      align-items: center;
      flex: 0 0 30%;
      padding-left: 16px;
      overflow: hidden;
      transition: .2s;
      &[lyric-mode=true] {
        flex: 0 0 0;
        padding: 0;
        white-space: nowrap;
        opacity: 0;
      }
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
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          font-size: 15px;
          font-weight: 300;
          overflow: hidden;
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
      flex-basis: 40%;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: .2s;
      &[lyric-mode=true] {
        padding: 0 0 0 80px;
        flex-basis: 60%;
      }
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
        .back-media-btn,
        .next-media-btn {
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
      }
    }
    .tool-group {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      flex-basis: 30%;
      column-gap: 8px;
      padding: 0 16px;
      transition: .2s;
      &[lyric-mode=true] {
        flex-basis: 40%;
      }
      .__btn {
        display: inline-block;
        font-size: 16px;
        color: @color-text-1;
        cursor: pointer;
        transition: .2s;
        &:hover {
          color: @color-text-default;
        }
        &.upside-down {
          transform: rotate(180deg);
        }
        &.actived {
          color: @theme-color;
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
      }
      .play-mode-btn,
      .playlist-btn {
        .__btn;
        margin-right: 8px;
      }
      .lyrics-view-btn {
        .__btn;
        margin-left: 32px;
        margin-right: 8px;
      }
    }
  }
}

.jumpout-enter-active,
.jumpout-leave-active {
  transition: linear .2s;
  .background {
    transition: linear .2s;
  }
}

.jumpout-enter-from,
.jumpout-leave-to {
  transform: translateY(100%);
  *:not(.background) {
    opacity: 0;
  }
  .background {
    transform: translateY(-100%);
  }
}

.fadein-enter-active,
.fadein-leave-active {
  transition: linear .1s;
}

.fadein-enter-from,
.fadein-leave-to {
  opacity: 0;
}

.slideup-enter-active,
.slideup-leave-active {
  transition: ease-in-out .1s;
}

.slideup-enter-from,
.slideup-leave-to {
  transform: translateY(100%);
}

</style>
