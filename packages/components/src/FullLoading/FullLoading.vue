
<script setup lang="ts">
import { Loading } from 'vant';

defineOptions({
  name: 'FullLoading',
});

</script>
<template>
  <div class="flex justify-center items-center h-screen">
    <van-loading size="24px" vertical>加载中...</van-loading>
  </div>
</template>

<style lang="scss" scoped>
</style>
