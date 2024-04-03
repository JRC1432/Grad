<template>
  <q-btn @click="awesome = !awesome">Toggle</q-btn>

  <div class="q-pa-md flex justify-center">
    <q-card
      v-if="awesome"
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        {{ lorem }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive, inject } from "vue";

import {
  IconListDetails,
  IconSquareRoundedX,
  IconFileTypePdf,
  IconFileSearch,
  IconFiles,
} from "@tabler/icons-vue";
import { useQuasar, QSpinnerGears } from "quasar";
import Swal from "sweetalert2";

const $q = useQuasar();

const user = inject("$user");
const axios = inject("$axios");

const awesome = ref(true);

const actlog = ref();

onMounted(() => {
  readLog();
});

const readLog = () => {
  axios.get("/read.php?ReadLogs").then(function (response) {
    actlog.value = response.data;
  });
};
</script>

<style scoped>
.example-item {
  height: 56px;
}
</style>
