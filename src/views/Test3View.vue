<template>
  <div class="q-pa-md">
    <div class="col-xs-12 col-sm-6">
      <div class="q-col-gutter-md row">
        <div class="col-xs-12 col-sm-12 col-md-6">
          <q-card>Test</q-card>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
          <q-card>Test</q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from "quasar";

export default {
  setup() {
    const $q = useQuasar();

    return {
      triggerPositive() {
        $q.notify({
          type: "positive",
          message: 'This is a "positive" type notification.',
        });
      },

      triggerNegative() {
        $q.notify({
          type: "negative",
          message: 'This is a "negative" type notification.',
        });
      },

      triggerWarning() {
        $q.notify({
          type: "warning",
          message: 'This is a "warning" type notification.',
        });
      },

      triggerInfo() {
        $q.notify({
          type: "info",
          message: 'This is a "info" type notification.',
        });
      },

      triggerOngoing() {
        // we need to get the notification reference
        // otherwise it will never get dismissed ('ongoing' type has timeout 0)
        const notif = $q.notify({
          type: "ongoing",
          message: "Looking up the search terms...",
        });

        // simulate delay
        setTimeout(() => {
          notif({
            type: "positive",
            message: "Found the results that you were looking for",
            timeout: 1000,
          });
        }, 4000);
      },
    };
  },
};
</script>
