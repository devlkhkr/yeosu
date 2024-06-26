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
      {
        path: 'detail/:noticeId?',
        component: () => import('pages/notice/NoticeDetail.vue'),
        name: '공지사항 상세',
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
        name: '예약하기',
      },
      {
        path: 'regCustInfo',
        component: () => import('pages/book/RegCustInfo.vue'),
        name: '예약정보 입력',
      },
      {
        path: 'myTicketDetail/:rsvNo?',
        component: () => import('pages/book/MyTicketDetail.vue'),
        name: '나의 예약정보 상세',
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
        name: '나의 예약확인',
      },
      {
        path: 'myRsvList',
        component: () => import('pages/inquireReserve/myRsvList.vue'),
        name: '나의 예약 리스트',
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
  {
    path: '/pay',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/pay/tossPay.vue'),
        name: '결제',
      },
    ],
  },
  {
    path: '/reference',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/reference/IndexPage.vue'),
        name: '라이센스 및 오픈소스 저작권 정보',
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
