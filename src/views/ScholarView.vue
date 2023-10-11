<template>
  <div class="q-pa-md">
    <q-card class="my-card text-black">
      <q-card-section>
        <div class="text-h6 text-primary">View Scholars</div>
        <div class="text-subtitle2 text-primary">Scholars Table</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-card flat>
          <q-tabs
            v-model="tab"
            dense
            class="text-grey"
            active-color="primary"
            indicator-color="primary"
            align="left"
            narrow-indicator
          >
            <q-tab name="oscholars" label="Ongoing" />
            <q-tab name="gradscholars" label="Graduated" />

            <q-tab name="termscholars" label="Terminated" />
          </q-tabs>

          <!-- <q-separator /> -->

          <!-- Ongoing Scholars -->

          <q-tab-panels v-model="tab" animated>
            <q-tab-panel name="oscholars">
              <q-table
                flat
                bordered
                title="Ongoing Scholars"
                :rows="rows"
                :columns="columns"
                row-key="name"
                separator="cell"
                :filter="filter"
              >
                <template v-slot:top-right>
                  <q-input
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

                <template v-slot:body-cell-stats="props">
                  <q-td :props="props">
                    <div>
                      <q-badge color="light-green-4" :label="props.value" />
                    </div>
                  </q-td>
                </template>

                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <q-btn
                      flat
                      class="bi bi-info-circle"
                      color="blue-11"
                      @click="showeditScholar(props)"
                    >
                      <IconListDetails :size="30" stroke-width="2" />
                    </q-btn>
                    <q-btn
                      flat
                      class="bi bi-info-circle"
                      color="amber-5"
                      @click="showDocx(props)"
                    >
                      <IconFileSearch :size="30" stroke-width="2" />
                    </q-btn>
                    <!-- <q-btn
                        flat
                        class="bi bi-info-circle"
                        color="red-5"
                        @click="showdelScholar(props)"
                      >
                        <IconTrash :size="30" stroke-width="2" />
                      </q-btn> -->
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>

            <!-- Graduate Scholars -->

            <q-tab-panel name="gradscholars">
              <q-table
                flat
                bordered
                title="Graduated Scholars"
                :rows="grows"
                :columns="columns"
                row-key="name"
                :filter="gfilter"
                separator="cell"
              >
                <template v-slot:top-right>
                  <q-input
                    dense
                    debounce="300"
                    v-model="gfilter"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>

                <template v-slot:body-cell-stats="props">
                  <q-td :props="props">
                    <div>
                      <q-badge color="blue-4" :label="props.value" />
                    </div>
                  </q-td>
                </template>

                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <q-btn
                      flat
                      class="bi bi-info-circle"
                      color="blue-11"
                      @click="showeditScholar(props)"
                    >
                      <IconListDetails :size="30" stroke-width="2" />
                    </q-btn>
                    <q-btn
                      flat
                      class="bi bi-info-circle"
                      color="amber-5"
                      @click="showDocx(props)"
                    >
                      <IconFileSearch :size="30" stroke-width="2" />
                    </q-btn>
                    <!-- <q-btn
                        flat
                        class="bi bi-info-circle"
                        color="red-5"
                        @click="showdelScholar(props)"
                      >
                        <IconTrash :size="30" stroke-width="2" />
                      </q-btn> -->
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>

            <q-tab-panel name="termscholars">
              <q-table
                flat
                bordered
                title="Terminated Scholars"
                :rows="trows"
                :columns="columns"
                row-key="name"
                :filter="tfilter"
                separator="cell"
              >
                <template v-slot:top-right>
                  <q-input
                    dense
                    debounce="300"
                    v-model="tfilter"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>

                <template v-slot:body-cell-stats="props">
                  <q-td :props="props">
                    <div>
                      <q-badge color="red-4" :label="props.value" />
                    </div>
                  </q-td>
                </template>

                <template v-slot:body-cell-actions="props">
                  <q-td :props="props">
                    <q-btn
                      flat
                      class="bi bi-info-circle"
                      color="blue-11"
                      @click="showeditScholar(props)"
                    >
                      <IconListDetails :size="30" stroke-width="2" />
                    </q-btn>
                    <q-btn
                      flat
                      class="bi bi-info-circle"
                      color="amber-5"
                      @click="showDocx(props)"
                    >
                      <IconFileSearch :size="30" stroke-width="2" />
                    </q-btn>

                    <!-- <q-btn
                        flat
                        class="bi bi-info-circle"
                        color="red-5"
                        @click="showdelScholar(props)"
                      >
                        <IconTrash :size="30" stroke-width="2" />
                      </q-btn> -->
                  </q-td>
                </template>
              </q-table>
            </q-tab-panel>
          </q-tab-panels>
        </q-card>
      </q-card-section>
    </q-card>
  </div>

  <q-dialog v-model="fixed" persistent>
    <q-card style="min-width: 1000px; width: 1000px">
      <q-card-section class="q-gutter-md">
        <div class="text-h6">Update Scholar Details</div>
        <q-space />

        <q-btn flat color="primary" @click="close">
          <IconSquareRoundedX :size="30" stroke-width="2" />
        </q-btn>
      </q-card-section>

      <q-separator />

      <q-card>
        <q-tabs
          v-model="edittab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="sinfo" label="Scholar Information" />
          <q-tab name="cinfo" label="Contact Information" />
          <q-tab name="scinfo" label="School Information" />
          <q-tab name="thesis" label="Thesis Details" />
          <q-tab name="scholarInfo" label="Scholarship Informations" />

          <q-tab name="scdocu" label="Document Upload" />
        </q-tabs>

        <q-separator />

        <!-- Edit Scholar Info -->

        <q-tab-panels v-model="edittab" animated>
          <q-tab-panel name="sinfo">
            <form id="editSinfoForm" @submit.prevent.stop="editSinfo">
              <div class="col-xs-12 col-sm-6">
                <div class="q-col-gutter-md row items-start">
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-input
                      ref="refspas"
                      outlined
                      v-model="state.upspasid"
                      label="SPAS ID:"
                      style="max-width: 200px"
                      name="upspasid"
                      mask="A - #### - ## - #####"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                      ref="refstats"
                      outlined
                      label="Status"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      v-model="upstats"
                      name="upstats"
                      :options="statsoptions"
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                      ref="refsubstats"
                      outlined
                      label="Remarks"
                      transition-show="flip-up"
                      transition-hide="flip-down"
                      v-model="upsubstats"
                      name="upsubstats"
                      :options="subsoptions"
                      :rules="[myRule]"
                    />
                  </div>

                  <div class="col-xs-12 col-sm-3 col-md-3">
                    <q-input
                      ref="reflname"
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
                      outlined
                      v-model="state.upmidname"
                      label="Middle Name"
                      name="upmidname"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-2 col-md-2">
                    <q-input
                      outlined
                      v-model="state.upsuffixname"
                      label="Suffix Name"
                      name="upsuffixname"
                      mask="AAAA"
                    />
                  </div>

                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="refbirth"
                      outlined
                      v-model="state.upbirthdate"
                      name="upbirthdate"
                      type="date"
                      label="Birthday"
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
                </div>
              </div>
              <div class="row justify-end">
                <q-btn flat color="primary" @click="generatePDF" label="Print">
                  <IconFileTypePdf :size="30" stroke-width="2" />
                </q-btn>
                <q-btn type="submit" color="primary" label="Update" />
              </div>
            </form>
          </q-tab-panel>

          <!-- Edit Contact Info -->

          <q-tab-panel name="cinfo">
            <form id="editScontactForm" @submit.prevent.stop="editScontact">
              <div class="col-xs-12 col-sm-6">
                <div class="q-col-gutter-md row items-start">
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="refmail"
                      outlined
                      v-model="state.upemailadd"
                      name="upemailadd"
                      label="E-mail Address"
                      type="email"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="refcontact"
                      outlined
                      v-model="state.upcontact"
                      name="upcontact"
                      label="Phone"
                      mask="(####) ### - ####"
                      :rules="inputRules"
                    />
                  </div>

                  <div class="col-xs-12 col-sm-4 col-md-8">
                    <q-select
                      ref="refzip"
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
                      outlined
                      v-model="state.upstreet"
                      name="upstreet"
                      label="Compound/Street/Phase/Purok"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      outlined
                      v-model="state.upsubdivision"
                      name="upsubdivision"
                      label="Subdivision/Village"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      outlined
                      v-model="state.upbarangay"
                      name="upbarangay"
                      label="Barangay"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      outlined
                      readonly
                      v-model="state.updistrict"
                      name="updistrict"
                      label="District"
                    />
                  </div>

                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      outlined
                      v-model="state.upregion"
                      readonly
                      name="upregion"
                      label="Region"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      outlined
                      v-model="state.upmunicipality"
                      readonly
                      name="upmunicipality"
                      label="Municipality"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      outlined
                      readonly
                      v-model="state.upprovincecity"
                      name="upprovincecity"
                      label="Province"
                    />
                  </div>
                </div>
              </div>

              <div class="row justify-end">
                <q-btn type="submit" color="primary" label="Update" />
              </div>
            </form>
          </q-tab-panel>

          <!-- Edit School Info -->

          <q-tab-panel name="scinfo">
            <form id="editSchoolForm" @submit.prevent.stop="editSchool">
              <div class="col-xs-12 col-sm-6">
                <div class="q-col-gutter-md row items-start">
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="rfupschool"
                      outlined
                      v-model="state.upschool"
                      name="upschool"
                      label="Previous School"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="rfupcourse"
                      outlined
                      v-model="state.upcourse"
                      name="upcourse"
                      label="Previous Course"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-select
                      ref="rfupgradschool"
                      outlined
                      map-options
                      use-input
                      input-debounce="0"
                      label="Select School"
                      v-model="upgradschool"
                      name="upgradschool"
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
                      ref="rfupgradcourse"
                      emit-value
                      map-options
                      outlined
                      label="Graduate Course"
                      v-model="upgradcourse"
                      name="upgradcourse"
                      :options="gradcourseOptions"
                      :rules="[myRule]"
                    />
                  </div>

                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      outlined
                      readonly
                      v-model="state.upschoolregion"
                      name="upschoolregion"
                      label="School Region"
                    />
                  </div>
                </div>
              </div>
              <div class="row justify-end">
                <q-btn type="submit" color="primary" label="Update" />
              </div>
            </form>
          </q-tab-panel>

          <!-- Thesis -->

          <q-tab-panel name="thesis">
            <form id="editthesisForm" @submit.prevent.stop="editThesisSC">
              <div class="col-xs-12 col-sm-6">
                <div class="q-col-gutter-md row items-start">
                  <div class="col-xs-12">
                    <q-input
                      ref="rfuptitle"
                      outlined
                      v-model="state.uptitle"
                      name="uptitle"
                      label="Title of Research"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="rfupstartdate"
                      outlined
                      v-model="state.upstartdate"
                      name="upstartdate"
                      type="date"
                      label="Start Date"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="rfupenddate"
                      outlined
                      v-model="state.upenddate"
                      name="upenddate"
                      type="date"
                      label="End Date"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="rfupduration"
                      outlined
                      v-model="state.upduration"
                      name="upduration"
                      label="Duration"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-select
                      ref="rfupfield"
                      emit-value
                      map-options
                      outlined
                      label="Field"
                      v-model="upfield"
                      name="upfield"
                      :options="fieldOptions"
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-input
                      ref="rfupobligation"
                      outlined
                      v-model="state.upobligation"
                      name="upobligation"
                      label="Service Obligation"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-select
                      ref="rfupundergrad"
                      outlined
                      emit-value
                      map-options
                      label="Undergraduate Scholar"
                      v-model="upundergrad"
                      name="upundergrad"
                      :options="undergradOptions"
                      :rules="[myRule]"
                    />
                  </div>

                  <div class="col-xs-12">
                    <q-input
                      ref="rfupremarks"
                      outlined
                      v-model="state.upremarks"
                      name="upremarks"
                      label="Remarks"
                      :rules="inputRules"
                    />
                  </div>
                </div>
              </div>
              <div class="row justify-end">
                <q-btn type="submit" color="primary" label="Update" />
              </div>
            </form>
          </q-tab-panel>

          <!-- End thesis -->

          <q-tab-panel name="scholarInfo">
            <form
              id="editscholarshipForm"
              @submit.prevent.stop="editScholarshipsInfo"
            >
              <div class="col-xs-12 col-sm-6">
                <div class="q-col-gutter-md row items-start">
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                      ref="rfupentry"
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

                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-input
                      ref="rfupyear"
                      outlined
                      v-model="state.upyraward"
                      name="upyraward"
                      label="Year of Award"
                      mask="####"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-input
                      ref="rfupbatch"
                      outlined
                      v-model="state.upbatch"
                      name="upbatch"
                      label="Batch"
                      :rules="inputRules"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                      ref="rfupgrant"
                      emit-value
                      map-options
                      outlined
                      label="Grant"
                      v-model="upgrant"
                      name="upgrant"
                      :options="grantOptions"
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                      ref="rfuplvl"
                      outlined
                      label="Level"
                      v-model="uplevel"
                      name="uplevel"
                      :options="LvlOptions"
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-input
                      ref="rfupcomp"
                      outlined
                      v-model="state.upcomp"
                      name="upcomp"
                      label="Comp"
                      :rules="inputRules"
                    />
                  </div>

                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                      ref="rfupscholarprog"
                      outlined
                      label="Scholarship Program"
                      v-model="upscholarprog"
                      name="upscholarprog"
                      :options="scholarprogOptions"
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                      ref="rfupcouncil"
                      emit-value
                      map-options
                      outlined
                      label="Council"
                      v-model="upcouncil"
                      name="upcouncil"
                      :options="councilOptions"
                      :rules="[myRule]"
                    />
                  </div>

                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                      ref="rfupscholartype"
                      outlined
                      label="Scholar Type"
                      v-model="upscholartype"
                      name="upscholartype"
                      :options="scholartypeOptions"
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-input
                      ref="rfupavailment"
                      outlined
                      v-model="state.upavailment"
                      name="upavailment"
                      label="Availment"
                      :rules="inputRules"
                    />
                  </div>

                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-select
                      ref="rfupsem"
                      outlined
                      label="Semester"
                      v-model="upsem"
                      name="upsem"
                      :options="semOptions"
                      :rules="[myRule]"
                    />
                  </div>
                  <div class="col-xs-12 col-sm-4 col-md-4">
                    <q-input
                      ref="rfupay"
                      outlined
                      v-model="state.upay"
                      name="upay"
                      label="Academic Year"
                      mask="#### - ####"
                      hint="Year: #### - ####"
                      :rules="inputRules"
                    />
                  </div>
                </div>
              </div>
              <div class="row justify-end">
                <q-btn type="submit" color="primary" label="Update" />
              </div>
            </form>
          </q-tab-panel>

          <!-- Document Section -->

          <q-tab-panel name="scdocu">
            <form id="editDocuForm" @submit.prevent.stop="editDocu">
              <div class="col-xs-12 col-sm-6">
                <div class="q-col-gutter-md row items-start">
                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-card class="my-card">
                      <q-card-section class="bg-primary text-white">
                        <div class="text-h6">Upload Your Files Here</div>
                        <div class="text-subtitle2">
                          Only PDF Documents are Allowed
                        </div>
                      </q-card-section>

                      <q-separator />

                      <div class="q-pa-md">
                        <q-file
                          ref="reffile"
                          v-model="files"
                          name="files"
                          label="*PDF Only"
                          clearable
                          filled
                          counter
                          @update:model-value="handleFileChange"
                          :rules="[fileRules]"
                        >
                          <template v-slot:prepend>
                            <q-icon name="attach_file" />
                          </template>
                        </q-file>
                      </div>
                    </q-card>
                  </div>

                  <div class="col-xs-12 col-sm-6 col-md-6">
                    <q-select
                      ref="refFiletype"
                      outlined
                      label="Select File Types"
                      v-model="filetypes"
                      name="filetypes"
                      map-options
                      :options="optionsFile"
                      :rules="[myRule]"
                    />
                    <div class="q-pa-sm">
                      <q-input
                        ref="refDesc"
                        v-model="state.filedesc"
                        name="filedesc"
                        filled
                        type="textarea"
                        label="Descriptions"
                        :rules="inputRules"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row justify-end">
                <q-btn type="submit" color="primary" label="Upload" />
              </div>
            </form>
          </q-tab-panel>
        </q-tab-panels>
      </q-card>

      <q-separator />
    </q-card>
  </q-dialog>

  <q-dialog v-model="Docx" persistent>
    <q-card style="min-width: 1000px; width: 1000px">
      <q-card-section class="q-gutter-md">
        <div class="text-h6">View Documents</div>
        <q-space />

        <q-btn flat color="primary" @click="CloseDocx">
          <IconSquareRoundedX :size="30" stroke-width="2" />
        </q-btn>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <q-table
          flat
          bordered
          title="List of Documents"
          :rows="Doxrows"
          :columns="DocxColumns"
          row-key="name"
          separator="cell"
          :filter="filter"
        >
          <template v-slot:top-right>
            <q-input dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>

          <template v-slot:body-cell-stats="props">
            <q-td :props="props">
              <div>
                <q-badge color="light-green-4" :label="props.value" />
              </div>
            </q-td>
          </template>

          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                flat
                class="bi bi-info-circle"
                color="amber-5"
                @click="ViewDocx(props)"
                :href="'http://localhost/backdbase/upload/' + filePath"
                target="_blank"
              >
                <IconFiles :size="30" stroke-width="2" />
              </q-btn>
            </q-td>
          </template>
        </q-table>
      </q-card-section>

      <q-separator />
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref, onMounted, reactive, inject } from "vue";

