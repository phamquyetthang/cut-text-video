<template>
  <div style="max-width: 1400px; margin: auto">
    <div class="d-flex justify-center align-center">
      <div class="text-center">
        <div class="mb-2">
          <h1 class="font-weight-bold black--text my-3">
            Lấy text trong video
          </h1>
        </div>
        <div class="mb-2 text-center">
          <span class="font-weight-bold ml-2"
            >*Danh sách ngôn ngữ hỗ trợ:
          </span>
          <span
            >Trung Quốc, Hà Lan, Anh, Pháp, Đức, Ý, Nhật, Bồ Đào Nha, Tây Ba
            Nha</span
          >
        </div>
        <v-btn
          class="btn-default"
          large
          @click="$refs.modalInputFile.show()"
          v-if="videoData && videoData.url"
        >
          Chọn Video Khác
        </v-btn>
        <div v-else class="text-center">
          <v-btn class="btn-default" large @click="$refs.modalInputFile.show()">
            Tải Lên Video
          </v-btn>
        </div>
      </div>
    </div>
    <div v-if="videoData && videoData.url">
      <div class="d-flex px-5 mt-5">
        <div
          ref="containerVideo"
          id="container-video"
          class="border reset"
          :style="getStyleParent"
        >
          <canvas id="canvas"></canvas>
          <video
            ref="videoPlay"
            id="videoPlay"
            style="width: 100%; height: 100%"
            :src="videoData.url"
            @timeupdate="OnTimeUpdate"
            @play="onVideoPlay"
            @loadedmetadata="onLoadedMeradata"
            controls
            hidden
          ></video>
          <vue-draggable-resizable
            v-if="videoLoaded"
            :key="keyUpdateRange"
            :min-width="10"
            :min-height="10"
            class-name="drag-resize-item-active"
            :active="true"
            :parent="true"
            @dragstop="onDragStop"
            @resizestop="onResizeStop"
            @dragging="onDragStop"
            @resizing="onResizeStop"
            :x="
              videoData && videoData.x && layoutMainWidth
                ? videoData.x * layoutMainWidth
                : 0
            "
            :y="
              videoData && videoData.y && layoutMainWidth
                ? videoData.y * layoutMainHeight
                : 0
            "
            :w="
              videoData && videoData.width && layoutMainWidth
                ? videoData.width * layoutMainWidth
                : 600
            "
            :h="
              videoData && videoData.height && layoutMainWidth
                ? videoData.height * layoutMainHeight
                : 100
            "
          >
            <div
              id="xxx"
              style="width: 100%; height: 100%; object-fit: fill"
            ></div>
          </vue-draggable-resizable>
        </div>
      </div>
      <div
        class="d-flex mx-5 justify-space-around"
        style="border: 1px dashed gray"
      >
        <v-btn icon @click="previousTime">
          <v-icon color="black">mdi-skip-previous</v-icon>
        </v-btn>
        <v-btn icon v-if="!isPlay" @click="onClickPlay">
          <v-icon color="black"> mdi-play</v-icon>
        </v-btn>
        <v-btn v-else icon @click="onClickPause">
          <v-icon color="black">mdi-pause</v-icon>
        </v-btn>

        <v-btn icon @click="onNextTime">
          <v-icon color="black">mdi-skip-next</v-icon>
        </v-btn>
        <v-btn icon @click="onClickStopVideo">
          <v-icon color="black">mdi-replay</v-icon>
        </v-btn>
        <div
          class="timer text-center"
          style="min-width: 150px; max-width: 150px"
        >
          <span class="font-weight-bold fs-xl black--text">{{
            getTimeVideo
          }}</span>
        </div>
        <div class="d-flex mx-4 justify-center align-center">
          <span>Next-time: </span>
          <v-text-field
            v-model="nextTime"
            type="number"
            style="width: 70px"
            outlined
            hide-details
            dense
          />
        </div>
      </div>
      <div class="mx-5">
        <textarea
          style="border: 1px solid gray; width: 100%; text-align: center"
          rows="3"
          :style="`font-size: ${fontSizeResult}px !important;`"
          v-model="textPreview"
        ></textarea>
      </div>

      <canvas id="imagePreview" hidden>
        Your browser does not support the HTML5 canvas tag.
      </canvas>

      <div
        style="position: relative"
        class="d-flex justify-center align-center py-2"
      >
        <v-btn color="primary" class="px-5" @click="onGetText">
          Lấy Text
        </v-btn>
        <v-btn class="mx-4 px-10" color="success" @click="onSave">
          Lưu
        </v-btn>
        <v-btn @click="onAuto" color="info" v-if="!isAutoRunning">
          Auto
        </v-btn>
        <v-btn color="error" @click="onStop" v-if="isAutoRunning">
          Stop Auto
        </v-btn>
        <div class="d-flex mx-4 justify-center align-center">
          <span>Font-size: </span>
          <v-text-field
            v-model="fontSizeResult"
            type="number"
            style="width: 80px"
            outlined
            hide-details
            dense
          />
        </div>
        <loading
          :active.sync="isLoading"
          :can-cancel="false"
          :is-full-page="false"
          :height="25"
          :width="25"
        ></loading>
      </div>
      <div class="pa-3" v-if="videoData && videoData.url">
        <div class="mb-2">
          <span class="font-weight-bold mr-3">Kết quả:</span>
        </div>
        <v-textarea
          rows="10"
          max-height="20"
          style="font-size: 20px"
          @keydown="onKeyDown"
          v-model="contentResult"
          outlined
          label="Kết quả"
          id="textarea_id"
        />
      </div>
    </div>

    <ModalUploadFile
      ref="modalInputFile"
      :typeParent="'EXPORT_SUBTITLE'"
      @pushNewVideo="uploadVideoMain"
    ></ModalUploadFile>
    <loading
      :active.sync="isLoadingFull"
      :can-cancel="false"
      :is-full-page="false"
      :height="40"
      :width="40"
    ></loading>
  </div>
