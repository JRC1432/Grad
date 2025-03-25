<template>
  <!-- Table Starts Here -->

  <div class="q-pa-md">
    <q-card class="my-card rounded-borders-20" flat>
      <q-card-section>
        <div class="text-h6 text-primary">Users Control Panel</div>
        <div class="text-subtitle2 text-primary">Users Table</div>
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
          :filter="filter"
          separator="cell"
          v-model:pagination="pagination"
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
                flat
                class="bi bi-info-circle"
                color="blue-11"
                @click="showedit(props)"
              >
                <IconUserEdit :size="30" stroke-width="2" />
              </q-btn>
              <q-btn
                flat
                class="bi bi-info-circle"
                color="red-5"
                @click="showdel(props)"
              >
                <IconUserMinus :size="30" stroke-width="2" />
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
      <q-card class="rounded-borders-20">
        <form id="UserForm" @submit.prevent.stop="CreateUser">
          <q-card-section class="q-gutter-md">
            <div class="text-h6">New User</div>
            <q-space />
            <q-btn flat color="primary" @click="newClosebtn">
              <IconSquareRoundedX :size="30" stroke-width="2" />
            </q-btn>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 80vh" class="scroll">
            <div class="q-pa-md">
              <div class="row row_width q-col-gutter-xs">
                <div class="col-xs-12 col-sm-6">
                  <q-img
                    rounded
                    :src="url"
                    spinner-color="white"
                    class="q-mb-sm rounded-image"
                  >
                  </q-img>
                </div>
                <div class="col-xs-12 col-sm-6">
                  <div>
                    <span>Picture is optional</span>

                    <q-file
                      filled
                      outlined
                      v-model="state.pic"
                      name="pic"
                      id="pic"
                      label="Upload Picture"
                      accept=".jpg, image/*"
                      @rejected="onRejected"
                      counter
                      @update:model-value="onFileChange"
                    >
                      <template v-slot:prepend>
                        <q-icon name="attach_file" />
                      </template>
                    </q-file>
                  </div>
                </div>

                <div class="col-xs-12 col-sm-6">
                  <div class="q-px-sm">
                    <span class="text-bold">First Name</span>
                    <q-input
                      ref="fnameRef"
                      outlined
                      dense
                      hide-bottom-space
                      v-model="state.firstname"
                      name="firstname"
                      :rules="inputRules"
                    />
                  </div>
                </div>

                <div class="col-xs-12 col-sm-6">
                  <div class="q-px-sm">
                    <span class="text-bold">Last Name</span>
                    <q-input
                      ref="lnameRef"
                      outlined
                      dense
                      hide-bottom-space
                      v-model="state.lastname"
                      name="lastname"
                      :rules="inputRules"
                    />
                  </div>
                </div>

                <div class="col-xs-12 col-sm-12">
                  <div class="q-px-sm">
                    <span class="text-bold">Username</span>
                    <q-input
                      ref="nameRef"
                      outlined
                      dense
                      hide-bottom-space
                      v-model="state.username"
                      name="username"
                      :rules="[checkUsernames, maxLength]"
                      :debounce="1000"
                      no-error-icon
                    />
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12">
                  <div class="q-px-sm">
                    <span class="text-bold">Password</span>
                    <q-input
                      ref="passRef"
                      outlined
                      dense
                      hide-bottom-space
                      :type="isPwds ? 'password' : 'text'"
                      v-model="state.password"
                      name="password"
                      :rules="inputpassRules"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwds ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwds = !isPwds"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12">
                  <div class="q-px-sm">
                    <span class="text-bold">Confirm Password</span>
                    <q-input
                      ref="confpassRef"
                      outlined
                      dense
                      hide-bottom-space
                      :type="isPwd ? 'password' : 'text'"
                      v-model="state.confirmpassword"
                      name="confirmpassword"
                      :rules="inputpassRules"
                      :error="confirmpass"
                      color="green"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12">
                  <div class="q-px-sm">
                    <span class="text-bold">User Access Level</span>
                    <q-select
                      ref="SlctUservalidate"
                      outlined
                      dense
                      hide-bottom-space
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      v-model="acclevel"
                      name="acclevel"
                      :options="Acclevel"
                      :rules="[myRule]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn flat label="Submit" color="primary" type="submit" />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>

    <!-- Edit Modal -->

    <q-dialog v-model="editdialog" persistent>
      <q-card class="rounded-borders-20">
        <form id="UpdateUserForm" @submit.prevent.stop="UpdateUser">
          <q-card-section class="q-gutter-md">
            <div class="text-h6">Update User Account</div>
            <q-space />
            <q-btn flat color="primary" v-close-popup>
              <IconSquareRoundedX :size="30" stroke-width="2" />
            </q-btn>
          </q-card-section>

          <q-separator />

          <q-card-section style="max-height: 60vh" class="scroll">
            <div class="q-pa-md">
              <div class="row row_width q-col-gutter-xs">
                <div class="col-xs-12 col-sm-6">
                  <div class="q-px-sm">
                    <span class="text-bold">First Name</span>
                    <q-input
                      ref="upfnameRef"
                      outlined
                      dense
                      hide-bottom-space
                      v-model="state.upfirstname"
                      name="upfirstname"
                      :rules="inputRules"
                    />
                  </div>
                </div>
                <div class="col-xs-12 col-sm-6">
                  <div class="q-px-sm">
                    <span class="text-bold">Last Name</span>
                    <q-input
                      ref="uplnameRef"
                      outlined
                      hide-bottom-space
                      dense
                      v-model="state.uplastname"
                      name="uplastname"
                      :rules="inputRules"
                    />
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12">
                  <div class="q-px-sm">
                    <span class="text-bold">Username</span>
                    <q-input
                      ref="upnameRef"
                      outlined
                      dense
                      hide-bottom-space
                      v-model="state.upusername"
                      name="upusername"
                      :rules="[checkUsername, maxLength]"
                    />
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12">
                  <div class="q-px-sm">
                    <span class="text-bold">Password</span>
                    <q-input
                      ref="uppassRef"
                      outlined
                      dense
                      hide-bottom-space
                      :type="isPwds ? 'password' : 'text'"
                      v-model="state.uppassword"
                      name="uppassword"
                      :rules="inputpassRules"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwds ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwds = !isPwds"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12">
                  <div class="q-px-sm">
                    <span class="text-bold">Confirm Password</span>
                    <q-input
                      ref="upconfpassRef"
                      outlined
                      dense
                      hide-bottom-space
                      :type="isPwd ? 'password' : 'text'"
                      v-model="state.upconfirmpassword"
                      name="upconfirmpassword"
                      :rules="inputpassRules"
                      :error="upconfirmpass"
                      color="green"
                    >
                      <template v-slot:append>
                        <q-icon
                          :name="isPwd ? 'visibility_off' : 'visibility'"
                          class="cursor-pointer"
                          @click="isPwd = !isPwd"
                        />
                      </template>
                    </q-input>
                  </div>
                </div>
                <div class="col-xs-12 col-sm-12">
                  <div class="q-px-sm">
                    <span class="text-bold">User Access Level</span>
                    <q-select
                      ref="upSlctUservalidate"
                      outlined
                      dense
                      emit-value
                      map-options
                      hide-bottom-space
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      v-model="upacclevel"
                      name="upacclevel"
                      :options="Acclevel"
                      :rules="[myRule]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
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
import { ref, onMounted, reactive, inject, computed } from "vue";

