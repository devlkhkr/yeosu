<template>
  <q-input v-model="srchParams.custNm" readonly>
    <template v-slot:prepend>
      <span class="text-caption">예약자명</span>
    </template>
  </q-input>
  <q-input v-model="srchParams.lastDigit" readonly>
    <template v-slot:prepend>
      <span class="text-caption">휴대폰 번호 뒷자리</span>
    </template>
  </q-input>
  <q-tabs
    v-model="srchParams.period"
    class="text-blue-grey-8 q-mt-lg"
    dense
    align="justify"
    active-color="primary"
  >
    <q-tab name="month" label="1개월" />
    <q-tab name="half" label="6개월" />
    <q-tab name="year" label="1년" />
    <q-tab name="all" label="전체" />
  </q-tabs>
  <div class="q-mt-lg">
    <OperTicket :tickets="ticketList" />
  </div>
</template>
<script setup lang="ts">
import { srchRsvParams } from 'src/stores/common';
import OperTicket from 'src/components/OperTicket.vue';
const srchParams = srchRsvParams();

const ticketList = [
  {
    rsvNo: '2024012495',
    rsvDt: '2024-01-24',
    operDt: '2024-01-23',
    operTm: 'am',
    operStt: '운항',
    headCnt: 3,
  },
  {
    rsvNo: '2024012495',
    rsvDt: '2024-01-24',
    operDt: '2024-01-23',
    operTm: 'am',
    operStt: '미운항',
    headCnt: 3,
  },
];
</script>
