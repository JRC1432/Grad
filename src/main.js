// FILE: main.js

import { createApp } from "vue";
import { Quasar, Notify, Loading, Dialog, LoadingBar } from "quasar";
import router from "./router";
import "./assets/base.css";
import axiosMain from "axios";
import { VueReCaptcha } from "vue-recaptcha-v3";
import Vue3Autocounter from "vue3-autocounter";
import "./assets/light.scss";
import "./assets/dark.scss";
import VueApexCharts from "vue3-apexcharts";

import Vue3Lottie from "vue3-lottie";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";

// Import Quasar css
import "quasar/src/css/index.sass";

// Assumes your root component is App.vue
// and placed in same folder as main.js
import App from "./App.vue";

var user = [];
var rootDomain = "http://localhost";
const myApp = createApp(App);

const baseURL =
  process.env.NODE_ENV === "development"
    ? rootDomain + "/backdbase/"
    : "/backdbase/";
const axios = axiosMain.create({
  baseURL,
  withCredentials: true,
});
myApp.provide("$axios", axios);

router.beforeEach(async (to, from, next) => {
  try {
    const response = await axios.get("/read.php?authLog", {
      withCredentials: true,
    });
    const user = response.data;

    myApp.provide("$user", user);

    if (!user || !user.username) {
      // Redirect to login if not logged in
      if (to.meta.requiresAuth) {
        return next("/");
      }
      return next();
    }

    if (to.path === "/") {
      return next("/stats");
    }

    // Check if the route has access restrictions
    if (to.meta.requiresAuth && to.meta.accountType) {
      if (!to.meta.accountType.includes(user.access_level)) {
        Notify.create({
          type: "negative",
          message: "Unauthorized access!",
          icon: "cancel",
          position: "top-right",
        });
        return next("/stats"); // Redirect unauthorized users
      }
    }

    return next();
  } catch (error) {
    console.error("Auth Check Error:", error);
    return next("/");
  }
});

myApp.use(router);
myApp.use(Vue3Lottie);
myApp.use(Vue3Autocounter);
myApp.use(VueApexCharts);

myApp.use(Quasar, {
  plugins: { Notify, Loading, Dialog, LoadingBar }, // import Quasar plugins and add here
  config: {
    loadingBar: {
      skipHijack: false,
      color: "warning",
      size: "3px",
    },
  },
});

myApp.use(VueReCaptcha, {
  siteKey: "6LfwPJUnAAAAAIe2G4j-VmxwN27GnrB4DAJ4Kt_Z",
});

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount("#app");
