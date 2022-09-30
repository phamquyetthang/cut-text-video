<template>
  <v-card
    flat
    tile
    min-height="380"
    class="d-flex flex-column"
    style="height: 100%;"
  >
    <confirm ref="confirm"></confirm>
    <v-card-text
      v-if="!path"
      class="grow d-flex justify-center align-center grey--text"
      >Select a folder or a file</v-card-text
    >
    <v-card-text
      v-else-if="isFile"
      class="grow d-flex justify-center align-center container-image-preview"
    >
      <video
        class="image-preview"
        controls
        v-if="typeFile === 'video'"
        :src="url"
      ></video>
      <audio controls v-if="typeFile === 'audio'" :src="url"></audio>
      <img
        class="image-preview"
        v-if="typeFile === 'image'"
        :src="url"
        alt=""
      />
    </v-card-text>
    <v-card-text v-else-if="dirs.length || files.length" class="grow">
      <v-list subheader v-if="dirs.length">
        <v-subheader>Folders</v-subheader>
        <v-list-item
          v-for="item in dirs"
          :key="item.basename"
          @click="changePath(item.path)"
          class="pl-0"
        >
          <v-list-item-avatar class="ma-0">
            <v-icon>mdi-folder-outline</v-icon>
          </v-list-item-avatar>
          <v-list-item-content class="py-2">
            <v-list-item-title v-text="item.basename"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn icon @click.stop="deleteItem(item)">
              <v-icon color="grey lighten-1">mdi-delete-outline</v-icon>
            </v-btn>
            <v-btn icon v-if="false">
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
      <v-divider v-if="dirs.length && files.length"></v-divider>
      <v-list subheader v-if="files.length">
        <v-subheader>Files</v-subheader>
        <v-list-item
          v-for="item in files"
          :key="item.basename"
          @click="changePath(item.path)"
          class="pl-0"
        >
          <v-list-item-avatar class="ma-0">
            <v-icon>{{
              icons[item.extension.toLowerCase()] || icons["other"]
            }}</v-icon>
          </v-list-item-avatar>

          <v-list-item-content class="py-2">
            <v-list-item-title v-text="item.basename"></v-list-item-title>
            <v-list-item-subtitle>{{
              formatBytes(item.size)
            }}</v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon @click.stop="deleteItem(item)">
              <v-icon color="grey lighten-1">mdi-delete-outline</v-icon>
            </v-btn>
            <v-btn icon v-if="false">
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-card-text>
    <v-card-text
      v-else-if="filter"
      class="grow d-flex justify-center align-center grey--text py-5"
      >No files or folders found</v-card-text
    >
    <v-card-text
      v-else
      class="grow d-flex justify-center align-center grey--text py-5"
      >The folder is empty</v-card-text
    >
    <v-divider v-if="path"></v-divider>
    <v-toolbar v-if="false && path && isFile" dense flat class="shrink">
      <v-btn icon>
        <v-icon>mdi-download</v-icon>
      </v-btn>
    </v-toolbar>
    <v-toolbar v-if="path && isDir" dense flat class="shrink">
      <v-text-field
        solo
        flat
        hide-details
        label="Filter"
        v-model="filter"
        prepend-inner-icon="mdi-filter-outline"
        class="ml-n3"
      ></v-text-field>
      <v-btn icon v-if="false">
        <v-icon>mdi-eye-settings-outline</v-icon>
      </v-btn>
      <v-btn icon @click="load">
        <v-icon>mdi-refresh</v-icon>
      </v-btn>
    </v-toolbar>
  </v-card>
</template>

<script>
import Utils from "@/utils";
import Confirm from "./Confirm.vue";
import StorageApi from "@/services/StorageApi";
import constants from "../../../constants";

export default {
  props: {
    icons: Object,
    storage: String,
    path: String,
    refreshPending: Boolean,
    itemActive: Object,
    typeFileTarget: String
  },
  components: {
    Confirm
  },
  data() {
    return {
      items: [],
      filter: ""
    };
  },
  computed: {
    typeFile() {
      if (this.itemActive && this.itemActive.extension) {
        if (
          constants.EXT_IMAGE.includes(
            "." + this.itemActive.extension.toLowerCase()
          )
        ) {
          return "image";
        } else if (
          constants.EXT_AUDIO.includes(
            "." + this.itemActive.extension.toLowerCase()
          )
        ) {
          return "audio";
        } else if (
          constants.EXT_VIDEO.includes(
            "." + this.itemActive.extension.toLowerCase()
          )
        ) {
          return "video";
        }
      }
      return null;
    },
    url() {
      if (this.itemActive && this.itemActive.url) {
        return this.itemActive.url;
      }
    },
    dirs() {
      return this.items.filter(
        item => item.type === "dir" && item.basename.includes(this.filter)
      );
    },
    files() {
      return this.items.filter(
        item => item.type === "file" && item.basename.includes(this.filter)
      );
    },
    isDir() {
      return this.path[this.path.length - 1] === "/";
    },
    isFile() {
      return !this.isDir;
    }
  },
  methods: {
    formatBytes(bytes, decimals) {
      return Utils.formatBytes(bytes, decimals);
    },
    changePath(path) {
      this.$emit("path-changed", path);
    },
    async load() {
      this.$emit("loading", true);
      if (this.isDir) {
        let response = await StorageApi.list({
          path: this.path,
          typeFileTarget: this.typeFileTarget
        });
        if (response && response.status === 200) {
          this.items = response.data.data;
        } else {
          console.log(" Error: ", response);
          this.$swal.fire({
            icon: "error",
            message: "Lỗi Server"
          });
          this.items = [];
        }
      } else {
        // TODO: load file
      }
      this.$emit("loading", false);
    },
    async deleteItem(item) {
      let result = await this.$swal.fire({
        icon: "question",
        title: `Xóa ${item.type === "dir" ? "folder" : "file"}`,
        html: `<span>Bạn chắc chắn muốn xóa <span style="font-weight: bold">${item.basename}</span> </span>`
      });
      if (result && result.isConfirmed) {
        this.$emit("loading", true);
        await StorageApi.delete(item.path);
        this.$emit("file-deleted");
        this.$emit("loading", false);
      }
    }
  },
  watch: {
    async path() {
      this.items = [];
      await this.load();
    },
    async refreshPending() {
      if (this.refreshPending) {
        await this.load();
        this.$emit("refreshed");
      }
    }
  }
};
</script>

<style scoped>
.container-image-preview {
  padding: 30px;
}
.image-preview {
  object-fit: contain;
  width: 100%;
  height: auto;
  max-height: 500px;
}
</style>



// WEBPACK FOOTER //
// src/screens/UserProfile/FileManager/List.vue