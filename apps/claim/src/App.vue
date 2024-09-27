<script setup lang="ts">
const appVersion = import.meta.env.APP_VERSION;
</script>

<template>
  <div >
    <router-view />
    <van-divider class="fixed bottom-0 color-#565656 ">
      {{ appVersion }}
    </van-divider>
  </div>
</template>
<style lang="scss" scoped>
</style>
