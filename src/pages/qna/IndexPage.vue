<template>
  <SearchForm :form-options="formOptions" />
  <q-btn
    color="primary"
    class="full-width q-mt-md"
    label="문의하기"
    unelevated
    @click="writeQna = true"
  />
  <div class="q-mt-lg">
    <q-list bordered separator class="rounded-borders">
      <q-slide-item
        v-for="(qna, index) in refQnaList"
        :key="index"
        @right="deleteQna"
        right-color="red"
      >
        <template v-slot:right>
          <q-icon name="o_delete" />
        </template>
        <q-item class="q-pa-none">
          <q-expansion-item class="full-width">
            <template v-slot:header>
              <q-item class="full-width q-px-none q-py-md">
                <q-item-section side>
                  <span
                    class="text-caption"
                    v-bind:class="{
                      'text-green': qna.aDtl,
                    }"
                    >{{ qna.aDtl ? '답변완료' : '답변대기' }}</span
                  >
                </q-item-section>

                <q-item-section>
                  <div style="line-height: 1.25">
                    {{ qna.title }}
                  </div>
                  <div
                    class="flex text-caption text-grey-7 q-mt-sm"
                    style="gap: 12px"
                  >
                    <span>{{ qna.usrNm }}</span>
                    <q-separator vertical color="grey-3" />
                    <span>{{ qna.regDate }}</span>
                    <q-separator
                      vertical
                      color="grey-3"
                      v-if="qna.prvtYn === true"
                    />
                    <span class="flex items-center" style="gap: 4px"
                      ><q-icon
                        :name="qna.prvtYn === true ? 'o_lock' : ''"
                        color="amber"
                      /><span>{{
                        qna.prvtYn === true ? '비공개' : ''
                      }}</span></span
                    >
                  </div>
                </q-item-section>
              </q-item>
            </template>

            <q-card class="bg-b9c9df80 q-ma-sm" style="border-radius: 4px">
              <q-card-section>
                <p>
                  <span
                    class="text-h6 text-weight-medium text-grey q-mr-sm"
                    style="font-family: serif"
                    >Q.</span
                  >
                  {{ qna.qDtl }}
                </p>
                <p class="q-mt-md" v-if="qna.aDtl">
                  <span
                    class="text-h6 text-weight-medium text-grey q-mr-sm"
                    style="font-family: serif"
                    >A.</span
                  >
                  {{ qna.aDtl }}
                </p>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-item>
      </q-slide-item>
    </q-list>
  </div>

  <q-dialog v-model="writeQna" persistent>
    <MaxWidthCont>
      <q-card>
        <q-card-section>
          <div class="text-h6">문의하기</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div class="text-body2">제목</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="refQnA.title"
            autofocus
            maxlength="33"
            placeholder="제목을 입력해주세요."
          />
        </q-card-section>

        <q-card-section>
          <div class="text-body2">이름</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="refQnA.usrNm"
            autofocus
            maxlength="17"
            placeholder="이름을 입력해주세요."
          />
        </q-card-section>

        <q-card-section>
          <div class="text-body2">비밀번호</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="refQnA.pwd"
            :type="hidePwd ? 'password' : 'text'"
            maxlength="4"
            placeholder="숫자 4자리를 입력해주세요."
            mask="####"
          >
            <template v-slot:append>
              <q-icon
                :name="hidePwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="hidePwd = !hidePwd"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-toggle v-model="refQnA.prvtYn" label="비밀글 선택" />

        <q-card-section>
          <div class="text-body2">내용</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="refQnA.qDtl"
            autofocus
            type="textarea"
            maxlength="1000"
            placeholder="내용을 입력해주세요."
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="취소" v-close-popup @click="resetRefQnA" />
          <q-btn flat label="확인" v-close-popup @click="regQnA" />
        </q-card-actions>
      </q-card>
    </MaxWidthCont>
  </q-dialog>

  <q-dialog v-model="refDeleteConfirm" persistent>
    <MaxWidthCont>
      <q-card>
        <q-card-section>
          <div class="text-body2">
            질문을 삭제합니다.<br />등록시 설정한 비밀번호를 입력해주세요.
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="refQnaPwd"
            :type="hidePwd ? 'password' : 'text'"
            @keyup.enter="refDeleteConfirm = false"
          >
            <template v-slot:append>
              <q-icon
                :name="hidePwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="hidePwd = !hidePwd"
              />
            </template>
          </q-input>
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="취소" v-close-popup />
          <q-btn flat label="확인" v-close-popup />
        </q-card-actions>
      </q-card>
    </MaxWidthCont>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MaxWidthCont } from 'src/styled/common';
