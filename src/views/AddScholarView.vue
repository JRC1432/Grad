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
                  outlined
                  v-model="state.midname"
                  label="Middle Name"
                  name="midname"
                />
              </div>
              <div class="col-xs-12 col-sm-2 col-md-2">
                <q-input
                  ref="rfsname"
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
                  outlined
                  v-model="state.street"
                  name="street"
                  label="Compound/Street/Phase/Purok"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  outlined
                  v-model="state.subdivision"
                  name="subdivision"
                  label="Subdivision/Village"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  outlined
                  v-model="state.barangay"
                  name="barangay"
                  label="Barangay"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  outlined
                  readonly
                  v-model="state.district"
                  name="district"
                  label="District"
                />
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  outlined
                  v-model="state.region"
                  readonly
                  name="region"
                  label="Region"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  outlined
                  v-model="state.municipality"
                  readonly
                  name="municipality"
                  label="Municipality"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
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

        <q-step :name="3" title="School" icon="school" :done="step > 3">
          <div class="col-xs-12 col-sm-6">
            <div class="q-col-gutter-md row items-start">
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfschool"
                  outlined
                  v-model="state.school"
                  name="school"
                  label="Previous School"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfcourse"
                  outlined
                  v-model="state.course"
                  name="course"
                  label="Previous Course"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-select
                  ref="rfgradschool"
                  outlined
                  map-options
                  use-input
                  input-debounce="0"
                  label="Select School"
                  v-model="gradschool"
                  name="gradschool"
                  :options="gradschoolOptions"
                  @filter="filterGradschool"
                  behavior="menu"
                  @update:model-value="populateschool"
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
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-select
                  ref="rfgradcourse"
                  emit-value
                  map-options
                  outlined
                  label="Graduate Course"
                  v-model="gradcourse"
                  name="gradcourse"
                  :options="gradcourseOptions"
                  :rules="[myRule]"
                />
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  outlined
                  readonly
                  v-model="state.schoolregion"
                  name="schoolregion"
                  label="School Region"
                />
              </div>
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn @click="step4" color="primary" label="Continue" />

            <q-btn
              flat
              @click="step = 2"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <!-- Stepper 4 -->

        <q-step
          :name="4"
          title="Thesis Details"
          icon="menu_book"
          :done="step > 4"
        >
          <div class="col-xs-12 col-sm-6">
            <div class="q-col-gutter-md row items-start">
              <div class="col-xs-12">
                <q-input
                  ref="rftitle"
                  outlined
                  v-model="state.title"
                  name="title"
                  label="Title of Research"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfstartdate"
                  outlined
                  v-model="state.startdate"
                  name="startdate"
                  type="date"
                  label="Start Date"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfenddate"
                  outlined
                  v-model="state.enddate"
                  name="enddate"
                  type="date"
                  label="End Date"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfduration"
                  outlined
                  v-model="state.duration"
                  name="duration"
                  label="Duration"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-select
                  ref="rffield"
                  emit-value
                  map-options
                  outlined
                  label="Field"
                  v-model="field"
                  name="field"
                  :options="fieldOptions"
                  :rules="[myRule]"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfobligation"
                  outlined
                  v-model="state.obligation"
                  name="obligation"
                  label="Service Obligation"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-select
                  ref="rfundergrad"
                  outlined
                  emit-value
                  map-options
                  label="Undergraduate Scholar"
                  v-model="undergrad"
                  name="undergrad"
                  :options="undergradOptions"
                  :rules="[myRule]"
                />
              </div>

              <div class="col-xs-12">
                <q-input
                  ref="rfremarks"
                  outlined
                  v-model="state.remarks"
                  name="remarks"
                  label="Remarks"
                  :rules="inputRules"
                />
              </div>
            </div>
          </div>
          <q-stepper-navigation>
            <q-btn @click="step5" color="primary" label="Continue" />

            <q-btn
              flat
              @click="step = 3"
              color="primary"
              label="Back"
              class="q-ml-sm"
            />
          </q-stepper-navigation>
        </q-step>

        <!-- Step 5 -->

        <q-step
          :name="5"
          title="Scholarship Information"
          icon="workspace_premium"
        >
          <div class="col-xs-12 col-sm-6">
            <div class="q-col-gutter-md row items-start">
              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-select
                  ref="rfentry"
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

              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-input
                  ref="rfyear"
                  outlined
                  v-model="state.yraward"
                  name="yraward"
                  label="Year of Award"
                  mask="####"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-input
                  ref="rfbatch"
                  outlined
                  v-model="state.batch"
                  name="batch"
                  label="Batch"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-select
                  ref="rfgrant"
                  emit-value
                  map-options
                  outlined
                  label="Grant"
                  v-model="grant"
                  name="grant"
                  :options="grantOptions"
                  :rules="[myRule]"
                />
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-select
                  ref="rflvl"
                  outlined
                  label="Level"
                  v-model="level"
                  name="level"
                  :options="LvlOptions"
                  :rules="[myRule]"
                />
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-input
                  ref="rfcomp"
                  outlined
                  v-model="state.comp"
                  name="comp"
                  label="Comp"
                  :rules="inputRules"
                />
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-select
                  ref="rfscholarprog"
                  outlined
                  label="Scholarship Program"
                  v-model="scholarprog"
                  name="scholarprog"
                  :options="scholarprogOptions"
                  :rules="[myRule]"
                />
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-select
                  ref="rfcouncil"
                  emit-value
                  map-options
                  outlined
                  label="Council"
                  v-model="council"
                  name="council"
                  :options="councilOptions"
                  :rules="[myRule]"
                />
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-select
                  ref="rfscholartype"
                  outlined
                  label="Scholar Type"
                  v-model="scholartype"
                  name="scholartype"
                  :options="scholartypeOptions"
                  :rules="[myRule]"
                />
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-input
                  ref="rfavailment"
                  outlined
                  v-model="state.availment"
                  name="availment"
                  label="Availment"
                  :rules="inputRules"
                />
              </div>

              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-select
                  ref="rfsem"
                  outlined
                  label="Semester"
                  v-model="sem"
                  name="sem"
                  :options="semOptions"
                  :rules="[myRule]"
                />
              </div>
              <div class="col-xs-12 col-sm-4 col-md-4">
                <q-input
                  ref="rfay"
                  outlined
                  v-model="state.ay"
                  name="ay"
                  label="Academic Year"
                  mask="#### - ####"
                  hint="Year: #### - ####"
                  :rules="inputRules"
                />
              </div>
            </div>
          </div>

          <q-stepper-navigation>
            <q-btn color="primary" label="Submit" type="submit" />

            <q-btn
              flat
              @click="step = 4"
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
const rfgradcourse = ref(null);

