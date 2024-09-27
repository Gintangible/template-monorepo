<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { timeFormatInChinese } from '@gy/utils';
import dayjs from 'dayjs';

defineOptions({
  name: 'UpgradeNotify',
});

const props = defineProps({
  notifyDateRange: {
    type: Array,
    default: () => [],
  },
  diff: {
    type: String,
    default: 'minutes'
  },
});

const startTime = computed(() => {
  return timeFormatInChinese(props.notifyDateRange[0]);
});

const endTime = computed(() => {
  return timeFormatInChinese(props.notifyDateRange[1]);
});

const diffTime = computed(() => {
  const diffTime = dayjs(props.notifyDateRange[1]).diff(props.notifyDateRange[0], props.diff);
  const diffTextMap = {
    day: '天',
    hours: '小时',
    minutes: '分钟',
    seconds: '秒',
  };
  return diffTime + diffTextMap[props.diff];
});
</script>
<template>
  <div class="px-14px py-10px text-16 lh-24px text-#f00 border-rd-10px bg-white">
    <div>
      公告
    </div>
    <p class="indent-2em">
      <!-- eslint-disable-next-line -->
      理赔系统将于{{ notifyDateRange[0] | timeFormatInChinese }}更新维护，维护时长预计{{ diffTime }}，{{ notifyDateRange[1] | timeFormatInChinese }}恢复系统。
    </p>
    <p class="indent-2em">
      届时理赔服务将暂停使用。
    </p>
    <p class="indent-2em">
      在此期间给您带来的不便敬请谅解。
    </p>
  </div>
</template>

<style lang="scss" scoped>
</style>