import SearchForm, { IFSearchForm } from 'src/components/SearchForm.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const refDeleteConfirm = ref<boolean>(false);
const writeQna = ref<boolean>(false);
const hidePwd = ref<boolean>(true);
const refQnaPwd = ref('');

const formOptions: IFSearchForm = {
  items: [
    {
      name: 'title',
      title: '제목',
      type: 'string',
    },
    {
      name: 'usrNm',
      title: '작성자',
      type: 'string',
    },
    {
      name: 'ansrStt',
      title: '답변상태',
      type: 'select',
      selectOptions: [
        {
          label: '전체',
          value: 'all',
        },
        {
          label: '답변대기',
          value: '01',
        },
        {
          label: '답변완료',
          value: '02',
        },
      ],
    },
    {
      name: 'regDate',
      title: '작성일자',
      type: 'period',
    },
  ],
  onSearch: (refItemsModel) => {
    console.log(refItemsModel);
  },
};

export interface QnAIF {
  title: string;
  usrNm: string;
  regDate: string;
  pwd: string;
  prvtYn: boolean;
  qDtl: string;
  aDtl: string;
}

const refQnA = ref<QnAIF>({
  title: '',
  usrNm: '',
  regDate: '',
  pwd: '',
  prvtYn: false,
  qDtl: '',
  aDtl: '',
});

const searchForm = ref({
  title: '',
  usrNm: '',
  ansrStt: '',
  fromDate: '',
  toDate: '',
});

const resetRefQnA = () => {
  refQnA.value.title = '';
  refQnA.value.usrNm = '';
  refQnA.value.regDate = '';
  refQnA.value.pwd = '';
  refQnA.value.prvtYn = false;
  refQnA.value.qDtl = '';
  refQnA.value.aDtl = '';
};

const regQnA = () => {
  axios
    .post(`${process.env.API_URL}/regBoard`, {
      boCd: '02',
      boTi: refQnA.value.title,
      usrNm: refQnA.value.usrNm,
      boPrv: refQnA.value.prvtYn,
      boPw: refQnA.value.pwd,
      boCont: refQnA.value.qDtl,
    })
    .then(function (response) {
      // console.log('QnAResponse::', response.data);
      if (response.data.state === '1') {
        $q.notify({
          message: response.data.message,
          type: 'positive',
          position: 'top',
          timeout: 1500,
        });
        resetRefQnA();
      } else {
        $q.notify({
          message: response.data.message,
          type: 'negative',
          position: 'top',
          timeout: 1500,
        });
      }
    });
};

const refQnaList = ref<QnAIF[]>([
  {
    title: '관광코스당 소요시간이 어떻게 되나요?',
    usrNm: '김*수',
    regDate: '2024-04-03',
    pwd: '1234',
    prvtYn: true,
    qDtl: '질문의 내용입니다.',
    aDtl: '',
  },
  {
    title: '질문 입니다.',
    usrNm: '정*민',
    regDate: '2024-04-09',
    pwd: '1234',
    prvtYn: false,
    qDtl: '질문의 내용입니다.',
    aDtl: '답변 입니다.',
  },
  {
    title: '질문 입니다. 222',
    usrNm: '박*민',
    regDate: '2024-04-11',
    pwd: '1234',
    prvtYn: false,
    qDtl: '질문의 내용입니다.',
    aDtl: '답변 입니다. 222',
  },
]);

let currPage = 1;
const perPage = 10;
let flag = true;

const loadData = () => {
  axios
    .post<{ boCd: string; boTi: string; boCont: string; boDt: string }[]>(
      `${process.env.API_URL}/getBoardList`,
      {
        currPage: currPage,
        perPage: String(perPage),
        boCd: '02',
        boTi: searchForm.value.title,
        usrNm: searchForm.value.usrNm,
        ansrStt: searchForm.value.ansrStt,
        fromDate: searchForm.value.fromDate,
        toDate: searchForm.value.toDate,
      }
    )
    .then((response) => {
      if (response.data.length > 0) {
        //   mainNoticeData.value = [
        //     ...mainNoticeData.value,
        //     ...response.data.map((item) => ({
        //       id: item.boNo,
        //       title: item.boTi,
        //       desc: item.boCont,
        //       meta: item.boDt,
        //     })),
        //   ];
        //   if (response.data.length < perPage) {
        //     flag = false;
        //   }
        //   currPage++;
        // } else {
        //   flag = false;
      }
    });
};

const deleteQna = ({ reset }: { reset: () => void }) => {
  refQnaPwd.value = '';
  refDeleteConfirm.value = true;
  reset();
};
</script>
