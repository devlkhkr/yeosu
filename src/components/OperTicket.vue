<template>
  <div class="cardWrap" v-for="(ticket, index) in tickets" :key="index">
    <div class="card cardLeft">
      <span class="ticket_title">예약번호: {{ ticket.rsvNo }}</span>
      <div class="title">
        <h2>예약일자: {{ ticket.rsvDt }}</h2>
        <span>Reservation date</span>
      </div>
      <div class="name">
        <h2>운항일자: {{ ticket.operDt }}</h2>
        <span>Operation date</span>
      </div>
      <div class="name">
        <h2>운항시각: {{ ticket.operTm }}</h2>
        <span>Operation time</span>
      </div>
    </div>
    <div class="card cardRight">
      <div
        class="oper_state"
        :class="{
          'text-green-3': ticket.operStt === '운항',
          'text-red-3': ticket.operStt === '미운항',
        }"
      >
        {{ ticket.operStt }}
      </div>
      <div class="number">
        <h3>{{ ticket.headCnt }}명</h3>
        <span>Headcount</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { Ticket } from 'src/types/ticket';
import { PropType } from 'vue';

defineProps({
  tickets: {
    type: Array as PropType<Ticket[]>,
    required: true,
  },
});
</script>
