<template>
  <form id="scholarForm" @submit.prevent.stop="submitScholar">
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
                  ref="rfspasid"
                  rounded
                  outlined
                  v-model="state.spasid"
                  label="SPAS ID:"
                  style="max-width: 200px"
                  name="spasid"
                  mask="A - #### - ## - #####"
                  :rules="inputRules"
                />
              </div>

              <div class="col-md-3">
                <q-input
                  ref="rflname"
                  rounded
                  outlined
                  v-model="state.lastname"
                  label="Last Name"
                  name="lastname"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-3 col-md-3">
                <q-input
                  ref="rffname"
                  rounded
                  outlined
                  v-model="state.firstname"
                  label="First Name"
                  name="firstname"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-3 col-md-3">
                <q-input
                  ref="rfmname"
                  rounded
                  outlined
                  v-model="state.midname"
                  label="Middle Name"
                  name="midname"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2">
                <q-input
                  ref="rfsname"
                  rounded
                  outlined
                  v-model="state.suffixname"
                  label="Suffix Name"
                  name="suffixname"
                  mask="AAAA"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfbirth"
                  rounded
                  outlined
                  v-model="state.birthdate"
                  name="birthdate"
                  type="date"
                  label="Birthday"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfemail"
                  rounded
                  outlined
                  v-model="state.emailadd"
                  name="emailadd"
                  label="E-mail Address"
                  type="email"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <label>SEX: </label>
                <div class="row justify-start">
                  <q-option-group
                    :options="sexoptions"
                    type="radio"
                    v-model="state.gender"
                    name="gender"
                  />
                </div>
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfcontact"
                  rounded
                  outlined
                  v-model="state.contact"
                  name="contact"
                  label="Phone"
                  mask="(####) ### - ####"
                  :rules="inputRules"
                />
              </div>
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn @click="step2" color="primary" label="Continue" />
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
                  ref="rfprovince"
                  rounded
                  outlined
                  v-model="province"
                  name="province"
                  emit-value
                  map-options
                  use-input
                  input-debounce="0"
                  label="Select Province"
                  :options="provinceoptions"
                  @filter="filterFnp"
                  behavior="menu"
                  @update:model-value="populateaddress"
                  :rules="[myRule]"
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
                  ref="rfhousenum"
                  rounded
                  outlined
                  v-model="state.housenum"
                  name="housenum"
                  label="Block Lot/House No."
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfstreet"
                  rounded
                  outlined
                  v-model="state.street"
                  name="street"
                  label="Compound/Street/Phase/Purok"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  rounded
                  outlined
                  v-model="state.subdivision"
                  name="subdivision"
                  label="Subdivision/Village"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  rounded
                  outlined
                  v-model="state.barangay"
                  name="barangay"
                  label="Barangay"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  rounded
                  outlined
                  readonly
                  v-model="state.district"
                  name="district"
                  label="District"
                />
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  rounded
                  outlined
                  v-model="state.region"
                  readonly
                  name="region"
                  label="Region"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  rounded
                  outlined
                  v-model="state.municipality"
                  readonly
                  name="municipality"
                  label="Municipality"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  rounded
                  outlined
                  readonly
                  v-model="state.provincecity"
                  name="provincecity"
                  label="Province"
                />
              </div>
            </div>
          </div>

          <q-stepper-navigation>
            <q-btn @click="step3" color="primary" label="Continue" />
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
                  ref="rfschool"
                  rounded
                  outlined
                  v-model="state.school"
                  name="school"
                  label="School"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfcourse"
                  rounded
                  outlined
                  v-model="state.course"
                  name="course"
                  label="Course"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-select
                  ref="rfentry"
                  rounded
                  outlined
                  label="Entry Type"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  v-model="entry"
                  name="entry"
                  :options="entryType"
                  :rules="[myRule]"
                />
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfyear"
                  rounded
                  outlined
                  v-model="state.yraward"
                  name="yraward"
                  label="Year of Award"
                  mask="####"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfbatch"
                  rounded
                  outlined
                  v-model="state.batch"
                  name="batch"
                  label="Batch"
                  :rules="inputRules"
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
</template>

<script setup>
import { ref, reactive, onMounted, inject } from "vue";
import { useQuasar, QSpinnerGears } from "quasar";
import Swal from "sweetalert2";
import router from "../router";

const $q = useQuasar();

const axios = inject("$axios");
const user = inject("$user");

const step = ref(1);

//Validation Declaration

