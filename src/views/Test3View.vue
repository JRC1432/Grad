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
                <q-select
                  ref="rfemail"
                  v-model="state.emailadd"
                  name="emailadd[]"
                  label="Multiple E-mail Address"
                  outlined
                  use-input
                  use-chips
                  multiple
                  hide-dropdown-icon
                  type="email"
                  input-debounce="0"
                  new-value-mode="add-unique"
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
                  v-model="region"
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

        <q-step
          :name="3"
          title="Previous School"
          icon="school"
          :done="step > 3"
        >
          <div class="col-xs-12 col-sm-6">
            <div class="q-col-gutter-md row items-start">
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
                <q-select
                  ref="rfscprog"
                  v-model="scprog"
                  name="scprog"
                  emit-value
                  outlined
                  label="Scholarship Program"
                  transition-show="flip-up"
                  transition-hide="flip-down"
                  :options="ScholarshipProgram"
                  :rules="[myRule]"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfunits"
                  v-model="state.units"
                  name="units"
                  outlined
                  label="Units"
                  type="number"
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
          title="Scholarship Information"
          icon="workspace_premium"
          :done="step > 4"
        >
          <q-card flat bordered class="col-xs-12">
            <q-card-section>
              <div class="text-h6 text-primary">SCHOLARSHIP INFORMATION</div>
            </q-card-section>

            <q-separator inset />

            <!-- <pre>
