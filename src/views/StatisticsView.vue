<template>
  <div class="q-pa-md">
    <div class="col-xs-12 col-sm-6">
      <div class="q-col-gutter-md row items-start">
        <div class="col-xs-12 col-sm-3 col-md-3">
          <q-card class="my-card text-primary rounded-borders-20">
            <q-card-section class="flex">
              <div class="text-h6">Total Number of Scholars:</div>
              <q-space />
              <div class="text-right text-h6 text-bold">
                {{ ongoingscholars + gradscholars + termscholars }}
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-3 col-md-3">
          <q-card class="my-card text-primary rounded-borders-20">
            <q-card-section class="flex">
              <div class="text-h6">Ongoing Scholars:</div>
              <q-space />
              <div class="text-right text-h6 text-bold">
                {{ ongoingscholars }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-xs-12 col-sm-3 col-md-3">
          <q-card class="my-card text-primary rounded-borders-20">
            <q-card-section class="flex">
              <div class="text-h6">Graduated Scholars:</div>
              <q-space />
              <div class="text-right text-h6 text-bold">
                {{ gradscholars }}
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-xs-12 col-sm-3 col-md-3">
          <q-card class="my-card text-primary rounded-borders-20">
            <q-card-section class="flex">
              <div class="text-h6">Terminated Scholars:</div>
              <q-space />
              <div class="text-right text-h6 text-bold">
                {{ termscholars }}
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>

  <div class="q-pa-md">
    <q-card class="text-primary rounded-borders-20">
      <q-card-section>
        <div class="text-h6">Scholar Charts</div>
      </q-card-section>

      <q-card-section class="q-pa-md">
        <div class="q-pa-md">
          <q-card flat class="my-card white text-primary rounded-borders-20">
            <div class="q-pa-md">
              <div class="q-col-gutter-md row items-start">
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-card-section class="q-pr-lg">
                    <Doughnut
                      :data="data"
                      :options="options"
                      style="height: 400px"
                    />
                  </q-card-section>
                </div>

                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-card-section class="q-pr-lg">
                    <Doughnut
                      :data="datas"
                      :options="doptions"
                      style="height: 400px"
                    />
                  </q-card-section>
                </div>
              </div>
            </div>
          </q-card>
        </div>

        <div class="col-xs-12 col-sm-6">
          <div class="q-col-gutter-md row items-start">
            <div class="col-xs-12 col-sm-4 col-md-4">
              <div class="text-h6">Female Count: {{ femalecounts }}</div>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4">
              <div class="text-center text-h6">
                Total Count: {{ malecounts + femalecounts }}
              </div>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4">
              <div class="text-right text-h6">Male Count: {{ malecounts }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>

  <div class="q-pa-md">
    <q-card class="my-card text-primary rounded-borders-20">
      <q-select
        filled
        behavior="menu"
        emit-value
        map-options
        use-input
        mask="####"
        input-debounce="0"
        label="Select Year"
        v-model="state.yearselect"
        name="yearselect"
        :options="yrsoptions"
        @filter="filteryrs"
        @update:model-value="populateyears"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-card-section class="q-pa-md">
        <Bar :data="bardata" :options="baroptions" style="height: 400px" />
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
import { ref, reactive, onMounted, inject, computed } from "vue";
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
const ongoingscholars = ref();
const gradscholars = ref();
const termscholars = ref();

const state = reactive({
  yearselect: new Date().getFullYear(),
});

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

// Count Ongoing Scholars

onMounted(() => {
  countOnScholars();
});

const countOnScholars = () => {
  axios
    .get("http://localhost/backdbase/read.php?OnScholars")
    .then(function (response) {
      ongoingscholars.value = response.data.ongoingscholar;
    });
};

// Count Graduated Scholars

onMounted(() => {
  countGradScholars();
});

const countGradScholars = () => {
  axios
    .get("http://localhost/backdbase/read.php?GradScholars")
    .then(function (response) {
      gradscholars.value = response.data.gradscholar;
    });
};

// Count Terminated Scholars

onMounted(() => {
  counttermScholars();
});

const counttermScholars = () => {
  axios
    .get("http://localhost/backdbase/read.php?TermScholars")
    .then(function (response) {
      termscholars.value = response.data.termscholar;
    });
};

// Pie Data for Gender Scholars

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
  cutout: 150,
  maintainAspectRatio: false,
};

// Pie Data for All Scholars

const datas = computed(() => {
  return {
    labels: ["Ongoing", "Graduated", "Terminated"],
    datasets: [
      {
        backgroundColor: ["#80C487", "#EDCBD2", "#E3856B"],
        data: [ongoingscholars.value, gradscholars.value, termscholars.value],
      },
    ],
  };
});

const doptions = {
  responsive: true,
  cutout: 150,
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

// Showing Years
var yrsoptions2 = [];
const yrsoptions = ref(yrsoptions2);

onMounted(() => {
  populateyrs();
});

const populateyrs = () => {
  axios.get("/read.php?years").then((response) => {
    yrsoptions2 = response.data;
  });
};

const filteryrs = (val, update) => {
  if (val === "") {
    update(() => {
      yrsoptions.value = yrsoptions2;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    yrsoptions.value = yrsoptions2.filter((option) => {
      return option.label.toLowerCase().includes(needle);
    });
  });
};

//Showing Years to Bar Graph

onMounted(() => {
  populateyears();
});

const populateyears = () => {
  var formData = new FormData();
  formData.append("years", state.yearselect);

  axios.post("/read.php?yrselect", formData).then(function (response) {
    julval.value = response.data;
    console.log(julval.value);
  });
};

// Bar Data

const julval = ref();

const bardata = computed(() => {
  return {
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
        data: julval.value,
      },
    ],
  };
});

const baroptions = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>
