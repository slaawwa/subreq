<template>
  <div>
    <v-snackbar
      data-timeout="-1"
      v-model="m.snackbar"
      data-absolute
      data-top
      right
      data-vertical
      color="red accent-2"
      transition="v-scale-transition"
      v-for="(m, index) of message.filter(m => m.snackbar)"
      :key="index + Math.random()"
      :style="{ bottom: `${(index * 75) + 8}px` }"
    >
      <h3 v-if="m.title">{{ m.title }}</h3>
      {{ m.text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="indigo"
          text
          v-bind="attrs"
          @click="m.snackbar = false"
        >
          X
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      message: [],
    }
  },
  watch: {
    message(msgs/* , oldMsgs */) {
      const msgsForDelete = msgs.filter(({ snackbar }) => !snackbar)
      if (msgsForDelete.length) {
        setTimeout(() => {
          this.message = this.message.filter(m => !msgsForDelete.includes(m))
        }, 350);
      }
      // console.log(' - this.msgs:23 >', this.message.length); // eslint-disable-line no-console
      // console.log(' - msgs:23 >', msgs.length); // eslint-disable-line no-console
      // console.log(' - oldMsgs:23 >', oldMsgs.length); // eslint-disable-line no-console
    },
  },
  mounted() {
    Vue.prototype.$noti = (msg) => {
      this.message.push(msg)
    }
  },
}

</script>
