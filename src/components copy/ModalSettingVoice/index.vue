<template>
  <v-dialog
    v-model="showDialog"
    :persistent="isLoading"
    max-width="700px"
    scrollable
  >
    <v-card>
      <v-card-title class="d-block">
        <div class="d-flex">
          <div style="flex: 1" class="text-center">
            <h3 class="font-weight-bold">Cài đặt - nghe thử giọng đọc</h3>
          </div>
          <v-btn
            icon
            @click="showDialog = false"
            style="position: absolute; right: 10px"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="mt-3 pt-5 d-block">
        <div class="d-flex">
          <v-select
            @change="onChangeSelectVoiceConfig"
            v-model="idVoiceConfigSelected"
            :items="listVoiceConfig"
            :item-value="$item => $item._id"
            :item-text="$item => $item.name"
            outlined
            dense
            hide-details
            label="Config"
          ></v-select>
          <v-tooltip bottom open-delay="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="primary"
                class="ml-2"
                @click="onClickCreateConfig"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-plus-thick</v-icon>
              </v-btn>
            </template>
            <span>Tạo config mới</span>
          </v-tooltip>
          <v-tooltip bottom v-if="idVoiceConfigSelected" open-delay="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="success"
                class="mx-2"
                @click="onClickSaveConfig"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-content-save-settings-outline</v-icon>
              </v-btn>
            </template>
            <span>Lưu config</span>
          </v-tooltip>
          <v-tooltip bottom v-if="idVoiceConfigSelected" open-delay="500">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                color="error"
                @click="onClickDeleteConfig"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Xóa config</span>
          </v-tooltip>
        </div>

        <v-row class="mt-2 mb-1">
          <v-col>
            <v-select
              @change="onChangeLanguage"
              v-model="languageSelected"
              :items="listLanguageVoice"
              :item-value="$item => $item.languageCode"
              :item-text="$item => $item.languageName"
              outlined
              dense
              hide-details
              label="Ngôn ngữ"
            >
            </v-select>
          </v-col>
          <v-col>
            <v-select
              @change="onChangeSelectVoice"
              v-model="voice.voice"
              :items="listVoiceOfLanguageSelected"
              :item-value="$item => $item._id"
              :item-text="$item => $item.name"
              outlined
              dense
              hide-details
              label="Config"
            ></v-select>
          </v-col>
        </v-row>

        <div
          class="setting-voice-jp"
          v-if="voiceSelect && voiceSelect.type === voiceType.VOICE_TEXT_JP"
        >
          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Speed</span>
            <div class>
              <vue-slider
                :min="50"
                :max="200"
                v-model="voice.voiceData.speed"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>

          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Volume</span>
            <div class>
              <vue-slider
                :min="0"
                :max="200"
                v-model="voice.voiceData.volume"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>

          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Pitch</span>
            <div class>
              <vue-slider
                :min="50"
                :max="200"
                v-model="voice.voiceData.pitch"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>
          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Feeling</span>
            <div class>
              <vue-slider
                :min="1"
                :max="4"
                v-model="voice.voiceData.feeling"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>
        </div>

        <div
          class="setting-voice-jp"
          v-if="voiceSelect && voiceSelect.type === voiceType.NOTE_VIBES"
        >
          <div class="row col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2 col-3 col-md-5 col-lg-3"
              >Pauses (Tạm dừng):
            </span>
            <b-form-select
              class="col-5"
              size="sm"
              :options="[
                { text: '------- Mặc định -------', value: null },
                { text: '0.5s', value: '0.5' },
                { text: '1s', value: '1' },
                { text: '2s', value: '2' },
                { text: '3s', value: '3' },
                { text: '4s', value: '4' },
                { text: '5s', value: '5' },
                { text: '6s', value: '6' }
              ]"
              v-model="voice.voiceData.noteVibes_pauses"
            >
            </b-form-select>
          </div>

          <div class="row col-12 pl-2">
            <span
              class="fs-14 font-weight-bold mb-2 col-3 col-md-5 reset col-lg-3"
              >Emphasis (Nhấn mạnh):
            </span>
            <b-form-select
              class="col-5"
              size="sm"
              :options="[
                { text: '------- Mặc định -------', value: null },
                { text: 'Strong - Nhấn mạnh', value: 'strong' },
                { text: 'Moderate - Vừa phải', value: 'moderate' },
                { text: 'Reduced - Giảm', value: 'reduced' }
              ]"
              v-model="voice.voiceData.noteVibes_emphasis"
            >
            </b-form-select>
          </div>

          <div class="row col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2 col-3 col-md-5 col-lg-3"
              >Volume (Âm lượng):
            </span>
            <b-form-select
              size="sm"
              class="col-5"
              :options="[
                { text: '------- Mặc định -------', value: null },
                { text: 'x-soft - Rất nhỏ', value: 'x-soft' },
                { text: 'Soft - Nhỏ', value: 'soft' },
                { text: 'Medium - Vừa phải', value: 'medium' },
                { text: 'Loud - To', value: 'loud' },
                { text: 'x-loud - Rất to', value: 'x-loud' }
              ]"
              v-model="voice.voiceData.noteVibes_volume"
            >
            </b-form-select>
          </div>
          <div class="row col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2 col-3 col-md-5 col-lg-3"
              >Say as (Kiểu phát âm):
            </span>
            <b-form-select
              size="sm"
              class="col-5"
              :options="[
                { text: '------- Mặc định -------', value: null },
                { text: 'Spell-out', value: 'spell-out' },
                { text: 'Cardinal', value: 'cardinal' },
                { text: 'Ordinal', value: 'ordinal' }
              ]"
              v-model="voice.voiceData.noteVibes_sayAs"
            >
            </b-form-select>
          </div>

          <div class="row col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2 col-3 col-md-5 col-lg-3"
              >Speed (Tốc độ):
            </span>
            <b-form-select
              size="sm"
              class="col-5"
              :options="[
                { text: '------- Mặc định -------', value: 1 },
                { text: 'Faster', value: 1.3 },
                { text: 'x-faster', value: 1.6 },
                { text: '2xFaster', value: 2 },
                { text: 'Slow', value: 0.8 },
                { text: 'x-slow', value: 0.6 },
                { text: '2xSlow', value: 0.3 }
              ]"
              v-model="voice.voiceData.noteVibes_speed"
            >
            </b-form-select>
          </div>

          <div class="row col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2 col-3 col-md-5 col-lg-3"
              >Pitch (Tốc độ):
            </span>
            <b-form-select
              size="sm"
              class="col-5"
              :options="[
                { text: '------- Mặc định -------', value: 0 },
                { text: '-3', value: -3 },
                { text: '-5', value: -5 },
                { text: '-10', value: -10 },
                { text: '-15', value: -15 },
                { text: '+3', value: +3 },
                { text: '+5', value: +5 },
                { text: '+10', value: +10 },
                { text: '+15', value: +15 },
                { text: '+20', value: +20 }
              ]"
              v-model="voice.voiceData.noteVibes_pitch"
            >
            </b-form-select>
          </div>
        </div>

        <div
          class="setting-voice-jp"
          v-if="voiceSelect && voiceSelect.type === voiceType.GOOGLE"
        >
          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Speed</span>
            <div class>
              <vue-slider
                :min="0.25"
                :max="4"
                :interval="0.05"
                v-model="voice.voiceData.speed"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>
          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Pitch</span>
            <div class>
              <vue-slider
                :min="-20"
                :max="20"
                :interval="0.1"
                v-model="voice.voiceData.pitch"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>
        </div>

        <div
          class="setting-voice-jp"
          v-if="voiceSelect && voiceSelect.type === voiceType.WINDOWS"
        >
          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Speed</span>
            <div class>
              <vue-slider
                :min="0.1"
                :max="2"
                :interval="0.1"
                v-model="voice.voiceData.speed"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>
        </div>

        <div
          class="setting-voice-jp"
          v-if="
            voiceSelect &&
              (voiceSelect.type === voiceType.FPT_AI ||
                voiceSelect.type === voiceType.VIETTEL_AI)
          "
        >
          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Speed</span>
            <div class>
              <vue-slider
                :min="-3"
                :max="3"
                :interval="1"
                v-model="voice.voiceData.speed"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>
        </div>

        <div
          class="setting-voice-jp"
          v-if="voiceSelect && voiceSelect.type === voiceType.VINA"
        >
          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Speed</span>
            <div class>
              <vue-slider
                :min="0.8"
                :max="1.2"
                :interval="0.1"
                v-model="voice.voiceData.speed"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>
        </div>

        <div
          class="setting-voice-jp"
          v-if="
            voiceSelect &&
              (voiceSelect.type === voiceType.AI_JP ||
                voiceSelect.type === voiceType.AI_JP_DEMO)
          "
        >
          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Speed</span>
            <div class>
              <vue-slider
                :min="0.5"
                :max="1.4"
                :interval="0.1"
                v-model="voice.voiceData.speed"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>

          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Pitch</span>
            <div class>
              <vue-slider
                :min="0.5"
                :max="2"
                :interval="0.1"
                v-model="voice.voiceData.pitch"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>

          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Range</span>
            <div class>
              <vue-slider
                :min="0"
                :max="2"
                :interval="0.1"
                v-model="voice.voiceData.range"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>

          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Anger</span>
            <div class>
              <vue-slider
                :min="0"
                :max="1"
                :interval="0.1"
                v-model="voice.voiceData.anger"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>

          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Sadness</span>
            <div class>
              <vue-slider
                :min="0"
                :max="1"
                :interval="0.1"
                v-model="voice.voiceData.sadness"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>

          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Joy</span>
            <div class>
              <vue-slider
                :min="0"
                :max="1"
                :interval="0.1"
                v-model="voice.voiceData.joy"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>
        </div>
        <!-- Advance -->
        <div class="setting-voice-jp" v-if="voice.voiceData.advance">
          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Speed 2</span>
            <div class>
              <vue-slider
                :min="0.5"
                :max="1.9"
                :interval="0.1"
                v-model="voice.voiceData.advance.speed"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>

          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Volume 2</span>
            <div class>
              <vue-slider
                :min="0.1"
                :max="1.9"
                :interval="0.1"
                v-model="voice.voiceData.advance.volume"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>

          <div class="col-12 pl-2">
            <span class="fs-14 font-weight-bold mb-2">Pitch 2</span>
            <div class>
              <vue-slider
                :min="0.1"
                :max="1.9"
                :interval="0.1"
                v-model="voice.voiceData.advance.pitch"
                tooltip="always"
              ></vue-slider>
            </div>
          </div>
        </div>
        <div>
          <span class="fs-14 black--text font-weight-bold mb-2">Nghe thử:</span>
          <v-textarea
            :rows="3"
            :max-rows="5"
            v-model="textPreview"
            @input="stateTextPreview = null"
            outlined
            dense
            hide-details
            placeholder="Nội dung nghe thử."
          >
          </v-textarea>
          <audio
            v-if="urlVoicePreview"
            :src="urlVoicePreview"
            controls
            class="mt-3"
            style="width: 100%"
          ></audio>
        </div>
      </v-card-text>
      <v-card-actions class="mt-0 d-block text-center pb-5">
        <v-btn @click="hide()">Đóng</v-btn>
        <v-btn color="primary" class="mx-4 px-4" @click="onPreviewClick">
          Nghe Thử
        </v-btn>
        <v-btn color="success" class="px-6" @click="onSaveData"> Lưu </v-btn>
      </v-card-actions>
      <loading
        :active.sync="isLoading"
        :can-cancel="false"
        :is-full-page="false"
        loader="dots"
        color="#ff5c97"
        :z-index="100"
      />
    </v-card>
    <ModalCreateConfigVoice
      ref="ModalCreateConfigVoice"
      @setIdConfigSelected="setIdConfigSelected"
    />
  </v-dialog>
