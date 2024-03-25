<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

import NavBar from '@/components/NavBar.vue'
import SideBar from '@/components/SideBar.vue'
import PlayerBar from '@/components/PlayerBar.vue'

const store = useStore()

const theme = computed(() => store.state.storage.theme)
</script>

<template>
  <div id="rootWrapper" :class="theme">
    <nav-bar />
    <side-bar />
    <main class="main-view-area">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.fullPath" />
        </keep-alive>
        <component :is="Component" v-if="!$route.meta.keepAlive" />
      </router-view>
    </main>
    <player-bar />
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

#rootWrapper {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: @color-background-main;
  color: @color-text-default;
  main.main-view-area {
    position: absolute;
    z-index: 5;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: auto;
    padding: 62px 4vw 90px calc(200px + 4vw);
    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
