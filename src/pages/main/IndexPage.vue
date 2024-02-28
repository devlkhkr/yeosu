<template>
  <q-page>
    <MainBanner />
    <div class="q-pa-md q-mb-lg">
      <WaveButton
        title="예약하기"
        @click="
          () => {
            $router.push('/book');
          }
        "
      />
      <div class="flex q-mt-sm" style="gap: 8px">
        <div class="col text-center">
          <q-btn
            color="primary"
            class="full-width"
            label="나의 예약확인"
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
            label="1:1 문의"
            unelevated
            @click="
              () => {
                $router.push('/qna');
              }
            "
          />
        </div>
      </div>
      <div class="relative-position">
        <CircleBg>
          <div class="">
            <ContSubTitle
              title="공지사항"
              :show-more="
                () => {
                  $router.push('/notice');
                }
              "
            />
            <MainNoticeList :noticeList="mainNoticeData" />
            <ContSubTitle title="오시는 길" />
            <KakaoMap />
          </div>
        </CircleBg>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import MainNoticeList from '../../components/MainNoticeList.vue';
import ContSubTitle from '../../components/ContSubTitle.vue';
import MainBanner from './MainBanner.vue';
import WaveButton from 'src/components/WaveButton.vue';
import CircleBg from 'src/components/CircleBg.vue';
import KakaoMap from 'src/pages/main/KakaoMap.vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { Notice } from 'src/components/MainNoticeList.vue';
import { ref } from 'vue';

const mainNoticeData = ref<Notice[]>([]);

onMounted(() => {
  axios
    .post(`${process.env.API_URL}/getBoardList`, {
      currPage: '1',
      perPage: '3',
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
