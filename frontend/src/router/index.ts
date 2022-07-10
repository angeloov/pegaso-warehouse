import { createRouter, createWebHistory } from "vue-router";
import IndexView from "../views/IndexView.vue";
import SearchView from "@/views/SearchView.vue";
import QRCodesView from "@/views/QRCodesView.vue";

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/HomeView.vue"),
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
  ],
});

export default router;
