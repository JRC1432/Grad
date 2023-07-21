<template>
  <div class="number-counting">
    <p>{{ currentValue }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const targetValue = ref(100); // Change this value to your desired final number
const currentValue = ref(0);
let interval;

onMounted(() => {
  interval = setInterval(() => {
    if (currentValue.value < targetValue.value) {
      currentValue.value += 1;
    } else {
      clearInterval(interval);
    }
  }, 10); // Adjust the interval (in milliseconds) for smoother or faster animations
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<style>
.number-counting {
  font-size: 24px;
  transition: 0.5s ease-out; /* You can adjust the duration and timing function here */
}
</style>
