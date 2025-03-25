<template>
  <div class="block1">Test1</div>
  <div class="block2">Test1</div>
  <div class="block3">Test1</div>
  <div class="block4">Test1</div>
</template>

<script setup>
import { ref, inject, reactive, onMounted } from "vue";
import { useQuasar } from "quasar";
import router from "../router";

const axios = inject("$axios");
const user = inject("$user");
</script>
