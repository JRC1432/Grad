<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-card>
      <q-scroll-area style="height: 500px; width: 100%">
        <q-list>
          <q-intersection transition="flip-right" class="example-item">
            <q-item
              clickable
              v-ripple
              v-for="actlogs in actlog"
              :key="actlogs.actlog"
            >
              <q-item-section>
                <q-item-label>ACTION BY: {{ actlogs.added_by }}</q-item-label>
                <q-item-label caption lines="2">{{
                  actlogs.action_title
                }}</q-item-label>
                <q-separator spaced />
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>5 min ago</q-item-label>
                <q-icon name="star" color="yellow" />
              </q-item-section>
            </q-item>
          </q-intersection>
        </q-list>
      </q-scroll-area>
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
  width: 100%;
}
</style>
