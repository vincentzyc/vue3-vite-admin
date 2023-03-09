import { USERINFO } from '@/assets/js/storage-keys';
import { easeout } from '@/utils/dom';
import { setSessionStorage } from '@/utils/storage';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const checkLogin = () => (window.location.href.includes('token=') ? '/login' : '/welcome');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: checkLogin(),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/Login.vue'),
  },
  {
    path: '/home',
    name: 'Layout',
    component: () => import('@/components/Layout/index.vue'),
    children: [
      {
        path: '/myPages',
        name: 'myPages',
        component: () => import('@/pages/MyPages/index.vue'),
      },
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/pages/Welcome.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: '404',
    component: () => import('@/pages/404.vue' /* webpackChunkName: "404" */),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next();
    return;
  }
  if (localStorage.getItem(USERINFO)) {
    next();
  } else {
    setSessionStorage('backUrl', window.location.href);
    next('/login');
  }
});

router.afterEach((to, from) => {
  if (to.name === from.name) return;
  if (window.dom_container) {
    easeout(window.dom_container, 0, 5);
  }
  const _paq = window['_paq'] || [];
  _paq.push(['setCustomUrl', to.path]);
  _paq.push(['trackPageView']);
});

export default router;
