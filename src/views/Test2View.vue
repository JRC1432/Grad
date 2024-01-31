<template>
  <q-dialog v-model="scholarLists" persistent>
    <q-card style="min-width: 1000px; width: 1000px">
      <q-card-section class="q-gutter-md">
        <div class="text-h6">Lists of Scholars</div>
        <q-space />

        <q-btn flat color="primary" @click="CloseSlists">
          <IconSquareRoundedX :size="30" stroke-width="2" />
        </q-btn>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <q-table
          flat
          bordered
          title="List of Documents"
          :rows="sLrows"
          :columns="sLColumns"
          row-key="name"
          separator="cell"
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-stats="props">
            <q-td :props="props">
              <div>
                <q-badge color="light-green-4" :label="props.value" />
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                flat
                class="bi bi-info-circle"
                color="amber-5"
                @click="ViewDocx(props)"
                :href="'http://localhost/backdbase/upload/' + filePath"
                target="_blank"
              >
                <IconFiles :size="30" stroke-width="2" />
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>

      <q-separator />
    </q-card>
  </q-dialog>
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
// const axios = inject("$axios");
const user = inject("$user");
const axios = inject("$axios");

// Tables

const sLrows = ref([]);

const scholarLists = ref(false);

const CloseSlists = () => {
  scholarLists.value = false;
};

const sLColumns = [
  {
    name: "file_name",
    required: true,
    label: "File Name",
    align: "center",
    field: "file_name",
    sortable: true,
  },
  {
    name: "file_name",
    required: true,
    label: "File Name",
    align: "center",
    field: "file_name",
    sortable: true,
  },
];

// Read Scholar Lists

onMounted(() => {
  readOnscholarLists();
});

const readOnscholarLists = () => {
  axios.get("/read.php?readScholarLists").then(function (response) {
    sLrows.value = response.data;
  });
};

onMounted(() => {
  readOnscholarLists();
});
</script>
