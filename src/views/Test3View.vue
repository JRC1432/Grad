<template>
  <q-layout view="lHh lpr lFf" class="shadow-2">
    <q-header class="bg-grey-3 text-primary" elevated>
      <q-toolbar>
        <q-btn flat round dense class="q-mr-sm">
          <q-avatar>
            <img src="http://localhost/backend/pic/SEI.png" />
          </q-avatar>
        </q-btn>

        <q-toolbar-title>DOST - SEI Graduate Scholarships</q-toolbar-title>

        <q-btn flat dense icon="whatshot" label="Log In" to="/" />
      </q-toolbar>

      <q-tabs v-model="tab">
        <q-tab name="images" label="Images" />
        <q-tab name="videos" label="Videos" />
        <q-tab name="articles" label="Articles" />
      </q-tabs>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <q-footer class="bg-grey-3 text-primary">
    <q-toolbar>
      <q-toolbar-title>STSD</q-toolbar-title>
    </q-toolbar>
  </q-footer>
  <!-- <q-page-container>
    
  </q-page-container> -->
</template>
<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      tab: ref("images"),
    };
  },
};
</script>
