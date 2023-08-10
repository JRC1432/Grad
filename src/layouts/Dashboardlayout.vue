<template>
  <q-layout view="lHr lpR lFf">
    <q-header reveal elevated class="blue-7 text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <!-- Administrator View -->
        </q-toolbar-title>
        <label>{{ user.username }}&nbsp;&nbsp;&nbsp;</label>
        <q-btn round>
          <q-avatar size="42px">
            <img :src="'http://localhost/backdbase/' + regpic" />
          </q-avatar>
          <q-menu>
            <q-item clickable v-close-popup>
              <q-item-section @click="showPic = true"
                >Upload Photo</q-item-section
              >
            </q-item>
            <q-item clickable v-close-popup @click="logOut">
              <q-item-section>Log out</q-item-section>
            </q-item>
          </q-menu>
        </q-btn>
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
            <!-- <img src="https://cdn.quasar.dev/img/avatar2.jpg" /> -->
            <img :src="'http://localhost/backdbase/' + regpic" />
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

    <q-dialog v-model="showPic" persistent>
      <q-card class="my-card" flat bordered>
        <form id="picForm" @submit.prevent="upload">
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Upload Your Profile Photo Here...</div>
              <div class="text-h5 q-mt-sm q-mb-xs"></div>
              <div class="text-caption text-grey">
                <q-file
                  style="max-width: 400px"
                  v-model="state.pic"
                  name="pic"
                  rounded
                  outlined
                  label="Image Attach Here"
                  multiple
                  accept=".jpg, image/*"
                  @rejected="onRejected"
                  counter
                >
                  <template v-slot:prepend>
                    <q-icon name="attach_file" />
                  </template>
                </q-file>
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-avatar size="100px" class="row justify-center">
                <img :src="'http://localhost/backdbase/' + regpic" />
              </q-avatar>
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat v-close-popup> Cancel </q-btn>
            <q-btn flat color="primary" @click="upload"> Save Changes </q-btn>
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </q-layout>
</template>
<script setup>
import { ref, inject, reactive } from "vue";
import {
  IconSchool,
  IconUserPlus,
  IconUsersGroup,
  IconChartPie,
} from "@tabler/icons-vue";
import router from "../router";
import Swal from "sweetalert2";

const axios = inject("$axios");
const user = inject("$user");

const regpic = ref(user.pic);
const showPic = ref(false);

const leftDrawerOpen = ref(false);

const state = reactive({
  pic: "",
});

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const logOut = () => {
  axios.post("/read.php?authlogout").then(function (response) {
    router.push("/");
  });
};

// Sweet Alert (PhotoUpdate) Code Here

const showPicalert = () => {
  let timerInterval;
  Swal.fire({
    title: "Updating Your Profile Photo!",
    html: "In Progress.",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = Swal.getHtmlContainer().querySelector("b");
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft();
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
      Swal.fire({
        icon: "success",
        title: "Updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
};

const onRejected = (rejectedFiles) => {
  rejectedFiles.forEach((rejectedFile) => {
    if (rejectedFile.failedPropValidation) {
      Notify.create({
        message: "Only Image are Allowed",
        type: "negative",
      });
    }
  });
};

const upload = () => {
  var formData = new FormData(document.getElementById("picForm"));
  formData.append("authid", user.id);
  formData.append("username", user.username);

  axios.post("/update.php?updatePic", formData).then(function (response) {
    if (response.data == true) {
      showPic.value = false;
      showPicalert();
    } else {
      alert("Error");
    }
  });
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