const rfgrant = ref(null);
const rflvl = ref(null);
const rfscholarprog = ref(null);
const rfcouncil = ref(null);
const rfgradschool = ref(null);
const rfschoolregion = ref(null);
const rfscholartype = ref(null);
const rfsem = ref(null);
const rfay = ref(null);
const rfstartdate = ref(null);
const rfenddate = ref(null);
const rfduration = ref(null);
const rffield = ref(null);
const rfobligation = ref(null);
const rfundergrad = ref(null);
const rfcomp = ref(null);
const rftitle = ref(null);
const rfavailment = ref(null);
const rfremarks = ref(null);

// Select Declaration
const province = ref(null);
const entry = ref(null);
const grant = ref(null);
const level = ref(null);
const scholarprog = ref(null);
const council = ref(null);
const gradcourse = ref(null);
const gradschool = ref(null);

const scholartype = ref(null);
const sem = ref(null);

const field = ref(null);
const undergrad = ref(null);

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

  schoolregion: "",

  comp: "",

  startdate: "",
  enddate: "",
  duration: "",
  obligation: "",
  title: "",
  ay: "",
  availment: "",
  remarks: "",
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

const LvlOptions = [
  { label: "MS", value: "MS" },
  { label: "FACULTY", value: "FACULTY" },
  { label: "PHD", value: "PHD" },
];

const scholarprogOptions = [
  { label: "ASTHRDP", value: "ASTHRDP" },
  { label: "SCI-ED CONSORTIUM", value: "SCI-ED CONSORTIUM" },
  { label: "HRDP", value: "HRDP" },
  { label: "SEC", value: "SEC" },
  { label: "ASTHRDP-NSC", value: "ASTHRDP-NSC" },
  { label: "ERDT", value: "ERDT" },
  { label: "SCI-ED", value: "SCI-ED" },
];

const scholartypeOptions = [
  { label: "FULL TIME", value: "FULL TIME" },
  { label: "PART TIME", value: "PART TIME" },
];

const semOptions = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "SUMMER", value: "SUMMER" },
];

const fieldOptions = [
  { label: "APPLIED SCIENCES", value: "APPLIED SCIENCES" },
  { label: "BASIC SCIENCES", value: "BASIC SCIENCES" },
  { label: "ENGINEERING", value: "ENGINEERING" },
  { label: "SCIENCE EDUCATION", value: "SCIENCE EDUCATION" },
];

