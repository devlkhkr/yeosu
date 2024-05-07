<template>
  <q-page class="container">
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
          @right="deleteQnaPopup"
          @slide="deleteTarget = qna"
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
                        'text-green': qna.replyState === true,
                      }"
                      >{{
                        qna.replyState === true ? '답변완료' : '답변대기'
                      }}</span
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
                  <q-card v-if="qna.prvtYn === true && qna.pwdCheck === false">
                    <q-card-section class="q-pt-none">
                      <q-input
                        v-model="refQnaPwd"
                        :type="hidePwd ? 'password' : 'text'"
                        maxlength="4"
                        placeholder="비밀번호 숫자 4자리를 입력해주세요."
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

                    <q-card-actions align="right" class="text-primary">
                      <q-btn
                        flat
                        label="확인"
                        v-close-popup
                        @click="checkPwd(qna)"
                      />
                    </q-card-actions>
                  </q-card>
                  <p class="q-mt-md" v-if="qna.pwdCheck === true && qna.qDtl">
                    <span
                      class="text-h6 text-weight-medium text-grey q-mr-sm"
                      style="font-family: serif"
                      >Q.</span
                    >
                    {{ qna.qDtl }}
                  </p>
                  <p class="q-mt-md" v-if="qna.pwdCheck === true && qna.aDtl">
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
              v-model="refQna.title"
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
              v-model="refQna.usrNm"
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
              v-model="refQna.pwd"
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

          <q-toggle v-model="refQna.prvtYn" label="비밀글 선택" />

          <q-card-section>
            <div class="text-body2">내용</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="refQna.qDtl"
              autofocus
              type="textarea"
              maxlength="1000"
              placeholder="내용을 입력해주세요."
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="취소" v-close-popup @click="resetRefQna" />
            <q-btn flat label="확인" @click="regQna" />
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
            <q-btn flat label="확인" @click="deleteQna" />
          </q-card-actions>
        </q-card>
      </MaxWidthCont>
    </q-dialog>
    <q-scroll-observer @scroll="onScroll" />
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { MaxWidthCont } from 'src/styled/common';
import SearchForm, { IFSearchForm } from 'src/components/SearchForm.vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { debounce } from 'lodash';

const $q = useQuasar();
const refDeleteConfirm = ref<boolean>(false);
const writeQna = ref<boolean>(false);
const hidePwd = ref<boolean>(true);
const refQnaPwd = ref<string>('');
const deleteTarget = ref<QnaIF>();

