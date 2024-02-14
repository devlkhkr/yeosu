<template>
  <div class="text-center q-py-xl">
    <img src="../assets/empty.png" width="64" />
    <div class="text-caption q-mt-md text-blue-grey-7">
      {{ message || '리스트가 없습니다.' }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
  message: {
    type: String as PropType<string>,
    required: false,
  },
});
</script>
