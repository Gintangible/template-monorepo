<script lang="ts" setup>
import errorImage from '@/assets/images/err_404.png';

const router = useRouter();

function goHome() {
  router.replace('/');
}
</script>

<template>
  <div class="w-full min-h-screen flex justify-center items-center">
    <div class="text-12 color-#ccc text-center">
      <van-image :src="errorImage" />
      <div class="pt-18">
        咦…
      </div>
      <div class="pt-16">
        正在努力升级系统<br> 稍等一下下，马上回来
      </div>
      <van-button
        class="pt-16"
        size="small"
        type="info"
        @click="goHome"
      >
        回到首页
      </van-button>
    </div>
  </div>
</template>