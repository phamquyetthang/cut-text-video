<template>
  <v-dialog
    v-model="showDialog"
    scrollable
    :persistent="isLoading"
    max-width="500px"
  >
    <v-card>
      <v-card-title class="d-block">
        <div class="d-flex justify-center">
          <span class="h3 font-weight-bold">Tạo tài khoản</span>
          <v-btn
            icon
            @click="showDialog = false"
            style="position: absolute; right: 10px; top: 10px;"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-text-field
          label="Tên config"
          v-model="name"
          placeholder="Nhập tên config"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions class="d-block text-center pb-5 ">
        <v-btn
          :disabled="isLoading"
          class="px-5 ml-3"
          @click="showDialog = false"
          >Hủy</v-btn
        >
        <v-btn
          color="primary"
          :loading="isLoading"
          class="px-8"
          @click="onCreate()"
          >Tạo</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import VoiceApi from "@/services/VoiceApi";
import Utils from '../../utils';

export default {
  data() {
    return {
      showDialog: false,
      name: null,
      isLoading: null,
      dataVoice: null
    };
  },
  methods: {
    reset() {
      this.isLoading = false;
      this.name = null;
    },
    show(dataVoice) {
      this.reset();
      this.dataVoice = dataVoice;
      this.showDialog = true;
    },
    hide() {
      this.showDialog = false;
    },
    async onCreate() {
      try {
        if (!this.name) {
          this.$notify({
            title: "Chưa Điền Đủ Thông Tin",
            type: "warn"
          });
          return;
        }
        this.isLoading = true;
        let payload = {
          name: this.name,
          ...this.dataVoice
        };
        let res = await VoiceApi.addConfig(payload);
        if (res.status === 200 && res.data.newConfig) {
          let newConfig = {
            ...res.data.newConfig,
            data: JSON.parse(res.data.newConfig.data)
          };
          let listVoice = [
            ...this.$store.state.data.listVoiceConfig,
            newConfig
          ];
          this.$store.dispatch("updateListConfigVoice", listVoice);
          this.$notify({
            type: "success",
            text: "Tạo Thành Công"
          });
          this.$emit("setIdConfigSelected", newConfig._id);
          this.hide();
        }
      } catch (error) {
        this.$notify({
          title: "Lỗi " + error.message,
          type: "error"
        });
      }
      this.isLoading = false;
    }
  }
};
</script>

<style></style>



// WEBPACK FOOTER //
// src/components/ModalSettingVoice/ModalCreateConfigVoice.vue