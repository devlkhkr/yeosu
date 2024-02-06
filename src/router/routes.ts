import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/main/IndexPage.vue'),
        name: '메인',
      },
    ],
  },
  {
    path: '/notice',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/notice/IndexPage.vue'),
        name: '공지사항',
      },
    ],
  },
  {
    path: '/book',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/book/IndexPage.vue'),
        name: '예약',
      },
    ],
  },
  {
    path: '/inquireReserve',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/inquireReserve/IndexPage.vue'),
        name: '예약확인',
      },
    ],
  },
  {
    path: '/qna',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/qna/IndexPage.vue'),
        name: '1:1 문의',
      },
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
