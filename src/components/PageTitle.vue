<template>
  <q-page-sticky expand position="top">
    <MaxWidthCont>
      <q-toolbar class="bg-grey-6">
        <q-icon name="location_on" />
        <q-toolbar-title> {{ title }} </q-toolbar-title>
      </q-toolbar>
    </MaxWidthCont>
  </q-page-sticky>
</template>
<script setup lang="ts">
import { MaxWidthCont } from 'src/styled/common';
import { PropType } from 'vue';
defineProps({
  title: {
    type: String as PropType<string>,
    required: true,
  },
});
</script>
