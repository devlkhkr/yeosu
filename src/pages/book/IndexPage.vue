<template>
  <FullCalendar :options="calendarOptions" />
</template>

<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';

const calendarOptions = {
  plugins: [dayGridPlugin, interactionPlugin],
  initialView: 'dayGridMonth',
  dateClick: (day: DateClickArg) => {
    console.log(day);
  },
  events: [
    { title: '11/32', date: '2024-02-01' },
    { title: '2/32', date: '2024-02-01' },
    { title: '9/32', date: '2024-02-02' },
  ],
  locale: 'ko',
};
</script>

<style lang="scss">
.fc .fc-view-harness {
  height: 0 !important;
  padding-bottom: calc(100% - 5px) !important;
}
.fc .fc-daygrid-body,
.fc-scrollgrid-sync-table {
  width: 100% !important;
  height: 100% !important;
}
.fc-col-header {
  width: 100% !important;
}
.fc-toolbar-title {
  font-size: 18px !important;
}
.fc-day {
  font-size: 10px;
}
.fc-today-button {
  font-size: 0 !important;
  padding: 0 12px !important;
  height: 35px;
  &::after {
    content: '이번달 보기';
    font-size: 10px;
  }
}
</style>
