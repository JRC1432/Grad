<template>
  <div class="q-pa-md">
    <div class="col-xs-12 col-sm-6">
      <div class="row">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <q-card class="my-card text-black rounded-borders-20 q-mr-md">
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
                      v-model:pagination="pagination"
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

                      <template v-slot:body="props">
                        <q-tr :prop="props" @click="showeditScholar(props)"
                          ><q-td key="spas_id" :props="props">
                            {{ props.row.spas_id }}
                          </q-td>
                          <q-td key="lname" :props="props">
                            {{ props.row.lname }}
                          </q-td>
                          <q-td key="fname" :props="props">
                            {{ props.row.fname }}
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
                              class="bi bi-info-circle"
                              color="amber-5"
                              @click="showDocx(props)"
                            >
                              <IconFileSearch :size="30" stroke-width="2" />
                            </q-btn>
                          </q-td>
                        </q-tr>
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
                      v-model:pagination="pagination"
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

                      <template v-slot:body="props">
                        <q-tr :prop="props" @click="showeditScholar(props)"
                          ><q-td key="spas_id" :props="props">
                            {{ props.row.spas_id }}
                          </q-td>
                          <q-td key="lname" :props="props">
                            {{ props.row.lname }}
                          </q-td>
                          <q-td key="fname" :props="props">
                            {{ props.row.fname }}
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
                              class="bi bi-info-circle"
                              color="amber-5"
                              @click="showDocx(props)"
                            >
                              <IconFileSearch :size="30" stroke-width="2" />
                            </q-btn>
                          </q-td>
                        </q-tr>
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
                      v-model:pagination="pagination"
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

                      <template v-slot:body="props">
                        <q-tr :prop="props" @click="showeditScholar(props)"
                          ><q-td key="spas_id" :props="props">
                            {{ props.row.spas_id }}
                          </q-td>
                          <q-td key="lname" :props="props">
                            {{ props.row.lname }}
                          </q-td>
                          <q-td key="fname" :props="props">
                            {{ props.row.fname }}
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
                              class="bi bi-info-circle"
                              color="amber-5"
                              @click="showDocx(props)"
                            >
                              <IconFileSearch :size="30" stroke-width="2" />
                            </q-btn>
                          </q-td>
                        </q-tr>
                      </template>
                    </q-table>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-6">
          <q-card class="my-card text-black rounded-borders-20">
            <div class="text-h6 text-bold">
              <form id="editSinfoForm" @submit.prevent.stop="editSinfo">
                <div class="q-pa-md">
                  <div class="row">
                    <div class="col">
                      <div class="text-h6 text-bold q-mb-md row items-center">
                        <IconUser
                          class="text-negative q-mr-sm"
                          :size="40"
                          stroke-width="2"
                        />
                        <span class="text-h6 text-bold text-primary"
                          >Scholarship Informaion Details</span
                        >
                      </div>
                    </div>

                    <div class="col-auto">
                      <q-btn
                        flat
                        color="primary"
                        @click="docxUpload = true"
                        icon="cloud_upload"
                      />
                      <q-btn
                        flat
                        color="primary"
                        @click="generatePDF"
                        icon="print"
                      />

                      <q-btn
                        type="submit"
                        color="primary"
                        label="Save Changes"
                      />
                    </div>
                  </div>

                  <q-separator />

                  <q-card-section>
                    <q-scroll-area style="height: 840px; width: 100%">
                      <div class="col-12">
                        <div class="q-col-gutter-md row items-start">
                          <div class="col-xs-12 col-sm-4 col-md-4">
                            <q-input
                              ref="refspas"
                              outlined
                              hide-bottom-space
                              readonly
                              v-model="state.upspasid"
                              label="SPAS ID:"
                              style="max-width: 200px"
                              name="upspasid"
                              :rules="inputRules"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-4 col-sm-4">
                            <q-select
                              ref="refstats"
                              outlined
                              hide-bottom-space
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
                              hide-bottom-space
                              label="Remarks"
                              transition-show="flip-up"
                              transition-hide="flip-down"
                              v-model="upsubstats"
                              name="upsubstats"
                              :options="subsoptions"
                              :rules="[myRule]"
                            />
                          </div>

                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              ref="reflname"
                              outlined
                              hide-bottom-space
                              v-model="state.uplastname"
                              label="Last Name"
                              name="uplastname"
                              :rules="inputRules"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              ref="reffname"
                              outlined
                              hide-bottom-space
                              v-model="state.upfirstname"
                              label="First Name"
                              name="upfirstname"
                              :rules="inputRules"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              outlined
                              v-model="state.upmidname"
                              label="Middle Name"
                              name="upmidname"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
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
                              type="date"
                              outlined
                              hide-bottom-space
                              v-model="state.upbirthdate"
                              name="upbirthdate"
                              label="Birthday"
                              :rules="inputRules"
                            />
                          </div>

                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <span class="text-primary">SEX: </span>
                            <div class="row justify-start">
                              <q-option-group
                                :options="sexoptions"
                                type="radio"
                                v-model="state.upgender"
                                name="upgender"
                                inline
                                hide-bottom-space
                              />
                            </div>
                          </div>

                          <div class="col-xs-12 col-sm-6 col-md-12">
                            <div
                              class="text-h6 text-bold q-mb-md row items-center"
                            >
                              <IconAddressBook
                                class="text-negative q-mr-sm"
                                :size="40"
                                stroke-width="2"
                              />
                              <span class="text-h6 text-bold text-primary"
                                >Contact Informations</span
                              >
                            </div>
                            <q-separator />
                            <br />
                          </div>

                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              ref="refupmail"
                              outlined
                              hide-bottom-space
                              v-model="state.upemailadd"
                              name="upemailadd"
                              label="E-mail Address"
                              type="email"
                              :rules="[
                                (val) =>
                                  isValidEmail(val) || 'Invalid email address',
                              ]"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              ref="rfupAlternateEmail"
                              outlined
                              hide-bottom-space
                              v-model="state.upAlternateEmail"
                              name="upAlternateEmail"
                              label="Alternate E-mail Address"
                              type="email"
                              :rules="[
                                (val) =>
                                  isValidAlterEmail(val) ||
                                  'Invalid email address',
                              ]"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              ref="refcontact"
                              outlined
                              hide-bottom-space
                              v-model="state.upcontact"
                              name="upcontact"
                              label="Phone"
                              mask="(####) ### - ####"
                              :rules="inputRules"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-12">
                            <q-select
                              ref="rfzip"
                              outlined
                              hide-bottom-space
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
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              ref="refhousenum"
                              outlined
                              hide-bottom-space
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
                              hide-bottom-space
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
                          <div class="col-xs-12 col-sm-6 col-md-12">
                            <q-input
                              outlined
                              readonly
                              v-model="state.upprovincecity"
                              name="upprovincecity"
                              label="Province"
                            />
                          </div>
                          <br />
                          <div class="col-xs-12 col-sm-6 col-md-12">
                            <div
                              class="text-h6 text-bold q-mb-md row items-center"
                            >
                              <IconBuilding
                                class="text-negative q-mr-sm"
                                :size="40"
                                stroke-width="2"
                              />
                              <span class="text-h6 text-bold text-primary"
                                >Previous School Informations</span
                              >
                            </div>
                            <q-separator />
                            <br />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              ref="rfupcourse"
                              outlined
                              hide-bottom-space
                              map-options
                              use-input
                              input-debounce="0"
                              label="Previous Course"
                              v-model="upcourse"
                              name="upcourse"
                              :options="underGradCoursesoption"
                              @filter="filterUndergradCourse"
                              behavior="menu"
                              :rules="[myRule]"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              ref="rfupschool"
                              outlined
                              hide-bottom-space
                              map-options
                              use-input
                              input-debounce="0"
                              label="Previous School"
                              v-model="upschool"
                              name="upschool"
                              :options="underGradSchooloptions"
                              @filter="filterUndergradSchool"
                              behavior="menu"
                              :rules="[myRule]"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              ref="rfupscprog"
                              v-model="upscprog"
                              name="upscprog"
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
                              ref="rfupunits"
                              v-model="state.upunits"
                              name="upunits"
                              outlined
                              label="Units"
                              type="number"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-12">
                            <div
                              class="text-h6 text-bold q-mb-md row items-center"
                            >
                              <IconSchool
                                class="text-negative q-mr-sm"
                                :size="40"
                                stroke-width="2"
                              />
                              <span class="text-h6 text-bold text-primary"
                                >Graduate School</span
                              >
                            </div>
                            <q-separator />
                            <br />
                          </div>
                          <div class="col-xs-12">
                            <q-select
                              ref="rfupcouncil"
                              outlined
                              hide-bottom-space
                              map-options
                              use-input
                              input-debounce="0"
                              label="Monitoring Council/ University"
                              v-model="upcouncil"
                              name="upcouncil"
                              :options="councilOptions"
                              @filter="filterCouncil"
                              behavior="menu"
                              :rules="[myRule]"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              ref="rfupgradschool"
                              outlined
                              hide-bottom-space
                              map-options
                              use-input
                              input-debounce="0"
                              label="Graduate School"
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
                            <q-input
                              outlined
                              readonly
                              v-model="state.upschoolregion"
                              name="upschoolregion"
                              label="School Region"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              ref="rfupgradcourse"
                              outlined
                              hide-bottom-space
                              map-options
                              use-input
                              input-debounce="0"
                              label="Graduate Course"
                              v-model="upgradcourse"
                              name="upgradcourse"
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
                              v-model="state.upfield"
                              name="upfield"
                              readonly
                            />
                          </div>
                          <div class="col-xs-12">
                            <q-input
                              ref="rfupduration"
                              outlined
                              hide-bottom-space
                              v-model="state.upduration"
                              name="upduration"
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
                                      <div
                                        class="q-col-gutter-md row items-start"
                                      >
                                        <div
                                          class="col-xs-12 col-sm-1 col-md-1"
                                        >
                                          <q-input
                                            outlined
                                            v-model="state.upfsemone"
                                            name="upfsemone"
                                            label="Sem"
                                          />
                                        </div>
                                        <div
                                          class="col-xs-12 col-sm-5 col-md-5"
                                        >
                                          <q-input
                                            outlined
                                            v-model="state.upfstartdate"
                                            name="upfstartdate"
                                            type="date"
                                            label="Date of Award"
                                            no-placeholder
                                          />
                                        </div>
                                        <div
                                          class="col-xs-12 col-sm-1 col-md-1"
                                        >
                                          <q-input
                                            outlined
                                            v-model="state.upfsemtwo"
                                            name="upfsemtwo"
                                            label="Sem"
                                          />
                                        </div>
                                        <div
                                          class="col-xs-12 col-sm-5 col-md-5"
                                        >
                                          <q-input
                                            outlined
                                            v-model="state.upfenddate"
                                            name="upfenddate"
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
                                      <div
                                        class="q-col-gutter-md row items-start"
                                      >
                                        <div
                                          class="col-xs-12 col-sm-1 col-md-1"
                                        >
                                          <q-input
                                            outlined
                                            v-model="state.uplsemone"
                                            name="uplsemone"
                                            label="Sem"
                                          />
                                        </div>
                                        <div
                                          class="col-xs-12 col-sm-5 col-md-5"
                                        >
                                          <q-input
                                            outlined
                                            v-model="state.uplstartdate"
                                            name="uplstartdate"
                                            label="Date of Award"
                                            mask="#### - ####"
                                            hint="Year: #### - ####"
                                          />
                                        </div>
                                        <div
                                          class="col-xs-12 col-sm-1 col-md-1"
                                        >
                                          <q-input
                                            outlined
                                            v-model="state.uplsemtwo"
                                            name="uplsemtwo"
                                            label="Sem"
                                          />
                                        </div>

                                        <div
                                          class="col-xs-12 col-sm-5 col-md-5"
                                        >
                                          <q-input
                                            outlined
                                            v-model="state.uplenddate"
                                            name="uplenddate"
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
                          <div class="col-xs-12 col-sm-6 col-md-12">
                            <div
                              class="text-h6 text-bold q-mb-md row items-center"
                            >
                              <IconSchool
                                class="text-negative q-mr-sm"
                                :size="40"
                                stroke-width="2"
                              />
                              <span class="text-h6 text-bold text-primary"
                                >Other Scholarship Informations</span
                              >
                            </div>
                            <q-separator />
                            <br />
                          </div>
                          <div class="col-xs-12">
                            <q-select
                              ref="rfupscholarprog"
                              outlined
                              hide-bottom-space
                              emit-value
                              label="Scholarship Program"
                              v-model="upscholarprog"
                              name="upscholarprog"
                              :options="scholarprogOptions"
                              :rules="[myRule]"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              ref="rfupentry"
                              emit-value
                              outlined
                              hide-bottom-space
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
                              ref="rfupay"
                              outlined
                              hide-bottom-space
                              v-model="upay"
                              name="upay"
                              label="Academic Year"
                              mask="#### - ####"
                              hint="Year: #### - ####"
                              :rules="inputRules"
                              @update:model-value="
                                upyraward = upay.substring(0, 4)
                              "
                            />
                          </div>

                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              ref="rfupbatch"
                              outlined
                              hide-bottom-space
                              v-model="state.upbatch"
                              name="upbatch"
                              label="Batch"
                              type="number"
                              :rules="inputRules"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              ref="rfupgrant"
                              emit-value
                              map-options
                              outlined
                              hide-bottom-space
                              label="Grant"
                              v-model="upgrant"
                              name="upgrant"
                              :options="grantOptions"
                              :rules="[myRule]"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              ref="rfuplvl"
                              emit-value
                              outlined
                              hide-bottom-space
                              label="Level"
                              v-model="uplevel"
                              name="uplevel"
                              :options="LvlOptions"
                              :rules="[myRule]"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              ref="rfupcomp"
                              outlined
                              v-model="state.upcomp"
                              name="upcomp"
                              label="Comp"
                              readonly
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              ref="rfupavailment"
                              emit-value
                              map-options
                              outlined
                              hide-bottom-space
                              v-model="upavailment"
                              name="upavailment"
                              label="Availment"
                              :options="availmentOptions"
                              :rules="inputRules"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              ref="rfupstats"
                              outlined
                              label="Status"
                              v-model="upavailment"
                              name="upstatus"
                              readonly
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              ref="rfupsem"
                              outlined
                              label="Semester"
                              v-model="state.upbatch"
                              name="upsem"
                              readonly
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              ref="rfupyear"
                              outlined
                              v-model="upyraward"
                              name="upyraward"
                              label="Year of Award"
                              mask="####"
                              readonly
                            />
                          </div>
                          <div class="col-xs-12">
                            <q-input
                              ref="rfupremarks"
                              outlined
                              hide-bottom-space
                              v-model="state.upremarks"
                              name="upremarks"
                              label="Remarks"
                              :rules="inputRules"
                            />
                          </div>
                          <div class="col-xs-12">
                            <q-input
                              ref="rfupobligation"
                              outlined
                              hide-bottom-space
                              v-model="state.upobligation"
                              name="upobligation"
                              label="Service Obligation"
                              :rules="inputRules"
                            />
                          </div>
                          <div class="col-xs-12">
                            <q-input
                              outlined
                              v-model="state.uptitle"
                              name="uptitle"
                              label="Title of Research"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-select
                              ref="rfupscholartype"
                              emit-value
                              outlined
                              hide-bottom-space
                              label="Scholar Type"
                              v-model="upscholartype"
                              name="upscholartype"
                              :options="scholartypeOptions"
                              :rules="[myRule]"
                            />
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6">
                            <q-input
                              outlined
                              v-model="state.upgraddate"
                              name="upgraddate"
                              label="Graduation Date"
                              mask="#### - ##"
                              hint="Year: Yr - Month"
                            />
                          </div>
                          <div class="col-xs-12">
                            <q-input
                              outlined
                              v-model="state.uphonors"
                              name="uphonors"
                              label="Honors/ Awards Received"
                            />
                          </div>
                          <div class="col-xs-12">
                            <q-input
                              outlined
                              v-model="state.updissemination"
                              name="updissemination"
                              label="Dissemination Grant"
                            />
                          </div>
                          <div class="col-xs-12">
                            <q-input
                              outlined
                              v-model="state.upresearch"
                              name="upresearch"
                              label="Research Grant"
                            />
                          </div>
                        </div></div
                    ></q-scroll-area>
                  </q-card-section>
                </div>
              </form>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>

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

  <q-dialog v-model="docxUpload" persistent>
    <q-card style="min-width: 1000px; width: 1000px">
      <q-toolbar>
        <IconFileTypePdf :size="30" stroke-width="2" />
        <!-- <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo.svg" />
        </q-avatar> -->

        <q-toolbar-title
          ><span class="text-weight-bold" color="primary">PDF</span> File
          Upload</q-toolbar-title
        >

        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>

      <q-card-section>
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
      </q-card-section>
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

