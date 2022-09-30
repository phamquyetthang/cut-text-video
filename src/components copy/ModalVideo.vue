<template>
  <div>
    <v-dialog v-model="showDialog" max-width="900px">
      <v-card>
        <v-card-title>
          {{ titleModal }}
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <video
            style="max-height: 500px;"
            :src="urlVideo + '?' + Date.now()"
            class="video-modal"
            controls
          ></video>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urlVideo: "",
      titleModal: "",
      showDialog: false
    };
  },
  methods: {
    showModal(video) {
      this.urlVideo = video.videoSuccess;
      this.titleModal = video ? video.name : "Video";
      this.showDialog = true;
    },

    hideModal() {
      this.showDialog = false;
    }
  }
};
</script>

<style scoped>
.video-modal {
  width: 100%;
  height: 100%;
}
</style>



// WEBPACK FOOTER //
// src/components/ModalVideo.vue