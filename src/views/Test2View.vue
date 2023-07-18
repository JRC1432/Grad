<template>
  <div class="q-pa-md" style="max-width: 300px">
    <q-input
      filled
      v-model="model"
      label="Password"
      bottom-slots
      :error="!isValid"
      hint="Minimum 8 characters"
    >
      <template #error> Please use minimum of 8 characters. </template>
    </q-input>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const model = ref("");

const isValid = computed(() => model.value.length >= 8);
</script>
