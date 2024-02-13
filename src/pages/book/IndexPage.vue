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
        <q-item-section :class="refAmStClass">{{ refAmStatus }}</q-item-section>
        <q-item-section>☀️ 오전</q-item-section>
        <q-item-section>{{ refAmRsvNum }}명/{{ refAmAlNum }}명</q-item-section>
        <q-item-section side>{{ refAmPrice }} 원</q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        active-class="bg-blue-1"
        :active="refAmPm === 'pm'"
        @click="refAmPm = 'pm'"
      >
        <q-item-section :class="refPmStClass">{{ refPmStatus }}</q-item-section>
        <q-item-section>🌙 오후</q-item-section>
        <q-item-section>{{ refPmRsvNum }}명/{{ refPmAlNum }}명</q-item-section>
        <q-item-section side>{{ refPmPrice }} 원</q-item-section>
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
      @click="goRegCustInfo"
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
import { useRouter } from 'vue-router';
import { bkdSchdInfoStore } from 'src/stores/common';
import { EventInput } from '@fullcalendar/core';
import axios from 'axios';

const bkdSchdInfo = bkdSchdInfoStore();
const router = useRouter();

const refSelectedDay = ref<string | null>(null);
const refAmPm = ref<string | null>(null);
const refHeadCount = ref<number>(1);
const refPrvPlcAgr = ref<boolean>(false);

const refAmStatus = ref<string | null>(null);
const refPmStatus = ref<string | null>(null);
const refAmRsvNum = ref<number>(0);
const refAmAlNum = ref<number>(10);
const refPmRsvNum = ref<number>(0);
const refPmAlNum = ref<number>(10);
const refAmPrice = ref<number>(0);
const refPmPrice = ref<number>(0);
const refAmStClass = ref<string>('');
const refPmStClass = ref<string>('');

watch(refSelectedDay, (newValue, oldValue) => {
  console.log(newValue, oldValue);
  if (newValue) {
  }
});

const goRegCustInfo = () => {
  if (
    refSelectedDay.value &&
    refAmPm.value &&
    refHeadCount.value &&
    refPrvPlcAgr.value
  ) {
    bkdSchdInfo.operDate = refSelectedDay.value;
    bkdSchdInfo.operTime = refAmPm.value;
    bkdSchdInfo.custCnt = refHeadCount.value;
    bkdSchdInfo.ticketPrice = 100000;
  }

  router.push('/book/regCustInfo');
};

const calendarOptions = ref({
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  // 현재 달에 해당하는 일자만 표시
  showNonCurrentDates: false,
  datesSet: (month: DatesSetArg) => {
    if (month) {
      const yearMonth = month.startStr.substring(0, 7);
      let array: EventInput[] = [];

      axios
        .post(`${process.env.API_URL}/getReservationList`, {
          yearMonth: yearMonth,
        })
        .then(function (response) {
          console.log('response:::', response);
          for (let i = 0; i < response.data.length; i++) {
            let status = '';
            let statusClass = 'text-green';
            let rsv_num = response.data[i].rsv_num;
            let al_num = response.data[i].al_num;
            let color = '#3788d8';
            if (response.data[i].st_cd == '01') {
              status = '운항';
              if (rsv_num == al_num) {
                status = '매진';
                color = '#e5556a';
                statusClass = 'text-red';
              }
            } else {
              status = '휴항';
              color = '#666';
              statusClass = 'text-grey-6';
            }
            response.data[i].tm_cd = response.data[i].tm_cd.substring(1)
            const event = {
              date: response.data[i].tm_dt,
              title: response.data[i].tm_cd + '차 ' + rsv_num + '/' + al_num,
              color: color,
              status: status,
              statusClass: statusClass,
              tm_cd: response.data[i].tm_cd,
              rsv_num: response.data[i].rsv_num,
              al_num: response.data[i].al_num,
              pr_nm: response.data[i].pr_nm,

              // 타이틀의 아이콘 및 상태 표시 지우고 달력 여백에 N차 시간표시와 색상별 상태표기??
              // 회색 = 휴항 / 파랑 = 운항 / 빨강 = 매진
              // 1차 = tm_cd == '01'의 dt_nm 값
            };

            array.push(event);
          }

          calendarOptions.value.events = array;
        });

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

      refAmRsvNum.value = calendarOptions.value.events.filter(
        (item) => item.date == refSelectedDay.value && item.tm_cd == '01'
      )[0].rsv_num;

      refAmAlNum.value = calendarOptions.value.events.filter(
        (item) => item.date == refSelectedDay.value && item.tm_cd == '01'
      )[0].al_num;

      refPmRsvNum.value = calendarOptions.value.events.filter(
        (item) => item.date == refSelectedDay.value && item.tm_cd == '02'
      )[0].rsv_num;

      refPmAlNum.value = calendarOptions.value.events.filter(
        (item) => item.date == refSelectedDay.value && item.tm_cd == '02'
      )[0].al_num;

      refAmStatus.value = calendarOptions.value.events.filter(
        (item) => item.date == refSelectedDay.value && item.tm_cd == '01'
      )[0].status;

      refPmStatus.value = calendarOptions.value.events.filter(
        (item) => item.date == refSelectedDay.value && item.tm_cd == '02'
      )[0].status;

      refAmPrice.value = calendarOptions.value.events.filter(
        (item) => item.date == refSelectedDay.value && item.tm_cd == '01'
      )[0].pr_nm;

      refPmPrice.value = calendarOptions.value.events.filter(
        (item) => item.date == refSelectedDay.value && item.tm_cd == '02'
      )[0].pr_nm;

      refAmStClass.value = calendarOptions.value.events.filter(
        (item) => item.date == refSelectedDay.value && item.tm_cd == '01'
      )[0].statusClass;

      refPmStClass.value = calendarOptions.value.events.filter(
        (item) => item.date == refSelectedDay.value && item.tm_cd == '02'
      )[0].statusClass;

      //for문으로 수정하기
    }
    console.log(day);
  },
  events: [] as EventInput[],

  locale: 'ko',
});
</script>
