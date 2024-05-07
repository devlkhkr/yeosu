<template>
  <q-input v-model="bkdSchdInfo.operDate" readonly>
    <template v-slot:prepend>
      <span class="text-caption">운항일자</span>
    </template>
  </q-input>
  <q-input v-model="bkdSchdInfo.operTime" readonly>
    <template v-slot:prepend>
      <span class="text-caption">시간대</span>
    </template>
  </q-input>
  <q-input v-model="bkdSchdInfo.way" readonly>
    <template v-slot:prepend>
      <span class="text-caption">운항경로</span>
    </template>
  </q-input>
  <q-field readonly>
    <template v-slot:prepend>
      <span class="text-caption">총액</span>
    </template>
    <Money3Component
      v-model="amount"
      v-bind="{
        ...moneyOptionConfig,
        disabled: true,
      }"
    ></Money3Component>
  </q-field>

  <div class="q-mt-lg">
    <q-list bordered class="rounded-borders">
      <q-expansion-item
        expand-separator
        icon="perm_contact_calendar"
        :label="
          bkdSchdInfo.custCnt === 1
            ? '탑승객 정보'
            : `탑승객 ${index + 1}${index === 0 ? ' (예약자)' : ''}`
        "
        :default-opened="index === 0"
        header-class="bg-blue-grey-4 text-white text-subtitle2"
        expand-icon-class="text-white"
        v-for="(cust, index) in bkdSchdInfo.custCnt"
        :key="cust"
      >
        <div class="q-px-md q-pb-lg">
          <q-input v-model="custInfo[index].custNm">
            <template v-slot:prepend>
              <span class="text-caption">예약자명</span>
            </template>
          </q-input>

          <q-field>
            <template v-slot:prepend>
              <span class="text-caption">주민등록번호</span>
            </template>
            <div class="flex no-wrap items-center full-width" style="gap: 16px">
              <q-input
                v-model="custInfo[index].custSSNF"
                maxlength="6"
                borderless
                class="full-width"
              />
              <span class="text-black">&#8722;</span>
              <q-input
                v-model="custInfo[index].custSSNB"
                maxlength="7"
                borderless
                class="full-width"
              />
            </div>
          </q-field>

          <q-input
            v-model="custInfo[index].custPhone"
            placeholder="'-' 없이 숫자만 입력"
            placeholder-class="text-red"
            maxlength="11"
          >
            <template v-slot:prepend>
              <span class="text-caption">연락처</span>
            </template>
          </q-input>

          <div class="q-mt-md text-right" v-if="index != 0">
            <q-checkbox
              size="sm"
              v-model="custInfo[index].isSameAddrWithOwner"
              val="isSameAddrWithOwner"
              label="예약자와 주소 동일"
              class="text-caption"
              @click="
                () => {
                  if (custInfo[index].isSameAddrWithOwner) {
                    custInfo[index].postCode = custInfo[0].postCode;
                    custInfo[index].roadAddr = custInfo[0].roadAddr;
                    custInfo[index].dtlAddr = custInfo[0].dtlAddr;
                  }
                }
              "
            />
          </div>

          <div
            v-bind:class="{
              disabled: custInfo[index].isSameAddrWithOwner,
            }"
          >
            <q-field readonly>
              <template v-slot:prepend>
                <span class="text-caption">우편번호</span>
              </template>
              <div
                class="flex no-wrap items-center full-width"
                style="gap: 16px; white-space: nowrap"
              >
                <q-input
                  v-model="custInfo[index].postCode"
                  borderless
                  readonly
                />
                <q-btn
                  flat
                  size="md"
                  class="bg-blue-grey-4 text-white q-ml-auto"
                  :disable="custInfo[index].isSameAddrWithOwner"
                  @click="
                    () => {
                      newAddress = true;
                      newAddrIdx = index;
                    }
                  "
                  >주소검색</q-btn
                >
              </div>
            </q-field>
            <q-input v-model="custInfo[index].roadAddr" readonly>
              <template v-slot:prepend>
                <span class="text-caption">도로명주소</span>
              </template>
            </q-input>

            <q-input
              v-model="custInfo[index].dtlAddr"
              :readonly="custInfo[index].isSameAddrWithOwner"
            >
              <template v-slot:prepend>
                <span class="text-caption">상세주소</span>
              </template>
            </q-input>
          </div>
        </div>
      </q-expansion-item>
    </q-list>
    <WaveButton class="q-mt-lg" title="예약하기" @click="book" />

    <q-dialog v-model="newAddress">
      <MaxWidthCont>
        <VueDaumPostcode
          @complete="setCustAddr"
          :theme="{ bgColor: '#FFFFFF' }"
        />
      </MaxWidthCont>
    </q-dialog>
  </div>
</template>
<script setup lang="ts">
import { bkdSchdInfoStore } from 'src/stores/common';
import { Money3Component } from 'v-money3';
import { moneyOptionConfig } from 'src/constants/common';
import { ref } from 'vue';
import { BookedCustInfo } from 'src/types/cust';
import { VueDaumPostcode } from 'vue-daum-postcode';
import { MaxWidthCont } from 'src/styled/common';
import WaveButton from 'src/components/WaveButton.vue';
// import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
// import axios from 'axios';

// const $q = useQuasar();
const router = useRouter();
const newAddress = ref(false);
const newAddrIdx = ref(0);

const bkdSchdInfo = bkdSchdInfoStore();
const amount = bkdSchdInfo.ticketPrice * bkdSchdInfo.custCnt;
const custConfig: BookedCustInfo = {
  custNm: '',
  custSSNF: '',
  custSSNB: '',
  custPhone: '',
  postCode: '',
  roadAddr: '',
  dtlAddr: '',
  tm_no: bkdSchdInfo.tm_no,
  rv_cd: bkdSchdInfo.rv_cd,
  isSameAddrWithOwner: false,
};

const custInfo = ref<BookedCustInfo[]>(
  Array.from({ length: bkdSchdInfo.custCnt }, (value, index) => ({
    ...custConfig,
    us_cd: index === 0 ? '01' : '02',
  }))
);

const setCustAddr = (data: { [key: string]: string }) => {
  custInfo.value[newAddrIdx.value].postCode = data.zonecode;
  custInfo.value[newAddrIdx.value].roadAddr = data.roadAddress;
  newAddress.value = false;
};

const book = () => {
  // console.log('custInfo.value:', custInfo.value);
  // axios.post(`${process.env.API_URL}/book`, custInfo.value).then((response) => {
  //   // console.log('response.data::' , response);
  //   if (response.data.message === null) {
  //     $q.notify({
  //       message: '예약이 완료 되었습니다.',
  //       type: 'positive',
  //       position: 'top',
  //       timeout: 1500,
  //     });
  //     `/book/myTicketDetail/${data.}`
  //     router.push('/book/myTicketDetail/:rsvNo?');
  //   }
  // });
  bkdSchdInfo.custNm = custInfo.value[0].custNm;
  bkdSchdInfo.custPhone = custInfo.value[0].custPhone;
  router.push('/pay');
};
</script>
