import { defineStore } from 'pinia';
import { BookedCustInfo } from 'src/types/cust';

//Drawer Open State Store
export const drawerOpenState = defineStore('drawerOpen', {
  state: () => ({
    isOpened: false,
  }),
  getters: {},
  actions: {
    open() {
      this.isOpened = true;
    },
    close() {
      this.isOpened = false;
    },
  },
});

//Booked Schedule Info Store
export const bkdSchdInfoStore = defineStore('bkdSchdInfoStore', {
  state: () => ({
    tm_no: '',
    operDate: '',
    operTime: '',
    custCnt: 0,
    ticketPrice: 0,
    rv_cd: '',
    way: '',
    custNm: '',
    custPhone: '',
  }),
  getters: {},
  actions: {},
  persist: true,
});

export const bkdCustInfoStore = defineStore('bkdCustInfoStore', {
  state: () => ({
    custList: [] as BookedCustInfo[],
  }),
  getters: {},
  actions: {},
  persist: true,
});

export const srchRsvParams = defineStore('srchRsvParams', {
  state: () => ({
    custNm: '',
    lastDigit: '',
    period: 'all',
  }),
  getters: {},
  actions: {},
  persist: true,
});
