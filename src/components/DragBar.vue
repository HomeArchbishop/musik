<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['change'])

const props = defineProps({
  value: Number // max = 100
})

const dragValue = ref(props.value)
const dragBarOffset = computed(() => `${~~(dragValue.value)}%`)

const trackDom = ref(null)
const isDraging = ref(false)

function changeValue (nextValue) {
  dragValue.value = nextValue
  emit('change', nextValue)
}

function dragHandler (e) {
  const trackDomRect = trackDom.value.getBoundingClientRect()
  const percentage =
    Math.max(Math.min(~~((e.clientX - trackDomRect.x) / trackDomRect.width * 100), 100), 0)
  changeValue(percentage)
}

function startDrag () {
  isDraging.value = true
  document.addEventListener('mousemove', dragHandler)
  document.addEventListener('mouseup', () => {
    isDraging.value = false
    document.removeEventListener('mousemove', dragHandler)
  })
}

function directClickHandler (e) {
  const trackDomRect = trackDom.value.getBoundingClientRect()
  const percentage =
    Math.max(Math.min(~~((e.clientX - trackDomRect.x) / trackDomRect.width * 100), 100), 0)
  changeValue(percentage)
}
</script>

<template>
<div class="drag-bar-box" :class="{ actived: isDraging }">
  <div class="drag-bar-mask">
    <div
      class="drag-bar-track" ref="trackDom"
      @click="directClickHandler"
    ></div>
    <div class="drag-bar-thumb"
      @click="directClickHandler"
    ></div>
  </div>
  <div
    class="drag-bar-head"
    @mousedown="startDrag"
  ></div>
</div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.drag-bar-box {
  position: relative;
  height: 8px;
  width: 100%;
  .drag-bar-mask {
    position: absolute;
    left: 0;
    top: 2px;
    width: 100%;
    height: 4px;
    border-radius: 4px;
    overflow: hidden;
    .drag-bar-track {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 4px;
      background-color: @color-block-1;
    }
    .drag-bar-thumb {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 4px;
      border-radius: 4px;
      background-color: @color-block-3;
      transform: translateX(calc(v-bind(dragBarOffset) - 100%));
    }
  }
  .drag-bar-head {
    position: absolute;
    top: -2px;
    left: calc(v-bind(dragBarOffset) - 6px);
    width: 12px;
    height: 12px;
    border-radius: 12px;
    background-color: @color-block-3;
    opacity: 0;
    cursor: pointer;
  }
  &.actived .drag-bar-thumb,
  &:hover .drag-bar-thumb {
    background-color: @theme-color;
  }
  &.actived .drag-bar-head,
  &:hover .drag-bar-head {
    opacity: 1;
  }
}
</style>
