<template>
  <div
    :style="{
      backgroundColor: bgColor,
      padding: '10px',
      borderRadius: '5px',
      color: 'white',
      fontWeight: 'bold',
    }"
  >
    {{ directionText }}
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

export interface DirectionInfoProps {
  directionText: string;
  bgColor: string;
}

defineProps({
  directionText: {
    type: String as PropType<string>,
    required: true,
  },

  bgColor: {
    type: String as PropType<string>,
    required: false,
  },
});
</script>
