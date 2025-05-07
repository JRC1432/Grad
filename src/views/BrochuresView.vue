<template>
  <div>
    <div class="row items-center q-pb-xl q-pa-md">
      <q-icon name="history_edu" size="md" class="q-mr-sm" color="primary" />
      <div class="text-h6 text-bold on-surface-text">Brochures</div>
    </div>

    <!-- Search Bar -->
    <div class="q-pa-md">
      <q-input
        v-model="searchQuery"
        outlined
        debounce="300"
        placeholder="SEARCH TEMPLATES..."
        clearable
      />
    </div>
    <div class="q-pa-md row items-start q-gutter-md justify-center">
      <q-card
        v-for="data in filteredDatas"
        :key="data.id"
        class="my-card rounded-borders-20 hover-card on-surface-text"
        bordered
        hoverable
      >
        <q-img
          style="max-height: 180px"
          src="https://picsum.photos/600/400"
          alt="Random Image"
        />

        <q-card-section>
          <q-btn
            fab
            color="amber-4"
            icon="plagiarism"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          >
            <q-popup-proxy>
              <q-card>
                <img :src="data.preview" />
              </q-card>
            </q-popup-proxy>
            <q-tooltip
              transition-show="rotate"
              transition-hide="rotate"
              class="bg-pink-4"
            >
              Preview
            </q-tooltip>
          </q-btn>
          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ data.form_name }}</div>
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none q-card-sec">
          <!-- <div class="text-subtitle1">{{ data.description }}</div> -->

          <div class="text-caption text-grey">
            {{ data.description }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="around">
          <q-btn flat>View</q-btn>
          <q-btn flat>Remove</q-btn>
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, inject, computed } from "vue";
import { useQuasar, QSpinnerGears } from "quasar";
import Swal from "sweetalert2";
import { IconUserCancel } from "@tabler/icons-vue";

const $q = useQuasar();

const axios = inject("$axios");
const user = inject("$user");

const searchQuery = ref("");
const datas = ref([]);

const filteredDatas = computed(() => {
  return datas.value.filter((item) =>
    item.form_name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const readBrochures = () => {
  axios.get("/read.php?readforms").then(function (response) {
    datas.value = response.data;
  });
};

onMounted(() => {
  readBrochures();
});
</script>

<style scoped>
.my-card {
  max-width: 300px;
  width: 100%;
  min-height: 400px;
  height: 400px;
}

.q-card-sec {
  min-height: 100px !important;
}

.hover-card {
  transition: transform 0.2s ease, box-shadow 0.3s ease;
}

.hover-card:hover {
  transform: translateY(-6px); /* Lift effect */
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3); /* Stronger shadow effect */
}

/* Add spacing between images */
.marquee-container {
  display: flex; /* Ensure images align properly */
  gap: 16px; /* Space between images */
}

.marquee-image {
  margin: 0 100px; /* Optional: Add spacing around each image */
}

.container {
  max-width: 600px;
  margin: 0 auto;
  text-align: center;
}
</style>
