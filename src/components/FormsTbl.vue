<template>
  <div class="row justify-end">
    <q-btn
      class="q-pr-none"
      flat
      rounded
      label="Add New Forms"
      color="green"
      @click="fixed = true"
      icon="person_add"
    />
  </div>
  <q-table
    flat
    bordered
    :rows="rows"
    :columns="columns"
    row-key="name"
    separator="cell"
    :filter="filter"
    v-model:pagination="pagination"
  >
    <template v-slot:top-right>
      <q-input dense debounce="300" v-model="filter" placeholder="Search">
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:body="props">
      <q-tr :prop="props"
        ><q-td key="form_name" :props="props">
          <q-badge
            class="q-px-md q-py-xs rounded-borders-20 clickable-arrow"
            color="orange-9"
            :label="props.value"
            @click="showForms(props)"
            >{{ props.row.form_name }}</q-badge
          >
        </q-td>
        <q-td key="added_by" :props="props">
          {{ props.row.added_by }}
        </q-td>
        <q-td key="created_at" :props="props">
          {{ props.row.created_at }}
        </q-td>
        <q-td key="school_grad_status" :props="props">
          <q-badge color="light-green-4" :label="props.value">
            {{ props.row.school_grad_status }}
          </q-badge>
        </q-td>
        <q-td key="sub_status" :props="props">
          {{ props.row.sub_status }}
        </q-td>
        <q-td key="actions" :props="props">
          <q-btn
            flat
            rounded
            class="bi bi-info-circle"
            color="amber-5"
            @click="editForms(props)"
          >
            <IconEdit :size="30" stroke-width="2" />
          </q-btn>
          <q-btn
            flat
            rounded
            class="bi bi-info-circle"
            color="red-5"
            @click="removeForms(props)"
          >
            <IconTrashXFilled :size="30" stroke-width="2" />
          </q-btn>
        </q-td>
      </q-tr>
    </template>
  </q-table>

  <q-dialog v-model="fixed" persistent>
    <q-card class="rounded-borders-20 on-surface-text">
      <form id="submitFileForm" @submit.prevent.stop="submitFile">
        <q-card-section class="q-gutter-md">
          <div class="text-h6">Upload Files Here</div>
          <q-space />
          <q-btn flat color="primary" v-close-popup>
            <IconSquareRoundedX :size="30" stroke-width="2" />
          </q-btn>
        </q-card-section>
        <q-card-section style="max-height: 60vh" class="scroll">
          <div class="q-pa-md">
            <div class="row row_width q-col-gutter-xs">
              <div class="col-xs-12">
                <div class="q-px-sm">
                  <span class="text-bold">Upload File</span>
                  <q-file
                    ref="refFile"
                    filled
                    outlined
                    v-model="state.files"
                    name="files"
                    id="files"
                    label="Upload File Here"
                    accept=".doc,.docx,.pdf"
                    @rejected="onRejected"
                    counter
                    @update:model-value="onFileChange"
                    :rules="[fileRules]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </div>
              </div>
              <div class="col-xs-12">
                <div class="q-px-sm">
                  <span class="text-bold">Form Title</span>
                  <q-input
                    ref="refFormName"
                    outlined
                    hide-bottom-space
                    dense
                    v-model="state.form_name"
                    name="form_name"
                    :rules="inputRules"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="SUBMIT" type="submit" />
          </q-card-actions>
        </q-card-section>
      </form>
    </q-card>
  </q-dialog>

  <q-dialog v-model="editModal" persistent>
    <q-card class="rounded-borders-20 on-surface-text">
      <form id="submitEditFileForm" @submit.prevent.stop="submitEditFile">
        <q-card-section class="q-gutter-md">
          <div class="text-h6">Upload Files Here</div>
          <q-space />
          <q-btn flat color="primary" v-close-popup>
            <IconSquareRoundedX :size="30" stroke-width="2" />
          </q-btn>
        </q-card-section>
        <q-card-section style="max-height: 60vh" class="scroll">
          <div class="q-pa-md">
            <div class="row row_width q-col-gutter-xs">
              <div class="col-xs-12">
                <div class="q-px-sm">
                  <span class="text-bold">Upload File</span>
                  <q-file
                    ref="refeditfiles"
                    filled
                    outlined
                    v-model="state.editforms"
                    name="editforms"
                    id="editforms"
                    label="Upload File Here"
                    accept=".doc,.docx,.pdf"
                    counter
                    :rules="[fileRules]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </div>
              </div>
              <div class="col-xs-12">
                <div class="q-px-sm">
                  <span class="text-bold">Form Title</span>
                  <q-input
                    ref="refeditform_name"
                    outlined
                    hide-bottom-space
                    dense
                    v-model="state.editform_name"
                    name="editform_name"
                    :rules="inputRules"
                  />
                </div>
              </div>
            </div>
          </div>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="SUBMIT" type="submit" />
          </q-card-actions>
        </q-card-section>
      </form>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import { useQuasar, QSpinnerGears } from "quasar";
