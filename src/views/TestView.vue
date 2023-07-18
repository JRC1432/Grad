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
        :error="confirmpass"
      >
      </q-input>

      <q-input
        ref="passRef"
        :type="isPwd ? 'password' : 'text'"
        label="Password"
        v-model="state.password"
        lazy-rules
        :rules="inputpassRules"
        :error="confirmpass"
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
import { ref, reactive, computed } from "vue";

const $q = useQuasar();
const isPwd = ref(true);

const nameRef = ref(null);
const passRef = ref(null);
const password = ref();
const usernames = ref();

const state = reactive({
  password: "",
  usernames: "",
});

const inputRules = [
  (val) => (val && val.length > 0) || "Please type something",
];

const inputpassRules = [
  (val) => !!val || "Field is required",
  (val) => val.length >= 6 || "Please use minimum of 6 characters",
];

const confirmpass = computed(() => state.usernames !== state.password);

const onSubmit = () => {
  nameRef.value.validate();
  passRef.value.validate();

  console.log(nameRef.value);
  console.log(passRef.value);

  if (nameRef.value.hasError || passRef.value.hasError) {
    // form has error
    alert("An error occured");
  } else {
    $q.notify({
      icon: "done",
      color: "positive",
      message: "Submitted",
    });
  }
};
</script>
