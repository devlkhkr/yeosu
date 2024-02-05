<template>
  <q-page>
    <div class="flex" style="gap: 8px">
      <div class="col text-center">
        <q-btn
          color="primary"
          class="full-width"
          label="예약"
          unelevated
          @click="
            () => {
              $router.push('/book');
            }
          "
        />
      </div>
      <div class="col text-center">
        <q-btn
          color="primary"
          class="full-width"
          label="예약확인"
          unelevated
          @click="
            () => {
              $router.push('/inquireReserve');
            }
          "
        />
      </div>
      <div class="col text-center">
        <q-btn
          color="primary"
          class="full-width"
          label="QnA"
          unelevated
          @click="
            () => {
              $router.push('/qna');
            }
          "
        />
      </div>
    </div>

    <ContSubTitle
      title="공지사항"
      :show-more="
        () => {
          $router.push('/notice');
        }
      "
    />
    <MainNoticeList
      v-for="(notice, index) in mainNoticeData"
      :key="index"
      :title="notice.title"
      :desc="notice.desc"
      :meta="notice.meta"
    />
  </q-page>
</template>

<script setup lang="ts">
import MainNoticeList from '../../components/MainNoticeList.vue';
import ContSubTitle from '../../components/ContSubTitle.vue';

const mainNoticeData = [
  {
    title: '공지사항1 제목',
    desc: '공지사항1 내용',
    meta: '2024-01-01',
  },
];
</script>
