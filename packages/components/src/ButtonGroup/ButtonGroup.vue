<script setup lang="ts">
import { defineProps, defineEmits, useAttrs } from 'vue';
import { Button } from 'vant';
import { omit } from 'lodash-es';

defineOptions({
  name: 'ButtonGroup',
});
const emits = defineEmits(['cancel', 'confirm']);

defineProps({
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

const attrs = useAttrs();
const buttonProps = omit(attrs, ['text', 'native-type', 'class', 'style']);

function goBack() {
  emits('cancel');
}

function onConfirm() {
  emits('confirm');
}
</script>

<template>
  <div class="flex justify-around grow-1 btn-group">
    <Button
      v-if="cancelVisible"
      v-bind="buttonProps"
      native-type="button"
      plain
      :text="cancelText"
      @click="goBack"
    />
    <Button
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
