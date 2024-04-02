<template>
  <div class="q-pa-md flex justify-center">
    <div style="max-width: 100%; width: 500px">
      <q-intersection
        clickable
        v-ripple
        v-for="actlogs in actlog"
        :key="actlogs.actlog"
        transition="flip-right"
        class="example-item"
      >
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white"> Q </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label
              >SYSTEM NOTIFICATION: {{ actlogs.added_by }}</q-item-label
            >
            <q-item-label caption lines="2">{{
              actlogs.action_title
            }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label caption>5 min ago</q-item-label>
            <q-icon name="star" color="yellow" />
          </q-item-section>
        </q-item>
      </q-intersection>
    </div>
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
