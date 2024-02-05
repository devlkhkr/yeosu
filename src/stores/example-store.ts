import { defineStore } from 'pinia';

export const drawerOpenState = defineStore('drawerOpen', {
  state: () => ({
    isOpened: false,
  }),
  getters: {
    doubleCount: (state) => state.isOpened,
  },
  actions: {
    open() {
      this.isOpened = true;
    },
    close() {
      this.isOpened = false;
    },
  },
});
