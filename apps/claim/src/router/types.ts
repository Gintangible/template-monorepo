import type { RouteLocationNormalized } from 'vue-router';

export interface EnhancedRouteLocation extends RouteLocationNormalized {
  meta: {
    level?: number | unknown
    name?: string
    keepAlive?: boolean
    // 扩展了全局守卫，因为definePage 宏不支持变量，需要给常量详情见 https://uvr.esm.is/guide/extending-routes.html
    /** 不校验登录情况 */
    ignoreLogin?: boolean
  }
}
