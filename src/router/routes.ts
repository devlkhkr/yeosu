import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/main/IndexPage.vue') },
    ],
  },
  {
    path: '/notice',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/notice/IndexPage.vue') },
    ],
  },
  {
    path: '/book',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/book/IndexPage.vue') },
    ],
  },
  {
    path: '/inquireReserve',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/inquireReserve/IndexPage.vue'),
      },
    ],
  },
  {
    path: '/qna',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/qna/IndexPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
