<template>
  <div class="text-body1 text-weight-bold">{{ notice.title }}</div>
  <div class="text-caption text-grey">{{ notice.meta }}</div>
  <q-separator class="q-my-md" />
  <div class="text-body2" v-html="notice.desc"></div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';
import axios from 'axios';
import { onMounted, ref } from 'vue';
import { Notice } from 'src/components/MainNoticeList.vue';

const route = useRoute();
const noticeId = route.params.noticeId as string;
const notice = ref<Notice>({
  id: '',
  title: '',
  desc: '',
  meta: '',
});

const loadData = () => {
  axios
    .post(`${process.env.API_URL}/getBoardDetail`, {
      boNo: noticeId,
    })
    .then(function (response) {
      notice.value = {
        id: response.data.boNo,
        title: response.data.boTi,
        desc: response.data.boCont,
        meta: response.data.boDt,
      };
    });
};

onMounted(loadData);
</script>

<style scoped>
.text-body2 {
  /* 자동 줄 바꿈 활성화 */
  word-wrap: break-word;
  /* 너비를 100%로 설정 */
  width: 100%;
}
</style>
