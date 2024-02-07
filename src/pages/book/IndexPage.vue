<template>
  <FullCalendar :options="calendarOptions" />
  <div class="q-mt-lg text-caption">
    <q-list v-if="refSelectedDay" bordered separator>
      <q-item
        clickable
        v-ripple
        active-class="bg-blue-1"
        :active="refAmPm === 'am'"
        @click="refAmPm = 'am'"
      >
        <q-item-section class="text-green">운항</q-item-section>
        <q-item-section>☀️ 오전</q-item-section>
        <q-item-section>16명/32명</q-item-section>
        <q-item-section side>100,000 원</q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        active-class="bg-blue-1"
        :active="refAmPm === 'pm'"
        @click="refAmPm = 'pm'"
      >
        <q-item-section class="text-red">매진</q-item-section>
        <q-item-section>☀️ 오후</q-item-section>
        <q-item-section>32명/32명</q-item-section>
        <q-item-section side>100,000 원</q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="text-grey-6">미운항</q-item-section>
        <q-item-section>☀️ 오전</q-item-section>
        <q-item-section>-</q-item-section>
        <q-item-section side>100,000 원</q-item-section>
      </q-item>
    </q-list>
    <q-list v-else bordered separator>
      <q-item>
        <q-item-section class="text-grey-6 text-center"
          >날짜를 선택해주세요.</q-item-section
        >
      </q-item>
    </q-list>
  </div>
  <div class="q-mt-lg text-caption" v-if="refSelectedDay && refAmPm">
    <q-input type="number" :min="1" :max="10" v-model.number="refHeadCount">
      <template v-slot:prepend>
        <span class="text-caption">예약인원</span>
      </template>
      <template v-slot:append>
        <q-btn flat class="bg-grey-3" @click="refHeadCount--">&#8722;</q-btn>
        <q-btn flat class="bg-grey-3" @click="refHeadCount++">&#43;</q-btn>
      </template>
    </q-input>
    <div class="flex no-wrap full-width q-mt-xl">
      <q-checkbox
        size="md"
        v-model="refPrvPlcAgr"
        val="prvPlcAgr"
        label="[필수] 개인정보 수집 및 이용 동의"
      />
      <q-btn flat size="sm" class="q-ml-auto bg-grey-3 text-grey-8"
        >전문보기</q-btn
      >
    </div>
    <WaveButton
      class="q-mt-lg"
      title="예약하기"
      :disabled="!refSelectedDay || !refAmPm || !refPrvPlcAgr"
      @click="
        () => {
          console.log(refSelectedDay, refAmPm, refPrvPlcAgr);
          //do order logic
        }
      "
    />
  </div>
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import WaveButton from 'src/components/WaveButton.vue';
import { ref, watch } from 'vue';
import { DatesSetArg } from '@fullcalendar/core';

const refSelectedDay = ref<string | null>(null);
const refAmPm = ref<string | null>(null);
const refHeadCount = ref<number>(1);
const refPrvPlcAgr = ref<boolean>(false);

watch(refSelectedDay, (newValue, oldValue) => {
  console.log(newValue, oldValue);
  if (newValue) {
  }
});

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  datesSet: (month: DatesSetArg) => {
    if (month) {
      //달변경 이벤트시 선택되었던 dom이 사라지므로 다시 UI선택처리 해주는 로직
      let selectedDay = document.querySelector(
        "td[data-date='" + refSelectedDay.value + "']"
      );
      if (selectedDay) {
        selectedDay.classList.add('selected-day');
      }
    }
  },
  dateClick: (day: DateClickArg) => {
    refAmPm.value = null;

    let allDays = document.getElementsByClassName('fc-day');
    let selectedDay = day.dayEl;
    Array.from(allDays).forEach((day) => {
      day.classList.remove('selected-day');
    });
    if (selectedDay) {
      if (day.dateStr === refSelectedDay.value) {
        refSelectedDay.value = null;
        selectedDay.classList.remove('selected-day');
      } else {
        refSelectedDay.value = day.dateStr;
        selectedDay.classList.add('selected-day');
      }
    }
    console.log(day);
  },
  events: [
    {
      date: '2024-02-01',
      display: 'background',
      color: '#daf5da',
    },
    {
      date: '2024-02-02',
      display: 'background',
      color: '#ffd6d6',
    },
    {
      date: '2024-02-05',
      display: 'background',
      color: '#ffd6d6',
    },
    {
      date: '2024-02-06',
      display: 'background',
      color: '#daf5da',
    },
    {
      title: '☀️ 11/32',
      date: '2024-02-01',
    },
    {
      title: '🌙 매진',
      date: '2024-02-01',
      color: '#e5556a',
    },
    { title: '☀️ 2/32', date: '2024-02-02' },
    { title: '🌙 9/32', date: '2024-02-02' },
    { title: '☀️ 미운항', date: '2024-02-05', color: '#666' },
    { title: '🌙 미운항', date: '2024-02-05', color: '#666' },
    { title: '☀️ 미운항', date: '2024-02-06', color: '#666' },
    { title: '🌙 29/32', date: '2024-02-06' },
  ],

  locale: 'ko',
};
</script>