const formOptions: IFSearchForm = {
  items: [
    {
      name: 'title',
      title: '제목',
      type: 'text',
    },
    {
      name: 'usrNm',
      title: '작성자',
      type: 'text',
    },
    {
      name: 'ansrStt',
      title: '답변상태',
      type: 'select',
      selectOptions: [
        {
          label: '전체',
          value: null,
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
    searchForm.value.title = refItemsModel.title.value;
    searchForm.value.usrNm = refItemsModel.usrNm.value;
    searchForm.value.ansrStt = refItemsModel.ansrStt.value;
    searchForm.value.fromDate = refItemsModel.regDate.start;
    searchForm.value.toDate = refItemsModel.regDate.end;

    refQnaList.value = [];
    flag = true;
    currPage = 1;
    loadData();
  },
};

export interface QnaIF {
  boNo: string;
  title: string;
  usrNm: string;
  regDate: string;
  pwd: string;
  prvtYn: boolean;
  qDtl: string;
  aDtl: string;
  pwdCheck: boolean;
  replyState: boolean;
}

export interface searchFormInterface {
  title: string | number | boolean | null | undefined;
  usrNm: string | number | boolean | null | undefined;
  ansrStt: string | number | boolean | null | undefined;
  fromDate: string | number | boolean | null | undefined;
  toDate: string | number | boolean | null | undefined;
}

const refQna = ref<QnaIF>({
  boNo: '',
  title: '',
  usrNm: '',
  regDate: '',
  pwd: '',
  prvtYn: false,
  qDtl: '',
  aDtl: '',
  pwdCheck: false,
  replyState: false,
});

const searchForm = ref<searchFormInterface>({
  title: null,
  usrNm: null,
  ansrStt: null,
  fromDate: null,
  toDate: null,
});

const resetRefQna = () => {
  refQna.value.title = '';
  refQna.value.usrNm = '';
  refQna.value.regDate = '';
  refQna.value.pwd = '';
  refQna.value.prvtYn = false;
  refQna.value.qDtl = '';
  refQna.value.aDtl = '';
  refQna.value.pwdCheck = false;
};

const regQna = () => {
  if (
    refQna.value.title === '' ||
    refQna.value.usrNm === '' ||
    refQna.value.pwd === '' ||
    refQna.value.qDtl === ''
  ) {
    $q.notify({
      message: '모든 항목을 입력해주세요.',
      type: 'negative',
      position: 'top',
      timeout: 1500,
    });
  } else {
    if (refQna.value.pwd.length != 4) {
      $q.notify({
        message: '비밀번호는 숫자 4자리로 입력해주세요.',
        type: 'negative',
        position: 'top',
        timeout: 1500,
      });
    } else {
      axios
        .post(`${process.env.API_URL}/regBoard`, {
          boCd: '02',
          boTi: refQna.value.title,
          usrNm: refQna.value.usrNm,
          boPrv: refQna.value.prvtYn,
          boPw: refQna.value.pwd,
          boCont: refQna.value.qDtl,
        })
        .then(function (response) {
          // console.log('QnaResponse::', response.data);
          if (response.data.state === '1') {
            $q.notify({
              message: response.data.message,
              type: 'positive',
              position: 'top',
              timeout: 1500,
            });
            resetRefQna();
          } else {
            $q.notify({
              message: response.data.message,
              type: 'negative',
              position: 'top',
              timeout: 1500,
            });
          }
        });
      writeQna.value = false;
    }
  }
};

const refQnaList = ref<QnaIF[]>([
  // {
  //   title: '관광코스당 소요시간이 어떻게 되나요?',
  //   usrNm: '김*수',
  //   regDate: '2024-04-03',
  //   pwd: '1234',
  //   prvtYn: true,
  //   qDtl: '질문의 내용입니다.',
  //   aDtl: '',
  // },
  // {
  //   title: '질문 입니다.',
  //   usrNm: '정*민',
  //   regDate: '2024-04-09',
  //   pwd: '1234',
  //   prvtYn: false,
  //   qDtl: '질문의 내용입니다.',
  //   aDtl: '답변 입니다.',
  // },
  // {
  //   title: '질문 입니다. 222',
  //   usrNm: '박*민',
  //   regDate: '2024-04-11',
  //   pwd: '1234',
  //   prvtYn: false,
  //   qDtl: '질문의 내용입니다.',
  //   aDtl: '답변 입니다. 222',
  // },
]);

let currPage = 1;
const perPage = 10;
let flag = true;

const loadData = () => {
  axios
    .post<
      {
        boNo: string;
        boTi: string;
        usrNm: string;
        boDt: string;
        boPw: string;
        boPrv: boolean;
        boCont: string;
        boReCont: string;
        replyState: boolean;
      }[]
    >(`${process.env.API_URL}/getBoardList`, {
      currPage: currPage,
      perPage: String(perPage),
      boCd: '02',
      boTi: searchForm.value.title,
      usrNm: searchForm.value.usrNm,
      reStSel: searchForm.value.ansrStt,
      fromDate: searchForm.value.fromDate,
      toDate: searchForm.value.toDate,
    })
    .then((response) => {
      console.log('responsedata::', response.data);
      if (response.data.length > 0) {
        refQnaList.value = [
          ...refQnaList.value,
          ...response.data.map((item) => ({
            boNo: item.boNo,
            title: item.boTi,
            usrNm: item.usrNm,
            regDate: item.boDt,
            pwd: item.boPw,
            prvtYn: item.boPrv,
            qDtl: item.boCont,
            aDtl: item.boReCont,
            replyState: item.replyState,
            pwdCheck: item.boPrv == true ? false : true,
          })),
        ];
        if (response.data.length < perPage) {
          flag = false;
        }
        currPage++;
      } else {
        flag = false;
      }
    });
};

const checkPwd = (selectedQna: QnaIF) => {
  axios
    .post(`${process.env.API_URL}/checkPwd`, {
      boNo: selectedQna.boNo,
      boPw: refQnaPwd.value,
    })
    .then((response) => {
      // console.log('response.data::', response.data);
      if (response.data.boPw == null) {
        // console.log('일치하지 않습니다.');
        $q.notify({
          message: '비밀번호가 일치하지 않습니다.',
          type: 'negative',
          position: 'top',
          timeout: 1500,
        });
        refQnaPwd.value = '';
      } else {
        // console.log('일치합니다.');
        $q.notify({
          message: '비밀번호가 일치합니다.',
          type: 'positive',
          position: 'top',
          timeout: 1500,
        });
        selectedQna.qDtl = response.data.boCont;
        selectedQna.aDtl = response.data.boReCont;
        selectedQna.pwdCheck = true;
        refQnaPwd.value = '';
      }
    });
};

const deleteQnaPopup = ({ reset }: { reset: () => void }) => {
  refQnaPwd.value = '';
  refDeleteConfirm.value = true;
  reset();
};

const deleteQna = () => {
  // console.log(deleteTarget.value);
  if (refQnaPwd.value === '') {
    $q.notify({
      message: '비밀번호를 입력해주세요',
      type: 'negative',
      position: 'top',
      timeout: 1500,
    });
    refQnaPwd.value = '';
  } else {
    axios
      .post(`${process.env.API_URL}/deleteBoard`, {
        boardList: [
          {
            boNo: deleteTarget.value?.boNo,
            boPw: refQnaPwd.value,
          },
        ],
      })
      .then((response) => {
        console.log('response.data::', response.data);
        if (response.data.state === '1') {
          $q.notify({
            message: response.data.message,
            type: 'positive',
            position: 'top',
            timeout: 1500,
          });
          resetRefQna();
        } else {
          $q.notify({
            message: response.data.message,
            type: 'negative',
            position: 'top',
            timeout: 1500,
          });
        }
      });
    refDeleteConfirm.value = false;
    refQnaPwd.value = '';
  }
};

// 스크롤 이벤트를 debounce함수로 감싸서 처리
const onScroll = debounce(() => {
  if (flag == true) {
    const scrollContainer = document.querySelector('.container') as HTMLElement;
    const scrollHeight = scrollContainer.clientHeight;
    const scrollTop = scrollContainer.scrollTop;
    const offsetHeight = scrollContainer.offsetHeight;
    const bottomThreshold = 50; // 스크롤이 얼마나 남았을 때 데이터를 로드할 지 설정

    if (scrollHeight - scrollTop - offsetHeight < bottomThreshold) {
      setTimeout(loadData, 500); // 데이터를 로드하기 전에 약간의 딜레이를 줌
    }
  }
}, 300); // debounce의 대기 시간 설정

onMounted(loadData);
</script>
