<template>
  <form id="" @submit.prevent.stop="populateyears">
    <div class="q-pa-md example-row-equal-width">
      <div class="q-col-gutter-md row item-start">
        <div class="col-xs-12 col-sm-8 col-md-8">
          <div class="text-h6 text-bold q-mb-md row items-center">
            <!-- <IconLayoutDashboard
              class="text-primary q-mr-sm"
              :size="40"
              stroke-width="2"
            /> -->
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
            hint="Scholar Charts Trigger"
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
  <div ref="chart"></div>
</template>

<script setup>
import { ref, reactive, onMounted, inject, computed, watch } from "vue";
import ApexCharts from "apexcharts";

const axios = inject("$axios");

const chartValue = ref(null);

const state = reactive({
  yearselect: new Date().getFullYear(),
  frstYearSelect: new Date().getFullYear(),
});
const allYear = ref([]);
const allScholar = ref([]);

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

const populateyears = () => {
  // Bar Graph Append
  var formData = new FormData();
  formData.append("years", state.yearselect);

  // Male Counts

  formData.append("frstYearSelect", state.frstYearSelect);
  formData.append("yearselect", state.yearselect);

  // Line Data

  axios
    .post("/read.php?LineDataScholar", formData)
    .then(function (response) {});
};

const renderChart = () => {
  const options = {
    chart: {
      type: "line",
    },
    series: [
      {
        name: "Sales",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };

  const chart = new ApexCharts(chartRef.value, options);
  chart.render();
};

const chartRef = ref(null);

onMounted(renderChart);
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
