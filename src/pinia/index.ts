import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    counter: 0,
    breadcrumb: [''],
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
    doubleCountPlusOne(): number {
      return this.doubleCount * 2 + 1
    }
  },
  actions: {
    setBreadcrumb(payload: string[]) {
      this.breadcrumb = payload;
    },
    reset() {
      this.counter = 0
    },
  },
})