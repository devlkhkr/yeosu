<template>
  <div class="text-subtitle1 flex no-wrap q-mt-xl q-mb-md">
    <div class="full-width">{{ title }}</div>
    <div v-if="showMore" class="full-width">
      <div
        class="flex items-center justify-end text-grey-6"
        @click="
          () => {
            if (showMore) {
              showMore();
            }
          }
        "
      >
        더 보기
        <q-icon name="arrow_forward_ios" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

export interface SubTitleProps {
  title: string;
  showMore?: () => void;
}
defineProps({
  title: {
    type: String as PropType<string>,
    required: true,
  },
  showMore: {
    type: Function,
    required: false,
  },
});
</script>