const undergradOptions = [
  { label: "RA 7687", value: "RA 7687" },
  {
    label: "OTHER UNDERGRAD SCHOLARSHIP",
    value: "OTHER UNDERGRAD SCHOLARSHIP",
  },
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
  rffname.value.validate();
  rflname.value.validate();
  rfspasid.value.validate();

  if (
    rfcontact.value.hasError ||
    rfemail.value.hasError ||
    rfbirth.value.hasError ||
    rfsname.value.hasError ||
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

const step4 = () => {
  rfgradschool.value.validate();
  rfgradcourse.value.validate();
  rfschool.value.validate();
  rfcourse.value.validate();

  if (
    rfgradschool.value.hasError ||
    rfgradcourse.value.hasError ||
    rfschool.value.hasError ||
    rfcourse.value.hasError
  ) {
  } else {
    step.value = 4;
  }
};

const step5 = () => {
  rftitle.value.validate();
  rfstartdate.value.validate();
  rfenddate.value.validate();
  rfduration.value.validate();
  rffield.value.validate();
  rfobligation.value.validate();
  rfundergrad.value.validate();
  rfremarks.value.validate();

  if (
    rftitle.value.hasError ||
    rfstartdate.value.hasError ||
    rfenddate.value.hasError ||
    rfduration.value.hasError ||
    rffield.value.hasError ||
    rfobligation.value.hasError ||
    rfundergrad.value.hasError ||
    rfremarks.value.hasError
  ) {
  } else {
    step.value = 5;
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

// Showing Grad School
var gradschooloption2 = [];
const gradschoolOptions = ref(gradschooloption2);

onMounted(() => {
  populategradSchool();
});

const populategradSchool = () => {
  axios.get("/read.php?gradSchool").then((response) => {
    gradschooloption2 = response.data;

    console.log(response.data.school_region);
  });
};

const filterGradschool = (val, update) => {
  if (val === "") {
    update(() => {
      gradschoolOptions.value = gradschooloption2;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    gradschoolOptions.value = gradschooloption2.filter((option) => {
      return option.label.toLowerCase().includes(needle);
    });
  });
};

// Showing GradSchool Data

onMounted(() => {
  populateschool();
});

const populateschool = () => {
  state.schoolregion = gradschool.value?.school_region;
};

// Showing GradSchool Courses

const gradcourseOptions = ref();

onMounted(() => {
  populateschoolCourses();
});

const populateschoolCourses = () => {
  axios.get("/read.php?gradSchoolCourses").then(function (response) {
    gradcourseOptions.value = response.data;
  });
};

// Showing Grants Courses

const grantOptions = ref();

onMounted(() => {
  populategrants();
});

const populategrants = () => {
  axios.get("/read.php?grant").then(function (response) {
    grantOptions.value = response.data;
  });
};

// Showing Council

const councilOptions = ref();

onMounted(() => {
  populatecouncil();
});

const populatecouncil = () => {
  axios.get("/read.php?council").then(function (response) {
    councilOptions.value = response.data;
  });
};

const submitScholar = () => {
  rfentry.value.validate();
  rfyear.value.validate();
  rfbatch.value.validate();
  rfgrant.value.validate();
  rflvl.value.validate();
  rfcomp.value.validate();
  rfscholarprog.value.validate();
  rfcouncil.value.validate();
  rfscholartype.value.validate();
  rfsem.value.validate();
  rfavailment.value.validate();
  rfay.value.validate();

  if (
    rfentry.value.hasError ||
    rfyear.value.hasError ||
    rfbatch.value.hasError ||
    rfgrant.value.hasError ||
    rflvl.value.hasError ||
    rfcomp.value.hasError ||
    rfscholarprog.value.hasError ||
    rfcouncil.value.hasError ||
    rfscholartype.value.hasError ||
    rfsem.value.hasError ||
    rfavailment.value.hasError ||
    rfay.value.hasError
  ) {
    // error
  } else {
    var formData = new FormData(document.getElementById("scholarForm"));

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

    formData.append("school", state.school);
    formData.append("course", state.course);
    formData.append("gradschool", gradschool.value?.label);
    formData.append("gradcourse", gradcourse.value);
    formData.append("schoolregion", state.schoolregion);

    formData.append("title", state.title);
    formData.append("startdate", state.startdate);
    formData.append("enddate", state.enddate);
    formData.append("duration", state.duration);
    formData.append("field", field.value);
    formData.append("obligation", state.obligation);
    formData.append("undergrad", undergrad.value);
    formData.append("remarks", state.remarks);

    formData.append("spasid", state.spasid);
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
