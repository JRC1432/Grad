<template>
  <!-- Table Starts Here -->

  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-primary">Action Log</div>
        <div class="text-subtitle2 text-primary">Action Log Table</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-table
          flat
          bordered
          title="Action Log Lists"
          :rows="rows"
          :columns="columns"
          row-key="name"
          separator="cell"
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                flat
                class="bi bi-info-circle"
                color="blue-11"
                @click="showedit(props)"
              >
                <IconUserEdit :size="30" stroke-width="2" />
              </q-btn>
              <q-btn
                flat
                class="bi bi-info-circle"
                color="red-5"
                @click="showdel(props)"
              >
                <IconUserMinus :size="30" stroke-width="2" />
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, inject, computed } from "vue";

import {
  IconUserEdit,
  IconUserCancel,
  IconUserMinus,
  IconSquareRoundedX,
} from "@tabler/icons-vue";
import { useQuasar, QSpinnerGears, Notify } from "quasar";
import Swal from "sweetalert2";

const user = inject("$user");
const $q = useQuasar();
const axios = inject("$axios");

const filter = ref("");
const rows = ref([]);

const columns = [
  {
    name: "spas_id",
    required: true,
    label: "SPAS ID",
    align: "center",
    field: "spas_id",
    sortable: true,
  },
  {
    name: "action_title",
    required: true,
    label: "Action Details",
    align: "left",
    field: "action_title",
    sortable: true,
  },
  {
    name: "action_type",
    required: true,
    label: "Type of Action",
    align: "center",
    field: "action_type",
    sortable: true,
  },
  {
    name: "added_by",
    required: true,
    label: "Action By",
    align: "center",
    field: "added_by",
    sortable: true,
  },
  {
    name: "added_on",
    align: "center",
    label: "Date and Time Logs",
    field: "added_on",
    sortable: true,
  },
  // {
  //   name: "actions",
  //   align: "center",
  //   label: "Action Buttons",
  //   field: "",
  //   sortable: true,
  // },
];

onMounted(() => {
  readLog();
});

const readLog = () => {
  axios.get("/read.php?ReadLogs").then(function (response) {
    rows.value = response.data;
  });
};
</script>
