<template>
  <div class="q-pa-md">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">View Scholars</div>
        <div class="text-subtitle2">Scholars Table</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-table
          flat
          bordered
          title="Scholar Profile Details"
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
                class="bi bi-info-circle"
                color="blue-11"
                @click="showeditScholar(props)"
              >
                <IconListDetails :size="30" stroke-width="2" />
              </q-btn>
              <q-btn
                class="bi bi-info-circle"
                color="red-5"
                @click="showdelScholar(props)"
              >
                <IconTrash :size="30" stroke-width="2" />
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, inject } from "vue";
import { IconListDetails, IconTrash } from "@tabler/icons-vue";
import { useQuasar, QSpinnerGears } from "quasar";

const $q = useQuasar();
// const axios = inject("$axios");
const user = inject("$user");
const axios = inject("$axios");

// Items Variables

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
    name: "lname",
    required: true,
    label: "Last Name",
    align: "center",
    field: "lname",
    sortable: true,
  },
  {
    name: "fname",
    required: true,
    label: "First Name",
    align: "center",
    field: "fname",
    sortable: true,
  },
  {
    name: "mname",
    required: true,
    label: "Middle Name",
    align: "center",
    field: "mname",
    sortable: true,
  },
  {
    name: "suffix",
    required: true,
    label: "Suffix",
    align: "center",
    field: "suffix",
    sortable: true,
  },
  {
    name: "email",
    required: true,
    label: "E-mail",
    align: "center",
    field: "email",
    sortable: true,
  },
  {
    name: "contact",
    required: true,
    label: "Contact",
    align: "center",
    field: "contact",
    sortable: true,
  },
  {
    name: "actions",
    align: "center",
    label: "Action Buttons",
    field: "",
    sortable: true,
  },
];

// Read Scholars

onMounted(() => {
  readscholars();
});

const readscholars = () => {
  axios.get("/read.php?readscholar").then(function (response) {
    rows.value = response.data;
  });
};
</script>
