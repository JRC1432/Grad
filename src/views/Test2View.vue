<template>
  <q-card style="min-width: 1000px; width: 1000px">
    <q-card-section>
      <div class="text-h6">Edit Scholar Details</div>
    </q-card-section>

    <q-separator />

    <q-card-section class="scroll">
      <form id="editscholarForm" @submit.prevent.stop="editScholar">
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
                      ref="refspas"
                      rounded
                      outlined
                      v-model="state.upspasid"
                      label="SPAS ID:"
                      style="max-width: 200px"
                      name="upspasid"
                      mask="A - #### - ## - #####"
                      :rules="inputRules"
                    />
                  </div>

                  <div class="col-md-3">
                    <q-input
                      ref="reflname"
                      rounded
                      outlined
                      v-model="state.uplastname"
                      label="Last Name"
                      name="uplastname"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-3 col-md-3">
                    <q-input
                      ref="reffname"
                      rounded
                      outlined
                      v-model="state.upfirstname"
                      label="First Name"
                      name="upfirstname"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-3 col-md-3">
                    <q-input
                      ref="refmname"
                      rounded
                      outlined
                      v-model="state.upmidname"
                      label="Middle Name"
                      name="upmidname"
                      :rules="inputRules"
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
                      ref="refbirth"
                      rounded
                      outlined
                      v-model="state.upbirthdate"
                      name="upbirthdate"
                      type="date"
                      label="Birthday"
                      :rules="inputRules"
                    />
                  </div>

                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="refmail"
                      rounded
                      outlined
                      v-model="state.upemailadd"
                      name="upemailadd"
                      label="E-mail Address"
                      type="email"
                      :rules="inputRules"
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
                      ref="refcontact"
                      rounded
                      outlined
                      v-model="state.upcontact"
                      name="upcontact"
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
                      ref="refzip"
                      rounded
                      outlined
                      v-model="upprovince"
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
                      ref="refhousenum"
                      rounded
                      outlined
                      v-model="state.uphousenum"
                      name="uphousenum"
                      label="Block Lot/House No."
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="refstreet"
                      rounded
                      outlined
                      v-model="state.upstreet"
                      name="upstreet"
                      label="Compound/Street/Phase/Purok"
                      :rules="inputRules"
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
                      ref="refcourse"
                      rounded
                      outlined
                      v-model="state.upcourse"
                      name="upcourse"
                      label="Previous Course"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="refschool"
                      rounded
                      outlined
                      v-model="state.upschool"
                      name="upschool"
                      label="Previous School"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-select
                      ref="refentry"
                      rounded
                      outlined
                      label="Entry Type"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      v-model="upentry"
                      name="upentry"
                      :options="entryType"
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="rfyraward"
                      rounded
                      outlined
                      v-model="state.upyearaward"
                      name="upyraward"
                      label="Year of Award"
                      mask="####"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="refbatch"
                      rounded
                      outlined
                      v-model="state.upbatch"
                      name="upbatch"
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
    </q-card-section>

    <q-separator />

    <q-card-actions align="right">
      <q-btn flat label="Cancel" color="primary" v-close-popup />
    </q-card-actions>
  </q-card>
</template>
<script></script>
