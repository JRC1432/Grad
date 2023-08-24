import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DashboardView from "@/views/DashboardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/test",
      name: "test",
      component: () => import("../views/TestView.vue"),
    },
    {
      path: "/test2",
      name: "test2",
      component: () => import("../views/Test2View.vue"),
    },
    {
      path: "/dashboards",
      component: () => import("../layouts/Dashboardlayout.vue"),
      children: [
        {
          path: "/dash",
          name: "dash",
          component: DashboardView,
        },
        {
          path: "/newscholar",
          name: "newscholar",
          component: () => import("../views/AddScholarView.vue"),
        },
        {
          path: "/viewscholar",
          name: "viewscholar",
          component: () => import("../views/ScholarView.vue"),
        },
        {
          path: "/stats",
          name: "stats",
          component: () => import("../views/StatisticsView.vue"),
        },
        {
          path: "/log",
          name: "log",
          component: () => import("../views/LogView.vue"),
        },
      ],
    },
    {
      path: "/dashboards",
      component: () => import("../layouts/HeadFootlayout.vue"),
      children: [
        {
          path: "/front",
          name: "front",
          component: () => import("../views/FrontView.vue"),
        },
      ],
    },
  ],
});

export default router;
