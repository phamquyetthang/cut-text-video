<template>
  <v-toolbar flat dense color="blue-grey lighten-5">
    <v-toolbar-items>
      <v-btn text @click="changePath('/')">
        <v-icon class="mr-2">mdi-folder-multiple-outline</v-icon>
        {{ storage }}
      </v-btn>
      <template v-for="(segment, index) in pathSegments">
        <v-icon :key="index + '-icon'">mdi-chevron-right</v-icon>
        <v-btn
          text
          :input-value="index === pathSegments.length - 1"
          :key="index + '-btn'"
          @click="changePath(segment.path)"
          >{{ trimText(segment.name) }}</v-btn
        >
      </template>
    </v-toolbar-items>

    <div class="flex-grow-1"></div>
    <template v-if="$vuetify.breakpoint.smAndUp">
      <v-tooltip bottom v-if="pathSegments.length > 0" open-delay="500">
        <template v-slot:activator="{ on }">
          <v-btn icon @click="goUp" v-on="on">
            <v-icon>mdi-arrow-up-bold-outline</v-icon>
          </v-btn>
        </template>
        <span v-if="pathSegments.length === 1">Up to "root"</span>
        <span v-else
          >Up to "{{ pathSegments[pathSegments.length - 2].name }}"</span
        >
      </v-tooltip>
      <!-- {{ path}} -->
      <v-menu
        v-model="newFolderPopper"
        :close-on-content-click="false"
        :nudge-width="200"
        offset-y
        :key="path"
      >
        <template v-slot:activator="{ on }">
          <v-btn v-if="isFolder" v-on="on" icon title="Create Folder">
            <v-icon>mdi-folder-plus-outline</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-text>
            <v-text-field
              label="Name"
              v-model="newFolderName"
              hide-details
            ></v-text-field>
          </v-card-text>
          <v-card-actions>
            <div class="flex-grow-1"></div>
            <v-btn @click="newFolderPopper = false" depressed>Cancel</v-btn>
            <v-btn
              color="success"
              :disabled="!newFolderName"
              depressed
              @click="mkdir"
              >Create Folder</v-btn
            >
          </v-card-actions>
        </v-card>
      </v-menu>
      <v-btn
        v-if="path && isFolder"
        icon
        @click="$refs.inputUpload.click()"
        title="Upload Files"
      >
        <v-icon>mdi-plus-circle</v-icon>
        <input
          v-show="false"
          ref="inputUpload"
          type="file"
          multiple
          @change="addFiles"
        />
      </v-btn>
      <v-btn v-if="path" color="error" icon @click.stop="deleteItem()">
        <v-icon>mdi-delete-outline</v-icon>
      </v-btn>
    </template>
  </v-toolbar>
</template>

<script>
import StorageApi from "@/services/StorageApi";

export default {
  props: {
    storage: String,
    path: String,
    itemActive: Object
  },
  data() {
    return {
      newFolderPopper: false,
      newFolderName: "",
      menuKey: 0
    };
  },
  computed: {
    isFolder() {
      if (this.itemActive === null) {
        return true;
      }
      if (this.itemActive && this.itemActive.type === "file") {
        return false;
      }
      if (this.itemActive && this.itemActive.type === "dir") {
        return true;
      }
    },
    pathSegments() {
      let path = "/",
        isFolder = this.path[this.path.length - 1] === "/",
        segments = this.path.split("/").filter(item => item);

      segments = segments.map((item, index) => {
        path += item + (index < segments.length - 1 || isFolder ? "/" : "");
        return {
          name: item,
          path
        };
      });

      return segments;
    }
  },
  methods: {
    async deleteItem() {
      let result = await this.$swal.fire({
        icon: "question",
        title: `Xóa ${this.itemActive.type === "dir" ? "folder" : "file"}`,
        html: `<span>Bạn chắc chắn muốn xóa <span style="font-weight: bold">${this.itemActive.basename}</span> </span>`
      });
      if (result && result.isConfirmed) {
        this.$emit("loading", true);
        let path = this.path;
        await StorageApi.delete(path);
        this.itemActive.isDelete = true;
        this.$emit("folder-created", this.newFolderName);
        this.$emit("loading", false);
      }
    },
    trimText(text) {
      if (text.length > 10) {
        text =
          text.substring(0, 10) +
          "..." +
          text.substring(text.length - 4, text.length);
      }
      return text;
    },
    changePath(path) {
      if (path && path.startsWith("/")) {
        path = path.slice(1);
      }
      this.$emit("path-changed", path);
    },
    goUp() {
      let segments = this.pathSegments,
        path = segments.length === 1 ? "/" : segments[segments.length - 2].path;
      this.changePath(path);
    },
    async addFiles(event) {
      this.$emit("add-files", event.target.files);
      this.$refs.inputUpload.value = "";
    },
    async mkdir() {
      this.$emit("loading", true);
      let path = this.path + "/" + this.newFolderName;
      await StorageApi.mkdir(path);
      this.$emit("folder-created", this.newFolderName);
      this.newFolderPopper = false;
      this.newFolderName = "";
      this.$emit("loading", false);
    }
  }
};
</script>

<style scoped>
.storage-select-list .v-list-item--disabled {
  background-color: rgba(0, 0, 0, 0.25);
  color: #fff;
}
.storage-select-list .v-list-item--disabled .v-icon {
  color: #fff;
}
</style>



// WEBPACK FOOTER //
// src/screens/UserProfile/FileManager/Toolbar.vue