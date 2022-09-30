<template>
  <v-dialog
    v-model="showModal"
    content-class="radius-20"
    scrollable
    max-width="800px"
    :persistent="isLoading"
  >
    <v-card>
      <v-overlay absolute :value="isLoading">
        <v-progress-circular
          :size="70"
          :width="7"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-overlay>

      <v-card-title>
        <div style="flex: 1" class="text-center mt-5">
          <h3 class="font-weight-bold">Tải lên Video</h3>
        </div>
        <v-btn
          icon
          @click="showModal = false"
          style="position: absolute; right: 10px; top: 10px"
          ><v-icon>mdi-close</v-icon></v-btn
        >
      </v-card-title>
      <v-card-text>
        <div
          id="vue-dropzone"
          class="d-block text-center"
          @click="$refs.inputVideoFile.click()"
        >
          <div>
            <v-icon size="52">mdi-cloud-upload-outline</v-icon>
          </div>
          <span class="mt-3 d-block font-weight-500 black--text"
            >Tải lên video</span
          >
          <span class="d-block mt-2">Click để chọn </span>
        </div>

        <div class="choose-items d-flex justify-space-around">
          <div
            class="text-center choose-item"
            @click="$refs.inputVideoFile.click()"
          >
            <v-icon class="d-block" size="38">mdi-folder-outline</v-icon>
            <span class="d-block mt-2">Desktop</span>
          </div>
          <div
            v-if="checkShowOptionsYTBGoogleDriver"
            class="text-center choose-item"
            @click="typeInputUrl = 'youtube'"
          >
            <v-icon class="d-block" size="38">mdi-youtube</v-icon>
            <span class="d-block mt-2">Youtube</span>
          </div>
          <div
            v-if="checkShowOptionsYTBGoogleDriver"
            class="text-center choose-item"
            @click="typeInputUrl = 'google-driver'"
          >
            <v-icon class="d-block" size="38">mdi-google-drive</v-icon>
            <span class="d-block mt-2">Google Driver</span>
          </div>
        </div>
        <div class="choose-items">
          <v-text-field
            v-if="
              typeInputUrl === 'youtube' || typeInputUrl === 'google-driver'
            "
            :prepend-inner-icon="
              typeInputUrl === 'youtube' ? 'mdi-youtube' : 'mdi-google-drive'
            "
            v-model="inputUrl"
            outlined
            append-icon="mdi-download"
            placeholder="Nhập link youtube"
            @click:append="onLoadUrlYoutubeGoogleDriver"
            @keydown.enter="onLoadUrlYoutubeGoogleDriver"
          ></v-text-field>
        </div>
      </v-card-text>
    </v-card>
    <input
      type="file"
      ref="inputVideoFile"
      name="inputVideoFile"
      id="inputVideoFile"
      hidden
      :accept="getAcceptType"
      @change="onSelectFile"
      multiple
    />
  </v-dialog>
</template>
<script>
import Utils from "@/utils";
import ServiceApi from "@/services/ServiceApi";

