declare module 'vue-router' {
  interface RouteMeta {
    /** page title */
    title?: string
    /** i18n key */
    i18n?: string
    /** keepalive */
    keepAlive?: boolean

    /** 不校验登录情况 */
    ignoreLogin?: boolean

  }
}
export {};
