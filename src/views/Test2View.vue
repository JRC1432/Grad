<template>
  <div id="q-app">
    <div class="q-pa-md">
      <div class="q-gutter-md row items-start">
        <q-select
          filled
          v-model="single"
          :options="options"
          label="Select a Company"
          style="width: 250px"
          :rules="[myRule]"
        ></q-select>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const single = ref(null);
const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

const myRule = (val) => {
  if (val === null) {
    return "You must make a selection!";
  }
};
</script>
