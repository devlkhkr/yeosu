<template>
  <q-page-sticky expand position="top" style="z-index: 3">
    <MaxWidthCont>
      <q-toolbar class="bg-blue-grey-2 text-blue-grey-9">
        <q-icon name="location_on" />
        <q-toolbar-title class="text-subtitle2"> {{ title }} </q-toolbar-title>
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
