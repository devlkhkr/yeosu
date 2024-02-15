<template>
  <SearchForm :form-opions="formOptions" />
  <MainNoticeList :noticeList="mainNoticeData" class="q-mt-lg" />
</template>

<script setup lang="ts">
import MainNoticeList from '../../components/MainNoticeList.vue';
import SearchForm from 'src/components/SearchForm.vue';

const formOptions = {
  items: [
    {
      name: 'title',
      title: '제목',
      type: 'string',
    },
  ],
  onSearch: () => {
    alert();
  },
};

const mainNoticeData = [
  {
    title: '공지사항1 제목',
    desc: '공지사항1 내용',
    meta: '2024-01-01',
  },
  {
    title: '공지사항2 제목',
    desc: '공지사항2 내용',
    meta: '2024-01-01',
  },
  {
    title: '공지사항3 제목',
    desc: '공지사항3 내용',
    meta: '2024-01-01',
  },
];
</script>