import {
  IconListDetails,
  IconSquareRoundedX,
  IconFileTypePdf,
  IconFileSearch,
  IconFiles,
} from "@tabler/icons-vue";
import { useQuasar, QSpinnerGears } from "quasar";
import Swal from "sweetalert2";

const $q = useQuasar();
// const axios = inject("$axios");
const user = inject("$user");
const axios = inject("$axios");

const tab = ref("oscholars");
const edittab = ref("sinfo");

// Items Variables

const filter = ref("");
const gfilter = ref("");
const tfilter = ref("");
const rows = ref([]);
const grows = ref([]);
const trows = ref([]);
const Doxrows = ref([]);
const fixed = ref(false);
const Docx = ref(false);

const filePath = ref("");

// Edit modal

const saddressid = ref();

// Rules & Validations
const inputRules = [
  (val) => (val && val.length > 0) || "Please input something",
];

const myRule = (val) => {
  if (val === null) {
    return "You must make a selection!";
  }
  return true;
};

const handleFileChange = (event) => {
  console.log(event);
  const file = files.value;
  if (file) {
    if (file.type === "application/pdf") {
      // Handle the selected PDF file
      console.log("Selected PDF file:", file.name);
    } else {
      $q.notify({
        color: "negative",
        message: "Please select a PDF file.",
      });
      files.value = null;
    }
  }
};

