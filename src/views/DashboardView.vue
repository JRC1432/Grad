<template>
  <!-- Q Cards Start Here -->
  <div class="q-pa-md">
    <div class="col-xs-12 col-sm-6">
      <div class="q-col-gutter-md row items-start">
        <div class="col-xs-12 col-sm-6 col-md-6">
          <q-card
            class="my-card text-white"
            style="
              background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
            "
          >
            <q-card-section class="q-pr-lg">
              <div class="text-h6">Administrator Accounts</div>
              <div class="text-subtitle2"></div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-right text-h6">Count: {{ admincount }}</div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-xs-12 col-sm-6 col-md-6">
          <q-card
            class="my-card text-white"
            style="
              background: radial-gradient(circle, #35a2ff 0%, #014a88 100%);
            "
          >
            <q-card-section>
              <div class="text-h6">User Accounts</div>
              <div class="text-subtitle2"></div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="text-right text-h6">Count: {{ usercounting }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>

  <!-- Q Cards Ends Here -->

  <!-- Table Starts Here -->
  <div class="q-pa-md">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">Users Control Panel</div>
        <div class="text-subtitle2">Users Table</div>
        <div class="row justify-end">
          <q-btn
            class="q-pr-none"
            flat
            label="Add New User"
            color="green"
            @click="fixed = true"
            icon="person_add"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-table
          flat
          bordered
          title=" User Profile Details"
          :rows="rows"
          :columns="columns"
          row-key="name"
          separator="cell"
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input
              borderless
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                class="bi bi-info-circle"
                color="blue-11"
                @click="showedit(props)"
                icon="edit_square"
              >
              </q-btn>
              <q-btn
                class="bi bi-info-circle"
                color="red-5"
                @click="showdel(props)"
                icon="person_remove"
              >
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>

    <!-- Table Ends Here -->

    <!-- Form Modals -->
    <!-- New User modal -->
    <q-dialog v-model="fixed" persistent>
      <q-card>
        <form id="UserForm" @submit.prevent="CreateUser">
          <q-card-section>
            <div class="text-h6">Add New User</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input
              v-model="state.username"
              name="username"
              label="UserName"
            />

            <q-input
              :type="isPwds ? 'password' : 'text'"
              v-model="state.password"
              name="password"
              label="Password"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwds ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwds = !isPwds"
                />
              </template>
            </q-input>
            <q-input
              :type="isPwd ? 'password' : 'text'"
              v-model="state.confirmpassword"
              name="confirmpassword"
              label="Confirm Password"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-select
              label="User Access Level"
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="state.acclevel"
              name="acclevel"
              :options="Acclevel"
              style="width: 250px"
            />
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Submit" color="primary" type="submit" />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>

    <!-- Edit Modal -->

    <q-dialog v-model="editdialog" persistent>
      <q-card>
        <form id="UpdateUserForm" @submit.prevent="UpdateUser">
          <q-card-section>
            <div class="text-h6">Edit User Account</div>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 50vh" class="scroll">
            <q-input
              v-model="state.upusername"
              name="upusername"
              label="UserName"
            />

            <q-input
              :type="isPwds ? 'password' : 'text'"
              v-model="state.uppassword"
              name="uppassword"
              label="Password"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwds ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwds = !isPwds"
                />
              </template>
            </q-input>
            <q-input
              :type="isPwd ? 'password' : 'text'"
              v-model="state.upconfirmpassword"
              name="upconfirmpassword"
              label="Confirm Password"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
            <q-select
              emit-value
              map-options
              label="User Access Level"
              transition-show="flip-up"
              transition-hide="flip-down"
              v-model="state.upacclevel"
              name="upacclevel"
              :options="Acclevel"
              style="width: 250px"
            />
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn flat label="Update" color="primary" type="submit" />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>

    <!-- Form Modal Ends Here -->

    <!-- Prompt Modal Starts Here -->
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, inject } from "vue";
import axios from "axios";
import { useQuasar, QSpinnerGears } from "quasar";

const user = inject("$user");
const $q = useQuasar();

// Items Variables
const filter = ref("");
const fixed = ref("false");
const editdialog = ref(false);
const rows = ref([]);

// Input form variables
const isPwd = ref(true);
const isPwds = ref(true);

// Declared Variable
const admincount = ref();
const usercounting = ref();

const state = reactive({
  username: "",
  password: "",
  confirmpassword: "",
  acclevel: "",

  upusername: "",
  uppassword: "",
  upconfirmpassword: "",
  upacclevel: "",
  upid: "",
});

const columns = [
  {
    name: "username",
    required: true,
    label: "UserName",
    align: "center",
    field: "username",
    sortable: true,
  },
  {
    name: "Added By",
    align: "center",
    label: "Added By",
    field: "addedby",
    sortable: true,
  },
  {
    name: "Access Level",
    align: "center",
    label: "Access Level",
    field: "access_level",
    sortable: true,
  },
  {
    name: "addedon",
    align: "center",
    label: "Date and Time Created",
    field: "addedon",
    sortable: true,
  },
  {
    name: "actions",
    align: "center",
    label: "Action Buttons",
    field: "",
    sortable: true,
  },
];

const Acclevel = [
  { label: "Administrator Account", value: "1" },
  { label: "User Account", value: "0" },
];

// Show Loading State in Create
const showCustom = () => {
  const dialog = $q.dialog({
    title: "Creating New User...",
    dark: true,
    message: "0%",
    progress: {
      spinner: QSpinnerGears,
      color: "amber",
    },
    persistent: true, // we want the user to not be able to close it
    ok: false, // we want the user to not be able to close it
  });

  // we simulate some progress here...
  let percentage = 0;
  const interval = setInterval(() => {
    percentage = Math.min(100, percentage + Math.floor(Math.random() * 22));

    // we update the dialog
    dialog.update({
      message: `${percentage}%`,
    });

    // if we are done...
    if (percentage === 100) {
      clearInterval(interval);

      dialog.update({
        title: "Done!",
        message: "User Created Successfully",
        progress: false,
        ok: true,
      });
      readusers();
      countusers();
      countadmins();
    }
  }, 500);
};

// Show Loading State in Edit
const showCustomedit = () => {
  const dialog = $q.dialog({
    title: "Updating User Profile...",
    dark: true,
    message: "0%",
    progress: {
      spinner: QSpinnerGears,
      color: "amber",
    },
    persistent: true, // we want the user to not be able to close it
    ok: false, // we want the user to not be able to close it
  });

  // we simulate some progress here...
  let percentage = 0;
  const interval = setInterval(() => {
    percentage = Math.min(100, percentage + Math.floor(Math.random() * 22));

    // we update the dialog
    dialog.update({
      message: `${percentage}%`,
    });

    // if we are done...
    if (percentage === 100) {
      clearInterval(interval);

      dialog.update({
        title: "Done!",
        message: "Updated Successfully",
        progress: false,
        ok: true,
      });
      readusers();
    }
  }, 500);
};

// Deleted Alert

const alert = () => {
  $q.dialog({
    title: "Deleted",
    message: "The user has been deleted",
  })
    .onOk(() => {
      // console.log('OK')
    })
    .onCancel(() => {
      // console.log('Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

// Read Users

onMounted(() => {
  readusers();
});

const readusers = () => {
  axios
    .get("http://localhost/backdbase/read.php?readuser")
    .then(function (response) {
      rows.value = response.data;
    });
};

// Count Admin

onMounted(() => {
  countadmins();
});

const countadmins = () => {
  axios
    .get("http://localhost/backdbase/read.php?countadmin")
    .then(function (response) {
      admincount.value = response.data.admincount;
    });
};

// Count Users

onMounted(() => {
  countusers();
});

const countusers = () => {
  axios
    .get("http://localhost/backdbase/read.php?countuser")
    .then(function (response) {
      usercounting.value = response.data.usercount;
    });
};

// Create New Users

const CreateUser = () => {
  var formData = new FormData(document.getElementById("UserForm"));
  formData.append("creator", user.username);

  axios
    .post("http://localhost/backdbase/create.php?createuser", formData)
    .then(function (response) {
      if (response.data == true) {
        state.username = "";
        state.password = "";
        state.confirmpassword = "";
        state.acclevel = "";
        fixed.value = false;
        showCustom();
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Err",
        });
      }
    });
};

// Delete Users

const showdel = (props) => {
  $q.dialog({
    title: "Confirmation",
    message: "Would you like to delete the user account?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      console.log(props.row.id);
      var formData = new FormData();
      formData.append("userid", props.row.id);

      axios
        .post("http://localhost/backdbase/delete.php?deleteuser", formData)
        .then(function (response) {
          if (response.data == true) {
            showdel.value = false;
            alert();
            readusers();
            countusers();
            countadmins();
          } else {
            $q.notify({
              color: "red",
              textColor: "white",
              message: "User not deleted",
            });
          }
        });
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
    })
    .onCancel(() => {
      $q.dialog.close;
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

// Edit User

const showedit = (props) => {
  editdialog.value = true;
  state.upusername = props.row.username;
  state.upacclevel = props.row.access_level;
  state.upid = props.row.id;
  var formData = new FormData();
  formData.append("userid", state.upid);
  formData.append("uppassword", state.uppassword);
};

const UpdateUser = () => {
  var formData = new FormData(document.getElementById("UpdateUserForm"));
  formData.append("userid", state.upid);
  console.log(state.upid);
  formData.append("upusername", state.upusername);
  console.log(state.upusername);
  formData.append("upacclevel", state.upacclevel);
  console.log(state.upacclevel);
  formData.append("uppassword", state.uppassword);
  console.log(state.uppassword);
  axios
    .post("http://localhost/backdbase/update.php?updateuser", formData)
    .then(function (response) {
      if (response.data == true) {
        showCustomedit();
        editdialog.value = false;
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "User not updated",
        });
      }
    });
};
</script>
