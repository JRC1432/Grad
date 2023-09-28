<template>
  <!-- Table Starts Here -->

  <div class="q-pa-md">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6 text-primary">Lists of School</div>
        <div class="text-subtitle2 text-primary">School Table</div>
        <div class="row justify-end">
          <q-btn
            class="q-pr-none"
            flat
            label="Add New School"
            color="green"
            @click="newSchool = true"
            icon="person_add"
          />
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-table
          flat
          bordered
          title="School Details"
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
                flat
                class="bi bi-info-circle"
                color="blue-11"
                @click="showedit(props)"
              >
                <IconEdit :size="30" stroke-width="2" />
              </q-btn>
              <q-btn
                flat
                class="bi bi-info-circle"
                color="red-5"
                @click="showdel(props)"
              >
                <IconTrash :size="30" stroke-width="2" />
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
    <!-- Table Ends Here -->

    <q-dialog v-model="editSchool" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Edit School Information</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="q-pa-md">
            <q-input
              outlined
              v-model="state.schoolname"
              name="schoolname"
              label="School Name"
            />
          </div>

          <div class="q-pa-md">
            <q-select
              label="Add Multiple Courses"
              filled
              v-model="state.editcourse"
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add-unique"
              style="width: 400px"
            />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Update" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="newSchool" persistent>
      <q-card>
        <q-card-section class="q-gutter-md">
          <div class="text-h6">Add New School</div>
          <q-space />
          <q-btn flat color="primary" v-close-popup>
            <IconSquareRoundedX :size="30" stroke-width="2" />
          </q-btn>
        </q-card-section>

        <form id="createschoolForm" @submit.prevent.stop="createSchool">
          <q-card-section class="q-pt-none">
            <div class="q-pa-sm">
              <q-input
                ref="refaddschool"
                outlined
                v-model="state.addschool"
                name="addschool"
                label="School Name"
                :rules="inputRules"
              />
            </div>

            <div class="q-pa-sm">
              <q-input
                ref="refschoolregion"
                outlined
                v-model="state.schoolregion"
                name="schoolregion"
                label="School Region"
                :rules="inputRules"
              />
            </div>

            <div class="q-pa-sm">
              <q-select
                ref="refcourses"
                label="Add Multiple Courses"
                filled
                v-model="state.addcourse"
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                input-debounce="0"
                new-value-mode="add-unique"
                style="width: 400px"
                name="addcourse[]"
                :rules="inputCourse"
              />
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Add" color="primary" type="submit" />
          </q-card-actions>
        </form>
      </q-card>
    </q-dialog>
  </div>
</template>
<script setup>
import { ref, onMounted, reactive, inject, computed } from "vue";

import {
  IconSquareRoundedX,
  IconSquareRoundedMinus,
  IconEdit,
  IconTrash,
} from "@tabler/icons-vue";
import { useQuasar, QSpinnerGears, Notify } from "quasar";
import Swal from "sweetalert2";

const user = inject("$user");
const axios = inject("$axios");
const $q = useQuasar();

const filter = ref("");
const rows = ref([]);

const editSchool = ref(false);
const newSchool = ref(false);

//References
const refaddschool = ref(null);
const refcourses = ref(null);
const refschoolregion = ref(null);

const state = reactive({
  schoolname: "",
  addcourse: null,
  addschool: "",
  editcourse: null,
  schoolregion: "",
});

// Rules & Validations
const inputRules = [
  (val) => (val && val.length > 0) || "Please type something",
];

const inputCourse = [(val) => (val && val.length > 0) || "Please Add Courses"];

const columns = [
  {
    name: "school",
    required: true,
    label: "School Name",
    align: "center",
    field: "school_name",
    sortable: true,
  },
  {
    name: "_region",
    required: true,
    label: "School Region",
    align: "center",
    field: "school_region",
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

// Sweet Alert (Create) Code Here

const showCreateSchool = () => {
  let timerInterval;
  Swal.fire({
    title: "Adding New School!",
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
        title: "The new school is now added successfully",
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

// Read Users

onMounted(() => {
  readschools();
});

const readschools = () => {
  axios
    .get("http://localhost/backdbase/read.php?readschool")
    .then(function (response) {
      rows.value = response.data;
    });
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
      console.log(props.row.id);
      var formData = new FormData();
      formData.append("userid", props.row.id);
      // axios
      //   .post("/delete.php?deleteuser", formData)
      //   .then(function (response) {
      //     if (response.data == true) {
      //       readusers();
      //       countusers();
      //       countadmins();
      //     } else {
      //       $q.notify({
      //         color: "red",
      //         textColor: "white",
      //         message: "User not deleted",
      //       });
      //     }
      //   });
    }
  });
};

// Edit User

const showedit = (props) => {
  editSchool.value = true;
  state.schoolname = props.row.school_name;
};

// Create School

const createSchool = () => {
  refcourses.value.validate();
  refschoolregion.value.validate();
  refaddschool.value.validate();

  if (
    refcourses.value.hasError ||
    refschoolregion.value.hasError ||
    refaddschool.value.hasError
  ) {
  } else {
    var formData = new FormData(document.getElementById("createschoolForm"));

    axios.post("/create.php?newSchool", formData).then(function (response) {
      if (response.data == true) {
        newSchool.value = false;
        state.addcourse = null;
        state.addschool = null;
        state.schoolregion = null;

        showCreateSchool();
        readschools();
      } else {
        alert("Failed");
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
</style>