SPAS ID: {{ level }} - {{ currentYear }} - {{ region }} - {{ yraward }}</pre
            > -->

            <q-card-section>
              <div class="col-xs-12 col-sm-6">
                <div class="q-col-gutter-md row items-start">
                  <div class="col-xs-8 col-sm-2 col-md-2">
                    <q-input
                      ref="rfspasid"
                      outlined
                      v-model="level"
                      label="SPAS ID:"
                      name="spasLvl"
                      readonly
                    />
                  </div>

                  <div class="col-xs-8 col-sm-2 col-md-2">
                    <q-input
                      ref="rfspasid"
                      outlined
                      v-model="currentYear"
                      name="spasYear"
                      readonly
                    />
                  </div>
                  <div class="col-xs-8 col-sm-2 col-md-2">
                    <q-input
                      ref="rfspasid"
                      outlined
                      v-model="region"
                      name="spasRegion"
                      readonly
                    />
                  </div>
                  <div class="col-xs-8 col-sm-2 col-md-2">
                    <q-input
                      ref="rfspasid"
                      outlined
                      v-model="yraward"
                      name="spasAy"
                      readonly
                    />
                  </div>

                  <div class="col-xs-12">
                    <q-select
                      ref="rfscholarprog"
                      outlined
                      emit-value
                      label="Scholarship Program"
                      v-model="scholarprog"
                      name="scholarprog"
                      :options="scholarprogOptions"
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                      ref="rfentry"
                      emit-value
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
                      ref="rfay"
                      outlined
                      v-model="ay"
                      name="ay"
                      label="Academic Year"
                      mask="#### - ####"
                      hint="Year: #### - ####"
                      :rules="inputRules"
                      @update:model-value="yraward = ay.substring(0, 4)"
                    />
                  </div>

                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-input
                      ref="rfbatch"
                      outlined
                      v-model="state.batch"
                      name="batch"
                      label="Batch"
                      type="number"
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
                      emit-value
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
                      readonly
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <br />

          <q-card flat bordered class="col-xs-12">
            <q-card-section>
              <div class="text-h6 text-primary">SCHOOL</div>
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <div class="col-xs-12 col-sm-6">
                <div class="q-col-gutter-md row items-start">
                  <div class="col-xs-12">
                    <q-select
                      ref="rfcouncil"
                      emit-value
                      map-options
                      outlined
                      label="Monitoring Council/ University"
                      v-model="council"
                      name="council"
                      :options="councilOptions"
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-select
                      ref="rfgradschool"
                      outlined
                      map-options
                      use-input
                      input-debounce="0"
                      label="Graduate School"
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
                    <q-input
                      outlined
                      readonly
                      v-model="state.schoolregion"
                      name="schoolregion"
                      label="School Region"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-select
                      ref="rfgradcourse"
                      outlined
                      map-options
                      use-input
                      input-debounce="0"
                      label="Graduate Course"
                      v-model="gradcourse"
                      name="gradcourse"
                      :options="gradcourseOptions"
                      @filter="filterGradCourse"
                      behavior="menu"
                      @update:model-value="populateField"
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      outlined
                      label="Field"
                      v-model="state.field"
                      name="field"
                      readonly
                    />
                  </div>
                  <div class="col-xs-12">
                    <q-input
                      ref="rfduration"
                      outlined
                      v-model="state.duration"
                      name="duration"
                      label="Duration"
                      :rules="inputRules"
                    />
                  </div>

                  <div class="col-xs-12">
                    <q-list bordered class="rounded-borders">
                      <q-expansion-item
                        expand-separator
                        icon="school"
                        label="Foreign"
                        caption="Scholar"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="col-xs-12 col-sm-6">
                              <div class="q-col-gutter-md row items-start">
                                <div class="col-xs-12 col-sm-1 col-md-1">
                                  <q-input
                                    outlined
                                    v-model="state.fsemone"
                                    name="fsemone"
                                    label="Sem"
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-5 col-md-5">
                                  <q-input
                                    outlined
                                    v-model="state.fstartdate"
                                    name="fstartdate"
                                    type="date"
                                    label="Date of Award"
                                    no-placeholder
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-1 col-md-1">
                                  <q-input
                                    outlined
                                    v-model="state.fsemtwo"
                                    name="fsemtwo"
                                    label="Sem"
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-5 col-md-5">
                                  <q-input
                                    outlined
                                    v-model="state.fenddate"
                                    name="fenddate"
                                    type="date"
                                    label="Date Expected to Graduate"
                                  />
                                </div>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>

                      <q-expansion-item
                        expand-separator
                        icon="school"
                        label="Local"
                        caption="Scholar"
                      >
                        <q-card>
                          <q-card-section>
                            <div class="col-xs-12 col-sm-6">
                              <div class="q-col-gutter-md row items-start">
                                <div class="col-xs-12 col-sm-1 col-md-1">
                                  <q-input
                                    outlined
                                    v-model="state.lsemone"
                                    name="lsemone"
                                    label="Sem"
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-5 col-md-5">
                                  <q-input
                                    outlined
                                    v-model="state.lstartdate"
                                    name="lstartdate"
                                    label="Date of Award"
                                    mask="#### - ####"
                                    hint="Year: #### - ####"
                                  />
                                </div>
                                <div class="col-xs-12 col-sm-1 col-md-1">
                                  <q-input
                                    outlined
                                    v-model="state.lsemtwo"
                                    name="lsemtwo"
                                    label="Sem"
                                  />
                                </div>

                                <div class="col-xs-12 col-sm-5 col-md-5">
                                  <q-input
                                    outlined
                                    v-model="state.lenddate"
                                    name="lenddate"
                                    label="Date Expected To Graduate"
                                    mask="#### - ####"
                                    hint="Year: #### - ####"
                                  />
                                </div>
                              </div>
                            </div>
                          </q-card-section>
                        </q-card>
                      </q-expansion-item>
                    </q-list>
                  </div>

                  <!-- <div class="col-xs-12">
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
                  </div> -->
                </div>
              </div>
            </q-card-section>
          </q-card>

          <br />

          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6 text-primary">
                Other Scholarship Information
              </div>
            </q-card-section>

            <q-separator inset />

            <q-card-section>
              <div class="col-xs-12 col-sm-6">
                <div class="q-col-gutter-md row items-start">
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                      ref="rfavailment"
                      emit-value
                      map-options
                      outlined
                      v-model="availment"
                      name="availment"
                      label="Availment"
                      :options="availmentOptions"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-input
                      ref="rfstats"
                      outlined
                      label="Status"
                      v-model="availment"
                      name="status"
                      readonly
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-input
                      ref="rfsem"
                      outlined
                      label="Semester"
                      v-model="state.batch"
                      name="sem"
                      readonly
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-input
                      ref="rfyear"
                      outlined
                      v-model="yraward"
                      name="yraward"
                      label="Year of Award"
                      mask="####"
                      readonly
                      :rules="inputRules"
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

                  <div class="col-xs-12">
                    <q-input
                      ref="rfobligation"
                      outlined
                      v-model="state.obligation"
                      name="obligation"
                      label="Service Obligation"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12">
                    <q-input
                      outlined
                      v-model="state.title"
                      name="title"
                      label="Title of Research"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-select
                      ref="rfscholartype"
                      emit-value
                      outlined
                      label="Scholar Type"
                      v-model="scholartype"
                      name="scholartype"
                      :options="scholartypeOptions"
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      outlined
                      v-model="state.graddate"
                      name="graddate"
                      label="Graduation Date"
                      mask="#### - ##"
                      hint="Year: Yr - Month"
                    />
                  </div>
                  <div class="col-xs-12">
                    <q-input
                      ref="rfhonors"
                      outlined
                      v-model="state.honors"
                      name="honors"
                      label="Honors/ Awards Received"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12">
                    <q-input
                      outlined
                      v-model="state.dissemination"
                      name="dissemination"
                      label="Dissemination Grant"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12">
                    <q-input
                      outlined
                      v-model="state.research"
                      name="research"
                      label="Research Grant"
                      :rules="inputRules"
                    />
                  </div>
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-stepper-navigation>
            <!-- <q-btn @click="step5" color="primary" label="Continue" /> -->
            <q-btn color="primary" label="Submit" type="submit" />

            <q-btn
              flat
              @click="step = 3"
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

