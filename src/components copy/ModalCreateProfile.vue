<template>
  <v-dialog
    v-model="showDialog"
    content-class="radius-20"
    max-width="500px"
    :persistent="isLoading"
    scrollable
  >
    <v-card>
      <v-card-title class="mt-2">
        <div style="flex: 1" class="text-center">
          <h3 class="font-weight-bold">
            Tạo Profile
          </h3>
        </div>
        <v-btn
          icon
          @click="showDialog = false"
          style="position: absolute; right: 10px; top: 10px"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <div class="d-flex align-center">
          <span class="black-text font-weight-bold fs-16 mr-4"
            >Tên Profile:</span
          >
          <v-text-field placeholder="Nhập tên Profile" v-model="profile.name" />
        </div>
        <div class="d-flex align-center">
          <span class="black-text font-weight-bold fs-16 mr-4"
            >Độ phân giải:</span
          >
          <v-text-field
            class="mr-5"
            label="Width"
            placeholder="Nhập Width: (VD: 1280)"
            v-model="profile.width"
            max="8000"
            min="1"
            type="number"
            style="width: 50px"
          />
          <span class="black-text font-weight-bold fs-16 mr-4">X</span>
          <v-text-field
            label="Height"
            placeholder="Nhập height: (VD: 720)"
            v-model="profile.height"
            max="8000"
            min="1"
            type="number"
          />
        </div>
      </v-card-text>
      <v-card-actions class="d-block text-center pb-5">
        <v-btn
          class="mx-2 px-8"
          color="primary"
          :loading="isLoading"
          @click="onCreateClick"
          >Tạo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ProfileRenderApi from "@/services/ProfileRenderApi";

export default {
  name: "modal-create-profile",
  data() {
    return {
      showDialog: false,
      profile: {
        name: "",
        width: 1280,
        height: 720,
        bitrateVideo: 3000,
        bitrateAudio: 192,
        fps: 30,
        crf: 18,
        deinterlace: true,
        preset: "veryfast"
      },
      isLoading: false
    };
  },
  methods: {
    show() {
      this.profile = {
        name: "",
        width: 1280,
        height: 720,
        bitrateVideo: 4000,
        bitrateAudio: 192,
        fps: 30,
        crf: 18,
        deinterlace: true,
        preset: "medium"
      };
      this.showDialog = true;
    },

    hideModal() {
      this.showDialog = false;
    },
    async onCreateClick() {
      try {
        this.isLoading = true;
        let res = await ProfileRenderApi.createProfile({
          profile: this.profile
        });
        if (res && res.status === 200) {
          let listProfile = res.data.listProfile;
          let newProfile = res.data.newProfile;
          this.$store.dispatch("updateProfileRender", listProfile);
          this.$emit("setSelected", newProfile);
          await this.$notify({
            type: "success",
            title: "Tạo Profile Thành Công !"
          });
          this.hideModal();
        } else {
          this.$swal.fire({
            icon: "error",
            text: "Error",
            showConfirmButton: true
          });
        }
      } catch (error) {
        this.$swal.fire({
          icon: "error",
          text: error,
          showConfirmButton: true
        });
      }
      this.isLoading = false;
    }
  },
  created() {},
  mounted() {}
};
</script>

<style scoped>
.footer {
  justify-content: flex-end;
  padding: 10px;
}
</style>



// WEBPACK FOOTER //
// src/components/ModalCreateProfile.vue