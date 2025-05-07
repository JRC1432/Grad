<template>
  <div class="q-pa-md">
    <q-card flat bordered class="my-card rounded-borders-20">
      <q-card-section>
        <div class="text-h6 text-primary">Form Records</div>
        <div class="text-subtitle2 text-primary">Forms Lists Table</div>
      </q-card-section>
      <q-card-section>
        <FormsTbl />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import FormsTbl from "../components/FormsTbl.vue";
</script>
