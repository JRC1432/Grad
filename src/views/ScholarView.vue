<template>
  <div class="q-pa-md">
    <q-card
      class="my-card text-white"
      style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)"
    >
      <q-card-section>
        <div class="text-h6">View Scholars</div>
        <div class="text-subtitle2">Scholars Table</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-table
          flat
          bordered
          title="Scholar Profile Details"
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
                @click="showeditScholar(props)"
              >
                <IconListDetails :size="30" stroke-width="2" />
              </q-btn>
              <q-btn
                class="bi bi-info-circle"
                color="red-5"
                @click="showdelScholar(props)"
              >
                <IconTrash :size="30" stroke-width="2" />
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>
    </q-card>
  </div>

  <q-dialog v-model="fixed" persistent>
    <q-card style="min-width: 1000px; width: 1000px">
      <q-card-section>
        <div class="text-h6">Edit Scholar Details</div>
      </q-card-section>

      <q-separator />

      <q-card-section class="scroll">
        <form id="editscholarForm" @submit.prevent="editScholar">
          <div class="q-pa-md">
            <!-- Step 1 -->

            <q-stepper
              v-model="step"
              ref="stepper"
              alternative-labels
              color="primary"
              animated
            >
              <q-step
                :name="1"
                title="Personal Informations"
                icon="person"
                :done="step > 1"
              >
                <div class="col-xs-12 col-sm-6">
                  <div class="q-col-gutter-md row items-start">
                    <div class="col-xs-12">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upspasid"
                        label="SPAS ID:"
                        style="max-width: 200px"
                        name="upspasid"
                        mask="A - #### - ## - #####"
                      />
                    </div>

                    <div class="col-md-3">
                      <q-input
                        rounded
                        outlined
                        v-model="state.uplastname"
                        label="Last Name"
                        name="uplastname"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-3 col-md-3">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upfirstname"
                        label="First Name"
                        name="upfirstname"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-3 col-md-3">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upmidname"
                        label="Middle Name"
                        name="upmidname"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-2 col-md-2">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upsuffixname"
                        label="Suffix Name"
                        name="upsuffixname"
                      />
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upbirthdate"
                        name="upbirthdate"
                        type="date"
                        label="Birthday"
                      />
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upemailadd"
                        name="upemailadd"
                        label="E-mail Address"
                        type="email"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <div class="col-xs-12 col-sm-6 col-md-6">
                        <label>SEX: </label>
                        <div class="row justify-start">
                          <q-option-group
                            :options="sexoptions"
                            type="radio"
                            v-model="state.upgender"
                            name="upgender"
                          />
                        </div>
                      </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upcontact"
                        name="upcontact"
                        label="Phone"
                        mask="(####) ### - ####"
                      />
                    </div>
                  </div>
                </div>
                <q-stepper-navigation>
                  <q-btn @click="step = 2" color="primary" label="Continue" />
                </q-stepper-navigation>
              </q-step>
              <!-- Step 2 -->

              <q-step
                :name="2"
                title="Location"
                caption="Address Details"
                icon="map"
                :done="step > 2"
              >
                <div class="col-xs-12 col-sm-6">
                  <div class="q-col-gutter-md row items-start">
                    <div class="col-xs-12 col-sm-4 col-md-8">
                      <q-select
                        rounded
                        outlined
                        v-model="state.upprovince"
                        name="upprovince"
                        emit-value
                        map-options
                        use-input
                        input-debounce="0"
                        label="Select Zip Code"
                        :options="provinceoptions"
                        @filter="filterFnp"
                        behavior="menu"
                        @update:model-value="populateaddress"
                      >
                        <template v-slot:no-option>
                          <q-item>
                            <q-item-section class="text-grey">
                              No results
                            </q-item-section>
                          </q-item>
                        </template>
                      </q-select>
                    </div>

                    <div class="col-xs-12 col-sm-8 col-md-4">
                      <q-input
                        rounded
                        outlined
                        v-model="state.uphousenum"
                        name="uphousenum"
                        label="Block Lot/House No."
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upstreet"
                        name="upstreet"
                        label="Compound/Street/Phase/Purok"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upsubdivision"
                        name="upsubdivision"
                        label="Subdivision/Village"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upbarangay"
                        name="upbarangay"
                        label="Barangay"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        readonly
                        v-model="state.updistrict"
                        name="updistrict"
                        label="District"
                      />
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upregion"
                        readonly
                        name="upregion"
                        label="Region"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upmunicipality"
                        readonly
                        name="upmunicipality"
                        label="Municipality"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        readonly
                        v-model="state.upprovincecity"
                        name="upprovincecity"
                        label="Province"
                      />
                    </div>
                  </div>
                </div>

                <q-stepper-navigation>
                  <q-btn @click="step = 3" color="primary" label="Continue" />
                  <q-btn
                    flat
                    @click="step = 1"
                    color="primary"
                    label="Back"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </q-step>

              <!-- Step 3 -->

              <q-step :name="3" title="School" icon="workspace_premium">
                <div class="col-xs-12 col-sm-6">
                  <div class="q-col-gutter-md row items-start">
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upcourse"
                        name="upcourse"
                        label="Previous Course"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upschool"
                        name="upschool"
                        label="Previous School"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-select
                        rounded
                        outlined
                        label="Entry Type"
                        transition-show="flip-up"
                        transition-hide="flip-down"
                        v-model="state.upentry"
                        name="upentry"
                        :options="entryType"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upyraward"
                        name="upyraward"
                        label="Year of Award"
                      />
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                      <q-input
                        rounded
                        outlined
                        v-model="state.upbatch"
                        name="upbatch"
                        label="Batch"
                      />
                    </div>
                  </div>
                </div>

                <q-stepper-navigation>
                  <q-btn color="primary" label="Submit" type="submit" />

                  <q-btn
                    flat
                    @click="step = 2"
                    color="primary"
                    label="Back"
                    class="q-ml-sm"
                  />
                </q-stepper-navigation>
              </q-step>
            </q-stepper>
          </div>
        </form>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, reactive, inject } from "vue";
