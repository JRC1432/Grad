<template>
  <form id="" @submit.prevent.stop="populateyears">
    <div class="q-pa-md example-row-equal-width">
      <div class="q-col-gutter-md row item-start">
        <div class="col-xs-12 col-sm-8 col-md-8">
          <div class="text-h6 text-bold q-mb-md row items-center">
            <IconLayoutDashboard
              class="text-primary q-mr-sm"
              :size="40"
              stroke-width="2"
            />
            <span class="text-h4 text-bold text-primary">DASHBOARD</span>
          </div>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-2">
          <q-select
            hint="Start Year"
            outlined
            behavior="menu"
            emit-value
            map-options
            use-input
            mask="####"
            input-debounce="0"
            label="Year From"
            v-model="state.frstYearSelect"
            name="frstYearSelect"
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
        </div>
        <div class="col-xs-12 col-sm-12 col-md-2">
          <q-select
            hint="End Year"
            outlined
            behavior="menu"
            emit-value
            map-options
            use-input
            mask="####"
            input-debounce="0"
            label="Year To"
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
        </div>
      </div>
    </div>
  </form>

  <div class="q-pa-md">
    <div class="col-xs-12 col-sm-6">
      <div class="q-col-gutter-md row items-start">
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-card class="banner" flat>
            <div class="row">
              <div class="col-2 q-pa-md">
                <div
                  class="row justify-center items-center"
                  style="height: 70px"
                >
                  <q-icon name="school" size="xl"></q-icon>
                </div>
              </div>
              <div class="col-10 banner-2">
                <div class="row items-center" style="height: 95px">
                  <div class="q-ml-md">
                    <div class="text-h4 text-bold">
                      <vue3-autocounter
                        ref="counter"
                        :startAmount="0"
                        :endAmount="
                          ongoingscholars + gradscholars + termscholars
                        "
                        :duration="3"
                        class="text-bold"
                      />
                    </div>
                    <div class="text-subtitle2">
                      Total Number of Ongoing, Graduated & Terminated Scholars:
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-card class="banner" flat>
            <div class="row">
              <div class="col-2 q-pa-md">
                <div
                  class="row justify-center items-center"
                  style="height: 70px"
                >
                  <q-icon name="pending" size="xl"></q-icon>
                </div>
              </div>
              <div class="col-10 banner-2">
                <div class="row items-center" style="height: 95px">
                  <div class="q-ml-md">
                    <div class="text-h4 text-bold" id="number_up">
                      <vue3-autocounter
                        ref="counter"
                        :startAmount="0"
                        :endAmount="ongoingscholars"
                        :duration="3"
                        class="text-bold"
                      />
                    </div>
                    <div id="number_up"></div>
                    <div class="text-subtitle2">OnGoing:</div>
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-card class="banner" flat>
            <div class="row">
              <div class="col-2 q-pa-md">
                <div
                  class="row justify-center items-center"
                  style="height: 70px"
                >
                  <q-icon name="check_circle" size="xl"></q-icon>
                </div>
              </div>
              <div class="col-10 banner-2">
                <div class="row items-center" style="height: 95px">
                  <div class="q-ml-md">
                    <div class="text-h4 text-bold">
                      <vue3-autocounter
                        ref="counter"
                        :startAmount="0"
                        :endAmount="gradscholars"
                        :duration="3"
                        class="text-bold"
                      />
                    </div>
                    <div class="text-subtitle2">Graduated:</div>
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
        <div class="col-xs-12 col-sm-6 col-md-3">
          <q-card class="banner" flat>
            <div class="row">
              <div class="col-2 q-pa-md">
                <div
                  class="row justify-center items-center"
                  style="height: 70px"
                >
                  <q-icon name="cancel" size="xl"></q-icon>
                </div>
              </div>
              <div class="col-10 banner-2">
                <div class="row items-center" style="height: 95px">
                  <div class="q-ml-md">
                    <div class="text-h4 text-bold">
                      <vue3-autocounter
                        ref="counter"
                        :startAmount="0"
                        :endAmount="termscholars"
                        :duration="3"
                        class="text-bold"
                      />
                    </div>
                    <div class="text-subtitle2">Terminated:</div>
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>

  <div class="q-pa-md">
    <div class="col-xs-12 col-sm-6">
      <div class="q-col-gutter-md row items-start">
        <div class="col-xs-12 col-sm-12 col-md-8">
          <q-card class="rounded-borders-20 q-pa-md" flat>
            <div class="row items-center no-wrap q-mb-lg">
              <div class="col">
                <div class="text-h6 text-bold q-mb-md row items-center">
                  <IconChartBar
                    class="text-primary q-mr-sm"
                    :size="40"
                    stroke-width="2"
                  />
                  <span class="text-h6 text-bold text-primary"
                    >Scholar Charts</span
                  >
                </div>
              </div>
            </div>
            <q-card-section>
              <div class="row">
                <div class="col-12">
                  <div class="row justify-center">
                    <Line
                      :data="bardata"
                      :options="baroptions"
                      style="height: 530px"
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-xs-12 q-gutter-y-lg col-sm-12 col-md-4">
          <q-card class="text-primary rounded-borders-20" flat>
            <q-card-section>
              <div class="text-h6">Male & Female Scholars</div>
            </q-card-section>

            <q-card-section class="q-pa-md">
              <div class="q-pa-md">
                <q-card
                  flat
                  class="my-card white text-primary rounded-borders-20"
                >
                  <Doughnut
                    :data="data"
                    :options="options"
                    :height="195"
                    :width="195"
                  />
                </q-card>
              </div>
            </q-card-section>
          </q-card>

          <q-card class="text-primary rounded-borders-20" flat>
            <q-card-section>
              <div class="text-h6">Scholars Status Charts</div>
            </q-card-section>

            <q-card-section class="q-pa-md">
              <div class="q-pa-md">
                <q-card
                  flat
                  class="my-card white text-primary rounded-borders-20"
                >
                  <Doughnut
                    :data="datas"
                    :options="doptions"
                    :height="200"
                    :width="200"
                  />
                </q-card>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject, computed } from "vue";