import Swal from "sweetalert2";
import {
  IconEdit,
  IconTrashXFilled,
  IconSquareRoundedX,
} from "@tabler/icons-vue";
import router from "../router";

const $q = useQuasar();

const axios = inject("$axios");
const user = inject("$user");
const rows = ref([]);
const filter = ref("");
const pagination = ref({
  rowsPerPage: 11,
});

const fixed = ref(false);
const editModal = ref(false);

const refFormName = ref(null);
const refeditform_name = ref(null);
const refeditfiles = ref(null);

const refFile = ref(null);
const filePath = ref("");

const state = reactive({
  files: null,
  form_name: null,
  editforms: null,
  editform_name: null,
});

// Show Loading State in Create
const showCustom = () => {
  let timerInterval;
  Swal.fire({
    title: "Uploading New Form!",
    html: "",
    timer: 2000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const timer = Swal.getPopup().querySelector("b");
      timerInterval = setInterval(() => {
        timer.textContent = `${Swal.getTimerLeft()}`;
      }, 100);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      Swal.fire({
        title: "Form Uploaded Successfully!",
        icon: "success",
        draggable: true,
      });
      readForms();
    }
  });
};

// Rules & Validations
const inputRules = [
  (val) => (val && val.length > 0) || "Please type something",
];

const fileRules = (val) => {
  if (val === null) {
    return "Please Select a File!";
  }
  return true;
};

// Column Sections

const columns = [
  {
    name: "form_name",
    required: true,
    label: "Form Title",
    align: "center",
    field: "form_name",
    sortable: true,
  },
  {
    name: "added_by",
    required: true,
    label: "Added By",
    align: "center",
    field: "added_by",
    sortable: true,
  },
  {
    name: "created_at",
    required: true,
    label: "Document Uploaded at",
    align: "center",
    field: "created_at",
    sortable: true,
  },
  {
    name: "actions",
    label: "Actions",
    align: "center",
    field: "actions",
    sortable: false,
  },
];

// Read Scholars

const readForms = () => {
  axios.get("/read.php?readforms").then(function (response) {
    rows.value = response.data;
  });
};

const submitFile = () => {
  refFile.value.validate();
  refFormName.value.validate();

  if (refFile.value.hasError || refFormName.value.hasError) {
    return;
  } else {
    var formData = new FormData(document.getElementById("submitFileForm"));
    formData.append("usercreator", user.username);
    formData.append("userid", user.id);

    axios.post("/create.php?createForms", formData).then(function (response) {
      if (response.data == true) {
        fixed.value = false;
        showCustom();
        state.files = null;
        state.form_name = null;
      } else {
        console.log("FAILED");
        state.files = null;
        state.form_name = null;
      }
    });
  }
};

const formeditid = ref(null);

const editForms = (props) => {
  editModal.value = true;
  state.editform_name = props.row.form_name;
  formeditid.value = props.row.id;
};

const submitEditFile = () => {
  refeditfiles.value.validate();
  refeditform_name.value.validate();

  if (refeditfiles.value.hasError || refeditform_name.value.hasError) {
    return;
  } else {
    var formData = new FormData(document.getElementById("submitEditFileForm"));
    formData.append("usercreator", user.username);
    formData.append("userid", user.id);
    formData.append("formeditid", formeditid.value);
    axios.post("/update.php?updateForms", formData).then(function (response) {
      if (response.data == true) {
        editModal.value = false;
        showCustom();
        state.editforms = null;
        state.editform_name = null;
      } else {
        console.log("FAILED");
        state.editforms = null;
        state.editform_name = null;
      }
    });
  }
};

const showForms = (props) => {
  const url = `http://localhost/backdbase/${props.row.file_path}`;
  window.open(url, "_blank");
};

const removeForms = (props) => {
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
      formData.append("formid", props.row.id);

      axios.post("/delete.php?deleteForms", formData).then(function (response) {
        if (response.data == true) {
          fixed.value = false;
          readForms();
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

onMounted(() => {
  readForms();
});
</script>
<style scoped>
.custom-table tbody tr td {
  cursor: pointer; /* Change cursor design on hover */
}
.clickable-arrow {
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding-right: 10px;
}
</style>
