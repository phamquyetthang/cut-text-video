<template>
  <v-dialog
    v-model="showDialog"
    scrollable
    max-width="1000px"
    :persistent="isLoading"
  >
    <v-card>
      <v-card-title class="d-block">
        <div class="d-flex justify-center">
          <span class="h3 font-weight-bold">Nội Dung</span>
          <v-btn
            style="position: absolute; right: 10px; top: 10px"
            icon
            @click="showDialog = false"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-title>
      <v-card-text class="black--text">
        <div class="align-center d-flex mt-1">
          <span style="width: 120px;">Regex chia dòng:</span>
          <v-text-field
            small
            outlined
            dense
            hide-details
            :value="$store.state.userData.text.subRegex"
            @change="onChangeSubRegex"
            class="mx-3 fs-14"
            style="max-width: 400px;"
          ></v-text-field>
          <v-btn color="primary" class="px-5" @click="onSubRegex">
            Chia
          </v-btn>
        </div>

        <div class="align-center d-flex mt-3">
          <span style="width: 120px;">Chia câu theo dấu:</span>
          <v-text-field
            small
            outlined
            dense
            hide-details
            @change="onChangeSplitContentBy"
            :value="$store.state.userData.text.splitContentBy"
            class="mx-3 fs-14"
            style="max-width: 200px; font-size: 22px !important"
          ></v-text-field>
          <v-btn color="primary" class="px-5 mr-5" @click="onSplitContentBy">
            Chia
          </v-btn>
          <span style="width: 120px;">Xóa ký tự:</span>
          <v-text-field
            small
            outlined
            dense
            hide-details
            @change="onChangeCharacterDelete"
            :value="$store.state.userData.text.characterDelete"
            class="mx-3 fs-14"
            style="max-width: 200px;"
          ></v-text-field>
          <v-btn color="error" class="px-5" @click="onRemoveCharacter">
            Xóa
          </v-btn>
        </div>

        <div class="mt-3">
          <v-btn small color="success" @click="$refs.inputfileSubtitle.click()">
            Nhập từ file subtitle (.srt, .ass)
          </v-btn>
          <input
            type="file"
            ref="inputfileSubtitle"
            accept=".srt, .ass"
            id="inputfileSubtitle"
            hidden
            @change="onChangeSelectFileText"
          />
        </div>

        <v-textarea
          outlined
          dense
          hide-details
          v-model="textContent"
          placeholder="Nhập Text Subtitle"
          rows="10"
          auto-grow
          class="mt-3"
          :counter="true"
          id="description-textarea"
        >
        </v-textarea>
      </v-card-text>
      <v-card-actions class="d-block text-center pb-4">
        <div style="position: absolute; left: 10px; bottom: 10px" class="fs-14">
          <span>
            Kí tự:
            <b>
              {{ formatNumber(textContent ? textContent.length : 0) }}
            </b>
          </span>
          <span> --- </span>
          <span>
            Dòng:
            <b>
              {{ textContent ? textContent.split("\n\n").length : 0 }}
            </b>
          </span>
        </div>
        <v-btn color="success" class="px-10" @click="onSave">Lưu</v-btn>
        <!-- <v-btn color="" class="px-5" @click="hide">Hủy</v-btn> -->
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import Utils from "../utils";
export default {
  data() {
    return {
      textContent: "",
      showDialog: false,
      isLoading: false
    };
  },
  methods: {
    onSplitContentBy() {
      let textContent = this.textContent;
      for (
        let i = 0;
        i < this.$store.state.userData.text.splitContentBy.length;
        i++
      ) {
        let charactor = this.$store.state.userData.text.splitContentBy[i];
        if (charactor === "." || charactor === ",") {
          charactor += " ";
        }
        let list = textContent.split(charactor);
        textContent = list.map(item => item.trim()).join(charactor + "\n");
      }
      textContent = textContent
        .split("\n")
        .filter(x => x.trim() !== "")
        .map(item => item.trim())
        .join("\n\n");
      this.textContent = textContent;
    },
    onChangeSelectFileText(event, file) {
      try {
        var fr = new FileReader();
        let vue = this;
        fr.onload = function() {
          let result = Utils.pasreFileText(fr.result);
          if (result.status === "SUCCESS") {
            let listItemSubtitle = result.data;
            let content = "";
            listItemSubtitle.map(item => {
              content += item.content + "\n\n";
            });
            vue.textContent = content;
          } else {
            vue.$swal.fire({ icon: "error", text: result.message });
          }
        };

        fr.readAsText(event.target.files[0]);
      } catch (error) {}
    },
    onSave() {
      this.$emit("returnData", this.textContent);
      this.hide();
    },
    show(content) {
      this.textContent = content;
      this.showDialog = true;
    },
    hide() {
      this.showDialog = false;
    },
    formatNumber(num) {
      return Utils.formatNumberToCurrency(num);
    },
    onChangeSplitContentBy(value) {
      this.$store.dispatch("setUserData_Text", {
        type: "splitContentBy",
        value: value
      });
    },
    onChangeCharacterDelete(value) {
      this.$store.dispatch("setUserData_Text", {
        type: "characterDelete",
        value: value
      });
    },
    onChangeSubRegex(value) {
      this.$store.dispatch("setUserData_Text", {
        type: "subRegex",
        value: value
      });
    },
    onChangeCharacterDivide(value) {
      this.$store.dispatch("setUserData_Text", {
        type: "countCharacterDivide",
        value: value
      });
    },
    onDivideSubtitleByCharacter() {
      let listText = [];
      let text = "";
      let count = 0;
      let subtileText = this.textContent;

      while (subtileText.includes("\n")) {
        subtileText = subtileText.replace("\n", " ");
      }

      for (let i = 0; i < subtileText.length; i++) {
        const char = subtileText[i];
        text += char;
        count++;
        if (
          count === this.$store.state.userData.text.countCharacterDivide ||
          i === subtileText.length - 1
        ) {
          listText.push(text);
          count = 0;
          text = "";
        }
      }
      this.textContent = listText.join("\n\n");
    },
    onSubRegex() {
      this.textContent = Utils.subRegex(
        this.textContent,
        this.$store.state.userData.text.subRegex
      );
    },
    onRemoveCharacter() {
      this.textContent = Utils.removeCharacter(
        this.textContent,
        this.$store.state.userData.text.characterDelete
      );
    }
  }
};
</script>

<style>
#description-textarea {
  max-height: 400px;
  overflow-y: auto;
}
</style>



// WEBPACK FOOTER //
// src/components/ModalEditText.vue