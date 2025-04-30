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
      meta: { requiresAuth: true, accountType: [0, 1] },
    },
    {
      path: "/test2",
      name: "test2",
      component: () => import("../views/Test2View.vue"),
    },
    {
      path: "/test3",
      name: "test3",
      component: () => import("../views/Test3View.vue"),
    },
    {
      path: "/test4",
      name: "test4",
      component: () => import("../views/Test4View.vue"),
    },
    {
      path: "/test5",
      name: "test5",
      component: () => import("../views/Test5View.vue"),
    },
    {
      path: "/dashboards",
      component: () => import("../layouts/Dashboardlayout.vue"),
      children: [
        {
          path: "/dash",
          name: "dash",
          component: DashboardView,
          meta: { access_level: 1 },
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
        {
          path: "/forms",
          name: "forms",
          component: () => import("../views/FormsView.vue"),
        },
        {
          path: "/brochure",
          name: "brochure",
          component: () => import("../views/BrochuresView.vue"),
        },
        {
          path: "/school",
          name: "school",
          component: () => import("../views/SchoolView.vue"),
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