const rfschool = ref(null);
const rfcourse = ref(null);
const rfscprog = ref(null);
const rfunits = ref(null);

const rfyear = ref(null);
const rfentry = ref(null);
const rfbatch = ref(null);
const rfgrant = ref(null);
const rflvl = ref(null);
const rfcomp = ref(null);
const rfscholarprog = ref(null);
const rfcouncil = ref(null);

const rfgradschool = ref(null);
const rfgradcourse = ref(null);
const rfavailment = ref(null);
const rfstats = ref(null);
const rfsem = ref(null);
const rfay = ref(null);
const rfduration = ref(null);
const rfremarks = ref(null);
const rffield = ref(null);
const rfobligation = ref(null);

const rfscholartype = ref(null);

const rfhonors = ref(null);

const rfschoolregion = ref(null);

// const rfundergrad = ref(null);

// Select Declaration

const province = ref(null);
const entry = ref(null);
const grant = ref(null);
const level = ref(null);
const scholarprog = ref(null);
const council = ref(null);
const gradcourse = ref(null);
const gradschool = ref(null);

const scprog = ref(null);
const availment = ref(null);

const scholartype = ref(null);

const ay = ref("");
const yraward = ref("");
const spasid = ref("");
const region = ref("");

// Get Year Now
const currentYear = ref(null);

onMounted(() => {
  getCurrentYear();
});

const getCurrentYear = () => {
  const currentDate = new Date();
  currentYear.value = currentDate.getFullYear();
};

// Reactive states

const state = reactive({
  lastname: "",
  firstname: "",
  midname: "",
  suffixname: "",
  emailadd: null,
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

  course: "",
  school: "",
  units: "",
  field: "",

  batch: "",
  comp: "100m",
  schoolregion: "",

  fsemone: "",
  fstartdate: "",
  fsemtwo: "",
  fenddate: "",
  lsemone: "",
  lstartdate: "",
  lsemtwo: "",
  lenddate: "",

  status: "",

  duration: "",
  remarks: "",
  title: "",
  obligation: "",
  graddate: "",
  honors: "",
  dissemination: "",
  research: "",
});

// SELECT OPTIONS

const sexoptions = [
  { label: "Male", value: "M", color: "primary" },
  { label: "Female", value: "F", color: "primary" },
];

const entryType = [
  { label: "NEW", value: "NEW" },
  { label: "LATERAL", value: "LATERAL" },
  { label: "RESIDENTIAL", value: "RESIDENTIAL" },
];

