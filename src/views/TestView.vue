<template>
  <q-page>
    <q-input type="date" v-model="dateValue" no-placeholder />
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      dateValue: null,
    };
  },
};
</script>