import { useQuasar, QSpinnerGears } from "quasar";
import { IconChartBar, IconLayoutDashboard } from "@tabler/icons-vue";
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
import { defineComponent } from "vue";
import Vue3autocounter from "vue3-autocounter";

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
  yearselect: 2026,
  frstYearSelect: 2023,
});

// Pie Data for Gender Scholars

const data = computed(() => {
  return {
    labels: ["Male", "Female"],
    datasets: [
      {
        backgroundColor: ["#ADD8E6", "#FFD1DA"],
        data: [malecounts.value, femalecounts.value],
        borderWidth: 0,
      },
    ],
  };
});

const options = {
  responsive: true,
  cutout: 50,
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
        borderWidth: 0,
      },
    ],
  };
});

const doptions = {
  responsive: true,
  cutout: 50,
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

const malecounts = ref([]);
const femalecounts = ref([]);
const allScholar = ref([]);
const allYear = ref([]);

const populateyears = () => {
  // Bar Graph Append
  var formData = new FormData();
  formData.append("years", state.yearselect);

  axios.post("/read.php?yrselect", formData).then(function (response) {
    julval.value = response.data;
  });

  // Male Counts

  formData.append("frstYearSelect", state.frstYearSelect);
  formData.append("yearselect", state.yearselect);

  axios.post("/read.php?countmale", formData).then(function (response) {
    malecounts.value = response.data.malecount;
  });

  // Female Counts

  axios.post("/read.php?countfemale", formData).then(function (response) {
    femalecounts.value = response.data.femalecount;
  });

  // Ongoing Scholars
  axios.post("/read.php?OnScholars", formData).then(function (response) {
    ongoingscholars.value = response.data.ongoingscholar;
  });

  // Graduated Scholars

  axios.post("/read.php?GradScholars", formData).then(function (response) {
    gradscholars.value = response.data.gradscholar;
  });

  // Terminated Scholars

  axios.post("/read.php?TermScholars", formData).then(function (response) {
    termscholars.value = response.data.termscholar;
  });

  axios.post("/read.php?LineDataScholar", formData).then(function (response) {
    allYear.value = response.data.year;
    allScholar.value = response.data.scholar;
    console.log(response.data.year);
    console.log(response.data.year);
  });
};

// Bar Data

const julval = ref();

const bardata = computed(() => {
  return {
    labels: allYear.value,
    datasets: [
      {
        label: "No. Of Scholars",
        backgroundColor: "#FF474D",
        data: allScholar.value,
        borderColor: "rgb(75, 192, 192)",
      },
    ],
  };
});

const baroptions = {
  responsive: true,
  maintainAspectRatio: false,
  tooltip: {
    enabled: true, // Show tooltips always
  },
};

defineComponent({
  name: "Demo",
  components: {
    "vue3-autocounter": Vue3autocounter,
  },
});
</script>
