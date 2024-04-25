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
  <div class="q-pa-xs">
    <q-btn flat round icon="notifications_active" class="q-ml-md">
      <q-menu class="rounded-borders-20">
        <div class="q-pa-sm notifexpansion">
          <q-list v-for="actlogs in actlog" :key="actlogs.actlog">
            <q-item
              clickable
              v-ripple
              @click="readStatus(actlogs.id)"
              v-if="actlogs.read_stats == 'unread'"
              class="secondary-fixed-dim"
            >
              <q-item-section>
                <q-item-label
                  >SYSTEM NOTIFICATION: {{ actlogs.added_by }}</q-item-label
                >
                <q-item-label caption lines="2">{{
                  actlogs.action_title
                }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>{{ actlogs.prevtime }} ago</q-item-label>
                <q-icon
                  v-if="actlogs.read_stats == 'read'"
                  name="radio_button_checked"
                  color="green"
                />
                <q-icon v-else name="radio_button_checked" color="yellow" />
              </q-item-section>
            </q-item>

            <q-item
              clickable
              v-ripple
              @click="readStatus(actlogs.id)"
              v-else
              class="surface"
            >
              <q-item-section>
                <q-item-label
                  >SYSTEM NOTIFICATION: {{ actlogs.added_by }}</q-item-label
                >
                <q-item-label caption lines="2">{{
                  actlogs.action_title
                }}</q-item-label>
              </q-item-section>

              <q-item-section side top>
                <q-item-label caption>{{ actlogs.prevtime }} ago</q-item-label>
                <q-icon
                  v-if="actlogs.read_stats == 'read'"
                  name="radio_button_checked"
                  color="green"
                />
                <q-icon v-else name="radio_button_checked" color="yellow" />
              </q-item-section>
            </q-item>

            <q-separator dark />
          </q-list>
        </div>
      </q-menu>

      <q-badge color="orange" floating>{{ notifCount }}</q-badge>
    </q-btn>
  </div>

  <q-dialog v-model="dialogMessage" persistent>
    <q-card style="width: 700px; max-width: 80vw" class="rounded-borders-20">
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
          class="my-card rounded-borders-20"
          v-for="logmsgs in logmsg"
          :key="logmsgs.logmsg"
        >
          <div class="q-pa-md text-h6">Action by: {{ logmsgs.added_by }}</div>
          <div class="q-pa-md text-h7">
            Action Log: {{ logmsgs.action_title }}
          </div>
        </q-card>
      </q-card-section>

      <q-card-actions align="right">
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
