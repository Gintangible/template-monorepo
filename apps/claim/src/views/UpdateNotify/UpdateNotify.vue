<script setup lang="ts">
import { UpdateNotify } from '@gy/components';

definePage({
  name: 'UpdateNotify',
  path: '/update-notify',
  meta: {
    title: '升级公告',
  },
});

const notifyDateRange=['2024-09-27', '2024-09-27']
</script>

<template>
  <div>
    <update-notify :notifyDateRange="notifyDateRange"  />
  </div>
</template>
<style lang="scss" scoped>
</style>
