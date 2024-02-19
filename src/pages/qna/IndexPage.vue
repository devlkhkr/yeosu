<template>
  <div>
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        class="q-py-sm"
        v-for="(qna, index) in refQnaList"
        :key="index"
      >
        <template v-slot:header>
          <q-item-section side>
            <span
              class="text-caption"
              v-bind:class="{
                'text-green': qna.aDtl,
              }"
              >{{ qna.aDtl ? '답변완료' : '답변대기' }}</span
            >
          </q-item-section>

          <q-item-section>
            <div style="line-height: 1.25">
              {{ qna.title }}
            </div>
            <div
              class="flex text-caption text-grey-7 q-mt-sm"
              style="gap: 12px"
            >
              <span>{{ qna.usrNm }}</span>
              <q-separator vertical color="grey-3" />
              <span>{{ qna.regDate }}</span>
              <q-separator vertical color="grey-3" v-if="qna.prvtYn === 'Y'" />
              <span class="flex items-center" style="gap: 4px"
                ><q-icon
                  :name="qna.prvtYn === 'Y' ? 'o_lock' : ''"
                  color="amber"
                /><span>{{ qna.prvtYn === 'Y' ? '비공개' : '' }}</span></span
              >
            </div>
          </q-item-section>
        </template>

        <q-card class="bg-b9c9df80 q-ma-sm" style="border-radius: 4px">
          <q-card-section>
            <p>
              <span
                class="text-h6 text-weight-medium text-grey q-mr-sm"
                style="font-family: serif"
                >Q.</span
              >
              {{ qna.qDtl }}
            </p>
            <p class="q-mt-md" v-if="qna.aDtl">
              <span
                class="text-h6 text-weight-medium text-grey q-mr-sm"
                style="font-family: serif"
                >A.</span
              >
              {{ qna.aDtl }}
            </p>
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

export interface QnAIF {
  title: string;
  usrNm: string;
  regDate: string;
  prvtYn: 'Y' | 'N';
  qDtl: string;
  aDtl: string;
}

const refQnaList = ref<QnAIF[]>([
  {
    title: '관광코스당 소요시간이 어떻게 되나요?',
    usrNm: '김*수',
    regDate: '2024-04-03',
    prvtYn: 'Y',
    qDtl: '질문의 내용입니다.',
    aDtl: '',
  },
  {
    title: '질문 입니다.',
    usrNm: '정*민',
    regDate: '2024-04-09',
    prvtYn: 'N',
    qDtl: '질문의 내용입니다.',
    aDtl: '답변 입니다.',
  },
  {
    title: '질문 입니다. 222',
    usrNm: '박*민',
    regDate: '2024-04-11',
    prvtYn: 'N',
    qDtl: '질문의 내용입니다.',
    aDtl: '답변 입니다. 222',
  },
]);
</script>
