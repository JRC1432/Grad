<template>
  <div>
    <p>Current Year: {{ currentYear }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const currentYear = ref(null);

onMounted(() => {
  getCurrentYear();
});

function getCurrentYear() {
  const currentDate = new Date();
  currentYear.value = currentDate.getFullYear();
}
</script>
