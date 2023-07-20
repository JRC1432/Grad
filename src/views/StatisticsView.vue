<template>
  <div class="q-pa-md">
    <div class="col-xs-12 col-sm-6">
      <div class="q-col-gutter-md row items-start">
        <div class="col-xs-12">
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

            <q-card-section class="q-pt-none">
              <div class="col-xs-12 col-sm-6">
                <div class="q-col-gutter-md row items-start">
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <div class="text-h6">Male Scholars</div>
                    <div class="text-h6">Count: {{ malecounts }}</div>
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <div class="text-center text-h6">Total Scholars</div>
                    <div class="text-center text-h6">
                      Count: {{ malecounts + femalecounts }}
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <div class="text-right text-h6">Female Scholars</div>
                    <div class="text-right text-h6">
                      Count: {{ femalecounts }}
                    </div>
                  </div>
                </div>
              </div>
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
import { ref, reactive, onMounted, inject, computed, toRaw } from "vue";
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

const $q = useQuasar();

const axios = inject("$axios");
const user = inject("$user");
const array = reactive([]);
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

// Count Male Section

onMounted(() => {
  countmale();
});

const malecounts = ref([]);

const countmale = () => {
  axios.get("/read.php?countmale").then(function (response) {
    malecounts.value = response.data.malecount;
    // array.push(malecounts.value);
  });
};

// Count Female Section

onMounted(() => {
  countfemale();
});

const femalecounts = ref([]);

const countfemale = () => {
  axios.get("/read.php?countfemale").then(function (response) {
    femalecounts.value = response.data.femalecount;
    // array.push(femalecounts.value);
  });
};
// console.log(array);

// Pie Data

const data = computed(() => {
  return {
    labels: ["Male", "Female"],
    datasets: [
      {
        backgroundColor: ["#2ea0c4", "#F59E8C"],
        data: [malecounts.value, femalecounts.value],
        // data: toRaw(array),
      },
    ],
  };
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
};

//Line Data

const linedata = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Applied Scholars",
      backgroundColor: "#f87979",
      data: [40, 39, 10, 40, 39, 80, 40, 45, 50, 67, 90, 56],
    },
  ],
};

const lineoptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