import { IconListDetails, IconTrash } from "@tabler/icons-vue";
import { useQuasar, QSpinnerGears } from "quasar";

const $q = useQuasar();
// const axios = inject("$axios");
const user = inject("$user");
const axios = inject("$axios");

// Items Variables

const filter = ref("");
const rows = ref([]);
const fixed = ref(false);

// Edit modal

const step = ref(1);
const saddressid = ref();

const state = reactive({
  upspasid: "",
  uplastname: "",
  upfirstname: "",
  upmidname: "",
  upsuffixname: "",
  upbirthdate: "",
  upgender: "",
  upemailadd: "",
  upcontact: "",

  upprovince: "",
  uphousenum: "",
  upstreet: "",
  upsubdivision: "",
  upbarangay: "",
  updistrict: "",
  upregion: "",
  upmunicipality: "",
  upprovincecity: "",

  upcourse: "",
  upschool: "",
  upentry: "",
  upyraward: "",
  upbatch: "",
});

const sexoptions = [
  { label: "Male", value: "M", color: "green" },
  { label: "Female", value: "F", color: "green" },
];
const entryType = [
  { label: "NEW", value: "NEW" },
  { label: "LATERAL", value: "LATERAL" },
  { label: "RESIDENTIAL", value: "RESIDENTIAL" },
];

const columns = [
  {
    name: "spas_id",
    required: true,
    label: "SPAS ID",
    align: "center",
    field: "spas_id",
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
    name: "fname",
    required: true,
    label: "First Name",
    align: "center",
    field: "fname",
    sortable: true,
  },
  {
    name: "mname",
    required: true,
    label: "Middle Name",
    align: "center",
    field: "mname",
    sortable: true,
  },
  {
    name: "suffix",
    required: true,
    label: "Suffix",
    align: "center",
    field: "suffix",
    sortable: true,
  },
  {
    name: "email",
    required: true,
    label: "E-mail",
    align: "center",
    field: "email",
    sortable: true,
  },
  {
    name: "contact",
    required: true,
    label: "Contact",
    align: "center",
    field: "contact",
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

// Show Loading State in Edit
const showCustom = () => {
  const dialog = $q.dialog({
    title: "Updatinf Scholar Details",
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
        message: "Scholar Profile Details Has Been Updated.",
        progress: false,
        ok: true,
      });
    }
  }, 100);
};

// Read Scholars

onMounted(() => {
  readscholars();
});

const readscholars = () => {
  axios.get("/read.php?readscholar").then(function (response) {
    rows.value = response.data;
  });
};

// Delete Scholars

