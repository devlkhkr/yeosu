<template>
  <div>
    <q-input v-model="custNm">
      <template v-slot:prepend>
        <span class="text-caption">예약자명</span>
      </template>
    </q-input>
    <q-input
      v-model="custPhone"
      placeholder="전화번호 뒷자리 4자리"
      maxlength="4"
    >
      <template v-slot:prepend>
        <span class="text-caption">연락처</span>
      </template>
    </q-input>
  </div>
  <WaveButton
    class="q-mt-xl"
    title="예약확인"
    :disabled="!custNm || !custPhone"
    @click="$router.push('/inquireReserve/myRsvList')"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import WaveButton from 'src/components/WaveButton.vue';
const custNm = ref('');
const custPhone = ref('');
</script>