const fileRules = (val) => {
  if (val === null) {
    return "Please Select a File!";
  }
  return true;
};

// Validation Declarations

// For Reference

// Scholarinfo
const refstats = ref(null);
const refsubstats = ref(null);
const refspas = ref(null);
const reflname = ref(null);
const reffname = ref(null);
const refmname = ref(null);
const refbirth = ref(null);
const refmail = ref(null);
const refcontact = ref(null);

// Address Reference
const refzip = ref(null);
const refhousenum = ref(null);
const refstreet = ref(null);

// School Reference

const rfupcourse = ref(null);
const rfupschool = ref(null);
const rfupgradschool = ref(null);
const rfupgradcourse = ref(null);

//Thesis Reference

const rfuptitle = ref(null);
const rfupstartdate = ref(null);
const rfupenddate = ref(null);
const rfupduration = ref(null);
const rfupfield = ref(null);
const rfupobligation = ref(null);
const rfupundergrad = ref(null);
const rfupremarks = ref(null);

// Scholarship Reference

const rfupentry = ref(null);
const rfupyear = ref(null);
const rfupbatch = ref(null);
const rfupgrant = ref(null);
const rfupcomp = ref(null);
const rfuplvl = ref(null);
const rfupscholarprog = ref(null);
const rfupcouncil = ref(null);
const rfupscholartype = ref(null);
const rfupavailment = ref(null);
const rfupsem = ref(null);
const rfupay = ref(null);

