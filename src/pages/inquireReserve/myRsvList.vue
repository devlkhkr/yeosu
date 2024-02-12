<template>
  <q-tabs
    v-model="tab"
    class="text-blue-grey-8"
    dense
    align="justify"
    active-color="primary"
  >
    <q-tab name="month" label="1개월" />
    <q-tab name="half" label="6개월" />
    <q-tab name="year" label="1년" />
    <q-tab name="all" label="전체" />
  </q-tabs>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const tab = ref('all');
</script>