import {
  IconUserEdit,
  IconUserCancel,
  IconUserMinus,
  IconSquareRoundedX,
} from "@tabler/icons-vue";
import { useQuasar, QSpinnerGears, Notify } from "quasar";
import Swal from "sweetalert2";
// import { maxLength } from "@vuelidate/validators";

const user = inject("$user");
const q$ = useQuasar();
const $q = useQuasar();
const axios = inject("$axios");
const pagination = ref({
  page: 1, // Current page
  rowsPerPage: 12, // Rows per page
});

// Items Variables
const nameRef = ref(null);
const passRef = ref(null);
const confpassRef = ref(null);
const lnameRef = ref(null);
const fnameRef = ref(null);
const SlctUservalidate = ref(null);
const upSlctUservalidate = ref(null);

const upfnameRef = ref(null);
const uplnameRef = ref(null);
const upnameRef = ref(null);
const uppassRef = ref(null);
const upconfpassRef = ref(null);

const filter = ref("");
const fixed = ref("false");
const editdialog = ref(false);
const rows = ref([]);

// Input form variables
const isPwd = ref(true);
const isPwds = ref(true);

//Select Declarations
const acclevel = ref(null);
const upacclevel = ref(null);

const state = reactive({
  firstname: "",
  lastname: "",
  username: "",
  password: "",
  confirmpassword: "",
  pic: "",

  upfirstname: "",
  uplastname: "",
  upusername: "",
  uppassword: "",
  upconfirmpassword: "",
  upid: "",
});

