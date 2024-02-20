<template>
  <div class="text-body1 text-weight-bold">공지사항 타이틀</div>
  <div class="text-caption text-grey">2024-04-02</div>
  <q-separator class="q-my-md" />
  <div class="text-body2">
    공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다. 공지사항
    내용입니다. 공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.
    공지사항 내용입니다. 공지사항 내용입니다. 공지사항 내용입니다.
  </div>
</template>
<script setup lang="ts">
import { useRoute } from 'vue-router';

const route = useRoute();
const noticeId = route.params.noticeId as string;
console.log('noticeId:::', noticeId);
</script>
