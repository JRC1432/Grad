// FILE: main.js

import { createApp } from "vue";
import { Quasar, Notify, Loading, Dialog, LoadingBar } from "quasar";
import router from "./router";
import "./assets/base.css";
import axiosMain from "axios";
import { VueReCaptcha } from "vue-recaptcha-v3";

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
router.beforeEach((to, from, next) => {
  // console.log("text");
  // ...
  // explicitly return false to cancel the navigation
  axios
    .get("/read.php?authLog", {
      withCredentials: true,
    })
    .then(function (response) {
      user = response.data;
      // console.log(user);
      myApp.provide("$user", user);

      if (response.data == false || response.data?.username == undefined) {
        // console.log(to);
        // next();

        if (to.path !== "/") {
          router.push("/");
          //   next();
        } else {
          next();
        }
      } else {
        next();
      }
    });
});

myApp.use(router);
myApp.use(Vue3Lottie);

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