// Rules & Validations
const inputRules = [
  (val) => (val && val.length > 0) || "Please type something",
];

const inputpassRules = [
  (val) => !!val || "Field is required",
  (val) => val.length >= 6 || "Please use minimum of 6 characters",
];

const SelectValidate = [
  (val) => val === null || "Please Select the User Status",
];

// Validation for same password inputs

const confirmpass = computed(() => state.password !== state.confirmpassword);
const upconfirmpass = computed(
  () => state.uppassword !== state.upconfirmpassword
);

// Validation for select

const myRule = (val) => {
  if (val === null) {
    return "You must make a selection!";
  }
};

// Validation for images

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

// Validation for Length

function maxLength(val) {
  return val.length >= 6 || "Please use maximum of 6 characters";
}

// Validation for Usernames for Create

const checkUsernames = async (value) => {
  const formData = new FormData(document.getElementById("UserForm"));
  formData.append("username", state.username);
  try {
    const response = await axios.post("/read.php?checkUser", formData);
    if (response.data === true) {
      // Do something if username is available
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("This username is already been taken!!!");
        }, 1500);
      });
    }
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
  }
};

const checkUsername = async (value) => {
  const formData = new FormData(document.getElementById("UpdateUserForm"));
  formData.append("username", state.upusername);
  try {
    const response = await axios.post("/read.php?checkUser", formData);
    if (response.data === true) {
      // Do something if username is available
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("This username is already been taken!!!");
        }, 1500);
      });
    }
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
  }
};

const columns = [
  {
    name: "fname",
    required: true,
    label: "First Name",
    align: "center",
    field: "fname",
    sortable: true,
  },
  {
    name: "lname",
    required: true,
    label: "Last Name",
    align: "center",
    field: "lname",
    sortable: true,
  },
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
  { label: "Coordinator", value: "2" },
  { label: "Project Leaders", value: "3" },
];

const url = ref(null);

const onFileChange = () => {
  const file = state.pic;
  url.value = URL.createObjectURL(file);
};

// Sweet Alert (Create) Code Here

