<template>
  <v-app>
    <v-main>
      <CaptureTextOnVideo/>
    </v-main>
  </v-app>
</template>

<script>
import CaptureTextOnVideo from './components/CaptureTextOnVideo.vue';

export default {
  name: 'App',

  components: {
    CaptureTextOnVideo
},

  data: () => ({
    //
  }),
};
</script>
