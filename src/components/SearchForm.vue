<template>
  <q-list bordered class="rounded-borders">
    <q-expansion-item
      expand-separator
      icon="search"
      label="검색하기"
      class="text-grey-8"
    >
      <q-separator />
      <q-card class="bg-transparent">
        <q-card-section>
          <q-input
            v-for="(item, index) in formOpions.items"
            :key="index"
            :name="item.name"
            :type="item.type"
          >
            <template v-slot:prepend>
              <span class="text-caption">{{ item.title }}</span>
            </template>
          </q-input>
        </q-card-section>
        <q-card-actions>
          <q-btn
            unelevated
            color="primary"
            icon="search"
            class="full-width"
            @click="formOpions.onSearch()"
            >검색</q-btn
          >
        </q-card-actions>
      </q-card>
    </q-expansion-item>
  </q-list>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

export interface SearchForm {
  items: {
    name: string;
    title: string;
    type: string;
  }[];
  onSearch: () => void;
}

defineProps({
  formOpions: {
    type: Object as PropType<SearchForm>,
    required: true,
  },
});
</script>
