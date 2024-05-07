<template>
  <div class="q-mb-md">
    <DirectionInfo directionText="낭도 -> 추도" bgColor="#A5C9FF">
    </DirectionInfo>
    <DirectionInfo directionText="추도 -> 낭도" bgColor="#0C70F2">
    </DirectionInfo>
  </div>
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
        :active="
          refSelectedTm != null && refSelectedTm.tm_no === schedule.tm_no
        "
        @click="refSelectedTm = schedule"
        v-for="(schedule, index) in refTodayEvents"
        :key="index"
      >
        <q-item-section
          side
          :class="`${schedule.statusClass}`"
          class="q-mr-none"
          >{{ schedule.status }}</q-item-section
        >
        <q-item-section class="q-ml-none">{{ schedule.wy_nm }}</q-item-section>
        <q-item-section>{{ schedule.hhmm }}</q-item-section>
        <q-item-section
          >{{ schedule.rsv_num }}명/{{ schedule.al_rsv_num }}명</q-item-section
        >
        <q-item-section side
          >{{ parseInt(schedule.price).toLocaleString() }} 원</q-item-section
        >
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
        <q-btn
          flat
          class="bg-blue-grey-6 text-white"
          v-bind:class="{
            disabled: refHeadCount === 1,
          }"
          @click="refHeadCount--"
          >&#8722;</q-btn
        >
        <q-btn
          flat
          class="bg-blue-grey-6 text-white"
          v-bind:class="{
            disabled:
              refSelectedTm &&
              refHeadCount === refSelectedTm.al_rsv_num - refSelectedTm.rsv_num,
          }"
          @click="refHeadCount++"
          >&#43;</q-btn
        >
      </template>
    </q-input>
    <div class="flex no-wrap full-width q-mt-xl">
      <q-checkbox
        size="md"
        v-model="refPrvPlcAgr"
        val="prvPlcAgr"
        label="[필수] 개인정보 수집 및 이용 동의"
      />
      <q-btn flat size="sm" class="q-ml-auto bg-blue-grey-6 text-white"
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
import axios from 'axios';
import { useQuasar } from 'quasar';
import DirectionInfo from '../../components/DirectionInfo.vue';

const $q = useQuasar();

const bkdSchdInfo = bkdSchdInfoStore();
const router = useRouter();

const refSelectedDay = ref<string | null>(null);
const refHeadCount = ref<number>(1);
const refPrvPlcAgr = ref<boolean>(false);

const refSelectedTm: EventInput = ref(null);
const refTodayEvents = ref<EventInput[]>([]);

watch(refSelectedTm, (newValue) => {
  if (newValue === null) return;

  if (newValue.status === '휴항') {
    refSelectedTm.value = null;
    $q.notify({
      message: '해당편은 휴항입니다',
      icon: 'sentiment_very_dissatisfied',
      position: 'top',
      timeout: 1500,
    });
  } else if (newValue.al_rsv_num - newValue.rsv_num === 0) {
    refSelectedTm.value = null;
    $q.notify({
      message: '해당편은 매진입니다',
      icon: 'sentiment_very_dissatisfied',
      position: 'top',
      color: 'negative',
      timeout: 1500,
    });
  }
});

watch(refHeadCount, (newValue) => {
  if (refSelectedTm.value) {
    if (refSelectedTm.value.al_rsv_num - refSelectedTm.value.rsv_num === 0) {
      //예약불가
      refHeadCount.value = 0;
    } else if (
      refSelectedTm.value &&
      newValue > refSelectedTm.value.al_rsv_num - refSelectedTm.value.rsv_num
    ) {
      //최대인원
      refHeadCount.value =
        refSelectedTm.value.al_rsv_num - refSelectedTm.value.rsv_num;
      $q.notify({
        message: `해당편의 현재 최대 예약인원은 ${
          refSelectedTm.value.al_rsv_num - refSelectedTm.value.rsv_num
        }명 입니다`,
        icon: 'sentiment_very_dissatisfied',
        position: 'top',
        timeout: 1500,
      });
    } else if (newValue < 1) {
      //최소인원
      refHeadCount.value = 1;
      $q.notify({
        message: '최소 예약인원은 1명입니다',
        icon: 'sentiment_very_dissatisfied',
        position: 'top',
        timeout: 1500,
      });
    }
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
    bkdSchdInfo.operTime = refSelectedTm.value.hhmm;
    bkdSchdInfo.custCnt = refHeadCount.value;
    bkdSchdInfo.ticketPrice = refSelectedTm.value.price;
    bkdSchdInfo.tm_no = refSelectedTm.value.tm_no;
    bkdSchdInfo.rv_cd = refSelectedTm.value.rv_cd;
    bkdSchdInfo.way = refSelectedTm.value.wy_nm;
  }
  console.log('bkdSchdInfo:', bkdSchdInfo);
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
          console.log('repsonsedata:', response.data);
          const bgState: {
            [key: string]: boolean;
          } = {};

          for (let i = 0; i < response.data.length; i++) {
            let status = response.data[i].st_nm;
            let statusClass = 'text-green';
            let rsv_num = response.data[i].rsv_num;
            let al_rsv_num = response.data[i].al_rsv_num;
            let color = '#A5C9FF';

            switch (response.data[i].st_cd) {
              case '02':
                statusClass = 'text-grey-6';
                color = '#666';
                break;
              case '03':
                statusClass = 'text-red';
                color = '#e5556a';
                break;
              default:
                switch (response.data[i].wy_cd) {
                  case '01':
                    color = '#A5C9FF';
                    break;
                  default:
                    color = '#0C70F2';
                    break;
                }
                break;
            }

            const event = {
              tm_no: response.data[i].tm_no,
              date: response.data[i].tm_dt,
              title:
                response.data[i].st_cd === '01'
                  ? response.data[i].hhmm + '-' + rsv_num + '명'
                  : response.data[i].hhmm + '-' + status,
              color: color,
              status: status,
              statusClass: statusClass,
              hhmm: response.data[i].hhmm,
              rsv_num: rsv_num,
              al_rsv_num: al_rsv_num,
              price: response.data[i].price,
              rv_cd: response.data[i].st_cd === '03' ? '02' : '01',
              wy_nm: response.data[i].wy_nm,
            };

            if (!bgState[response.data[i].tm_dt]) {
              bgState[response.data[i].tm_dt] =
                response.data[i].st_cd === '01' &&
                parseInt(rsv_num) < parseInt(al_rsv_num)
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
    refSelectedTm.value = null;

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
