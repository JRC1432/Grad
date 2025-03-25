<template>
  <div class="q-pa-md">
    <div class="row justify-end">
      <q-btn
        label="Batch Upload"
        color="primary"
        @click="bulk = true"
        icon="dynamic_feed"
      />
      <q-dialog v-model="bulk" persistent>
        <q-card
          style="min-width: 500px; width: 500px"
          class="rounded-borders-20"
        >
          <q-toolbar>
            <IconFileTypeCsv :size="30" stroke-width="2" />

            <q-toolbar-title
              ><span class="text-weight-bold" color="primary">CSV</span> File
              Upload</q-toolbar-title
            >

            <q-btn flat round dense icon="close" v-close-popup />
          </q-toolbar>

          <q-card-section>
            <q-form id="bulkUploadForm" @submit.prevent.stop="bulkUploads">
              <q-card class="my-card rounded-borders-20">
                <q-card-section class="bg-primary text-white">
                  <div class="text-h6">Upload Your File Here</div>
                  <div class="text-subtitle2">
                    Only CSV Documents are Allowed
                  </div>
                </q-card-section>
                <div class="q-pa-md">
                  <q-file
                    ref="rfBulkUpload"
                    filled
                    v-model="bulkuploadScholars"
                    name="bulkuploadScholars"
                    label="*CSV FILES ONLY"
                    color="primary"
                    clearable
                    counter
                    :rules="[fileRules]"
                  >
                    <template v-slot:prepend>
                      <q-icon name="attach_file" />
                    </template>
                  </q-file>
                </div>
              </q-card>
              <br />
              <div class="row justify-end">
                <q-btn type="submit" label="Upload" color="primary" />
              </div>
            </q-form>
          </q-card-section>

          <q-separator />
        </q-card>
      </q-dialog>
    </div>
  </div>

  <form id="scholarForm" @submit.prevent.stop="submitScholar">
    <div class="q-pa-md">
      <!-- Step 1 -->

      <q-stepper
        class="rounded-borders-20"
        v-model="step"
        ref="stepper"
        alternative-labels
        color="primary"
        animated
        flat
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
                  hide-bottom-space
                  v-model="state.lastname"
                  label="Last Name"
                  name="lastname"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-3 col-md-3">
                <q-input
                  ref="rffname"
                  hide-bottom-space
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
                  hide-bottom-space
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
                  hide-bottom-space
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
                  hide-bottom-space
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
                  hide-bottom-space
                  v-model="state.emailadd"
                  name="emailadd"
                  label="E-mail Address"
                  type="email"
                  :rules="[
                    (val) => isValidEmail(val) || 'Invalid email address',
                    checkEmailAdd,
                  ]"
                />
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfcontact"
                  outlined
                  hide-bottom-space
                  v-model="state.contact"
                  name="contact"
                  label="Phone"
                  mask="(####) ### - ####"
                  :rules="inputRules"
                />
              </div>

              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  ref="rfAlternateEmail"
                  outlined
                  hide-bottom-space
                  v-model="state.AlternateEmail"
                  name="alternateEmail"
                  label="Alternate E-mail Address"
                  type="email"
                  :rules="[
                    (val) => isValidAlterEmail(val) || 'Invalid email address',
                    checkAlterEmailAdd,
                  ]"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <span class="text-primary">SEX: </span>
                <div class="row justify-start">
                  <q-option-group
                    :options="sexoptions"
                    type="radio"
                    v-model="state.gender"
                    name="gender"
                    inline
                    hide-bottom-space
                  />
                </div>
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
                  hide-bottom-space
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
                  hide-bottom-space
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
                  hide-bottom-space
                  v-model="state.street"
                  name="street"
                  label="Compound/Street/Phase/Purok"
                  :rules="inputRules"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  outlined
                  hide-bottom-space
                  v-model="state.subdivision"
                  name="subdivision"
                  label="Subdivision/Village"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-input
                  outlined
                  hide-bottom-space
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
                <q-select
                  ref="rfcourse"
                  outlined
                  hide-bottom-space
                  map-options
                  use-input
                  emit-value
                  input-debounce="0"
                  label="Previous Course"
                  v-model="course"
                  name="course"
                  :options="underGradCoursesoption"
                  @filter="filterUndergradCourse"
                  behavior="menu"
                  :rules="[myRule]"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-select
                  ref="rfschool"
                  outlined
                  hide-bottom-space
                  map-options
                  use-input
                  emit-value
                  input-debounce="0"
                  label="Previous School"
                  v-model="school"
                  name="school"
                  :options="underGradSchooloptions"
                  @filter="filterUndergradSchool"
                  behavior="menu"
                  :rules="[myRule]"
                />
              </div>
              <div class="col-xs-12 col-sm-6 col-md-6">
                <q-select
                  ref="rfscprog"
                  v-model="scprog"
                  name="scprog"
                  emit-value
                  outlined
                  hide-bottom-space
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
                  hide-bottom-space
                  label="Units"
                  type="number"
                  :rules="inputRules"
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
                      v-model="state.newregion"
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
                      hide-bottom-space
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
                      hide-bottom-space
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
                      hide-bottom-space
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
                      hide-bottom-space
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
                      hide-bottom-space
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
                      hide-bottom-space
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
                      hide-bottom-space
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
                      outlined
                      hide-bottom-space
                      map-options
                      use-input
                      input-debounce="0"
                      label="Monitoring Council/ University"
                      v-model="council"
                      name="council"
                      :options="councilOptions"
                      @filter="filterCouncil"
                      behavior="menu"
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-select
                      ref="rfgradschool"
                      outlined
                      hide-bottom-space
                      map-options
                      emit-value
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
                      hide-bottom-space
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
                      hide-bottom-space
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
                      hide-bottom-space
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
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-12">
                    <q-input
                      ref="rfyear"
                      outlined
                      v-model="yraward"
                      name="yraward"
                      label="Year of Award"
                      mask="####"
                      readonly
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-select
                      ref="rfscholartype"
                      emit-value
                      outlined
                      hide-bottom-space
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
                      ref="rfobligation"
                      outlined
                      hide-bottom-space
                      v-model="state.obligation"
                      name="obligation"
                      label="Service Obligation"
                      type="number"
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

                  <div class="col-xs-12">
                    <q-input
                      ref="rfhonors"
                      outlined
                      v-model="state.honors"
                      name="honors"
                      label="Honors/ Awards Received"
                    />
                  </div>
                  <div class="col-xs-12">
                    <q-input
                      outlined
                      v-model="state.dissemination"
                      name="dissemination"
                      label="Dissemination Grant"
                    />
                  </div>
                  <div class="col-xs-12">
                    <q-input
                      outlined
                      v-model="state.research"
                      name="research"
                      label="Research Grant"
                    />
                  </div>
                  <div class="col-xs-12">
                    <q-input
                      ref="rfremarks"
                      outlined
                      hide-bottom-space
                      v-model="state.remarks"
                      name="remarks"
                      label="Remarks"
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
import { ref, reactive, onMounted, inject, handleError, watch } from "vue";
import { useQuasar, QSpinnerGears } from "quasar";
import Swal from "sweetalert2";
import { IconFileTypeCsv } from "@tabler/icons-vue";
import router from "../router";

