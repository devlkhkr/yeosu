<template>
  <div class="text-body1 text-weight-bold">공지사항 타이틀</div>
  <div class="text-caption text-grey">2024-04-02</div>
  <q-separator class="q-my-md" />
  <div class="text-body2">
    {{}}
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const route = useRoute();
const noticeId = route.params.noticeId as string;
console.log('noticeId:::', noticeId);

const loadData = () => {
  // axios
  //   .post<{ boCd: string; boTi: string; boCont: string; boDt: string }[]>(
  //     `${process.env.API_URL}/getBoardList`,
  //     {
  //       boNo: noticeId,
  //     }
  //   )
  //   .then((response) => {
  //     if (response.data.length > 0) {
  //       mainNoticeData.value = [
  //         ...mainNoticeData.value,
  //         ...response.data.map((item) => ({
  //           id: item.boNo,
  //           title: item.boTi,
  //           desc: item.boCont,
  //           meta: item.boDt,
  //         })),
  //       ];
  //       if (response.data.length < perPage) {
  //         flag = false;
  //       }
  //       currPage++;
  //     } else {
  //       flag = false;
  //     }
  //   });
};

onMounted(loadData);
</script>
