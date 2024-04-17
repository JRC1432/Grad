<template>
  <span class="spacer"> New on our system?</span>

  <a @click="requestAcc" class="element-class"><u>Request an account</u></a>

  <q-dialog v-model="accreq">
    <q-card>
      <form id="UserAccForm" @submit.prevent.stop="createReqUser">
        <q-card-section>
          <div class="text-h6">Request Account</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="row row_width q-col-gutter-xs">
            <div class="col-xs-12 col-sm-12">
              <div class="q-px-sm">
                <span class="text-bold">Request To:</span>
                <q-input
                  ref="refEmail"
                  v-model="state.reqEmail"
                  name="reqEmail"
                  outlined
                  dense
                  hide-bottom-space
                  :rules="[inputRules]"
                  hint="Email **"
                />
              </div>
            </div>
            <div class="col-xs-12 col-sm-6">
              <div class="q-px-sm">
                <span class="text-bold">First Name</span>
                <q-input
                  ref="refFname"
                  v-model="state.reqFirstname"
                  name="reqFirstname"
                  outlined
                  dense
                  hide-bottom-space
                  :rules="[inputRules]"
                />
              </div>
            </div>
            <div class="col-xs-12 col-sm-6">
              <div class="q-px-sm">
                <span class="text-bold">Last Name</span>
                <q-input
                  ref="refLname"
                  v-model="state.reqLastname"
                  name="reqLastname"
                  outlined
                  dense
                  hide-bottom-space
                  :rules="[inputRules]"
                />
              </div>
            </div>
            <div class="col-xs-12 col-sm-12">
              <div class="q-px-sm">
                <span class="text-bold">Username</span>
                <q-input
                  ref="refUser"
                  v-model="state.reqUsername"
                  name="reqUsername"
                  outlined
                  dense
                  hide-bottom-space
                  :rules="[inputRules]"
                />
              </div>
            </div>
            <div class="col-xs-12 col-sm-12">
              <div class="q-px-sm">
                <span class="text-bold">User Access Level</span>
                <q-select
                  ref="upSlctUservalidate"
                  outlined
                  dense
                  emit-value
                  map-options
                  hide-bottom-space
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="reqacclevel"
                  name="reqacclevel"
                  :options="Acclevel"
                  :rules="[myRule]"
                />
              </div>
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Submit!"
            color="primary"
            type="submit"
            v-close-popup
          />
        </q-card-actions>
      </form>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, reactive, inject, onBeforeUnmount } from "vue";
import Swal from "sweetalert2";

const accreq = ref(false);

// Rules & Validations
const inputRules = [
  (val) => (val && val.length > 0) || "Please type something",
];

const refFname = ref(null);
const refLname = ref(null);
const refEmail = ref(null);
const refUser = ref(null);

const reqacclevel = ref();

const createLoadingState = () => {
  let timerInterval;
  Swal.fire({
    title: "Request Submitting",
    html: "Loading... <b></b> milliseconds.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
      Swal.fire("Request Submitted!", "", "success");
    }
  });
};

const state = reactive({
  reqFirstname: "",
  reqLastname: "",
  reqEmail: "",
  reqUsername: "",
});

const Acclevel = [
  { label: "Administrator Account", value: "1" },
  { label: "User Account", value: "0" },
  { label: "Coordinator", value: "2" },
  { label: "Project Leaders", value: "3" },
];

const requestAcc = () => {
  console.log("Test");
  accreq.value = true;
};

const createReqUser = () => {
  console.log("Test");
  createLoadingState();
};
</script>

<style scoped>
.spacer {
  padding-right: 8px; /* Adds space to the right */
}
.element-class:hover {
  cursor: pointer;
}
</style>
