<script setup lang="ts">
import { storeToRefs } from 'pinia';
import useRouteCache from '@/store/modules/routeCache';
import useRouteTransitionNameStore from '@/store/modules/routeTransitionName';

const routeTransitionNameStore = useRouteTransitionNameStore();
const { routeTransitionName } = storeToRefs(routeTransitionNameStore);

const appVersion = import.meta.env.APP_VERSION;
const keepAliveRouteNames = computed(() => {
  return useRouteCache().routeCaches as string[];
});

</script>

<template>
  <div class="w-full min-h-screen	bg-white">
    <router-view #="{ Component, route }">
      <transition :name="routeTransitionName">
        <keep-alive :include="keepAliveRouteNames">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </transition>
    </router-view>
    <van-divider class="fixed bottom-0 w-full color-#565656 ">
      {{ appVersion }}
    </van-divider>
  </div>
</template>
<style lang="scss" scoped>
</style>
