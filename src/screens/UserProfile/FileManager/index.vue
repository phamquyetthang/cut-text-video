<template>
  <v-container fluid class="">
    <!-- <div class="text-center">
      <h1>Quản lý file</h1>
    </div> -->

    <div>
      <v-card class="mx-auto" :loading="loading > 0">
        <toolbar
          :path="path"
          :storage="activeStorage"
          v-on:storage-changed="storageChanged"
          v-on:path-changed="pathChanged"
          v-on:add-files="addUploadingFiles"
          v-on:folder-created="refreshPending = true"
          v-on:loading="loadingChanged"
          :itemActive="itemActive"
        ></toolbar>

        <div class="d-flex flex-row">
          <div style="flex: 1 0 300px; overflow: auto;">
            <tree
              :typeFileTarget="typeFileTarget"
              :path="path"
              :storage="activeStorage"
              :icons="icons"
              :refreshPending="refreshPending"
              v-on:path-changed="pathChanged"
              v-on:loading="loadingChanged"
              v-on:refreshed="refreshPending = false"
              @setItemActive="setItemActive"
              :itemActive="itemActive"
            ></tree>
          </div>
          <v-divider v-if="tree" style="z-index: 2" vertical></v-divider>

          <div style="flex: 3 0 300px">
            <list
              :typeFileTarget="typeFileTarget"
              :itemActive="itemActive"
              :path="path"
              :storage="activeStorage"
              :icons="icons"
              :refreshPending="refreshPending"
              v-on:path-changed="pathChanged"
              v-on:loading="loadingChanged"
              v-on:refreshed="refreshPending = false"
              v-on:file-deleted="refreshPending = true"
            ></list>
          </div>
        </div>
        <upload
          v-if="uploadingFiles !== false"
          :path="path"
          :storage="activeStorage"
          :files="uploadingFiles"
          :icons="icons"
          :maxUploadFilesCount="maxUploadFilesCount"
          :maxUploadFileSize="maxUploadFileSize"
          v-on:add-files="addUploadingFiles"
          v-on:remove-file="removeUploadingFile"
          v-on:clear-files="uploadingFiles = []"
          v-on:cancel="uploadingFiles = false"
          v-on:uploaded="uploaded"
        ></upload>
      </v-card>
    </div>
  </v-container>
</template>

<script>
import Toolbar from "./Toolbar.vue";
import Tree from "./Tree.vue";
import List from "./List.vue";
import Upload from "./Upload.vue";

const fileIcons = {
  zip: "mdi-folder-zip-outline",
  rar: "mdi-folder-zip-outline",
  htm: "mdi-language-html5",
  html: "mdi-language-html5",
  js: "mdi-nodejs",
  json: "mdi-json",
  md: "mdi-markdown",
  pdf: "mdi-file-pdf",
  png: "mdi-file-image",
  jpg: "mdi-file-image",
  jpeg: "mdi-file-image",
  mp4: "mdi-filmstrip",
  mkv: "mdi-filmstrip",
  avi: "mdi-filmstrip",
  wmv: "mdi-filmstrip",
  mov: "mdi-filmstrip",
  txt: "mdi-file-document-outline",
  xls: "mdi-file-excel",
  mp3: "mdi-file-music-outline",
  other: "mdi-file-outline"
};

export default {
  components: {
    Toolbar,
    Tree,
    List,
    Upload
  },
  model: {
    prop: "path",
    event: "change"
  },
  props: {
    typeFileTarget: { type: String },
    // show tree view
    tree: { type: Boolean, default: true },
    // file icons set
    icons: { type: Object, default: () => fileIcons },
    // max files count to upload at once. Unlimited by default
    maxUploadFilesCount: { type: Number, default: 0 },
    // max file size to upload. Unlimited by default
    maxUploadFileSize: { type: Number, default: 2147483648 }
  },
  data() {
    return {
      loading: 0,
      path: "",
      activeStorage: null,
      uploadingFiles: false, // or an Array of files
      refreshPending: false,
      itemActive: null
    };
  },
  computed: {
    storage() {
      return this.$store.state.user.username;
    }
  },
  methods: {
    setItemActive(itemActive) {
      this.itemActive = itemActive;
    },
    loadingChanged(loading) {
      if (loading) {
        this.loading++;
      } else if (this.loading > 0) {
        this.loading--;
      }
    },
    storageChanged(storage) {
      this.activeStorage = storage;
    },
    addUploadingFiles(files) {
      files = Array.from(files);

      if (this.maxUploadFileSize) {
        files = files.filter(file => file.size <= this.maxUploadFileSize);
      }

      if (this.uploadingFiles === false) {
        this.uploadingFiles = [];
      }

      if (
        this.maxUploadFilesCount &&
        this.uploadingFiles.length + files.length > this.maxUploadFilesCount
      ) {
        files = files.slice(
          0,
          this.maxUploadFilesCount - this.uploadingFiles.length
        );
      }

      this.uploadingFiles.push(...files);
    },
    removeUploadingFile(index) {
      this.uploadingFiles.splice(index, 1);
    },
    uploaded() {
      this.uploadingFiles = false;
      this.refreshPending = true;
    },
    pathChanged(path) {
      this.path = path;
      this.$emit("change", path);
    }
  },
  created() {
    this.activeStorage = this.storage;
  },
  mounted() {
    if (!this.path && !(this.tree && this.$vuetify.breakpoint.smAndUp)) {
      this.pathChanged("/");
    }
  }
};
</script>

<style scoped></style>



// WEBPACK FOOTER //
// src/screens/UserProfile/FileManager/index.vue