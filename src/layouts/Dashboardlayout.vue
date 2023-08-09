<template>
  <q-layout view="lHr lpR lFf">
    <q-header reveal elevated class="blue-7 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <!-- Administrator View -->
        </q-toolbar-title>
        <q-btn-dropdown flat round dense>
          <template v-slot:label>
            <div class="row items-center no-wrap">
              <div class="text-center">
                <label>{{ user.username }} &nbsp;</label>
                <q-avatar size="42px">
                  <!-- <label>{{ user.username }}</label> -->
                  <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
                </q-avatar>
              </div>
            </div>
          </template>
          <q-list>
            <q-item clickable v-close-popup @click="logOut">
              <q-item-section>
                <q-item-label>Log Out</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
      :width="250"
    >
      <q-scroll-area
        style="
          height: calc(70% - 150px);
          margin-top: 200px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item clickable v-ripple tag="a" to="/stats">
            <q-item-section avatar>
              <IconChartPie :size="30" stroke-width="2" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>
          <q-item clickable v-ripple tag="a" to="/dash">
            <q-item-section avatar>
              <!-- <q-icon name="groups" /> -->
              <IconUsersGroup :size="30" stroke-width="2" />
            </q-item-section>

            <q-item-section> User Management </q-item-section>
          </q-item>
          <q-item clickable v-ripple tag="a" to="/newscholar">
            <q-item-section avatar>
              <IconUserPlus :size="30" stroke-width="2" />
            </q-item-section>

            <q-item-section> Add New Scholars </q-item-section>
          </q-item>
          <q-item clickable v-ripple tag="a" to="/viewscholar">
            <q-item-section avatar>
              <IconSchool :size="30" stroke-width="2" />
            </q-item-section>

            <q-item-section> View Scholars </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="http://localhost/backdbase/pic/pink.jpg "
        style="height: 200px"
      >
        <!-- http://localhost/backdbase/pic/Blue.jpg -->
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="70px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/avatar2.jpg" />
          </q-avatar>
          <div class="text-weight-bold">
            {{ user.fname }}&nbsp;{{ user.lname }}
          </div>
          <div class="container">
            <h7>@DOST</h7>
          </div>
        </div>
      </q-img>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<script setup>
import { ref, inject } from "vue";
import {
  IconSchool,
  IconUserPlus,
  IconUsersGroup,
  IconChartPie,
} from "@tabler/icons-vue";
import router from "../router";

const axios = inject("$axios");
const user = inject("$user");

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const logOut = () => {
  axios.post("/read.php?authlogout").then(function (response) {
    router.push("/");
  });
};
</script>

<style scope></style>