const ScholarshipProgram = [
  { label: "RA 7687", value: "RA 7687" },
  { label: "MERIT", value: "MERIT" },
];

const LvlOptions = [
  { label: "MS", value: "MS" },
  { label: "MSPHD", value: "MSPHD" },
  { label: "PHD", value: "PHD" },
];

const scholarprogOptions = [
  { label: "ASTHRDP", value: "ASTHRDP" },
  { label: "CBPSME", value: "CBPSME" },
  { label: "HRDP", value: "HRDP" },
  { label: "ASTHRDP-NSC", value: "ASTHRDP-NSC" },
  { label: "ERDT", value: "ERDT" },
  { label: "SCI-ED", value: "SCI-ED" },
];

const scholartypeOptions = [
  { label: "FULL TIME", value: "FULL TIME" },
  { label: "PART TIME", value: "PART TIME" },
];

// const fieldOptions = [
//   { label: "APPLIED SCIENCES", value: "APPLIED SCIENCES" },
//   { label: "BASIC SCIENCES", value: "BASIC SCIENCES" },
//   { label: "ENGINEERING", value: "ENGINEERING" },
//   { label: "SCIENCE EDUCATION", value: "SCIENCE EDUCATION" },
// ];

const availmentOptions = [
  { label: "NEW", value: "NEW" },
  { label: "DEFER", value: "DEFER" },
  { label: "NOT AVAILING", value: "NOT AVAILING" },
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
  // rfspasid.value.validate();

  if (
    rfcontact.value.hasError ||
    rfemail.value.hasError ||
    rfbirth.value.hasError ||
    rfsname.value.hasError ||
    rffname.value.hasError ||
    rflname.value.hasError
    // rfspasid.value.hasError
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
  rfschool.value.validate();
  rfcourse.value.validate();

  if (rfschool.value.hasError || rfcourse.value.hasError) {
  } else {
    step.value = 4;
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
    region.value = response.data.zreg;
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
var gradcourseOptions2 = [];
const gradcourseOptions = ref(gradcourseOptions2);

onMounted(() => {
  populateschoolCourses();
});

const populateschoolCourses = () => {
  axios.get("/read.php?gradSchoolCourses").then(function (response) {
    gradcourseOptions2 = response.data;
  });
};

const filterGradCourse = (val, update) => {
  if (val === "") {
    update(() => {
      gradcourseOptions.value = gradcourseOptions2;
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    gradcourseOptions.value = gradcourseOptions2.filter((option) => {
      return option.label.toLowerCase().includes(needle);
    });
  });
};

// Showing Field of Courses

onMounted(() => {
  populateField();
});

const populateField = () => {
  state.field = gradcourse.value?.field;
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
  rfgradschool.value.validate();
  rfgradcourse.value.validate();
  rfavailment.value.validate();
  rfstats.value.validate();
  rfsem.value.validate();
  rfay.value.validate();
  rfduration.value.validate();
  rfremarks.value.validate();
  rffield.value.validate();
  rfobligation.value.validate();

  rfscholartype.value.validate();

  rfhonors.value.validate();

  // rfundergrad.value.validate();

  if (
    rfentry.value.hasError ||
    rfyear.value.hasError ||
    rfbatch.value.hasError ||
    rfgrant.value.hasError ||
    rflvl.value.hasError ||
    rfcomp.value.hasError ||
    rfscholarprog.value.hasError ||
    rfcouncil.value.hasError ||
    rfgradschool.value.hasError ||
    rfgradcourse.value.hasError ||
    rfavailment.value.hasError ||
    rfstats.value.hasError ||
    rfsem.value.hasError ||
    rfay.value.hasError ||
    rfduration.value.hasError ||
    rfremarks.value.hasError ||
    rffield.value.hasError ||
    rfobligation.value.hasError ||
    rfscholartype.value.hasError ||
    rfhonors.value.hasError

    // rfundergrad.value.hasError
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
    formData.append("region", region.value);

    formData.append("school", state.school);
    formData.append("course", state.course);

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
<style scoped>
.text-h6 {
  background-color: primary;
  width: 150px;
}
</style>
