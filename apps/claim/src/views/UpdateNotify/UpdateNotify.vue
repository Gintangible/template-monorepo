<script setup lang="ts">
import { UpdateNotify } from '@gy/components';
import { serviceSetting } from '@/setting/serviceSetting';

definePage({
  name: 'UpdateNotify',
  path: '/update-notify',
  meta: {
    title: '升级公告',
  },
});

const notifyDateRange=serviceSetting.updateDateRange;
</script>

<template>
  <div>
    <update-notify :notifyDateRange="notifyDateRange" diff="hours" />
  </div>
</template>
<style lang="scss" scoped>
</style>