// Document Reference
const refFiletype = ref(null);
const refDesc = ref(null);
const reffile = ref(null);

// Select Validation declaration Variables

const upprovince = ref(null);
const upentry = ref(null);
const upstats = ref(null);
const upsubstats = ref(null);
const filetypes = ref(null);
const upgradschool = ref(null);
const upgradcourse = ref(null);
const upfield = ref(null);
const upundergrad = ref(null);
const upgrant = ref(null);
const uplevel = ref(null);
const upscholarprog = ref(null);
const upcouncil = ref(null);
const upscholartype = ref(null);
const upsem = ref(null);

// file Validation
const files = ref(null);

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
  upgradschool: "",
  upgradcourse: "",
  upschoolregion: "",

  uptitle: "",
  upstartdate: "",
  upenddate: "",
  upduration: "",
  upobligation: "",
  upremarks: "",

  upyraward: "",
  upbatch: "",
  upcomp: "",
  upavailment: "",
  upay: "",

  filedesc: "",
});

const statsoptions = [
  { label: "Ongoing", value: "Ongoing", color: "primary" },
  { label: "Graduate", value: "Graduate", color: "primary" },
  { label: "Terminated", value: "Terminated", color: "primary" },
];
const subsoptions = [
  { label: "Suspended", value: "Suspended", color: "primary" },
  { label: "Completed", value: "Completed", color: "primary" },
];

