<template>
  <q-layout view="hHh lpR fFf" class="bg-grey-1">
    <q-header elevated class="primary" height-hint="58">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          icon="menu"
        />

        <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
          <q-avatar size="28px">
            <img src="http://localhost/backdbase/pic/download.jpg" />
          </q-avatar>
          <q-toolbar-title shrink class="text-weight-bold">
            DOST - SEI
          </q-toolbar-title>
        </q-btn>

        <q-space />

        <q-space />

        <div class="q-gutter-sm row items-center no-wrap">
          <label>{{ user.username }}</label>
          <q-btn round flat>
            <q-avatar size="35px">
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
            <q-tooltip>Account</q-tooltip>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="q-pa-md white"
      :width="240"
    >
      <q-scroll-area class="fit">
        <q-list padding>
          <q-item
            clickable
            v-ripple
            tag="a"
            to="/stats"
            class="rounded-borders q-my-xs"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <IconChartPie :size="30" stroke-width="2" />
            </q-item-section>

            <q-item-section> Dashboard </q-item-section>
          </q-item>

          <!-- <q-separator class="q-my-md" /> -->

          <q-item
            clickable
            v-ripple
            tag="a"
            to="/dash"
            class="rounded-borders q-my-xs"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <!-- <q-icon name="groups" /> -->
              <IconUsersGroup :size="30" stroke-width="2" />
            </q-item-section>

            <q-item-section> User Management </q-item-section>
          </q-item>

          <q-separator class="q-mt-md q-mb-xs" />

          <q-item
            clickable
            v-ripple
            tag="a"
            to="/newscholar"
            class="rounded-borders q-my-xs"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <IconUserPlus :size="30" stroke-width="2" />
            </q-item-section>

            <q-item-section> Add New Scholar </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            tag="a"
            to="/viewscholar"
            class="rounded-borders q-my-xs"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <IconSchool :size="30" stroke-width="2" />
            </q-item-section>

            <q-item-section> Scholars </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            tag="a"
            to="/school"
            class="rounded-borders q-my-xs"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <IconBuildingCommunity :size="30" stroke-width="2" />
            </q-item-section>

            <q-item-section> Schools </q-item-section>
          </q-item>
          <q-item
            clickable
            v-ripple
            tag="a"
            to="/log"
            class="rounded-borders q-my-xs"
            active-class="my-menu-link"
          >
            <q-item-section avatar>
              <IconFileInfo :size="30" stroke-width="2" />
            </q-item-section>

            <q-item-section> Logs </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-dialog v-model="showPic" persistent>
      <q-card class="my-card" flat bordered>
        <form id="picForm" @submit.prevent="upload">
          <q-card-section horizontal>
            <q-card-section class="q-pt-xs">
              <div class="text-overline">Upload Your Profile Photo Here...</div>
              <div class="text-h5 q-mt-sm q-mb-xs">
                <div class="text-caption text-grey">
                  <q-file
                    style="max-width: 400px"
                    v-model="state.pic"
                    name="pic"
                    rounded
                    outlined
                    label="Image Attach Here"
                    accept=".jpg, image/*"
                    @rejected="onRejected"
                    counter
                    @change="changePic"
                    @update:model-value="onFileChange"
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </div>
              </div>
            </q-card-section>

            <q-card-section class="col-5 flex flex-center">
              <q-avatar size="100px" class="row justify-center">
                <img :src="url" spinner-color="white" v-if="url" />
              </q-avatar>
            </q-card-section>
          </q-card-section>

          <q-separator />

          <q-card-actions>
            <q-btn flat v-close-popup> Cancel </q-btn>
            <q-btn push flat color="primary" @click="upload">
              Save Changes
            </q-btn>
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </q-layout>
</template>
<script setup>
import { ref, inject, reactive } from "vue";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import {
  IconSchool,
  IconUserPlus,
  IconUsersGroup,
  IconChartPie,
  IconFileInfo,
  IconBuildingCommunity,
} from "@tabler/icons-vue";
import router from "../router";
import Swal from "sweetalert2";

const axios = inject("$axios");
const user = inject("$user");

const regpic = ref(user.pic);
const showPic = ref(false);

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

const url = ref("http://localhost/backdbase/" + user.pic);

const state = reactive({
  pic: "",
});

const onFileChange = () => {
  const file = state.pic;
  url.value = URL.createObjectURL(file);
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
      url.value = "http://localhost/backdbase/" + user.pic;
      showPic.value = false;
      showPicalert();
    } else {
      alert("Error");
    }
  });
};
</script>

<style lang="sass" scoped>

.my-menu-link
  color: white
  background: #d61f5d
  .my-card
  width: 100%
  max-width: 350px
</style>
