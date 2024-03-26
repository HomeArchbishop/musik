<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const store = useStore()

const currentTheme = ref(store.state.storage.theme)
const currentLang = ref(store.state.storage.lang)

function setTheme (nextTheme) {
  store.commit('storage/setTheme', { nextTheme })
}

function setLang (nextLang) {
  locale.value = nextLang
  store.commit('storage/setLang', { nextLang })
}
</script>

<template>
  <div class="setting-view-container">
    <div class="view-title-group">
      <div class="title-box">
        <h1>{{ $t('settingView.settings') }}</h1>
      </div>
    </div>
    <div class="line-group">
      <div class="line-title-box"><span>{{ $t('settingView.theme') }}</span></div>
      <div class="line-content-box">
        <div class="left">
          <span>{{ $t('settingView.themeDesc') }}</span>
        </div>
        <div class="right">
          <select name="theme" v-model="currentTheme" @change="setTheme(currentTheme)">
            <option value="light-theme">{{ $t('settingView.lightTheme') }}</option>
            <option value="dark-theme">{{ $t('settingView.darkTheme') }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="line-group">
      <div class="line-title-box"><span>{{ $t('settingView.lang') }}</span></div>
      <div class="line-content-box">
        <div class="left">
          <span>{{ $t('settingView.langDesc') }}</span>
        </div>
        <div class="right">
          <select name="lang" v-model="currentLang" @change="setLang(currentLang)">
            <option value="en">{{ $t('settingView.en') }}</option>
            <option value="zh-cn">{{ $t('settingView.zhcn') }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.setting-view-container {
  display: flex;
  flex-direction: column;
  row-gap: 24px;
  .view-title-group {
    padding: 32px 0 16px 0;
    .title-box h1 {
      font-size: 32px;
      font-weight: 700;
    }
  }
  .line-group {
    display: grid;
    row-gap: 8px;
    height: 62px;
    .line-title-box {
      display: flex;
      align-items: center;
      height: 22px;
      span {
        font-size: 16px;
        font-weight: 700;
      }
    }
    .line-content-box {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 32px;
      .left {
        span {
          font-size: 14px;
          color: @color-text-sub;
        }
      }
      .right {
        height: 32px;
      }
    }
  }
}

select {
  background-color: @color-block-1;
  color: @color-text-sub;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  height: 32px;
  letter-spacing: .24px;
  padding: 0 32px 0 12px;
  width: 100%;
  outline: none;
}
</style>
