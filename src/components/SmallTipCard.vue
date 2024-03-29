<script setup>
defineProps({
  title: String,
  background: {
    type: String,
    default: 'var(--color-block-1)'
  },
  clickable: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="small-tip-card" :class="{ clickable }">
    <span><slot></slot></span>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.small-tip-card {
  width: fit-content;
  min-width: 120px;
  padding: 8px 16px;
  font-size: 18px;
  color: @color-text-sub;
  background-color: v-bind(background);
  text-align: center;
  border-radius: 4px;
  margin: 8px 0;
  &.clickable:hover {
    cursor: pointer;
    text-decoration: underline;
  }
}
</style>
