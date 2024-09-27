<script setup lang="ts">
const appVersion = import.meta.env.APP_VERSION;
</script>

<template>
  <div class="w-full min-h-screen	bg-white">
    <router-view #="{ Component, route }">
      <!-- <transition :name="routeTransitionName">
        <keep-alive :include="keepAliveRouteNames">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </transition> -->
    </router-view>
    <router-view />
    <van-divider class="fixed bottom-0 w-full color-#565656 ">
      {{ appVersion }}
    </van-divider>
  </div>
</template>
<style lang="scss" scoped>
</style>
