import { createRouter, createWebHistory } from "vue-router";
import IndexView from "@/views/IndexView.vue";
import HomeView from "@/views/HomeView.vue";
import SearchView from "@/views/SearchView.vue";
import QRCodesView from "@/views/QRCodesView.vue";
import AddItemView from "@/views/AddItemView.vue";

import fetchUserData from "@/utils/fetchUserData";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "index",
      component: IndexView,
    },
    {
      path: "/home",
      name: "home",
      component: HomeView,
      beforeEnter: fetchUserData,
    },
    {
      path: "/search",
      name: "search",
      component: SearchView,
    },
    {
      path: "/qrcodes",
      name: "qrcodes",
      component: QRCodesView,
    },
    {
      path: "/add",
      name: "add",
      component: AddItemView,
    },
  ],
});

export default router;
