import { defineStore } from "pinia";

export const useUserDataStore = defineStore({
  id: "userData",
  state: () => ({
    id: "",
    firstname: "",
    username: "",
    accessToken: "",
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2
  // },
  // actions: {
  //   increment() {
  //     this.counter++
  //   }
  // }
});
