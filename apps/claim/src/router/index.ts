import type { RouteRecordName } from 'vue-router';

import { createRouter, createWebHashHistory } from 'vue-router';
import { routes } from 'vue-router/auto-routes';

import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import useRouteTransitionNameStore from '@/store/modules/routeTransitionName';
import useRouteCacheStore from '@/store/modules/routeCache';

NProgress.configure({ showSpinner: true, parent: '#app' });

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to: RouteRecordName, from, next) => {
  NProgress.start();
  const routeCacheStore = useRouteCacheStore();
  const routeTransitionNameStore = useRouteTransitionNameStore();

  if (to.path === '/') {
    next({
      name: 'Home'
    });
    return;
  }

  // if (!to.meta.ignoreLogin && to.path !== '/') {
  //   console.log(to, '登录跳转');
  //   next({
  //     name: 'Login',
  //     query: {
  //       back: to.path
  //     }
  //   });
  //   return;
  // }

  // Route cache
  routeCacheStore.addRoute(to);

  if (to.meta.level > from.meta.level) {
    routeTransitionNameStore.setName('slide-fadein-left');
  } else if (to.meta.level < from.meta.level) {
    routeTransitionNameStore.setName('slide-fadein-right');
  } else {
    routeTransitionNameStore.setName('');
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