const showdelScholar = (props) => {
  $q.dialog({
    title: "Confirmation",
    message: "Would you like to remove the scholar?",
    cancel: true,
    persistent: true,
  })
    .onOk(() => {
      console.log(props.row.id);
      var formData = new FormData();
      formData.append("scholarid", props.row.id);

      axios
        .post("/delete.php?deleteScholar", formData)
        .then(function (response) {
          if (response.data == true) {
            readscholars();
            showdel.value = false;
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

// Showing Province
var provinceoption2 = [];
const provinceoptions = ref(provinceoption2);

onMounted(() => {
  populateprovince();
});

const populateprovince = () => {
  axios.get("/read.php?address").then((response) => {
    provinceoption2 = response.data;
  });
};

const filterFnp = (val, update) => {
  if (val === "") {
    update(() => {
      provinceoptions.value = provinceoption2;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    provinceoptions.value = provinceoption2.filter((option) => {
      return option.label.toLowerCase().includes(needle);
    });
  });
};

// Showing Adress Data

onMounted(() => {
  populateaddress();
});

const populateaddress = () => {
  var formData = new FormData();
  formData.append("province", state.upprovince);
  console.log(state.upprovince);

  axios.post("/read.php?addressid", formData).then(function (response) {
    state.upmunicipality = response.data.zmun;
    state.upprovincecity = response.data.zpro;
    state.upbarangay = response.data.zbar;
    state.updistrict = response.data.zdis;
    state.upregion = response.data.zreg;
  });
};

//Edit Scaholar

const showeditScholar = (props) => {
  fixed.value = true;
  state.upspasid = props.row.spas_id;
  state.uplastname = props.row.lname;
  state.upfirstname = props.row.fname;
  state.upmidname = props.row.mname;
  state.upsuffixname = props.row.suffix;

  state.upbirthdate = props.row.birthday;
  state.upgender = props.row.sex;
  state.upemailadd = props.row.email;
  state.upcontact = props.row.contact;
  saddressid.value = props.row.id;

  console.log(saddressid.value);

  var formData = new FormData();
  formData.append("saddressid", saddressid.value);
  console.log(saddressid.value);

  axios.post("/read.php?scholarAddressid", formData).then(function (response) {
    state.upprovince = response.data.zipcode;
    state.uphousenum = response.data.house_number;
    state.upstreet = response.data.street;
    state.upsubdivision = response.data.subdivision;
    state.upbarangay = response.data.barangay;
    state.updistrict = response.data.district;
    state.upregion = response.data.h_region;
    state.upmunicipality = response.data.town;
    state.upprovincecity = response.data.province;

    console.log(response.data.province);
  });

  axios.post("/read.php?shoolsID", formData).then(function (response) {
    state.upcourse = response.data.current_course;
    state.upschool = response.data.current_school;
    state.upentry = response.data.entry_level;
    state.upyraward = response.data.year;
    state.upbatch = response.data.batch;

    console.log(response.data.current_course);
  });
};

const editScholar = () => {
  var formData = new FormData(document.getElementById("editscholarForm"));
  console.log(saddressid.value);

  formData.append("editScholarID", saddressid.value);

  formData.append("upspasid", state.upspasid);
  formData.append("uplastname", state.uplastname);
  formData.append("upfirstname", state.upfirstname);
  formData.append("upmidname", state.upmidname);
  formData.append("upsuffixname", state.upsuffixname);
  formData.append("upbirthdate", state.upbirthdate);
  formData.append("upgender", state.upgender);
  formData.append("upemailadd", state.upemailadd);
  formData.append("upcontact", state.upcontact);

  formData.append("upprovince", state.upprovince);
  formData.append("uphousenum", state.uphousenum);
  formData.append("upstreet", state.upstreet);
  formData.append("upsubdivision", state.upsubdivision);
  formData.append("upbarangay", state.upbarangay);
  formData.append("updistrict", state.updistrict);
  formData.append("upregion", state.upregion);
  formData.append("upmunicipality", state.upmunicipality);
  formData.append("upprovincecity", state.upprovincecity);

  // formData.append("upcourse", state.upcourse);
  // formData.append("upschool", state.upschool);
  // formData.append("upentry", state.upentry);
  // formData.append("upyraward", state.upyraward);
  // formData.append("upbatch", state.upbatch);

  axios.post("/update.php?updatesholar", formData).then(function (response) {
    if (response.data == true) {
      showCustom();
      readscholars();
    } else {
      alert("Failed");
    }
  });
};
</script>
