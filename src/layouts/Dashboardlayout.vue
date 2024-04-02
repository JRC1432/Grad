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

        <div class="q-gutter-sm row items-center no-wrap">
          <q-btn flat round icon="notifications_active" class="q-ml-md">
            <q-menu>
              <div class="q-pa-md flex justify-center">
                <q-list style="max-width: 95%; width: 400px; height: 500px">
                  <q-intersection
                    clickable
                    v-ripple
                    v-for="actlogs in actlog"
                    :key="actlogs.actlog"
                    transition="flip-right"
                  >
                    <q-item
                      clickable
                      v-ripple
                      @click="readStatus(actlogs.id)"
                      v-if="actlogs.read_stats == 'unread'"
                      class="bg-grey-12"
                    >
                      <q-item-section avatar>
                        <q-avatar color="primary" text-color="white">
                          <IconAlertOctagon :size="30" stroke-width="2" />
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label
                          >SYSTEM NOTIFICATION:
                          {{ actlogs.added_by }}</q-item-label
                        >
                        <q-item-label caption lines="2">{{
                          actlogs.action_title
                        }}</q-item-label>
                        <q-separator inset />
                      </q-item-section>

                      <q-item-section side>
                        <q-item-label caption
                          >{{ actlogs.prevtime }} ago</q-item-label
                        >
                        <q-icon
                          v-if="actlogs.read_stats == 'read'"
                          name="radio_button_checked"
                          color="green"
                        />
                        <q-icon
                          v-else
                          name="radio_button_checked"
                          color="orange"
                        />
                      </q-item-section>
                    </q-item>

                    <q-item
                      clickable
                      v-ripple
                      @click="readStatus(actlogs.id)"
                      v-else
                      class="bg-white"
                    >
                      <q-item-section avatar>
                        <q-avatar color="primary" text-color="white">
                          <IconAlertOctagon :size="30" stroke-width="2" />
                        </q-avatar>
                      </q-item-section>

                      <q-item-section>
                        <q-item-label
                          >SYSTEM NOTIFICATION:
                          {{ actlogs.added_by }}</q-item-label
                        >
                        <q-item-label caption lines="2">{{
                          actlogs.action_title
                        }}</q-item-label>
                        <q-separator inset />
                      </q-item-section>

                      <q-item-section side>
                        <q-item-label caption
                          >{{ actlogs.prevtime }} ago</q-item-label
                        >
                        <q-icon
                          v-if="actlogs.read_stats == 'read'"
                          name="radio_button_checked"
                          color="green"
                        />
                        <q-icon
                          v-else
                          name="radio_button_checked"
                          color="orange"
                        />
                      </q-item-section>
                    </q-item>
                  </q-intersection>
                </q-list>
              </div>
            </q-menu>
            <q-badge color="orange" floating>{{ notifCount }}</q-badge>
          </q-btn>
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
            v-if="user.access_level != 4"
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
            v-if="user.access_level == 1"
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
            v-if="
              user.access_level == 1 ||
              user.access_level == 2 ||
              user.access_level == 3
            "
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
            v-if="
              user.access_level == 1 ||
              user.access_level == 2 ||
              user.access_level == 3
            "
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
            v-if="
              user.access_level == 1 ||
              user.access_level == 2 ||
              user.access_level == 3
            "
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
            v-if="
              user.access_level == 1 ||
              user.access_level == 2 ||
              user.access_level == 3
            "
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

    <q-dialog v-model="dialogMessage" persistent>
      <q-card style="width: 700px; max-width: 80vw">
        <q-toolbar class="bg-orange-5">
          <IconAlertOctagon :size="30" stroke-width="2" />

          <q-toolbar-title
            ><span class="text-weight-bold" color="primary"
              >SYSTEM NOTIFICATION</span
            >
            !!</q-toolbar-title
          >
        </q-toolbar>
        <q-card-section>
          <q-card
            class="my-card"
            v-for="logmsgs in logmsg"
            :key="logmsgs.logmsg"
          >
            <div class="q-pa-md text-h6">Action by: {{ logmsgs.added_by }}</div>
            <div class="q-pa-md text-h7">
              Action Log: {{ logmsgs.action_title }}
            </div>
          </q-card>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup @click="readLog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-layout>
</template>
<script setup>
import { ref, inject, reactive, onMounted } from "vue";
import { fabYoutube } from "@quasar/extras/fontawesome-v6";
import {
  IconChartPie,
  IconUsersGroup,
  IconUserPlus,
  IconSchool,
  IconBuildingCommunity,
  IconFileInfo,
  IconAlertOctagon,
} from "@tabler/icons-vue";
import router from "../router";
import Swal from "sweetalert2";

const axios = inject("$axios");
const user = inject("$user");

const regpic = ref(user.pic);
const showPic = ref(false);

const dialogMessage = ref(false);

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

// Sweet Log Update

const showMessage = () => {
  Swal.fire({
    title: "<strong>System Notification Message</strong>",
    icon: "info",
    html: `
    You can use <b>bold text</b>,
    <a href="#">links</a>,
    and other HTML tags
  `,
    showCloseButton: true,
    showCancelButton: true,
    focusConfirm: false,
    confirmButtonText: `
    <i class="fa fa-thumbs-up"></i> Great!
  `,
    confirmButtonAriaLabel: "Thumbs up, great!",
    cancelButtonText: `
    <i class="fa fa-thumbs-down"></i>
  `,
    cancelButtonAriaLabel: "Thumbs down",
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

// Read Logs

const actlog = ref();

onMounted(() => {
  readLog();
});

const readLog = () => {
  axios.get("/read.php?ReadLogs").then(function (response) {
    actlog.value = response.data;
  });
};

// Read Notification

const notifCount = ref();

onMounted(() => {
  readNotif();
});

const readNotif = () => {
  axios.get("/read.php?readNotifCount").then(function (response) {
    notifCount.value = response.data.count;
  });
};

// Read/Unread Functions
const logids = ref();
const logmsg = ref();

const readStatus = (props) => {
  dialogMessage.value = true;
  logids.value = props;

  var formData = new FormData();
  formData.append("logids", logids.value);

  axios.post("/read.php?readStats", formData).then(function (response) {
    logmsg.value = response.data;
  });

  axios.post("/update.php?logReadStats", formData).then(function (response) {
    if (response.data == true) {
      readNotif();
    } else {
      alert("2nd Failed");
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

  .example-item
  height: 5px
</style>
