<template>
  <SearchForm :form-opions="formOptions" />
  <MainNoticeList :noticeList="mainNoticeData" class="q-mt-lg" />
</template>

<script setup lang="ts">
import MainNoticeList from '../../components/MainNoticeList.vue';
import SearchForm, { IFSearchForm } from 'src/components/SearchForm.vue';
import { onMounted } from 'vue';
import axios from 'axios';
import { Notice } from 'src/components/MainNoticeList.vue';
import { ref } from 'vue';

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

const mainNoticeData = ref<Notice[]>([]);

onMounted(() => {
  axios
    .post(`${process.env.API_URL}/getBoardList`, {
      currPage: '1',
      perPage: '7',
      boCd: '01',
    })
    .then(function (response) {
      for (let i = 0; i < response.data.length; i++) {
        const notice = {
          id: response.data[i].boCd,
          title: response.data[i].boTi,
          desc: response.data[i].boCont,
          meta: response.data[i].boDt,
        };

        mainNoticeData.value.push(notice);
      }
    });
});
</script>
