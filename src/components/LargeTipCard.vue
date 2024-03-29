<script setup>
defineProps({
  title: String,
  icon: String
})
</script>

<template>
  <div class="large-tip-container">
    <div class="large-tip-card">
      <div class="icon-sad">
        <div class="face">
          <div class="eye"></div>
          <div class="eye right"></div>
          <div class="mouth"></div>
        </div>
        <div class="shadow"></div>
      </div>
      <h1>{{ title }}</h1>
      <div class="slot-box"><slot></slot></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@import '@/styles/global.less';

.large-tip-container {
  width: 100%;
  padding-top: 32px;
  .large-tip-card {
    width: 245px;
    background: @color-block-1;
    border-radius: 20px;
    padding: 48px;
    margin: auto;
    .icon-sad {
      height: 55px;
      .face {
        position: relative;
        width: 55px;
        height: 55px;
        background: @color-block-1;
        border-radius: 50%;
        border: 1px solid #777777;
        margin: auto;
        .eye {
          position: absolute;
          width: 5px;
          height: 5px;
          background: #777777;
          border-radius: 50%;
          top: 40%;
          left: 20%;
          &.right {
            left: 68%;
          }
        }
        .mouth {
          position:absolute;
          top: 43%;
          left: 41%;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          top: 49%;
          border: 2px solid;
          border-color: #777777 transparent transparent #777777;
          transform: rotate(45deg);
        }
      }
    }
    h1 {
      margin: 24px 0;
      font-size: 24px;
      font-weight: 600;
      color: @color-text-sub;
      text-align: center;
    }
    .slot-box {
      width: fit-content;
      margin: auto;
    }
  }
}
</style>
