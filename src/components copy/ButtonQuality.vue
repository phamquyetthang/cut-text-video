<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          :color="error ? 'error' : 'primary'"
          class="font-weight-bold px-5"
          v-bind="attrs"
          v-on="on"
          outlined
          style="font-size: 16px; min-width: 110px"
        >
          <span class="text-truncate" style="max-width: 200px">
            {{ (selected && selected.name) || `Chọn độ phân giải` }}</span
          >
        </v-btn>
      </template>
      <v-list class="menu_items" style="max-height: 500px; overflow-y: auto">
        <v-list-item
          v-for="item in listProfile"
          :key="item._id"
          link
          class="item-quality pl-2"
          @click="onSelectItem(item)"
        >
          <v-list-item-title class="white--text d-flex align-center">
            <span
              v-if="selected && selected._id === item._id"
              class="active-icon mr-1"
            ></span>
            <span v-else class="not-active-icon mr-1"></span>

            <span
              class="text-truncate mr-16 ml-2"
              style="font-size: 14px; max-width: 150px"
              :class="{
                'active-quality': selected && selected._id === item._id,
              }"
              >{{ item.name }}</span
            >
            <span
              style="
                opacity: 50%;
                font-size: 12px;
                position: absolute;
                right: 35px;
              "
              :class="{
                'active-quality': selected && selected._id === item._id,
              }"
              >{{ item.qualityName }}</span
            >
            <v-btn
              v-if="item.value !== 'create' && item.type !== 'default'"
              @click="removeProfile(item)"
              icon
              style="position: absolute; right: 0px; color: red"
            >
              <v-icon size="18"> mdi-trash-can-outline </v-icon>
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <ModalCreateProfile
      :isLoading="isLoading"
      ref="ModalCreateProfile"
      @setSelected="setSelected"
    ></ModalCreateProfile>
  </div>
</template>

<script>
import ProfileRenderApi from "../services/ProfileRenderApi";
import ModalCreateProfile from "./ModalCreateProfile";

export default {
  name: "button-quality",
  components: {
    ModalCreateProfile,
  },
  data() {
    return {
      selected: null,
      isLoading: false,
    };
  },
  props: {
    value: { type: String, default: "" },
    resolutionRate: {},
    error: { type: Boolean, default: false },
    resolutionRate: {},
  },
  computed: {
    listProfile() {
      let listProfile = this.$store.state.data.listProfile;
      if (this.resolutionRate) {
        listProfile = listProfile.filter((item) => {
          let resolution = item.quality.width / item.quality.height;
          return resolution === this.resolutionRate;
        });
      }

      listProfile = listProfile.map((item) => {
        let qualityName = "";
        switch (item.quality.height) {
          case 2160:
            qualityName = "4K";
            break;
          case 1440:
            qualityName = "2K";
            break;
          case 1080:
            qualityName = "Full HD";
            break;
          case 720:
            qualityName = "HD";
            break;
          case 480:
            qualityName = "480p";
            break;
          case 360:
            qualityName = "360p";
            break;
          case 240:
            qualityName = "240p";
            break;
        }
        return {
          ...item,
          name: item.name && item.name !== "default" ? item.name : qualityName,
          qualityName,
        };
      });

      listProfile.push({ name: "Tạo mới", value: "create" });
      return listProfile;
    },
  },
  mounted() {
    if (this.value) {
      let listProfile = this.listProfile;
      this.selected = listProfile.find((x) => x._id === this.value);
    }
  },
  methods: {
    setSelected(profile) {
      this.selected = profile;
      this.$emit("onChange", profile._id);
    },
    onSelectItem(item) {
      if (item.value === "create") {
        this.$refs.ModalCreateProfile.show();
      } else {
        this.selected = item;
        this.$emit("onChange", item._id);
      }
    },

    onSelectCreate() {
      this.$refs.modalCreateProfile.showModal();
    },

    async removeProfile(profile) {
      event.stopPropagation();
      // event.stopPropagation();
      await this.$swal
        .fire({
          icon: "question",
          title: "Xóa Profile",
          html: `<span>Bạn muốn xóa Profile: <span class="font-weight-bold">${profile.name}</span></span>`,
          showConfirmBotton: true,
          showCancelButton: true,
        })
        .then(async (result) => {
          if (result && result.value === true) {
            let res = await ProfileRenderApi.deleteProfile({
              idProfile: profile._id,
            });
            if (!res || res.status !== 200) {
              this.$swal.fire({
                icon: "error",
                title: "Lỗi Xóa Profile",
                showConfirmButton: true,
              });
            } else {
              let listProfile = this.$store.state.data.listProfile;
              listProfile = listProfile.filter(
                (item) => item._id != profile._id
              );
              this.$store.dispatch("updateProfileRender", listProfile);
            }
          }
        });
    },
  },
};
</script>
<style scoped>
.item-quality:hover {
  background-color: rgba(255, 255, 255, 0.3) !important;
}
.menu_items {
  max-width: 300px;
  background-color: rgba(25, 30, 64, 0.95) !important;
  color: #fff !important;
}
.active-quality {
  color: #40f771 !important;
}
.active-icon {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #40f771 !important;
}
.not-active-icon {
  width: 10px;
  height: 10px;
}
</style>



// WEBPACK FOOTER //
// src/components/ButtonQuality.vue