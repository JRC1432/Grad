<template>
  <div class="q-pa-md">
    <Pie :data="data" :options="options" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import { useQuasar, QSpinnerGears } from "quasar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "vue-chartjs";

const $q = useQuasar();

const axios = inject("$axios");
const user = inject("$user");

ChartJS.register(ArcElement, Tooltip, Legend);

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
</script>
