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
      <q-card style="min-width: 1000px; width: 1000px">
        <q-card-section class="q-gutter-md">
          <div class="text-h6">Edit School Information</div>
          <q-space />
          <q-btn flat color="primary" v-close-popup>
            <IconSquareRoundedX :size="30" stroke-width="2" @click="onReset" />
          </q-btn>
        </q-card-section>
        <form id="editSchoolCourses" @submit.prevent.stop="editSchoolCourses">
          <div class="q-pa-md">
            <q-select
              ref="refupmultipleCourses"
              label="Add Multiple Courses"
              filled
              v-model="state.editcourse"
              name="editcourse[]"
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add-unique"
              :rules="inputCourse"
            />

            <q-btn flat label="Add Course" color="primary" type="submit" />
          </div>
        </form>

        <form id="editSchoolinfoForm" @submit.prevent.stop="editSchoolinfo">
          <q-card-section class="q-pt-none">
            <div class="col-xs-12 col-sm-6">
              <div class="q-col-gutter-md row items-start">
                <div class="col-xs-12 col-sm-12">
                  <q-table
                    flat
                    bordered
                    title="Lists of Courses"
                    :rows="SCrows"
                    :columns="SCcolumns"
                    row-key="id"
                    :loading="false"
                    separator="cell"
                    :filter="filters"
                    v-model:selected="selected"
                  >
                    <template v-slot:top-right>
                      <!-- Search Bar -->
                      <q-input
                        borderless
                        dense
                        debounce="300"
                        v-model="filters"
                        placeholder="Search"
                      >
                        <template v-slot:append>
                          <q-icon name="search" />
                        </template>
                      </q-input>
                    </template>

                    <!-- End of Search Bar -->
                    <template v-slot:body-cell-actions="props">
                      <q-td :props="props">
                        <q-btn
                          dense
                          round
                          flat
                          color="red"
                          @click="deleteRow(props)"
                          icon="delete"
                        ></q-btn>
                      </q-td>
                    </template>
                  </q-table>
                </div>

                <div class="col-xs-12 col-sm-6 col-md-6">
                  <q-input
                    outlined
                    v-model="state.schoolname"
                    name="schoolname"
                    label="School Name"
                  />
                </div>
                <div class="col-xs-12 col-sm-6">
                  <q-input
                    ref="refschoolregion"
                    outlined
                    v-model="state.upschoolregion"
                    name="upschoolregion"
                    label="School Region"
                    :rules="inputRules"
                  />
                </div>
              </div>
            </div>
          </q-card-section>

          <q-card-actions align="right">
            <q-btn flat label="Update" color="primary" type="submit" />
          </q-card-actions>
        </form>
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
const filters = ref("");
const rows = ref([]);
const SCrows = ref([]);

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
  upschoolregion: "",
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
    align: "left",
    field: "school_name",
    sortable: true,
  },
  {
    name: "_region",
    required: true,
    label: "School Region",
    align: "left",
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

const SCcolumns = [
  {
    name: "courses",
    required: true,
    label: "Courses",
    align: "left",
    field: "courses",
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

// Sweet Alert (Update) Code Here

const showUpdatechool = () => {
  let timerInterval;
  Swal.fire({
    title: "Updating School Details!",
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
        title: "The School Information is now updated successfully",
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
// Edit COURSES

const currentProps = ref();

const showedit = (props) => {
  currentProps.value = props;
  console.log(currentProps.value.row.id);
  editSchool.value = true;
  state.schoolname = props.row.school_name;
  state.upschoolregion = props.row.school_region;

  var formData = new FormData();
  formData.append("ids", currentProps.value.row.id);
  axios.post("/read.php?readcourse", formData).then(function (response) {
    SCrows.value = response.data;
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

// Delete Courses

const deleteRow = (props) => {
  $q.dialog({
    title: "Confirm",
    message: "Do you want to remove this course?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      // console.log('>>>> OK')

      console.log(props.row.id);
      var formData = new FormData();
      formData.append("schoolid", props.row.id);
      axios
        .post("/delete.php?deleteSchoolInfo", formData)
        .then(function (response) {
          if (response.data == true) {
            var formData = new FormData();
            formData.append("ids", currentProps.value.row.id);
            axios
              .post("/read.php?readcourse", formData)
              .then(function (response) {
                SCrows.value = response.data;
              });
          } else {
            $q.notify({
              color: "red",
              textColor: "white",
              message: "Course not deleted",
            });
          }
        });
    })
    .onOk(() => {
      // console.log('>>>> second OK catcher')
    })
    .onCancel(() => {
      // console.log('>>>> Cancel')
    })
    .onDismiss(() => {
      // console.log('I am triggered on both OK and Cancel')
    });
};

// Delete School

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
      formData.append("schoolid", props.row.id);

      axios
        .post("/delete.php?deleteSchool", formData)
        .then(function (response) {
          if (response.data == true) {
            readschools();
          } else {
            $q.notify({
              color: "red",
              textColor: "white",
              message: "Course not deleted",
            });
          }
        });
    }
  });
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

// Edit School

const editSchoolinfo = () => {
  var formData = new FormData(document.getElementById("editSchoolinfoForm"));
  formData.append("ids", currentProps.value.row.id);

  axios
    .post("/update.php?updateSchoolCourse", formData)
    .then(function (response) {
      if (response.data == true) {
        editSchool.value = false;
        showUpdatechool();
        readschools();
      } else {
        alert("Failed");
      }
    });
};

const editSchoolCourses = () => {
  var formData = new FormData(document.getElementById("editSchoolCourses"));
  formData.append("ids", currentProps.value.row.id);
  axios.post("/create.php?editnewCourse", formData).then(function (response) {
    if (response.data == true) {
      var formData = new FormData();
      formData.append("ids", currentProps.value.row.id);
      axios.post("/read.php?readcourse", formData).then(function (response) {
        SCrows.value = response.data;
        $q.notify({
          message: "Added Successfully.",
          color: "green",
        });
      });
      state.editcourse = null;
    } else {
      $q.notify({
        message: "Please input courses in the field.",
        color: "red",
      });
    }
  });
};

const onReset = () => {
  state.editcourse = null;
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