const $q = useQuasar();

const axios = inject("$axios");
const user = inject("$user");

const step = ref(1);

const bulk = ref(false);

//Validation Declaration

const rfcontact = ref(null);
const rfemail = ref(null);
const rfAlternateEmail = ref(null);
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
const rfBulkUpload = ref(null);

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
const gradschool = ref("");

const course = ref(null);
const school = ref(null);

const scprog = ref(null);
const availment = ref(null);

const scholartype = ref("");

const ay = ref("");
const yraward = ref("");
const spasid = ref("");
const region = ref("");
const bulkuploadScholars = ref(null);

// Get Year Now
const currentYear = ref(null);

onMounted(() => {
  getCurrentYear();
});

const getCurrentYear = () => {
  const currentDate = new Date();
  currentYear.value = currentDate.getFullYear();
};

watch(scholartype, async (newscholarType) => {
  if (newscholarType.includes("PART TIME") && state.obligation == "0") {
    state.obligation = "0";
  } else if (newscholarType.includes("PART TIME")) {
    state.obligation = "1";
  } else {
    state.obligation = "";
  }
});

// Reactive states

const state = reactive({
  lastname: "",
  firstname: "",
  midname: "",
  suffixname: "",
  emailadd: "",
  AlternateEmail: "",
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

  units: "",
  field: "",

  batch: "",
  comp: "100m",
  schoolregion: "",
  newregion: "",

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

const fileRules = (val) => {
  if (val === null) {
    return "Please Select a File!";
  }
  return true;
};

const isValidEmail = () => {
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  return regex.test(state.emailadd);
};

const isValidAlterEmail = () => {
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  return regex.test(state.AlternateEmail);
};

// Validation for Email Add

const checkEmailAdd = async (value) => {
  const formData = new FormData(document.getElementById("scholarForm"));
  formData.append("emailadd", state.emailadd);
  try {
    const response = await axios.post("/read.php?checkEmails", formData);
    if (response.data === true) {
      // Do something if username is available
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("This email address is already been taken!!!");
        }, 1500);
      });
    }
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
  }
};

