<template>
  <SearchForm :form-opions="formOptions" />
  <MainNoticeList :noticeList="mainNoticeData" class="q-mt-lg" />
</template>

<script setup lang="ts">
import MainNoticeList from '../../components/MainNoticeList.vue';
import SearchForm, { IFSearchForm } from 'src/components/SearchForm.vue';

const formOptions: IFSearchForm = {
  items: [
    {
      name: 'title',
      title: '제목',
      type: 'string',
    },
  ],
  onSearch: (refItemsModel) => {
    console.log(refItemsModel);
  },
};

const mainNoticeData = [
  {
    id: '1',
    title: '공지사항1 제목',
    desc: '공지사항1 내용',
    meta: '2024-01-01',
  },
  {
    id: '2',
    title: '공지사항2 제목',
    desc: '공지사항2 내용',
    meta: '2024-01-01',
  },
  {
    id: '3',
    title: '공지사항3 제목',
    desc: '공지사항3 내용',
    meta: '2024-01-01',
  },
];
</script>
