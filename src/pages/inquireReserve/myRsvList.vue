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
    <div class="cardWrap" v-for="(ticket, index) in 10" :key="index">
      <div class="card cardLeft">
        <span class="ticket_title">예약번호: 2024020487</span>
        <div class="title">
          <h2>예약일자: 2024-02-04</h2>
          <span>Reservation date</span>
        </div>
        <div class="name">
          <h2>운항일자: 2024-02-12</h2>
          <span>Operation date</span>
        </div>
        <div class="name">
          <h2>운항시각: 오전</h2>
          <span>Operation time</span>
        </div>
      </div>
      <div class="card cardRight">
        <div class="oper_state text-green-3">운항</div>
        <div class="number">
          <h3>7명</h3>
          <span>Headcount</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { srchRsvParams } from 'src/stores/common';

const srchParams = srchRsvParams();
</script>