// Validation for Alter Email Add

const checkAlterEmailAdd = async (value) => {
  const formData = new FormData(document.getElementById("scholarForm"));
  formData.append("alternateEmail", state.AlternateEmail);
  try {
    const response = await axios.post("/read.php?checkAlterEmails", formData);
    if (response.data === true) {
      // Do something if username is available
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve("This alternate email address is already been taken!!!");
        }, 1500);
      });
    }
  } catch (error) {
    // Handle any errors
    console.error("Error:", error);
  }
};

// Steppers

const step2 = () => {
  rflname.value.validate();
  rffname.value.validate();
  rfbirth.value.validate();
  rfcontact.value.validate();
  rfemail.value.validate();
  rfAlternateEmail.value.validate();

  if (
    rflname.value.hasError ||
    rffname.value.hasError ||
    rfbirth.value.hasError ||
    rfcontact.value.hasError ||
    rfemail.value.hasError ||
    rfAlternateEmail.value.hasError
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
  rfscprog.value.validate();
  rfunits.value.validate();

  if (
    rfschool.value.hasError ||
    rfcourse.value.hasError ||
    rfscprog.value.hasError ||
    rfunits.value.hasError
  ) {
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

// File Handler

const handleFileChange = (event) => {
  console.log(event);
  const bulkuploadScholar = bulkuploadScholars.value;
  if (bulkuploadScholar) {
    if (bulkuploadScholar.type === "application/pdf") {
      // Handle the selected PDF file
    } else {
      $q.notify({
        color: "negative",
        message: "Please select a CSV File.",
      });
      bulkuploadScholars.value = null;
    }
  }
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

  axios.post("/read.php?addressid", formData).then(function (response) {
    state.municipality = response.data.zmun;
    state.provincecity = response.data.zpro;
    state.barangay = response.data.zbar;
    state.district = response.data.zdis;
    region.value = response.data.zreg;
    state.newregion = response.data.new_region;
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
  // state.schoolregion = gradschool.value?.school_region;

  var formData = new FormData();
  formData.append("schoolId", gradschool.value);

  axios.post("/read.php?gradSchoolFilter", formData).then(function (response) {
    state.obligation = response.data.duration;
    state.schoolregion = response.data.school_region;
  });
};

// Showing UnderGrad Courses
var underGradCoursesoption2 = [];
const underGradCoursesoption = ref(underGradCoursesoption2);

onMounted(() => {
  populateUndergradCourse();
});

const populateUndergradCourse = () => {
  axios.get("/read.php?underGradCourses").then((response) => {
    underGradCoursesoption2 = response.data;
  });
};

const filterUndergradCourse = (val, update) => {
  if (val === "") {
    update(() => {
      underGradCoursesoption.value = underGradCoursesoption2;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    underGradCoursesoption.value = underGradCoursesoption2.filter((option) => {
      return option.label.toLowerCase().includes(needle);
    });
  });
};

// Showing UnderGrad School
var underGradSchooloptions2 = [];
const underGradSchooloptions = ref(underGradSchooloptions2);

onMounted(() => {
  populateUndergradSchool();
});

const populateUndergradSchool = () => {
  axios.get("/read.php?underGradSchool").then((response) => {
    underGradSchooloptions2 = response.data;
  });
};

const filterUndergradSchool = (val, update) => {
  if (val === "") {
    update(() => {
      underGradSchooloptions.value = underGradSchooloptions2;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    underGradSchooloptions.value = underGradSchooloptions2.filter((option) => {
      return option.label.toLowerCase().includes(needle);
    });
  });
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

// Showing GradSchool Data

// onMounted(() => {
//   populateGradSchoolFilter();
// });

// const populateGradSchoolFilter = () => {
//   var formData = new FormData();
//   formData.append("schoolName", gradschool.value);
//   console.log(gradschool.value);

//   axios.post("/read.php?gradSchoolFilter", formData).then(function (response) {
//     state.obligation = response.data.newDuration;
//   });
// };

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

var councilOptions2 = [];
const councilOptions = ref(councilOptions2);

onMounted(() => {
  populatecouncil();
});

const populatecouncil = () => {
  axios.get("/read.php?council").then(function (response) {
    councilOptions2 = response.data;
  });
};

const filterCouncil = (val, update) => {
  if (val === "") {
    update(() => {
      councilOptions.value = councilOptions2;
    });
    return;
  }
  update(() => {
    const needle = val.toLowerCase();
    councilOptions.value = councilOptions2.filter((option) => {
      return option.label.toLowerCase().includes(needle);
    });
  });
};

const submitScholar = () => {
  rfscholarprog.value.validate();
  rfentry.value.validate();
  rfay.value.validate();
  rfbatch.value.validate();
  rfgrant.value.validate();
  rflvl.value.validate();
  rfcomp.value.validate();
  rfcouncil.value.validate();
  rfgradschool.value.validate();
  rfgradcourse.value.validate();
  // rffield.value.validate();
  rfduration.value.validate();
  rfavailment.value.validate();
  rfstats.value.validate();
  rfsem.value.validate();
  rfyear.value.validate();
  rfremarks.value.validate();
  rfobligation.value.validate();
  rfscholartype.value.validate();

  if (
    rfscholarprog.value.hasError ||
    rfentry.value.hasError ||
    rfay.value.hasError ||
    rfbatch.value.hasError ||
    rfgrant.value.hasError ||
    rflvl.value.hasError ||
    rfcomp.value.hasError ||
    rfcouncil.value.hasError ||
    rfgradschool.value.hasError ||
    rfgradcourse.value.hasError ||
    // rffield.value.hasError ||
    rfduration.value.hasError ||
    rfavailment.value.hasError ||
    rfstats.value.hasError ||
    rfsem.value.hasError ||
    rfyear.value.hasError ||
    rfremarks.value.hasError ||
    rfobligation.value.hasError ||
    rfscholartype.value.hasError
  ) {
    // error
  } else {
    var formData = new FormData(document.getElementById("scholarForm"));

    formData.append("lastname", state.lastname);
    formData.append("firstname", state.firstname);
    formData.append("midname", state.midname);
    formData.append("suffixname", state.suffixname);
    formData.append("emailadd", state.emailadd);
    formData.append("alternateEmail", state.AlternateEmail);
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

    formData.append("school", school.value);
    formData.append("course", course.value);
    formData.append("scprog", scprog.value);
    formData.append("units", state.units);

    // formData.append("spasid", state.spasid);
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

const bulkFire = () => {
  let timerInterval;
  Swal.fire({
    title: "UUPLOADING SCHOLARS INFORMSTIONS!",
    html: "In Progress.......... <b></b> milliseconds.",
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
      console.log("I was closed by the timer");
      Swal.fire("UPLOADED SUCCESSFULLY!", "", "success");
    }
  });
};

const bulkUploads = () => {
  rfBulkUpload.value.validate();

  if (rfBulkUpload.value.hasError) {
    // Error Here
  } else {
    var formData = new FormData(document.getElementById("bulkUploadForm"));

    formData.append("usercreator", user.username);
    formData.append("authid", user.id);

    axios.post("/create.php?bulkUpload", formData).then(function (response) {
      if (response.data == true) {
        bulk.value = false;
        bulkFire();
      } else {
        alert("Error");
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

.rounded-borders-20 {
  border-radius: 20px !important; /* Adjust the radius as needed */
}
</style>
