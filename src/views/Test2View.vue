<template>
  <q-card class="my-card text-primary rounded-borders-20">
    <q-card-section class="q-pa-none">
      <div class="row q-col-gutter-sm">
        <div class="row items-center no-wrap q-mb-lg">
          <div class="col">
            <div class="text-h6 text-bold q-mb-md row items-center">
              <IconTimelineEvent
                class="text-negative q-mr-sm"
                :size="40"
                stroke-width="2"
              />
              <span class="text-h6 text-bold d-v">Sequence Event</span>
              <br />
              <span class="">dasdas</span>
            </div>
            <div class=""></div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { IconTimelineEvent } from "@tabler/icons-vue";
import { defineProps, computed } from "vue";

const props = defineProps({
  icon_position: {
    type: String,
    required: false,
    default: "left",
  },
});

const items = computed(() => {
  return props.icon_position === "left"
    ? [
        {
          title: "My Account",
          icon: "person",
          value: "200",
          color1: "#5064b5",
          color2: "#3e51b5",
        },
        {
          title: "Followers",
          icon: "fab fa-twitter",
          value: "500",
          color1: "#f37169",
          color2: "#f34636",
        },
        {
          title: "Connections",
          icon: "fab fa-google",
          value: "50",
          color1: "#ea6a7f",
          color2: "#ea4b64",
        },
        {
          title: "Website Visits",
          icon: "bar_chart",
          value: "1020",
          color1: "#a270b1",
          color2: "#9f52b1",
        },
      ]
    : [
        {
          title: "Monthly Income",
          icon: "fas fa-dollar-sign",
          value: "$ 20k",
          color1: "#546bfa",
          color2: "#3e51b5",
        },
        {
          title: "Weekly Sales",
          icon: "fas fa-chart-bar",
          value: "20",
          color1: "#3a9688",
          color2: "#3e51b5",
        },
        {
          title: "New Customers",
          icon: "fas fa-chart-line",
          value: "321",
          color1: "#7cb342",
          color2: "#3e51b5",
        },
        {
          title: "Active Users",
          icon: "person",
          value: "82",
          color1: "#f88c2b",
          color2: "#3e51b5",
        },
      ];
});
</script>
