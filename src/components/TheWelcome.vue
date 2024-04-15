<template>
  <div class="row">
    <div
      class="col-lg-8 col-md-8 col-sm-8"
      v-if="q$.screen.gt.sm"
      style="background: radial-gradient(circle, #f8bbe4 0%, #f988ae 100%)"
    >
      <Vue3Lottie
        animationLink="https://assets7.lottiefiles.com/packages/lf20_xY418y0j6x.json"
        style="height: calc(100vh)"
        :height="800"
        :width="800"
      />
    </div>
    <div class="col-12 col-lg-4 col-md-4 q-px-xl">
      <div class="justify-center">
        <div class="text-h5 text-center text-bold q-pt-xl q-mt-xl">
          <q-avatar size="70px" class="q-mb-sm">
            <img src="http://localhost/backdbase/pic/download.jpg" />
          </q-avatar>
          <q-space />

          Graduate Scholarship Monitoring System
        </div>

        <q-space />

        <div class="q-pa-xl">
          <q-banner
            class="bg-orange-1 text-orange-14 rounded-borders text-center"
          >
            Please sign-in to your account
            <!-- <template v-slot:action>
            <q-btn flat label="Dismiss" />
            <q-btn flat label="Update Credit Card" />
          </template> -->
          </q-banner>
          <form id="login" @submit.prevent.stop="LogSubmit">
            <q-input
              ref="nameRef"
              v-model="state.usernames"
              :dense="dense"
              label="Username"
              name="usernames"
              lazy-rules
              :rules="inputRules"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              ref="passRef"
              :type="isPwd ? 'password' : 'text'"
              v-model="state.password"
              label="Password"
              lazy-rules
              :rules="inputpassRules"
              name="password"
            >
              <template v-slot:prepend>
                <q-icon name="password" />
              </template>
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <div class="q-pa-sm">
              <q-btn
                rounded
                color="primary"
                label="Log In"
                type="submit"
                style="width: 100%"
              />
            </div>
          </form>
          <div class="q-mt-lg text-center">
            <span class="spacer"> New on our system?</span>

            <a href="" @click.prevent="requestAcc">Request an account</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
// import WelcomeItem from './WelcomeItem.vue'
// import DocumentationIcon from './icons/IconDocumentation.vue'
// import ToolingIcon from './icons/IconTooling.vue'
// import EcosystemIcon from './icons/IconEcosystem.vue'
// import CommunityIcon from './icons/IconCommunity.vue'
// import SupportIcon from './icons/IconSupport.vue'
import { useQuasar } from "quasar";
import { ref, reactive, inject, onBeforeUnmount } from "vue";
import { RouterLink, RouterView } from "vue-router";
import { useReCaptcha } from "vue-recaptcha-v3";

import { isTemplateNode } from "@vue/compiler-core";
import router from "../router";

const axios = inject("$axios");
const user = inject("$user");

const isPwd = ref(true);

const q$ = useQuasar();
const $q = useQuasar();
const nameRef = ref(null);
const passRef = ref(null);

const { executeRecaptcha, recaptchaLoaded } = useReCaptcha();

let timer;

const state = reactive({
  password: "",
  usernames: "",
});

const inputRules = [
  (val) => (val && val.length > 0) || "Please enter your username",
];
const inputpassRules = [
  (val) => !!val || "Field is required",
  (val) => val.length >= 6 || "Please use minimum of 6 characters",
];

onBeforeUnmount(() => {
  if (timer !== void 0) {
    clearTimeout(timer);
    $q.loading.hide();
  }
});

const showLoading = () => {
  $q.loading.show({
    message: "Logging In.....",
  });

  // hiding in 3s
  timer = setTimeout(() => {
    $q.loading.hide();
    timer = void 0;
  }, 3000);
};

const LogSubmit = async () => {
  // (optional) Wait until recaptcha has been loaded.
  await recaptchaLoaded();

  // Execute reCAPTCHA with action "login".
  const token = await executeRecaptcha("login");

  // Do stuff with the received token.
  console.log({ token });
  nameRef.value.validate();
  passRef.value.validate();

  if (nameRef.value.hasError || passRef.value.hasError) {
    // form has error
  } else {
    var formData = new FormData(document.getElementById("login"));

    axios.post("/read.php?usnames", formData).then(function (response) {
      console.log(response.data);
      if (response.data.error) {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Login Failed",
        });
      } else {
        router.push("/stats");
      }
    });
  }
};
</script>
<style scoped>
.spacer {
  padding-right: 8px; /* Adds space to the right */
}
</style>
