<template>
  <div class="q-pa-md">
    <div class="col-xs-12 col-sm-6">
      <div class="q-col-gutter-md row items-start">
        <div class="col-xs-12 col-sm-6 col-md-6">
          <q-card
            class="my-card text-white"
            style="
              background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
            "
          >
            <q-card-section class="q-pa-md">
              <div class="q-pa-md">
                <q-card class="my-card bg-grey-3 text-white">
                  <q-card-section class="q-pr-lg">
                    <Pie :data="data" :options="options" />
                  </q-card-section>
                </q-card>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-6">
          <q-card
            class="my-card text-white"
            style="
              background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
            "
          >
            <q-card-section class="q-pr-lg">
              <div class="text-h6">Male Scholars</div>
              <div class="text-subtitle2"></div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-right text-h6">Count: {{ malecounts }}</div>
            </q-card-section>
          </q-card>
          <br />

          <q-card
            class="my-card text-white"
            style="
              background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
            "
          >
            <q-card-section class="q-pr-lg">
              <div class="text-h6">Female Scholars</div>
              <div class="text-subtitle2"></div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-right text-h6">Count: {{ femalecounts }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
  <div class="q-pa-md">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section class="q-pa-md">
        <div class="q-pa-md">
          <q-card class="my-card bg-grey-3 text-white">
            <q-card-section class="q-pr-lg">
              <Line :data="linedata" :options="lineoptions" />
            </q-card-section>
          </q-card>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import { useQuasar, QSpinnerGears } from "quasar";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Line } from "vue-chartjs";
import { IconCalendarSearch } from "@tabler/icons-vue";

const $q = useQuasar();

const axios = inject("$axios");
const user = inject("$user");

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

onMounted(() => {
  countmale();
});

const malecounts = ref([]);

const countmale = () => {
  axios.get("/read.php?countmale").then(function (response) {
    malecounts.value = response.data.malecount;
    console.log(malecounts.value);
  });
};

onMounted(() => {
  countfemale();
});

const femalecounts = ref([]);

const countfemale = () => {
  axios.get("/read.php?countfemale").then(function (response) {
    femalecounts.value = response.data.femalecount;
    console.log(femalecounts.value);
  });
};

// Pie Data

const data = {
  labels: ["Male", "Female"],
  datasets: [
    {
      backgroundColor: ["#41B883", "#E46651"],
      data: ["1", "2"],
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

//Line Data

const linedata = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#f87979",
      data: [40, 39, 10, 40, 39, 80, 40],
    },
  ],
};

const lineoptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
