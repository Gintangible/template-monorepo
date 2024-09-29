<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import { Button } from 'vant';
import { omit } from 'lodash-es';
import { BtnGroupProps } from './types'

defineOptions({
  name: 'ButtonGroup',
});

const emits = defineEmits(['cancel', 'confirm']);

const props = defineProps<BtnGroupProps>({
  cancelVisible: Boolean,
  cancelText: {
    type: String,
    default: '返回'
  },
  confirmVisible: {
    type: Boolean,
    default: true,
  },
  confirmText: {
    type: String,
    default: '确定'
  },
});

const buttonProps = omit(props, ['text', 'native-type']);

function goBack() {
  emits('cancel');
}

function onConfirm() {
  emits('confirm');
}
</script>

<template>
  <div class="flex justify-around grow-1 btn-group">
    <van-button
      v-if="cancelVisible"
      v-bind="buttonProps"
      native-type="button"
      plain
      :text="cancelText"
      @click="goBack"
    />
    <van-button
      v-if="confirmVisible"
      v-bind="buttonProps"
      :text="confirmText"
      native-type="button"
      @click="onConfirm"
    />
  </div>
</template>

<style lang="less" scoped>
.btn-group {
  flex-basis: min(200px, calc((100% - 240px) / 2));
  .van-button:first-child:nth-last-child(1) { /* 只有一个子元素 */
    width: 55%;
  }
  .van-button:first-child:nth-last-child(2),
  .van-button:first-child:nth-last-child(2) ~ .van-button:nth-child(n+2)  { /* 有两个子元素 */
    width: 33%;
  }
}
</style>
