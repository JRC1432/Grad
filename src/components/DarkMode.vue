<template>
  <div class="q-pa-xs">
    <q-btn flat round @click="changetheme">
      <IconMoonStars :size="30" stroke-width="2" v-if="isMoonStars" />
      <IconBrightness2 v-else :size="30" stroke-width="2" />
    </q-btn>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { watch, ref } from "vue";
import { IconMoonStars, IconBrightness2 } from "@tabler/icons-vue";

const $q = useQuasar();
const isMoonStars = ref(true);

const changetheme = () => {
  isMoonStars.value = !isMoonStars.value;
  $q.dark.toggle();

  // Quasar Primary Trigger
  // if (!isMoonStars.value) {
  //   setCssVar("primary", "#0f6b57");
  // } else {
  //   // dark
  //   setCssVar("primary", "#86d6be");
  // }
};

watch(
  () => $q.dark.isActive,
  (val) => {
    console.log(val ? "dark" : "light");
  }
);
</script>

<style>
.body--light {
}
.body--dark {
  background-color: black;
  color: white;
}
</style>