const showalert = () => {
  let timerInterval;
  Swal.fire({
    title: "Creating New User Account!",
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
        title: "The new user has been added successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      readusers();
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
};

// Sweet Alert (Edit) Code Here

const showEditalert = () => {
  let timerInterval;
  Swal.fire({
    title: "Updating User Account Details!",
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
        title: "The user is now updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      readusers();
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
};

// Close & Clear button

const newClosebtn = () => {
  state.pic = "";
  state.firstname = "";
  state.lastname = "";
  state.username = "";
  state.password = "";
  state.confirmpassword = "";
  acclevel.value = "";
  fixed.value = false;
};
// Read Users

onMounted(() => {
  readusers();
});

const readusers = () => {
  axios.get("/read.php?readuser").then(function (response) {
    rows.value = response.data;
  });
};

// Create New Users

const CreateUser = () => {
  fnameRef.value.validate();
  lnameRef.value.validate();
  nameRef.value.validate();
  passRef.value.validate();
  confpassRef.value.validate();
  SlctUservalidate.value.validate();

  if (
    nameRef.value.hasError ||
    passRef.value.hasError ||
    fnameRef.value.hasError ||
    lnameRef.value.hasError ||
    SlctUservalidate.value.hasError
  ) {
    // form has error
  } else {
    var formData = new FormData(document.getElementById("UserForm"));

    formData.append("creator", user.username);
    formData.append("authid", user.id);

    axios.post("/create.php?createuser", formData).then(function (response) {
      if (response.data == true) {
        state.username = "";
        state.password = "";
        state.confirmpassword = "";
        acclevel.value = "";
        fixed.value = false;
        showalert();
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Err",
        });
      }
    });

    axios.post("/create.php?newUserLog", formData).then(function (response) {
      if (response.data == true) {
        fixed.value = false;
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Error in log",
        });
      }
    });
  }
};

// Delete Users

const showdel = (props) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "Your file has been deleted.", "success");

      var formData = new FormData();
      formData.append("userid", props.row.id);
      axios.post("/delete.php?deleteuser", formData).then(function (response) {
        if (response.data == true) {
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

      formData.append("creator", user.username);
      formData.append("username", props.row.username);
      formData.append("acclevel", props.row.access_level);

      axios.post("/create.php?delUserLog", formData).then(function (response) {
        if (response.data == true) {
          fixed.value = false;
        } else {
          $q.notify({
            color: "red",
            textColor: "white",
            message: "Error in log",
          });
        }
      });
    }
  });
};

// Edit User

const showedit = (props) => {
  editdialog.value = true;
  state.upfirstname = props.row.fname;
  state.uplastname = props.row.lname;
  state.upusername = props.row.username;
  state.upid = props.row.id;

  var formData = new FormData();
  formData.append("userid", state.upid);
  formData.append("uppassword", state.uppassword);
};

const UpdateUser = () => {
  upfnameRef.value.validate();
  uplnameRef.value.validate();
  upnameRef.value.validate();
  uppassRef.value.validate();
  upconfpassRef.value.validate();
  upSlctUservalidate.value.validate();

  if (
    upfnameRef.value.hasError ||
    uplnameRef.value.hasError ||
    upnameRef.value.hasError ||
    uppassRef.value.hasError ||
    upconfpassRef.value.hasError ||
    upSlctUservalidate.value.hasError
  ) {
  } else {
    var formData = new FormData(document.getElementById("UpdateUserForm"));
    formData.append("upfirstname", state.upfirstname);

    formData.append("uplastname", state.uplastname);

    formData.append("userid", state.upid);

    formData.append("upusername", state.upusername);

    formData.append("upacclevel", upacclevel.value);

    formData.append("uppassword", state.uppassword);

    axios.post("/update.php?updateuser", formData).then(function (response) {
      if (response.data == true) {
        showEditalert();
        editdialog.value = false;
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "User not updated",
        });
      }
    });

    formData.append("creator", user.username);
    axios.post("/create.php?editUserLog", formData).then(function (response) {
      if (response.data == true) {
        fixed.value = false;
      } else {
        $q.notify({
          color: "red",
          textColor: "white",
          message: "Error in log",
        });
      }
    });
  }
};
</script>

<style>
.card-body {
  background-color: #ffd1da;
}
.font-color {
  color: #d61f5d;
}
.q-gutter-md {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rounded-borders-20 {
  border-radius: 20px !important; /* Adjust the radius as needed */
}
.rounded-image {
  border-radius: 50%;
  width: 200px;
  height: 200px;
}
</style>