</template>

<script>
import $ from 'jquery'
import ModalUploadFile from "./ModalUploadFile.vue";
import Loading from "vue-loading-overlay";
import Utils from "../utils";
import ServiceApi from "../ServiceApi";

export default {
  components: {
    ModalUploadFile,
    Loading
  },
  data() {
    return {
      videoLoaded: false,
      isPlay: false,
      currentTimeVideo: 0,
      textPreview: "",
      contentResult: "",
      videoData: {
        name: ""
      },
      isLoadingFull: false,
      isLoading: false,
      key: 0,
      imageCrop: {
        x: 0,
        y: 0,
        width: 200,
        height: 200
      },
      oldResult: "",
      isAutoRunning: false,
      layoutMainWidth: 0,
      layoutMainHeight: 0,
      progressUpload: 0,
      isCreateFailed: null,
      isFinish: false,
      isEditVideo: false,
      idVideoEdit: null,
      keyUpdateRange: 0,
      fontSizeResult: 32,
      nextTime: 1
    };
  },
  computed: {
    getStyleParent() {
      return `height: ${this.layoutMainHeight}px; width: ${this.layoutMainWidth}px`;
    },
    getTimeVideo() {
      return Utils.secondsToHHMMSSM(this.currentTimeVideo);
    }
  },
  watch: {
    textPreview() {
      // console.log(" ============= ", this.$refs.textarea_result);
      // console.log(this.$refs.textarea_result.scrollHeight);
      // this.$refs.textarea_result.style.height = "5px";
      // this.$refs.textarea_result.style.height = this.$refs.textarea_result.scrollHeight + "px";
    }
  },
  methods: {
    auto_grow() {},
    onSave() {
      if (this.textPreview) {
        this.contentResult += this.textPreview.trim() + "\n\n";
      }
      this.textPreview = "";
      var textarea = document.getElementById("textarea_id");
      textarea.scrollTop = textarea.scrollHeight;
    },

    async onStop() {
      this.isAutoRunning = false;
    },

    similarity(s1, s2) {
      var longer = s1;
      var shorter = s2;
      if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
      }
      var longerLength = longer.length;
      if (longerLength == 0) {
        return 1.0;
      }
      return (
        (longerLength - this.editDistance(longer, shorter)) /
        parseFloat(longerLength)
      );
    },

    editDistance(s1, s2) {
      s1 = s1.toLowerCase();
      s2 = s2.toLowerCase();

      var costs = new Array();
      for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
          if (i == 0) costs[j] = j;
          else {
            if (j > 0) {
              var newValue = costs[j - 1];
              if (s1.charAt(i - 1) != s2.charAt(j - 1))
                newValue =
                  Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
              costs[j - 1] = lastValue;
              lastValue = newValue;
            }
          }
        }
        if (i > 0) costs[s2.length] = lastValue;
      }
      return costs[s2.length];
    },

    async onAuto() {
      try {
        let videoElement = document.getElementById("videoPlay");
        this.isAutoRunning = true;
        while (videoElement.currentTime < videoElement.duration) {
          if (!this.isAutoRunning) {
            return;
          }
          videoElement.currentTime += parseInt(this.nextTime);
          let text = await this.getText();
          if (!text || text === "") {
            await Utils.sleep(1000);
            continue;
          }
          let checkExist = false;
          if (this.oldResult) {
            let same = this.similarity(this.oldResult, text);
            if (same > 0.5) {
              checkExist = true;
            }
            if (text.includes(this.oldResult)) {
              checkExist = true;
            }
          }
          if (!checkExist) {
            this.contentResult += text + "\n\n";
            this.oldResult = text;
          }
          await Utils.sleep(1000);
        }
        this.$swal({
          type: "success",
          title: "Xong.!"
        });
      } catch (error) {
        console.log(error);
      }
      this.isAutoRunning = false;
    },

    async imageToText(image) {
      let res = await ServiceApi.imageToText({ image });
      return res.data.result;
    },

    async getText() {
      var canvas = document.getElementById("imagePreview");
      var ctx = canvas.getContext("2d");
      var video = document.getElementById("canvas");
      canvas.width = this.imageCrop.width;
      canvas.height = this.imageCrop.height;
      ctx.drawImage(
        video,
        this.imageCrop.x,
        this.imageCrop.y,
        this.imageCrop.width,
        this.imageCrop.height,
        0,
        0,
        this.imageCrop.width,
        this.imageCrop.height
      );

   
        let image = canvas.toDataURL();
        let result = await this.imageToText(image);
        if (result != null) {
          this.$notify({
            type: "success",
            title: "Thành Công.!"
          });
          return result.trim();
        }
   
    },
    async onGetText() {
      this.isLoading = true;
      try {
        this.textPreview = await this.getText();
      } catch (error) {
        this.$notify({
          type: "error",
          title: "Lỗi. Thử lại nhé.!"
        });
      }
      this.isLoading = false;
    },

    onResizeStop: function(x, y, width, height) {
      event.stopPropagation();
      this.imageCrop.x = x;
      this.imageCrop.y = y;
      this.imageCrop.width = width;
      this.imageCrop.height = height;
      this.videoData.width = width / this.layoutMainWidth;
      this.videoData.height = height / this.layoutMainHeight;
      this.videoData.x = x / this.layoutMainWidth;
      this.videoData.y = y / this.layoutMainHeight;
    },
    onDragStop: function(x, y) {
      event.stopPropagation();
      this.imageCrop.x = x;
      this.imageCrop.y = y;
      this.videoData.x = x / this.layoutMainWidth;
      this.videoData.y = y / this.layoutMainHeight;
    },
    uploadVideoMain(data) {
      this.videoData = { ...data, x: 0, y: 0, width: 0.7, height: 0.2 };
    },
    onKeyDown(event) {
      event.stopPropagation();
    },
    onClickPlay() {
      if (this.$refs.videoPlay) {
        this.$refs.videoPlay.play();
        this.isPlay = true;
      }
    },
    onClickPause() {
      if (this.$refs.videoPlay) {
        this.$refs.videoPlay.pause();
        this.isPlay = false;
      }
    },
    onClickStopVideo() {
      if (this.$refs.videoPlay) {
        this.$refs.videoPlay.currentTime = 0;
      }
    },
    OnTimeUpdate(event) {
      this.currentTimeVideo = parseFloat(event.target.currentTime.toFixed(2));
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var video = document.getElementById("videoPlay");
      ctx.drawImage(
        event.target,
        0,
        0,
        video.videoWidth,
        video.videoHeight,
        0,
        0,
        canvas.width,
        canvas.height
      );
    },
    onVideoPlay(event) {
      var canvas = document.getElementById("canvas");
      var ctx = canvas.getContext("2d");
      var video = document.getElementById("videoPlay");

      function loop() {
        if (!event.target.paused && !event.target.ended) {
          ctx.drawImage(
            event.target,
            0,
            0,
            video.videoWidth,
            video.videoHeight,
            0,
            0,
            canvas.width,
            canvas.height
          );
          setTimeout(loop, 1000 / 30); // drawing at 30fps
        }
      }
      loop();
    },
    async onLoadedMeradata(event) {
      var canvas = document.getElementById("canvas");
      var container = document.getElementById("container-video");
      this.layoutMainWidth = container.clientWidth;
      this.layoutMainHeight =
        (container.clientWidth * event.target.videoHeight) /
        event.target.videoWidth;
      canvas.width = container.clientWidth;
      canvas.height =
        (container.clientWidth * event.target.videoHeight) /
        event.target.videoWidth;
      this.videoLoaded = true;
      event.target.currentTime = 1;
      event.target.currentTime = 0;
    },
    previousTime() {
      this.$refs.videoPlay.currentTime -= parseInt(this.nextTime);
    },
    onNextTime() {
      this.$refs.videoPlay.currentTime += parseInt(this.nextTime);
    },
    handleKeyCode(event) {
      if (!this.$refs.videoPlay) {
        return;
      }
      switch (event.code) {
        case "ArrowLeft":
          this.$refs.videoPlay.currentTime -= parseInt(this.nextTime);
          event.preventDefault();
          return true;
        case "ArrowRight":
          this.$refs.videoPlay.currentTime += parseInt(this.nextTime);
          event.preventDefault();
          return true;
        case "Space":
          if (!this.$refs.videoPlay.paused) {
            this.$refs.videoPlay.pause();
          } else {
            this.$refs.videoPlay.play();
          }
          this.isPlay = !this.isPlay;
          event.preventDefault();
          return true;
      }
    },
    onResizeWindow() {
      var container = document.getElementById("container-video");
      var video = document.getElementById("videoPlay");
      if (container && video) {
        this.layoutMainWidth = container.clientWidth;
        this.layoutMainHeight =
          (container.clientWidth * video.videoHeight) / video.videoWidth;
        this.keyUpdateRange++;
      }
    }
  },

  destroyed() {
    document.removeEventListener("keydown", this.handleKeyCode);
    window.removeEventListener("resize", this.onResizeWindow);
  },
  async mounted() {
    window.addEventListener("resize", this.onResizeWindow);
    document.addEventListener("keydown", this.handleKeyCode);
  },
  resizeCanvas() {
    return $("#canvas").outerHeight(
      $(window).height() -
        $("#canvas").offset().top -
        Math.abs($("#canvas").outerHeight(true) - $("#canvas").outerHeight())
    );
  }
};
</script>

<style scoped>
#textarea_result {
  resize: none;
  overflow: hidden;
  min-height: 50px;
  max-height: 100px;
}
.controler {
  margin-left: 15px;
  width: 400px;
}
#container-video {
  position: relative;
  flex: 1;
}
.controls {
  /* display: flex; */
  justify-content: center;
  align-items: center;
  padding: 5px;
  border: 1px dotted;
}

.controls-button {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-bottom: 10px;
}

.drag-resize-item {
  border: none;
}
.drag-resize-item-active {
  border: 2px solid #38e7ff;
}

#canvas {
  width: 100%;
}
#imagePreview {
  border: 1px solid #d3d3d3;
  max-width: 100%;
  width: 100%;
  height: 220px;
  object-fit: contain;
}
</style>