const q$ = useQuasar();
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
const docxUpload = ref(false);
const Docx = ref(false);
const pagination = ref({
  rowsPerPage: 11,
});

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

const numRule = [(val) => val === null || "Please input something"];

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

const isValidEmail = () => {
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  return regex.test(state.upemailadd);
};

const isValidAlterEmail = () => {
  const regex = /^[A-Za-z0-9+_.-]+@(.+)$/;
  return regex.test(state.upAlternateEmail);
};

// Validation for Email Add

const checkEmailAdd = async (value) => {
  const formData = new FormData(document.getElementById("editSinfoForm"));
  formData.append("emailadd", state.upemailadd);
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
  const formData = new FormData(document.getElementById("editSinfoForm"));
  formData.append("alternateEmail", state.upAlternateEmail);
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

// Validation Declarations

// For Reference

// Scholarinfo
const refstats = ref(null);
const refsubstats = ref(null);
const refspas = ref(null);
const reflname = ref(null);
const reffname = ref(null);

const refbirth = ref(null);

const refcontact = ref(null);
const rfupAlternateEmail = ref(null);
const refupmail = ref(null);

// Address Reference
const rfzip = ref(null);
const refhousenum = ref(null);
const refstreet = ref(null);

// School Reference

const rfupcourse = ref(null);
const rfupschool = ref(null);
const rfupscprog = ref(null);
const rfupunits = ref(null);

const rfupundergrad = ref(null);

// Scholarship Reference

const rfupscholarprog = ref(null);
const rfupentry = ref(null);
const rfupay = ref(null);
const rfupbatch = ref(null);
const rfupgrant = ref(null);
const rfuplvl = ref(null);
const rfupcomp = ref(null);
const rfupavailment = ref(null);
const rfupstats = ref(null);
const rfupsem = ref(null);
const rfupyear = ref(null);
const rfupremarks = ref(null);
const rfupobligation = ref(null);
const rfupscholartype = ref(null);

// Graduate School
const rfupcouncil = ref(null);
const rfupgradschool = ref(null);
const rfupgradcourse = ref(null);
const rfupduration = ref(null);

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

const upgrant = ref(null);
const uplevel = ref(null);
const upscholarprog = ref(null);
const upcouncil = ref(null);
const upscholartype = ref(null);
const upsem = ref(null);

const upcourse = ref(null);
const upschool = ref(null);
const upscprog = ref(null);

const upavailment = ref(null);
const upyraward = ref(null);

const upay = ref(null);

// file Validation
const files = ref(null);

const state = reactive({
  upspasid: "",
  uplastname: "",
  upfirstname: "",
  upmidname: "",
  upsuffixname: "",
  upbirthdate: "",
  upgender: "M",
  upemailadd: "",
  upcontact: "",
  upAlternateEmail: "",

  uphousenum: "",
  upstreet: "",
  upsubdivision: "",
  upbarangay: "",
  updistrict: "",
  upregion: "",
  upmunicipality: "",
  upprovincecity: "",

  upunits: "",

  upschoolregion: "",
  upfield: "",
  upduration: "",

  upbatch: "",
  upcomp: "100m",

  upfsemone: "",
  upfstartdate: "",
  upfsemtwo: "",
  upfenddate: "",
  uplsemone: "",
  uplsemtwo: "",
  uplstartdate: "",
  uplenddate: "",

  upstatus: "",

  upremarks: "",
  upobligation: "",
  uptitle: "",
  upgraddate: "",
  uphonors: "",
  updissemination: "",
  upresearch: "",

  filedesc: "",
});

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

const availmentOptions = [
  { label: "NEW", value: "NEW" },
  { label: "DEFER", value: "DEFER" },
  { label: "NOT AVAILING", value: "NOT AVAILING" },
];

const ScholarshipProgram = [
  { label: "RA 7687", value: "RA 7687" },
  { label: "MERIT", value: "MERIT" },
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

const statsoptions = [
  { label: "Ongoing", value: "Ongoing", color: "primary" },
  { label: "Graduated", value: "Graduated", color: "primary" },
  { label: "Terminated", value: "Terminated", color: "primary" },
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
    name: "school_grad_status",
    required: true,
    label: "Status",
    align: "center",
    field: "school_grad_status",
    sortable: true,
  },
  {
    name: "sub_status",
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
    field: "actions",
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

// Showing Status

const statsOptions = ref();

onMounted(() => {
  populatestats();
});

const populatestats = () => {
  axios.get("/read.php?stats").then(function (response) {
    statsOptions.value = response.data;
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

// Showing Field of Courses

onMounted(() => {
  populateField();
});

const populateField = () => {
  state.upfield = upgradcourse.value?.field;
};

//Edit Scaholar

const showeditScholar = (props) => {
  state.upspasid = props.row.spas_id;

  upstats.value = props.row.school_grad_status;
  upsubstats.value = props.row.sub_status;
  state.uplastname = props.row.lname;
  state.upfirstname = props.row.fname;
  state.upmidname = props.row.mname;
  state.upsuffixname = props.row.suffix;

  state.upbirthdate = props.row.birthday;
  console.log(props.row.birthday);
  state.upgender = props.row.sex;
  state.upemailadd = props.row.email;
  state.upcontact = props.row.contact;
  saddressid.value = props.row.id;
  state.upAlternateEmail = props.row.alternate_email;

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
    upcourse.value = response.data.current_course;
    upschool.value = response.data.current_school;
    upscprog.value = response.data.scholarship_program;
    state.upunits = response.data.units;
    upentry.value = response.data.entry_level;
    upyraward.value = response.data.year + "";
    // console.log(
    //   state.upyraward,
    //   state.upyraward.length,
    //   typeof state.upyraward
    // );
    state.upbatch = response.data.batch;
  });

  axios.post("/read.php?editGradschool", formData).then(function (response) {
    state.upschoolregion = response.data.region;
    upgradschool.value = response.data.grad_school;
    upgradcourse.value = response.data.grad_course;
    upscholarprog.value = response.data.grad_program;
    state.upstatus = response.data.status;
  });

  axios.post("/read.php?editThesis", formData).then(function (response) {
    state.upduration = response.data.duration;
    state.upremarks = response.data.remarks;
    state.upfield = response.data.field;
    state.upobligation = response.data.servob;
    state.uptitle = response.data.title;
    upscholartype.value = response.data.school_type;
    state.upgraddate = response.data.grad_date;
    state.uphonors = response.data.honors;
    state.updissemination = response.data.dissemination;
    state.upresearch = response.data.research;
  });

  axios.post("/read.php?editScholarship", formData).then(function (response) {
    upgrant.value = response.data.grant_test;
    uplevel.value = response.data.level;
    state.upcomp = response.data.comp;
    upscholarprog.value = response.data.grad_program;
    upcouncil.value = response.data.council;
    upavailment.value = response.data.availment;
    upsem.value = response.data.sem;
    upay.value = response.data.award_year;
  });

  axios.post("/read.php?editDateSem", formData).then(function (response) {
    state.upfsemone = response.data.foreign_sem;
    state.upfstartdate = response.data.foreign_startdate;
    state.upfsemtwo = response.data.foreign_endsem;
    state.upfenddate = response.data.foreign_enddate;

    state.uplsemone = response.data.local_sem;
    state.uplstartdate = response.data.local_startdate;
    state.uplsemtwo = response.data.local_endsem;
    state.uplenddate = response.data.local_enddate;
  });
};

// Edit Scholar Information

const editSinfo = () => {
  // Scholar Info
  refspas.value.validate();
  reflname.value.validate();
  reffname.value.validate();
  refupmail.value.validate();
  rfupstats.value.validate();
  refcontact.value.validate();
  refbirth.value.validate();
  refsubstats.value.validate();
  refupmail.value.validate();
  // Scholar Address
  // rfzip.value.value.validate();
  refhousenum.value.validate();
  refstreet.value.validate();
  // Previous School
  rfupcourse.value.validate();
  rfupschool.value.validate();
  rfupscprog.value.validate();
  rfupunits.value.validate();
  // Other Scholarship Info
  rfupcouncil.value.validate();
  rfupgradschool.value.validate();
  rfupgradcourse.value.validate();
  rfupduration.value.validate();
  rfupscholarprog.value.validate();
  rfupentry.value.validate();
  rfupay.value.validate();
  rfupbatch.value.validate();
  rfupgrant.value.validate();
  rfuplvl.value.validate();
  rfupcomp.value.validate();
  rfupavailment.value.validate();
  rfupstats.value.validate();
  rfupsem.value.validate();
  rfupyear.value.validate();
  rfupremarks.value.validate();
  rfupobligation.value.validate();
  rfupscholartype.value.validate();

  if (
    refspas.value.hasError ||
    reflname.value.hasError ||
    reffname.value.hasError ||
    refupmail.value.hasError ||
    rfupstats.value.hasError ||
    refcontact.value.hasError ||
    refbirth.value.hasError ||
    refsubstats.value.hasError ||
    refupmail.value.hasError ||
    // Scholar Address
    // rfzip.value.value.hasError ||
    refhousenum.value.hasError ||
    refstreet.value.hasError ||
    // Previous School
    rfupcourse.value.hasError ||
    rfupschool.value.hasError ||
    rfupscprog.value.hasError ||
    rfupunits.value.hasError ||
    // Scholarship Informations
    rfupcouncil.value.hasError ||
    rfupgradschool.value.hasError ||
    rfupgradcourse.value.hasError ||
    rfupduration.value.hasError ||
    rfupscholarprog.value.hasError ||
    rfupentry.value.hasError ||
    rfupay.value.hasError ||
    rfupbatch.value.hasError ||
    rfupgrant.value.hasError ||
    rfuplvl.value.hasError ||
    rfupcomp.value.hasError ||
    rfupavailment.value.hasError ||
    rfupstats.value.hasError ||
    rfupsem.value.hasError ||
    rfupyear.value.hasError ||
    rfupremarks.value.hasError ||
    rfupobligation.value.hasError ||
    rfupscholartype.value.hasError
  ) {
    $q.notify({
      color: "negative",
      message: "Please complete the required input fields.",
      position: "top",
    });
  } else {
    // Personal Info Edit
    var formData = new FormData(document.getElementById("editSinfoForm"));
    formData.append("editScholarID", saddressid.value);

    axios
      .post("/update.php?updateScholarinfo", formData)
      .then(function (response) {
        if (response.data == true) {
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    // Address Edit

    axios
      .post("/update.php?updatescholarAddress", formData)
      .then(function (response) {
        if (response.data == true) {
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    // Previous School
    axios
      .post("/update.php?updateScholarschool", formData)
      .then(function (response) {
        if (response.data == true) {
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    // Scholarship Info 1

    axios
      .post("/update.php?updateScholarshipInfo", formData)
      .then(function (response) {
        if (response.data == true) {
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    // Scholarship Info 2

    axios
      .post("/update.php?updateScholarshipInfo2", formData)
      .then(function (response) {
        if (response.data == true) {
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    // Scholarship Info 3

    axios
      .post("/update.php?updateScholarshipInfo3", formData)
      .then(function (response) {
        if (response.data == true) {
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    //  Graduate School

    axios
      .post("/update.php?updateGradScholarschool", formData)
      .then(function (response) {
        if (response.data == true) {
          readOnscholars();
          readGradscholars();
          readTermscholars();
        } else {
          alert("Failed");
        }
      });

    // Update Date & SEM

    axios.post("/update.php?updateDateSem", formData).then(function (response) {
      if (response.data == true) {
        readOnscholars();
        readGradscholars();
        readTermscholars();
      } else {
        alert("Failed");
      }
    });

    // User Log

    formData.append("authname", user.username);
    formData.append("upspasid", state.upspasid);

    axios.post("/create.php?InsertLog", formData).then(function (response) {
      if (response.data == true) {
        showEditalert();
        readOnscholars();
        readGradscholars();
        readTermscholars();
      } else {
        alert("Failed");
      }
    });
  }
};

const generatePDF = () => {
  // Scholar Info
  refspas.value.validate();
  reflname.value.validate();
  reffname.value.validate();
  refupmail.value.validate();
  rfupstats.value.validate();
  refcontact.value.validate();
  refbirth.value.validate();
  refsubstats.value.validate();
  refupmail.value.validate();
  // Scholar Address
  // rfzip.value.value.validate();
  refhousenum.value.validate();
  refstreet.value.validate();
  // Previous School
  rfupcourse.value.validate();
  rfupschool.value.validate();
  rfupscprog.value.validate();
  rfupunits.value.validate();
  // Other Scholarship Info
  rfupcouncil.value.validate();
  rfupgradschool.value.validate();
  rfupgradcourse.value.validate();
  rfupduration.value.validate();
  rfupscholarprog.value.validate();
  rfupentry.value.validate();
  rfupay.value.validate();
  rfupbatch.value.validate();
  rfupgrant.value.validate();
  rfuplvl.value.validate();
  rfupcomp.value.validate();
  rfupavailment.value.validate();
  rfupstats.value.validate();
  rfupsem.value.validate();
  rfupyear.value.validate();
  rfupremarks.value.validate();
  rfupobligation.value.validate();
  rfupscholartype.value.validate();

  if (
    refspas.value.hasError ||
    reflname.value.hasError ||
    reffname.value.hasError ||
    refupmail.value.hasError ||
    rfupstats.value.hasError ||
    refcontact.value.hasError ||
    refbirth.value.hasError ||
    refsubstats.value.hasError ||
    refupmail.value.hasError ||
    // Scholar Address
    // rfzip.value.value.hasError ||
    refhousenum.value.hasError ||
    refstreet.value.hasError ||
    // Previous School
    rfupcourse.value.hasError ||
    rfupschool.value.hasError ||
    rfupscprog.value.hasError ||
    rfupunits.value.hasError ||
    // Scholarship Informations
    rfupcouncil.value.hasError ||
    rfupgradschool.value.hasError ||
    rfupgradcourse.value.hasError ||
    rfupduration.value.hasError ||
    rfupscholarprog.value.hasError ||
    rfupentry.value.hasError ||
    rfupay.value.hasError ||
    rfupbatch.value.hasError ||
    rfupgrant.value.hasError ||
    rfuplvl.value.hasError ||
    rfupcomp.value.hasError ||
    rfupavailment.value.hasError ||
    rfupstats.value.hasError ||
    rfupsem.value.hasError ||
    rfupyear.value.hasError ||
    rfupremarks.value.hasError ||
    rfupobligation.value.hasError ||
    rfupscholartype.value.hasError
  ) {
    $q.notify({
      color: "negative",
      message: "Please complete the required input fields.",
      position: "top",
    });
  } else {
    var formData = new FormData();
    formData.append("editScholarID", saddressid.value);

    axios
      .post("/update.php?printPDF", formData, { responseType: "blob" })
      .then(function (response) {
        var file = new Blob([response.data], { type: "application/pdf" });
        var fileURL = URL.createObjectURL(file);
        window.open(fileURL);
      });
  }
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
        docxUpload.value = false;
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
