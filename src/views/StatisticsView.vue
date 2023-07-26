<template>
  <div class="q-pa-md">
    <div class="col-xs-12 col-sm-6">
      <div class="q-col-gutter-md row items-start">
        <div class="col-xs-12 col-sm-4 col-md-4">
          <q-card class="my-card text-primary">
            <q-card-section class="flex">
              <div class="text-h6">Administrator Accounts</div>
              <q-space />
              <div class="text-right text-h6 text-bold">{{ admincount }}</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-4 col-md-4">
          <q-card class="my-card text-primary">
            <q-card-section class="flex">
              <div class="text-h6">Total User Accounts</div>
              <q-space />
              <div class="text-right text-h6 text-bold">
                {{ usercounting + admincount }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-xs-12 col-sm-4 col-md-4">
          <q-card class="my-card text-primary">
            <q-card-section class="flex">
              <div class="text-h6">User Accounts</div>
              <q-space />
              <div class="text-right text-h6 text-bold">
                {{ usercounting }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>

  <div class="q-pa-md">
    <div class="col-xs-12 col-sm-6">
      <div class="q-col-gutter-md row items-start">
        <div class="col-xs-12">
          <q-card class="text-primary">
            <q-card-section>
              <div class="text-h6">Scholar Charts</div>
            </q-card-section>
            <q-card-section class="q-pa-md">
              <div class="q-pa-md">
                <q-card flat class="my-card white text-primary">
                  <q-card-section class="q-pr-lg">
                    <Doughnut
                      :data="data"
                      :options="options"
                      style="height: 400px"
                    />
                  </q-card-section>
                </q-card>
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="col-xs-12 col-sm-6">
                <div class="q-col-gutter-md row items-start">
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <div class="text-h6">Female Scholars</div>
                    <div class="text-h6">Count: {{ femalecounts }}</div>
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <div class="text-center text-h6">Total Scholars</div>
                    <div class="text-center text-h6">
                      Count: {{ malecounts + femalecounts }}
                    </div>
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <div class="text-right text-h6">Male Scholars</div>
                    <div class="text-right text-h6">
                      Count: {{ malecounts }}
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
    <q-card class="my-card text-primary">
      <q-card-section class="q-pa-md">
        <Bar :data="bardata" :options="baroptions" style="height: 500px" />
      </q-card-section>
    </q-card>
  </div>
  <div class="q-pa-md">
    <q-card class="my-card text-primary">
      <q-card-section class="q-pa-md">
        <Line :data="linedata" :options="lineoptions" style="height: 300px" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject, computed, onUnmounted } from "vue";
import { useQuasar, QSpinnerGears } from "quasar";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Line, Doughnut, Bar } from "vue-chartjs";

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
  BarElement,
  Title
);

// Declared Variable
const admincount = ref();
const usercounting = ref();

// Count Male Section

onMounted(() => {
  countmale();
});

const malecounts = ref([]);

const countmale = () => {
  axios.get("/read.php?countmale").then(function (response) {
    malecounts.value = response.data.malecount;
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
  });
};

// Count Admin

onMounted(() => {
  countadmins();
});

const countadmins = () => {
  axios
    .get("http://localhost/backdbase/read.php?countadmin")
    .then(function (response) {
      admincount.value = response.data.admincount;
    });
};

// Count Users

onMounted(() => {
  countusers();
});

const countusers = () => {
  axios
    .get("http://localhost/backdbase/read.php?countuser")
    .then(function (response) {
      usercounting.value = response.data.usercount;
    });
};

// Pie Data

const data = computed(() => {
  return {
    labels: ["Male", "Female"],
    datasets: [
      {
        backgroundColor: ["#ADD8E6", "#FFD1DA"],
        data: [malecounts.value, femalecounts.value],
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
      data: [40, 39, 10, 150, 39, 80, 100, 45, 50, 67, 200, 56],
    },
  ],
};

const lineoptions = {
  responsive: true,
  maintainAspectRatio: false,
};

// Bar Data

const bardata = {
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
      data: [56000, 20000, 12000, 39, 10, 40, 39, 80, 55900, 20, 12, 11],
    },
  ],
};

const baroptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
