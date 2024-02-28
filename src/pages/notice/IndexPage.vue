<template>
  <SearchForm :form-options="formOptions" />
  <q-infinite-scroll @load="onLoad" :offset="250">
    <MainNoticeList :noticeList="mainNoticeData" class="q-mt-lg" />
    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script setup lang="ts">
import MainNoticeList from '../../components/MainNoticeList.vue';
import SearchForm, { IFSearchForm } from 'src/components/SearchForm.vue';
// import { onMounted } from 'vue';
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

let currPage = 1;

const onLoad = (index, done) => {
  console.log(index);
  console.log(done);
  index++;
  // setTimeout(() => {
  //   axios
  //     .post(`${process.env.API_URL}/getBoardList`, {
  //       currPage: currPage,
  //       perPage: '3',
  //       boCd: '01',
  //     })
  //     .then((response) => {
  //       if (response.data.length > 0) {
  //         currPage++;
  //         console.log('responsedata', response.data);
  //         console.log('currPage:', currPage);
  //         for (let i = 0; i < response.data.length; i++) {
  //           const notice = {
  //             id: response.data[i].boCd,
  //             title: response.data[i].boTi,
  //             desc: response.data[i].boCont,
  //             meta: response.data[i].boDt,
  //           };
  //           mainNoticeData.value.push(notice);
  //         }
  //       }
  //     });
  //   done();
  // }, 2000);
};
</script>
