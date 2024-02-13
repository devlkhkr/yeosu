<template>
  <div>
    <q-input v-model="srchParams.custNm">
      <template v-slot:prepend>
        <span class="text-caption">예약자명</span>
      </template>
    </q-input>
    <q-input v-model="srchParams.lastDigit" maxlength="4">
      <template v-slot:prepend>
        <span class="text-caption">휴대폰 번호 뒷자리</span>
      </template>
    </q-input>
  </div>
  <WaveButton
    class="q-mt-xl"
    title="예약확인"
    :disabled="!srchParams.custNm || !srchParams.lastDigit"
    @click="$router.push('/inquireReserve/myRsvList')"
  />
</template>

<script setup lang="ts">
import { srchRsvParams } from 'src/stores/common';
import WaveButton from 'src/components/WaveButton.vue';

const srchParams = srchRsvParams();
</script>