export default {
  data() {
    return {
      showModal: false,
      typeInputUrl: "local",
      inputUrl: "",
      isLoading: false
    };
  },
  props: {
    typeInput: { type: String, default: "video" },
    typeParent: { type: String }
  },
  computed: {
    checkShowOptionsYTBGoogleDriver() {
      if (this.typeParent === "EXPORT_SUBTITLE") {
        return false;
      }
      return true;
    },
    getAcceptType() {
      let accept = "";
      if (!this.typeInput) {
        return (accept = "*");
      }
      if (this.typeInput.includes("video")) {
        accept += "video/mp4,";
      }
      if (this.typeInput.includes("image")) {
        accept += "image/png, image/jpeg,image/gif";
      }
      if (this.typeInput.includes("audio")) {
        accept += "audio/mp3,audio/wav";
      }
      return accept;
    }
  },
  methods: {
    async onLoadUrlYoutubeGoogleDriver() {
      this.isLoading = true;
      let urlVideo = this.inputUrl;
      if (urlVideo !== "") {
        let newVideo = {
          id: Utils.generateKey(),
          name: "Loading...",
          date: "Loading...",
          size: "Loading...",
          typeFile: "Loading...",
          url: "",
          thumbnail:
            "https://getuikit.com/v2/docs/images/placeholder_600x400.svg",
          resolution: {
            width: 0,
            height: 0,
            display: "Loading..."
          },
          duration: {
            value: 0,
            display: "Loading..."
          },
          activeSplitTimeIndex: 0,
          isLoading: true,
          filter: {
            crop: {
              ratio: "",
              x: 0,
              y: 0,
              width: 0,
              height: 0
            },
            rotate: 0,
            quality: "Loading..."
          }
        };
        try {
          let res = await ServiceApi.getInfoVideoYoutubeDL({
            urlVideo: urlVideo
          });
          if (res && res.status === 200) {
            let info = res.data;
            info.duration = info.duration
              ? parseFloat(info.duration.toFixed(2))
              : 0;
            newVideo = {
              urlOriginal: info.webpageUrl,
              id: newVideo.id,
              name: info.title,
              date: "",
              size: info.size ? Utils.bytesToSize(info.size) : "",
              typeFile: this.typeInput,
              url: info.url,
              thumbnail: info.thumbnail,
              resolution: {
                width: info.width,
                height: info.height,
                display: info.width + "x" + info.height
              },
              duration: {
                value: info.duration,
                display: info.duration ? Utils.secondsToHms(info.duration) : ""
              },
              typeUrl: this.linkVideoType
            };
            if (!newVideo.duration.value || !newVideo.resolution.width) {
              try {
                let dataVideo = await Utils.getInfoVideoByUrl(info.url);
                if (dataVideo && dataVideo.duration) {
                  newVideo = {
                    ...newVideo,
                    duration: {
                      value: dataVideo.duration,
                      display: Utils.secondsToHms(dataVideo.duration)
                    },
                    resolution: {
                      width: dataVideo.width,
                      height: dataVideo.height,
                      display: dataVideo.width + "x" + dataVideo.height
                    }
                  };
                }
              } catch (error) {
                newVideo.resolution = {
                  width: 1280,
                  height: 720,
                  display: 1280 + "x" + 720
                };
              }
            }
            this.$emit("pushNewVideo", newVideo);
            this.$swal.fire({
              icon: "success",
              title: "Get Video Success",
              showConfirmButton: false,
              timer: 800
            });
            this.hide();
          } else {
            this.$emit("pushNewVideo", newVideo, "error");
            this.$swal.fire({
              icon: "error",
              title: "Server is Overload",
              showConfirmButton: false
            });
          }
        } catch (error) {
          this.$swal.fire({
            icon: "error",
            title: "Error " + error,
            showConfirmButton: true
          });
          this.$emit("pushNewVideo", newVideo, "error");
        }
      }
      this.isLoading = false;
    },
    show() {
      this.showModal = true;
    },
    hide() {
      this.showModal = false;
    },
    async onSelectFile(event) {
      this.isLoading = true;
      if (!this.$refs.inputVideoFile || !this.$refs.inputVideoFile.files)
        return;
      let listFiles = this.$refs.inputVideoFile.files;

      for (let index = 0; index < listFiles.length; index++) {
        try {
          let file = listFiles[index];
          let newId = Utils.generateKey();
          await this.loadInfoFileAsync(file, this, newId);
        } catch (error) {}
      }
      this.isLoading = false;
      event.target.value = "";

      this.hide();
    },

    async loadInfoFileAsync(file, vueInstance, idItem) {
      return new Promise((resolve, reject) => {
        try {
          let url = URL.createObjectURL(file);
          let newFile = {
            id: idItem,
            file: file,
            name: file.name,
            date: this.$moment(file.lastModifiedDate).format("DD/MM/YYYY"),
            size: Utils.bytesToSize(file.size),
            typeFile: this.typeInput,
            url: url,
            thumbnail: "",
            resolution: {
              width: 0,
              height: 0,
              display: "0x0"
            },
            duration: {
              value: 0,
              display: ""
            },

            typeUrl: "local"
          };
          if (file && file.type.includes("image")) {
            var imgRender = new Image();
            imgRender.addEventListener("load", function() {
              newFile = {
                ...newFile,
                typeFile: "image",
                resolution: {
                  width: imgRender.naturalWidth,
                  height: imgRender.naturalHeight,
                  display:
                    imgRender.naturalWidth + "x" + imgRender.naturalHeight
                }
              };
              vueInstance.$emit("pushNewVideo", newFile);
              resolve(true);
            });
            imgRender.src = url;
          } else {
            let video = document.createElement("video");
            video.addEventListener("error", function(error) {
              console.log(" #### error: ", error);
              vueInstance.$emit("pushNewVideo", newFile, "error");
              vueInstance.$swal.fire({
                icon: "error",
                title: "Lỗi.! Kiểm tra url video",
                showConfirmButton: true
              });
              reject(error);
            });
            video.addEventListener("loadedmetadata", () => {
              let durationVideo = parseFloat(video.duration.toFixed(2));
              newFile = {
                ...newFile,
                typeFile: "video",
                duration: {
                  value: durationVideo,
                  display: Utils.secondsToHms(durationVideo)
                },
                resolution: {
                  width: video.videoWidth,
                  height: video.videoHeight,
                  display: video.videoWidth + "x" + video.videoHeight
                }
              };
              vueInstance.$emit("pushNewVideo", newFile);
              video.remove();
              return resolve(true);
            });
            video.src = url;
          }
        } catch (error) {
          console.log(" #### error: ", error);
          vueInstance.$swal.fire({
            icon: "error",
            title: "Lỗi.! Kiểm tra url video",
            showConfirmButton: true
          });
          reject(error);
        }
      });
    }
  },
  mounted() {}
};
</script>

<style scoped>
.dialog {
  border-radius: 20px !important;
}

#vue-dropzone {
  background-color: white;
  margin: 30px 100px;
  margin-top: 40px;
  border: 1.5px dashed rgb(223, 224, 229);
  border-radius: 10px;
  cursor: pointer;
  padding: 60px 0;
}

#vue-dropzone:hover {
  border: 1.5px dashed rgb(0, 153, 255);
  background-color: rgba(199, 229, 250, 0.596);
}
.dropzone-custom-content > span {
  font-weight: 400;
  color: rgb(122, 122, 122);
}

.choose-items {
  margin: 30px 100px;
}

.choose-item {
  cursor: pointer;
  width: 120px;
  height: 100px;
  padding: 15px 0px;
  border: 1.5px solid rgb(223, 224, 229);
  border-radius: 15px;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
}
.choose-item:hover {
  transform: scale(1.1);
}
</style>



// WEBPACK FOOTER //
// src/components/ModalUploadFile.vue