const sexoptions = [
  { label: "Male", value: "M", color: "primary" },
  { label: "Female", value: "F", color: "primary" },
];
const entryType = [
  { label: "NEW", value: "NEW" },
  { label: "LATERAL", value: "LATERAL" },
  { label: "RESIDENTIAL", value: "RESIDENTIAL" },
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

// Column Sections

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
    name: "stats",
    required: true,
    label: "Status",
    align: "center",
    field: "school_grad_status",
    sortable: true,
  },
  {
    name: "substats",
    required: true,
    label: "Secondary Status",
    align: "center",
    field: "sub_status",
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

const DocxColumns = [
  {
    name: "file_name",
    required: true,
    label: "File Name",
    align: "center",
    field: "file_name",
    sortable: true,
  },
  {
    name: "descriptions",
    required: true,
    label: "Details",
    align: "center",
    field: "descriptions",
    sortable: true,
  },
  {
    name: "file_description",
    required: true,
    label: "File Description",
    align: "center",
    field: "file_description",
    sortable: true,
  },

  {
    name: "added_on",
    required: true,
    label: "Date Added",
    align: "center",
    field: "added_on",
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

// Sweet Alert (Edit) Code Here

const showEditalert = () => {
  let timerInterval;
  Swal.fire({
    title: "Updating Scholar Information Details!",
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
        title: "Updated successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      readOnscholars();
    },
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log("I was closed by the timer");
    }
  });
};

// Close button

const close = () => {
  fixed.value = false;
  edittab.value = "sinfo";
};

// Read Scholars

onMounted(() => {
  readOnscholars();
});

const readOnscholars = () => {
  axios.get("/read.php?readscholar").then(function (response) {
    rows.value = response.data;
  });
};

onMounted(() => {
  readGradscholars();
});

const readGradscholars = () => {
  axios.get("/read.php?readgraduatescholar").then(function (response) {
    grows.value = response.data;
  });
};

onMounted(() => {
  readTermscholars();
});

const readTermscholars = () => {
  axios.get("/read.php?readtermscholar").then(function (response) {
    trows.value = response.data;
  });
};

// Delete Scholars

// const showdelScholar = (props) => {
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!",
//   }).then((result) => {
//     if (result.isConfirmed) {
//       Swal.fire("Deleted!", "Your file has been deleted.", "success");

//       var formData = new FormData();
//       formData.append("scholarid", props.row.id);

//       axios
//         .post("/delete.php?deleteScholar", formData)
//         .then(function (response) {
//           if (response.data == true) {
//             readOnscholars();
//             readGradscholars();
//             readTermscholars();
//             showdel.value = false;
//           } else {
//             $q.notify({
//               color: "red",
//               textColor: "white",
//               message: "User not deleted",
//             });
//           }
//         });
//     }
//   });
// };

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
  state.upschoolregion = upgradschool.value?.school_region;
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

// Showing Adress Data

onMounted(() => {
  populateaddress();
});

const populateaddress = () => {
  var formData = new FormData();
  formData.append("province", upprovince.value);

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
  upstats.value = props.row.school_grad_status;
  upsubstats.value = props.row.sub_status;
  state.uplastname = props.row.lname;
  state.upfirstname = props.row.fname;
  state.upmidname = props.row.mname;
  state.upsuffixname = props.row.suffix;

  state.upbirthdate = props.row.birthday;
  state.upgender = props.row.sex;
  state.upemailadd = props.row.email;
  state.upcontact = props.row.contact;
  saddressid.value = props.row.id;

  var formData = new FormData();
  formData.append("saddressid", saddressid.value);

  axios.post("/read.php?scholarAddressid", formData).then(function (response) {
    upprovince.value = response.data.zipcode;
    state.uphousenum = response.data.house_number;
    state.upstreet = response.data.street;
    state.upsubdivision = response.data.subdivision;
    state.upbarangay = response.data.barangay;
    state.updistrict = response.data.district;
    state.upregion = response.data.h_region;
    state.upmunicipality = response.data.town;
    state.upprovincecity = response.data.province;
  });

  axios.post("/read.php?shoolsID", formData).then(function (response) {
    state.upcourse = response.data.current_course;
    state.upschool = response.data.current_school;
    upentry.value = response.data.entry_level;
    state.upyraward = response.data.year + "";
    console.log(
      state.upyraward,
      state.upyraward.length,
      typeof state.upyraward
    );
    state.upbatch = response.data.batch;
  });

  axios.post("/read.php?editGradschool", formData).then(function (response) {
    state.upschoolregion = response.data.region;
    upgradcourse.value = response.data.grad_course;
    upgradschool.value = response.data.grad_school;
  });

  axios.post("/read.php?editThesis", formData).then(function (response) {
    state.uptitle = response.data.title;
    state.upstartdate = response.data.start_date;
    state.upenddate = response.data.end_date;
    state.upduration = response.data.duration;
    upfield.value = response.data.field;
    state.upobligation = response.data.servob;
    upundergrad.value = response.data.undergrad_scholar;
    state.upremarks = response.data.remarks;
    upscholartype.value = response.data.school_type;
  });

  axios.post("/read.php?editScholarchip", formData).then(function (response) {
    upgrant.value = response.data.grant_test;
    uplevel.value = response.data.level;
    state.upcomp = response.data.comp;
    upscholarprog.value = response.data.grad_program;
    upcouncil.value = response.data.council;
    state.upavailment = response.data.availment;
    upsem.value = response.data.sem;
    state.upay = response.data.award_year;
  });
};

// Edit Scholar Information

const editSinfo = () => {
  refspas.value.validate();
  reflname.value.validate();
  reffname.value.validate();
  refmname.value.validate();
  refbirth.value.validate();
  refsubstats.value.validate();

  if (
    refspas.value.hasError ||
    reflname.value.hasError ||
    reffname.value.hasError ||
    refmname.value.hasError ||
    refsubstats.value.hasError ||
    refbirth.value.hasError
  ) {
    //Error
  } else {
    var formData = new FormData(document.getElementById("editSinfoForm"));
    formData.append("editScholarID", saddressid.value);

    axios
      .post("/update.php?updateScholarinfo", formData)
      .then(function (response) {
        if (response.data == true) {
          fixed.value = false;
          showEditalert();
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    formData.append("authname", user.username);

    axios.post("/create.php?InsertLog", formData).then(function (response) {
      if (response.data == true) {
        readOnscholars();
        readGradscholars();
        readTermscholars();
      } else {
        alert("Failed");
      }
    });
  }
};

// Edit Scholar Contact information

const editScontact = () => {
  refmail.value.validate();
  refcontact.value.validate();
  refzip.value.validate();
  refhousenum.value.validate();
  refstreet.value.validate();
  if (
    refmail.value.hasError ||
    refcontact.value.hasError ||
    refzip.value.hasError ||
    refhousenum.value.hasError ||
    refstreet.value.hasError
  ) {
    // Error Here
  } else {
    // Back End Starts Here
    var formData = new FormData(document.getElementById("editScontactForm"));

    formData.append("editScholarID", saddressid.value);
    axios
      .post("/update.php?updatescholarAddress", formData)
      .then(function (response) {
        if (response.data == true) {
          fixed.value = false;
          showEditalert();
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    formData.append("authname", user.username);
    formData.append("upspasid", state.upspasid);

    axios.post("/create.php?ContactLog", formData).then(function (response) {
      if (response.data == true) {
        readOnscholars();
        readGradscholars();
        readTermscholars();
      } else {
        alert("Failed");
      }
    });

    // Back End Ends Here
  }
};

// Edit Scholar School Information

const editSchool = () => {
  rfupcourse.value.validate();
  rfupschool.value.validate();
  rfupgradschool.value.validate();
  rfupgradcourse.value.validate();

  if (
    rfupcourse.value.hasError ||
    rfupschool.value.hasError ||
    rfupgradschool.value.hasError ||
    rfupgradcourse.value.hasError
  ) {
    //Errors
  } else {
    // Back End Starts Here
    var formData = new FormData(document.getElementById("editSchoolForm"));
    formData.append("editScholarID", saddressid.value);

    // Previous School
    axios
      .post("/update.php?updateScholarschool", formData)
      .then(function (response) {
        if (response.data == true) {
          fixed.value = false;
          showEditalert();
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    // Graduate School

    formData.append("upgradschool", upgradschool.value?.label);

    axios
      .post("/update.php?updateGradScholarschool", formData)
      .then(function (response) {
        if (response.data == true) {
          fixed.value = false;
          showEditalert();
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    // Update Logs

    formData.append("authname", user.username);
    formData.append("upspasid", state.upspasid);

    axios.post("/create.php?SchoolInfoLog", formData).then(function (response) {
      if (response.data == true) {
        readOnscholars();
        readGradscholars();
        readTermscholars();
      } else {
        alert("Failed");
      }
    });
    // Back End Ends Here
  }
};

// Thesis

const editThesisSC = () => {
  rfuptitle.value.validate();
  rfupstartdate.value.validate();
  rfupenddate.value.validate();
  rfupduration.value.validate();
  rfupfield.value.validate();
  rfupobligation.value.validate();
  rfupundergrad.value.validate();
  rfupremarks.value.validate();

  if (
    rfuptitle.value.hasError ||
    rfupstartdate.value.hasError ||
    rfupenddate.value.hasError ||
    rfupduration.value.hasError ||
    rfupfield.value.hasError ||
    rfupobligation.value.hasError ||
    rfupundergrad.value.hasError ||
    rfupremarks.value.hasError
  ) {
  } else {
    var formData = new FormData(document.getElementById("editthesisForm"));
    formData.append("editScholarID", saddressid.value);

    axios.post("/update.php?updateThesis", formData).then(function (response) {
      if (response.data == true) {
        fixed.value = false;
        showEditalert();
        readOnscholars();
        readGradscholars();
        readTermscholars();
      } else {
        alert("Failed");
      }
    });

    // Update Logs

    formData.append("authname", user.username);
    formData.append("upspasid", state.upspasid);

    axios.post("/create.php?ThesisInfoLog", formData).then(function (response) {
      if (response.data == true) {
        readOnscholars();
        readGradscholars();
        readTermscholars();
      } else {
        alert("Failed");
      }
    });
    // Back End Ends Here
  }
};

const editScholarshipsInfo = () => {
  rfupentry.value.validate();
  rfupyear.value.validate();
  rfupbatch.value.validate();
  rfupgrant.value.validate();
  rfuplvl.value.validate();
  rfupcomp.value.validate();
  rfupscholarprog.value.validate();
  rfupcouncil.value.validate();
  rfupscholartype.value.validate();
  rfupavailment.value.validate();
  rfupsem.value.validate();
  rfupay.value.validate();

  if (
    rfupentry.value.hasError ||
    rfupyear.value.hasError ||
    rfupbatch.value.hasError ||
    rfupgrant.value.hasError ||
    rfuplvl.value.hasError ||
    rfupcomp.value.hasError ||
    rfupscholarprog.value.hasError ||
    rfupcouncil.value.hasError ||
    rfupscholartype.value.hasError ||
    rfupavailment.value.hasError ||
    rfupsem.value.hasError ||
    rfupay.value.hasError
  ) {
  } else {
    var formData = new FormData(document.getElementById("editscholarshipForm"));
    formData.append("editScholarID", saddressid.value);

    axios
      .post("/update.php?updateScholarshipInfo", formData)
      .then(function (response) {
        if (response.data == true) {
          fixed.value = false;
          showEditalert();
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    axios
      .post("/update.php?updateScholarshipInfo2", formData)
      .then(function (response) {
        if (response.data == true) {
          fixed.value = false;
          showEditalert();
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    axios
      .post("/update.php?updateScholarshipInfo3", formData)
      .then(function (response) {
        if (response.data == true) {
          fixed.value = false;
          showEditalert();
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    // Update Logs

    formData.append("authname", user.username);
    formData.append("upspasid", state.upspasid);

    axios
      .post("/create.php?ScholarInfoLog", formData)
      .then(function (response) {
        if (response.data == true) {
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });
    // Back End Ends Here
  }
};

const generatePDF = () => {
  var formData = new FormData();
  formData.append("editScholarID", saddressid.value);

  axios
    .post("/update.php?printPDF", formData, { responseType: "blob" })
    .then(function (response) {
      var file = new Blob([response.data], { type: "application/pdf" });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
};

const optionsFile = ref();
const fileID = ref("");

onMounted(() => {
  populatefiletypes();
});

const populatefiletypes = () => {
  axios.get("/read.php?populatefiles").then(function (response) {
    optionsFile.value = response.data;
    fileID.value = response.data.id;
  });
};

const editDocu = () => {
  refFiletype.value.validate();
  refDesc.value.validate();
  reffile.value.validate();

  if (
    refFiletype.value.hasError ||
    refDesc.value.hasError ||
    reffile.value.hasError
  ) {
    // Error Here
  } else {
    var formData = new FormData(document.getElementById("editDocuForm"));
    formData.append("filetypeid", filetypes.value.val_id);
    formData.append("filedesc", state.filedesc);
    formData.append("filetype", filetypes.value.value);
    formData.append("spasid", state.upspasid);
    formData.append("scholarLastname", state.uplastname);
    formData.append("username", user.username);
    formData.append("scholarids", saddressid.value);
    axios.post("/create.php?insertDocx", formData).then(function (response) {
      if (response.data == true) {
        fixed.value = false;
        showEditalert();
      } else {
        alert("Error");
      }
    });

    axios.post("/create.php?DocxLog", formData).then(function (response) {
      if (response.data == true) {
        showEditalert();
      } else {
        alert("Error");
      }
    });
  }
};

// Read Document of Scholar

const currentProps = ref();

const showDocx = (props) => {
  Docx.value = true;
  currentProps.value = props;
  console.log(currentProps.value.row.id);

  console.log(currentProps.value.row.id);
  var formData = new FormData();
  formData.append("ids", currentProps.value.row.id);
  axios.post("/read.php?docuID", formData).then(function (response) {
    Doxrows.value = response.data;
    console.log(Doxrows.value);
  });
};

const CloseDocx = () => {
  Docx.value = false;
};

const ViewDocx = (props) => {
  filePath.value = props.row.file_name;
};
</script>

<style scoped>
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
.q-gutter-md {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
