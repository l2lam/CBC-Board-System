import { defineStore } from "pinia";

export const playerStore = defineStore("players", {
  state: () => ({ waitingQueue: [] }),
  getters: {
    // doubleCount: (state) => state.count * 2,
  },
  actions: {
    // increment() {
    //   this.count++;
    // },
  },
});
