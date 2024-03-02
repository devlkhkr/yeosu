<template>
  <q-page class="container">
    <SearchForm :form-options="formOptions" />
    <MainNoticeList :noticeList="mainNoticeData" class="q-mt-lg" />
    <q-scroll-observer @scroll="onScroll" />
  </q-page>
</template>

<script setup lang="ts">
import MainNoticeList from '../../components/MainNoticeList.vue';
import SearchForm, { IFSearchForm } from 'src/components/SearchForm.vue';
import axios from 'axios';
import { Notice } from 'src/components/MainNoticeList.vue';
import { onMounted, ref } from 'vue';

type MainNoticeData = Notice;

const formOptions: IFSearchForm = {
  items: [
    {
      name: 'boTi',
      title: '제목',
      type: 'string',
    },
    {
      name: 'boPeriod',
      title: '기간',
      type: 'period',
    },
  ],
  onSearch: (refItemsModel) => {
    console.log(refItemsModel);
  },
};

const mainNoticeData = ref<MainNoticeData[]>([]);

let currPage = 1;
const perPage = 10; // 한 페이지에 보여줄 데이터 개수

const loadData = () => {
  axios
    .post<{ boCd: string; boTi: string; boCont: string; boDt: string }[]>(
      `${process.env.API_URL}/getBoardList`,
      {
        currPage: currPage,
        perPage: String(perPage),
        boCd: '01',
      }
    )
    .then((response) => {
      if (response.data.length > 0) {
        mainNoticeData.value = [
          ...mainNoticeData.value,
          ...response.data.map((item) => ({
            id: item.boCd,
            title: item.boTi,
            desc: item.boCont,
            meta: item.boDt,
          })),
        ];
        currPage++;
      }
    });
};

const onScroll = () => {
  const scrollContainer = document.querySelector('.container') as HTMLElement;
  const scrollHeight = scrollContainer.clientHeight;
  const scrollTop = scrollContainer.scrollTop;
  const offsetHeight = scrollContainer.offsetHeight;
  const bottomThreshold = 50; // 스크롤이 얼마나 남았을 때 데이터를 로드할 지 설정

  if (scrollHeight - scrollTop - offsetHeight < bottomThreshold) {
    setTimeout(loadData, 500); // 데이터를 로드하기 전에 약간의 딜레이를 줌
  }
};

onMounted(loadData);
</script>
