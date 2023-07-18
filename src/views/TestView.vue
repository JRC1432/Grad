<template>
  <div class="q-pa-md" style="max-width: 300px">
    <form @submit.prevent.stop="onSubmit" class="q-gutter-md">
      <q-input
        ref="nameRef"
        v-model="state.usernames"
        :dense="dense"
        label="UserName"
        name="usernames"
        lazy-rules
        :rules="inputRules"
      />

      <q-input
        ref="passRef"
        :type="isPwd ? 'password' : 'text'"
        v-model="state.password"
        label="Password"
        lazy-rules
        :rules="inputRules"
      >
        <template v-slot:prepend>
          <q-icon name="password" />
        </template>
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
      </q-input>

      <div>
        <q-btn label="Submit" type="submit" color="primary" />
        <!-- <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        /> -->
      </div>
    </form>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, reactive } from "vue";

const $q = useQuasar();
const isPwd = ref(true);

const nameRef = ref(null);
const passRef = ref(null);

const state = reactive({
  password: "",
  usernames: "",
});

const inputRules = [
  (val) => (val && val.length > 0) || "Please type something",
];

const onSubmit = () => {
  nameRef.value.validate();
  passRef.value.validate();

  if (nameRef.value.hasError || passRef.value.hasError) {
    // form has error
  } else {
    $q.notify({
      icon: "done",
      color: "positive",
      message: "Submitted",
    });
  }
};

// const onReset = () => {
//   name.value = null;
//   age.value = null;

//   nameRef.value.resetValidation();
//   passRef.value.resetValidation();
// };
</script>