</template>

<script>
import ServiceApi from "@/services/ServiceApi";
import VoiceApi from "@/services/VoiceApi";
import Constants from "@/constants";
import ModalCreateConfigVoice from "./ModalCreateConfigVoice";
import Loading from "vue-loading-overlay";
import lodash from "lodash";

export default {
  name: "modal-video",
  data() {
    return {
      showDialog: false,
      textPreview: null,
      stateTextPreview: null,
      urlVoicePreview: null,
      isLoading: false,
      voiceSelect: null,
      voiceType: Constants.VOICE,
      nameNewConfig: "",
      isShowInputAddNewConfig: false,
      listVoice: this.$store.state.data.listVoice,
      voice: {
        voice: null,
        voiceData: {
          speed: 100,
          volume: 100,
          pitch: 100,
          feeling: 2,
          noteVibes_pitch: 0,
          noteVibes_speed: 1,
          noteVibes_sayAs: null,
          noteVibes_volume: null,
          noteVibes_emphasis: null,
          noteVibes_pauses: null,
          advance: {
            speed: 1,
            volume: 1,
            pitch: 1
          }
        }
      },
      idVoiceConfigSelected: null,
      indexItem: null,
      languageSelected: " -------- Chọn ngôn ngữ -------- "
    };
  },
  components: {
    ModalCreateConfigVoice,
    Loading
  },
  computed: {
    listLanguageVoice() {
      let listLanguage = this.$store.state.data.listLanguageVoice || [];
      listLanguage = listLanguage.map(item => {
        return {
          languageCode: item,
          languageName: Constants.LANGUAGE[item]
        };
      });
      listLanguage.forEach(element => {
        if (!element.languageName) console.log(" #### element: ", element);
      });
      listLanguage = lodash.orderBy(listLanguage, "languageName", "esc");
      listLanguage.unshift(" -------- Chọn ngôn ngữ -------- ");
      return listLanguage;
    },
    listVoiceOfLanguageSelected() {
      let listVoice = this.listVoice.filter(
        items => items.language === this.languageSelected
      );
      let listType = lodash.uniqBy(listVoice, "type").map(item => item.type);
      listVoice = listVoice.map(item => {
        let name = item.name;
        if (item.feel) {
          name +=
            "- " +
            item.feel.substring(0, 1).toUpperCase() +
            item.feel.substring(1, item.feel.length) +
            "";
        }
        if (item.gender) {
          name += " (" + (item.gender === "male" ? "Nam" : "Nữ") + ")";
        }
        name = listType.indexOf(item.type) + "- " + name;
        return {
          ...item,
          name
        };
      });
      listVoice = lodash.orderBy(listVoice, "name", "esc");
      listVoice.unshift({
        _id: null,
        name: " -------- Chọn giọng đọc -------- "
      });
      return listVoice;
    },
    listVoiceConfig() {
      let listVoiceConfig = this.$store.state.data.listVoiceConfig || [];

      listVoiceConfig.unshift({
        _id: null,
        name: " ------- Chọn config giọng đọc ------- "
      });
      return listVoiceConfig;
    }
  },
  methods: {
    setIdConfigSelected(data) {
      this.idVoiceConfigSelected = data;
    },

    onChangeLanguage() {
      this.voiceSelect = null;
      this.voice = {
        voice: null,
        voiceData: {
          speed: 100,
          volume: 100,
          pitch: 100,
          feeling: 2,
          noteVibes_pitch: 0,
          noteVibes_speed: 1,
          noteVibes_sayAs: null,
          noteVibes_volume: null,
          noteVibes_emphasis: null,
          noteVibes_pauses: null,
          advance: {
            speed: 1,
            volume: 1,
            pitch: 1
          }
        }
      };
    },
    onSaveData() {
      let data = null;
      if (this.indexItem == null) {
        data = this.voice;
      } else {
        data = {
          voice: this.voice,
          indexItem: this.indexItem
        };
      }
      this.$emit("returnData", data);
      this.hide();
    },
    onChangeSelectVoiceConfig(idVoiceConfigSelected) {
      let voiceConfigSelected = this.listVoiceConfig.find(
        config => config._id == idVoiceConfigSelected
      );

      if (voiceConfigSelected && voiceConfigSelected._id) {
        let voiceItemSelect = this.listVoice.find(
          item => item._id == voiceConfigSelected.voiceId
        );
        if (voiceItemSelect) {
          this.languageSelected = voiceItemSelect.language;
        } else {
          this.languageSelected = null;
        }
        if (voiceConfigSelected.data) {
          this.checkDataVoice();
          this.voice = {
            voice: voiceConfigSelected.data.voice,
            voiceData: this.voice.voiceData
          };
          this.checkDataVoice();
          this.voice = {
            ...this.voice,
            voiceData: { ...voiceConfigSelected.data.voiceData }
          };
        } else {
          this.onChangeLanguage();
          this.checkDataVoice();
        }
      } else {
        this.onChangeLanguage();
        this.checkDataVoice();
        this.languageSelected = null;
      }
      // this.checkDataVoice();
    },
    async onClickCreateConfig() {
      this.$refs.ModalCreateConfigVoice.show({
        voiceId: this.voice.voice,
        data: JSON.stringify(this.voice)
      });
    },
    async onClickSaveConfig() {
      if (!this.idVoiceConfigSelected) {
        this.$notify({
          type: "error",
          text: "Chưa chọn config"
        });
        return;
      }
      this.isLoading = true;
      try {
        let payload = {
          _id: this.idVoiceConfigSelected,
          voiceId: this.voice ? this.voice.voice : null,
          data: this.voice ? JSON.stringify(this.voice) : null
        };

        let res = await VoiceApi.updateConfig(payload);
        if (res.status === 200) {
          let listVoiceConfig = this.listVoiceConfig.map(item => {
            if (item._id == this.idVoiceConfigSelected) {
              let newItem = {
                ...item,
                ...payload,
                data: JSON.parse(payload.data)
              };
              return newItem;
            }
            return item;
          });
          this.$store.dispatch("updateListConfigVoice", listVoiceConfig);
        }
        this.$notify({
          type: "success",
          text: "Lưu Thành Công"
        });
      } catch (error) {
        this.$notify({
          type: "error",
          text: error
        });
      }
      this.isLoading = false;
    },
    async onClickDeleteConfig() {
      if (!this.idVoiceConfigSelected) {
        this.$notify({
          type: "error",
          text: "Chưa chọn config"
        });
        return;
      }
      this.$swal
        .fire({
          icon: "question",
          title: "Xóa config giọng đọc",
          text: "Bạn chắc chắn muốn xóa config này: ....",
          showCloseButton: true,
          showCancelButton: true
        })
        .then(async result => {
          if (result && result.value === true) {
            this.isLoading = true;
            try {
              let payload = {
                id: this.idVoiceConfigSelected
              };
              let res = await VoiceApi.deleteConfig(payload);
              if (res.status === 200) {
                let listVoiceConfig = this.listVoiceConfig.filter(
                  item => item._id != this.idVoiceConfigSelected
                );
                this.idVoiceConfigSelected = null;
                this.$store.dispatch("updateListConfigVoice", listVoiceConfig);
              }
              this.$notify({
                type: "success",
                text: "Xóa Thành Công"
              });
            } catch (error) {
              this.$notify({
                type: "error",
                text: error
              });
            }
            this.isLoading = false;
          }
        });
    },
    onSetOldConfig() {},
    onChangeVoice(data) {
      this.checkDataVoice();
    },
    checkDataVoice() {
      let voiceSelect = this.listVoice.find(item => {
        return item._id === this.voice.voice;
      });
      this.voiceSelect = voiceSelect;
      if (voiceSelect && voiceSelect.type === Constants.VOICE.GOOGLE) {
        this.voice.voiceData.speed = 1;
        this.voice.voiceData.pitch = 0;
      } else if (voiceSelect && voiceSelect.type === Constants.VOICE.WINDOWS) {
        this.voice.voiceData.speed = 1;
      } else if (
        voiceSelect &&
        (voiceSelect.type === Constants.VOICE.AI_JP ||
          voiceSelect.type === Constants.VOICE.AI_JP_DEMO)
      ) {
        this.voice.voiceData.volume = 2.0;
        this.voice.voiceData.speed = 1;
        this.voice.voiceData.pitch = 1;
        this.voice.voiceData.range = 1;
        this.voice.voiceData.anger = 0;
        this.voice.voiceData.sadness = 0;
        this.voice.voiceData.joy = 0;
      } else if (
        voiceSelect &&
        (voiceSelect.type === Constants.VOICE.FPT_AI ||
          voiceSelect.type === Constants.VOICE.VIETTEL_AI)
      ) {
        this.voice.voiceData.speed = 0;
      } else if (voiceSelect && voiceSelect.type === Constants.VOICE.VINA) {
        this.voice.voiceData.speed = 1;
      } else {
        this.voice.voiceData.speed = 100;
        this.voice.voiceData.pitch = 100;
        this.voice.voiceData.volume = 100;
        this.voice.voiceData.feeling = 2;
      }
      if (!this.voice.voiceData.advance) {
        this.voice.voiceData.advance = {
          speed: 1,
          volume: 1,
          pitch: 1
        };
      }
    },
    onChangeSelectVoice(value) {
      this.checkDataVoice();
    },
    show(voice, indexItem) {
      // this.voice = voice;
      this.voice = JSON.parse(JSON.stringify(voice));
      if (this.voice.voiceData && !this.voice.voiceData.advance) {
        this.voice.voiceData.advance = {
          speed: 1,
          volume: 1,
          pitch: 1
        };
      }
      let voiceSelect = this.listVoice.find(item => {
        return item._id === this.voice.voice;
      });
      if (voiceSelect) {
        this.languageSelected = voiceSelect.language;
      }
      this.voiceSelect = voiceSelect;
      this.indexItem = indexItem;
      this.showDialog = true;
      // this.checkDataVoice();
    },

    hide() {
      this.showDialog = false;
    },

    async onPreviewClick() {
      if (!this.textPreview || !this.textPreview.trim()) {
        this.$notify({
          type: "error",
          title: "Điền Text Nghe Thử"
        });
        this.stateTextPreview = false;
        return;
      }
      if (!this.voice.voice) {
        this.$notify({
          type: "error",
          title: "Chọn Voice"
        });
        return;
      }
      this.urlVoicePreview = "";
      this.isLoading = true;
      let payload = {
        voice: this.voice.voice,
        voiceData: this.voice.voiceData,
        textPreview: this.textPreview
      };
      let res = await ServiceApi.previewVoice(payload);
      if (res && res.status === 200) {
        this.urlVoicePreview = res.data.url + "?" + Date.now();
      }
      this.isLoading = false;
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
// src/components/ModalSettingVoice/index.vue