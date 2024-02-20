<template>
  <div>
    <q-list separator>
      <q-item
        v-for="(notice, index) in noticeList"
        clickable
        :key="index"
        class="q-py-md q-px-sm"
        @click="$router.push(`/notice/detail/${notice.id}`)"
      >
        <q-item-section>
          <q-item-label>{{ notice.title }}</q-item-label>
          <q-item-label v-if="notice.desc" caption>{{
            notice.desc
          }}</q-item-label>
        </q-item-section>

        <q-item-section side top v-if="notice.meta">
          <q-item-label caption>{{ notice.meta }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

export interface Notice {
  id: string;
  title: string;
  desc?: string;
  meta?: string;
}
defineProps({
  noticeList: {
    type: Array as PropType<Notice[]>,
  },
});
</script>