const rfcontact = ref(null);
const rfemail = ref(null);
const rfbirth = ref(null);
const rfsname = ref(null);
const rfmname = ref(null);
const rffname = ref(null);
const rflname = ref(null);
const rfspasid = ref(null);

const rfprovince = ref(null);
const rfhousenum = ref(null);
const rfstreet = ref(null);

const rfbatch = ref(null);
const rfyear = ref(null);
const rfentry = ref(null);
const rfschool = ref(null);
const rfcourse = ref(null);

// Select Declaration
const province = ref(null);
const entry = ref(null);

const state = reactive({
  spasid: "",
  lastname: "",
  firstname: "",
  midname: "",
  suffixname: "",
  emailadd: "",
  birthdate: "",
  contact: "",
  gender: "M",

  province: "",
  housenum: "",
  street: "",
  municipality: "",
  barangay: "",
  subdivision: "",
  provincecity: "",
  district: "",
  region: "",

  course: "",
  school: "",

  yraward: "",
  batch: "",
});

const sexoptions = [
  { label: "Male", value: "M", color: "primary" },
  { label: "Female", value: "F", color: "primary" },
];

const entryType = [
  { label: "NEW", value: "NEW" },
  { label: "LATERAL", value: "LATERAL" },
  { label: "RESIDENTIAL", value: "RESIDENTIAL" },
];

// Rules & Validations
const inputRules = [
  (val) => (val && val.length > 0) || "Please type something",
];

const myRule = (val) => {
  if (val === null) {
    return "You must make a selection!";
  }
  return true;
};

// Steppers

const step2 = () => {
  rfcontact.value.validate();
  rfemail.value.validate();
  rfbirth.value.validate();
  rfsname.value.validate();
  rfmname.value.validate();
  rffname.value.validate();
  rflname.value.validate();
  rfspasid.value.validate();

  if (
    rfcontact.value.hasError ||
    rfemail.value.hasError ||
    rfbirth.value.hasError ||
    rfsname.value.hasError ||
    rfmname.value.hasError ||
    rffname.value.hasError ||
    rflname.value.hasError ||
    rfspasid.value.hasError
  ) {
  } else {
    step.value = 2;
  }
};

const step3 = () => {
  rfprovince.value.validate();
  rfhousenum.value.validate();
  rfstreet.value.validate();

  if (
    rfprovince.value.hasError ||
    rfhousenum.value.hasError ||
    rfstreet.value.hasError
  ) {
  } else {
    step.value = 3;
  }
};

// Show Loading State in Create
const showCustom = () => {
  const dialog = $q.dialog({
    title: "Adding New Scholar...",
    dark: false,
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
        message: "New Scholar Added Successfully",
        progress: false,
        ok: true,
      });
    }
  }, 100);
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
  formData.append("province", province.value);
  console.log(state.province);

  axios.post("/read.php?addressid", formData).then(function (response) {
    state.municipality = response.data.zmun;
    state.provincecity = response.data.zpro;
    state.barangay = response.data.zbar;
    state.district = response.data.zdis;
    state.region = response.data.zreg;
  });
};

const submitScholar = () => {
  rfbatch.value.validate();
  rfyear.value.validate();
  rfentry.value.validate();
  rfschool.value.validate();
  rfcourse.value.validate();

  if (
    rfbatch.value.hasError ||
    rfyear.value.hasError ||
    rfentry.value.hasError ||
    rfschool.value.hasError ||
    rfcourse.value.hasError
  ) {
    // error
  } else {
    var formData = new FormData(document.getElementById("scholarForm"));
    formData.append("spasid", state.spasid);
    formData.append("lastname", state.lastname);
    formData.append("firstname", state.firstname);
    formData.append("midname", state.midname);
    formData.append("suffixname", state.suffixname);
    formData.append("emailadd", state.emailadd);
    formData.append("birthdate", state.birthdate);
    formData.append("contact", state.contact);
    formData.append("gender", state.gender);

    formData.append("province", province.value);
    formData.append("housenum", state.housenum);
    formData.append("street", state.street);
    formData.append("municipality", state.municipality);
    formData.append("barangay", state.barangay);
    formData.append("subdivision", state.subdivision);
    formData.append("provincecity", state.provincecity);
    formData.append("district", state.district);
    formData.append("region", state.region);

    formData.append("usercreator", user.username);

    axios.post("/create.php?createScholar", formData).then(function (response) {
      if (response.data == true) {
        showCustom();
      } else {
        alert("failed");
      }
    });

    axios.post("/create.php?NewScholarLog", formData).then(function (response) {
      if (response.data == true) {
      } else {
        alert("failed");
      }
    });
  }
};
</script>
