<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row">
      <q-select
        filled
        v-model="model"
        label="Simple select"
        :options="stringOptions"
        style="width: 250px"
        behavior="menu"
      />

      <q-select
        filled
        v-model="model"
        use-input
        input-debounce="0"
        label="Simple filter"
        :options="options"
        @filter="filterFn"
        style="width: 250px"
        behavior="menu"
        @click="model.value = 'PARTTIME'"
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey"> No results </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input
        v-show="model === 'PARTTIME'"
        name="test"
        v-model="test"
        outlined
      >
      </q-input>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const stringOptions = ["PARTTIME", "FULTIME"];

const options = ref(stringOptions);
const model = ref(null);
const test = model;

const filterFn = (val, update) => {
  if (val === "PARTTIME") {
    update(() => {
      test.value = "1 year";
      options.value = stringOptions;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = stringOptions.filter(
      (v) => v.toLowerCase().indexOf(needle) > -1
    );
  });
};
</script>
