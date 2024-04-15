<script setup>
import { ref, inject, onMounted } from "vue";
import { IconAlertOctagon } from "@tabler/icons-vue";

const axios = inject("$axios");
const user = inject("$user");

const dialogMessage = ref(false);

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

<template>
  <q-btn flat round icon="notifications_active" class="q-ml-md">
    <q-menu>
      <q-scroll-area style="height: 200px; max-width: 300px">
        <q-list>
          <q-item>
            <q-item-section>
              <q-item-label>Single line item</q-item-label>
              <q-item-label caption lines="2"
                >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                adipiscit elit.</q-item-label
              >
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>5 min ago</q-item-label>
              <q-icon name="star" color="yellow" />
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section>
              <q-item-label>Single line item</q-item-label>
              <q-item-label caption
                >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                adipiscit elit.</q-item-label
              >
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>Voted!</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section>
              <q-item-label>Single line item</q-item-label>
              <q-item-label caption
                >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                adipiscit elit.</q-item-label
              >
            </q-item-section>

            <q-item-section side top>
              <q-badge color="teal" label="10k" />
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section>
              <q-item-label>Single line item</q-item-label>
              <q-item-label caption
                >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                adipiscit elit.</q-item-label
              >
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>2 min ago</q-item-label>
              <div class="text-orange">
                <q-icon name="star" />
                <q-icon name="star" />
                <q-icon name="star" />
              </div>
            </q-item-section>
          </q-item>

          <q-separator spaced inset />

          <q-item>
            <q-item-section>
              <q-item-label>Single line item</q-item-label>
              <q-item-label caption
                >Secondary line text. Lorem ipsum dolor sit amet, consectetur
                adipiscit elit.</q-item-label
              >
            </q-item-section>

            <q-item-section side top>
              <q-item-label caption>meta</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-menu>

    <q-badge color="orange" floating>{{ notifCount }}</q-badge>
  </q-btn>

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
        <q-card class="my-card" v-for="logmsgs in logmsg" :key="logmsgs.logmsg">
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
</template>

<style scoped>
.notifexpansion {
  max-width: 350px;
  max-height: 500px;
}
</style>
