<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { FullLoading } from '@gy/components';
import { isDateInRange } from '@gy/utils';
import { serviceSetting } from '@/setting/serviceSetting';
import useRouteCache from '@/store/modules/routeCache';
import useRouteTransitionNameStore from '@/store/modules/routeTransitionName';

const routeTransitionNameStore = useRouteTransitionNameStore();
const { routeTransitionName } = storeToRefs(routeTransitionNameStore);

const appVersion = import.meta.env.APP_VERSION;
const keepAliveRouteNames = computed(() => {
  return useRouteCache().routeCaches as string[];
});

const loading = ref(true);

const router = useRouter();
onMounted(() => {
  loading.value = true;
  if (isDateInRange(serviceSetting.updateDateRange)) {
    router.replace({
      name: 'UpdateNotify',
    })
    loading.value = false;
    return;
  }
  loading.value = false;
});
</script>

<template>
  <div class="w-full min-h-screen	bg-white">
    <FullLoading v-if="loading" />
    <router-view v-else #="{ Component, route }">
      <transition :name="routeTransitionName">
        <keep-alive :include="keepAliveRouteNames">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </transition>
    </router-view>
    <van-divider class="fixed bottom-0 w-full color-#565656" safe-area-inset-bottom>
      {{ appVersion }}
    </van-divider>
  </div>
</template>
<style lang="scss" scoped>
</style>
