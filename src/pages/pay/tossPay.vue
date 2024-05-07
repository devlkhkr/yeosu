<template>
  <div class="wrapper w-100">
    <div class="max-w-540 w-100">
      <div id="payment-method" class="w-100"></div>
      <div id="agreement" class="w-100"></div>
      <div class="btn-wrapper w-100">
        <button
          :disabled="!inputEnabled"
          @click="requestPayment"
          id="payment-request-button"
          class="btn primary w-100"
        >
          결제하기
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { loadPaymentWidget, ANONYMOUS } from '@tosspayments/payment-widget-sdk';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { bkdSchdInfoStore } from '../../stores/common';
import { nanoid } from 'nanoid';

const bkdSchdInfo = bkdSchdInfoStore();

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = ANONYMOUS;
const paymentWidget = ref();
const paymentMethodWidget = ref();
const paymentAgreement = ref();
const inputEnabled = ref<boolean>();
const amount = ref<number>(bkdSchdInfo.custCnt * 6000);

onMounted(async () => {
  paymentWidget.value = await loadPaymentWidget(clientKey, customerKey);
  paymentMethodWidget.value = paymentWidget.value.renderPaymentMethods(
    '#payment-method',
    {
      value: amount.value,
    }
  );
  paymentAgreement.value = paymentWidget.value.renderAgreement('#agreement');

  paymentAgreement.value.on('change', (agreementStatus) => {
    if (agreementStatus.agreedRequiredTerms == true) {
      inputEnabled.value = true;
    } else {
      inputEnabled.value = false;
    }
  });
});

async function requestPayment() {
  try {
    if (paymentAgreement.value.getAgreementStatus().agreedRequiredTerms) {
      await paymentWidget.value.requestPayment({
        orderId: nanoid(),
        orderName: bkdSchdInfo.way,
        customerName: bkdSchdInfo.custNm,
        customerMobilePhone: bkdSchdInfo.custPhone,
        // successUrl: `${window.location.origin}/success`,
        // failUrl: `${window.location.origin}/fail`,
      });
    }
  } catch (error) {
    console.error(error);
  }
}
</script>
<style>
.w-100 {
  width: 100%;
}

.h-100 {
  height: 100%;
}

a {
  text-decoration: none;
  text-align: center;
}

.wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  overflow: auto;
}

.max-w-540 {
  max-width: 540px;
}

.btn-wrapper {
  padding: 0 24px;
}

.btn {
  padding: 11px 22px;
  border: none;
  border-radius: 8px;

  background-color: #f2f4f6;
  color: #4e5968;
  font-weight: 600;
  font-size: 17px;
  cursor: pointer;
}

.btn.primary {
  background-color: #3282f6;
  color: #f9fcff;
}

.text-center {
  text-align: center;
}

.flex {
  display: flex;
}

.flex-column {
  display: flex;
  flex-direction: column;
}

.justify-center {
  justify-content: center;
}

.justify-between {
  justify-content: space-between;
}

.align-center {
  align-items: center;
}

.confirm-loading {
  margin-top: 72px;
  height: 400px;
  justify-content: space-between;
}

.confirm-success {
  display: none;
  margin-top: 72px;
}

.button-group {
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
}

.title {
  margin-top: 32px;
  margin-bottom: 0;
  color: #191f28;
  font-weight: bold;
  font-size: 24px;
}

.description {
  margin-top: 8px;
  color: #4e5968;
  font-size: 17px;
  font-weight: 500;
}

.response-section {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 20px;
}

.response-section .response-label {
  font-weight: 600;
  color: #333d48;
  font-size: 17px;
}

.response-section .response-text {
  font-weight: 500;
  color: #4e5968;
  font-size: 17px;
  padding-left: 16px;
  word-break: break-word;
  text-align: right;
}

.color-grey {
  color: #b0b8c1;
}
</style>
