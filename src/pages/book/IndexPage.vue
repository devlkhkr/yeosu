<template>
  <FullCalendar :options="calendarOptions" />
  <div class="q-mt-lg text-caption">
    <q-list
      v-if="refSelectedDay && refTodayEvents.length > 0"
      bordered
      separator
    >
      <q-item
        clickable
        v-ripple
        active-class="bg-blue-1"
        :active="refSelectedTm.tm_no === schedule.tm_no"
        @click="refSelectedTm = schedule"
        v-for="(schedule, index) in refTodayEvents"
        :key="index"
      >
        <q-item-section :class="`${schedule.statusClass}`">{{
          schedule.status
        }}</q-item-section>

        <q-item-section>{{ tmCdToHHmm(schedule.tm_cd) }}</q-item-section>
        <q-item-section
          >{{ schedule.rsv_num }}명/{{ schedule.al_num }}명</q-item-section
        >
        <q-item-section side>{{ schedule.pr_nm }} 원</q-item-section>
      </q-item>
    </q-list>
    <q-list
      v-else-if="refSelectedDay && refTodayEvents.length === 0"
      bordered
      separator
    >
      <q-item>
        <q-item-section class="text-center">
          <ListEmpty message="해당 날짜에 등록된 운항이 없습니다." />
        </q-item-section>
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
  <div class="q-mt-lg text-caption" v-if="refSelectedDay && refSelectedTm">
    <q-input type="number" v-model.number="refHeadCount">
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
      :disabled="!refSelectedDay || !refSelectedTm || !refPrvPlcAgr"
      @click="goRegCustInfo"
    />
  </div>
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import WaveButton from 'src/components/WaveButton.vue';
import ListEmpty from 'src/components/ListEmpty.vue';
import { ref, watch } from 'vue';
import { DatesSetArg } from '@fullcalendar/core';
import { useRouter } from 'vue-router';
import { bkdSchdInfoStore } from 'src/stores/common';
import { EventInput } from '@fullcalendar/core';
import { tmCdToHHmm } from 'src/utils/cmcd';
import axios from 'axios';

const bkdSchdInfo = bkdSchdInfoStore();
const router = useRouter();

const refSelectedDay = ref<string | null>(null);
const refHeadCount = ref<number>(1);
const refPrvPlcAgr = ref<boolean>(false);

const refSelectedTm: EventInput = ref({});

const refTodayEvents = ref<EventInput[]>([]);

watch(refHeadCount, (newValue, oldValue) => {
  console.log(oldValue, newValue);
  console.log(
    newValue > refSelectedTm.value.al_num - refSelectedTm.value.rsv_num
  );
  if (newValue > refSelectedTm.value.al_num - refSelectedTm.value.rsv_num) {
    refHeadCount.value =
      refSelectedTm.value.al_num - refSelectedTm.value.rsv_num;
  }

  if (newValue < 1) {
    refHeadCount.value = 1;
  }
});

const goRegCustInfo = () => {
  if (
    refSelectedDay.value &&
    refSelectedTm.value &&
    refHeadCount.value &&
    refPrvPlcAgr.value
  ) {
    bkdSchdInfo.operDate = refSelectedDay.value;
    bkdSchdInfo.operTime = refSelectedTm.value.tm_nm;
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

          const bgState: {
            [key: string]: boolean;
          } = {};

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

            const event = {
              tm_no: response.data[i].tm_no,
              date: response.data[i].tm_dt,
              title:
                status === '운항'
                  ? response.data[i].tm_cd + '차 ' + rsv_num + '/' + al_num
                  : response.data[i].tm_cd + '차 ' + status,
              color: color,
              status: status,
              statusClass: statusClass,
              tm_cd: response.data[i].tm_cd,
              tm_nm: response.data[i].tm_nm,
              rsv_num: response.data[i].rsv_num,
              al_num: response.data[i].al_num,
              pr_nm: response.data[i].pr_nm,

              // 타이틀의 아이콘 및 상태 표시 지우고 달력 여백에 N차 시간표시와 색상별 상태표기??
              // 1차 = tm_cd == '01'의 dt_nm 값
            };

            if (!bgState[response.data[i].tm_dt]) {
              bgState[response.data[i].tm_dt] =
                response.data[i].st_nm === '운행' && rsv_num < al_num
                  ? true
                  : false;
            }

            array.push(event);
          }

          const bgArray: EventInput[] = [];
          for (let i = 0; i < Object.keys(bgState).length; i++) {
            bgArray.push({
              display: 'background',
              color: Object.values(bgState)[i] ? '#daf5da' : '#ffd6d6',
              date: Object.keys(bgState)[i],
            });
          }

          console.log('bgState::', bgState);
          calendarOptions.value.events = [...array, ...bgArray];
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
    refHeadCount.value = 1;
    refSelectedTm.value = {};

    const todayEvents = calendarOptions.value.events.filter((event) => {
      return day.dateStr === event.date && event.display != 'background';
    });

    refTodayEvents.value = todayEvents;

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
  },
  events: [] as EventInput[],

  locale: 'ko',
});
</script>
