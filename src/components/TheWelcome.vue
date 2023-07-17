<template>
  <div class="row">
    <div
      class="col-lg-7 col-md-7 col-sm-7"
      v-if="q$.screen.gt.xs"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <Vue3Lottie
        animationLink="https://assets7.lottiefiles.com/packages/lf20_xY418y0j6x.json"
        :height="655"
      />
    </div>
    <div class="col-12 col-lg-5 col-md-5 col-sm-5 q-pa-sm">
      <div class="justify-center">
        <div class="text-h5 text-center text-bold q-pt-xl q-mt-xl">
          <q-avatar size="70px" class="q-mb-sm">
            <img src="http://localhost/backdbase/pic/download.jpg" />
          </q-avatar>
          Log In To Continue
        </div>
        <div class="q-pa-xl">
          <form id="login" @submit.prevent="LogSubmit">
            <q-input
              v-model="state.usernames"
              :dense="dense"
              label="UserName"
              name="usernames"
            >
              <template v-slot:prepend>
                <q-icon name="person" />
              </template>
            </q-input>
            <q-input
              :dense="dense"
              label="Password"
              :type="isPwd ? 'password' : 'text'"
              v-model="state.password"
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
                outline
                rounded
                color="primary"
                label="Log In"
                type="submit"
                style="width: 100%"
              />
            </div>
          </form>
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

import { isTemplateNode } from "@vue/compiler-core";
import router from "../router";

const axios = inject("$axios");
const user = inject("$user");

const isPwd = ref(true);

const q$ = useQuasar();
const $q = useQuasar();

let timer;

const state = reactive({
  password: "",
  usernames: "",
});

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

const LogSubmit = () => {
  var formData = new FormData(document.getElementById("login"));

  axios.post("/read.php?usnames", formData).then(function (response) {
    console.log(response.data);
    if (response.data.error) {
      $q.notify({
        color: "red",
        textColor: "white",
        message: "Login Failed",
      });
      location.reload();
    } else {
      showLoading();
      router.push("/dash");
    }
  });
};
</script>
