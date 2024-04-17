<template>
  <div class="q-pa-sm">
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
};

watch(
  () => $q.dark.isActive,
  (val) => {
    console.log(val ? "dark" : "ligh");
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
