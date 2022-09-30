<template>
  <transition name="fade">
    <div
      v-if="isShow"
      class="color-picker-container"
      :style="stylePosition"
      @click="onClickContainer()"
    >
      <div class="tab-header">
        <div
          class="header-item"
          :class="{ 'header-item-active': indexHeaderActive == 0 }"
          @click="indexHeaderActive = 0"
        >
          <span class="fs-12">Color picker</span>
        </div>
        <div
          class="header-item"
          :class="{ 'header-item-active': indexHeaderActive == 1 }"
          @click="indexHeaderActive = 1"
        >
          <span class="fs-12">Palettes</span>
        </div>
      </div>
      <div class="item-divide"></div>
      <div class="wrapper-content text-left">
        <div v-if="indexHeaderActive === 0">
          <span class="text-title-color">All Colors</span>
          <div class="wrapper-item-color">
            <div
              v-for="(color, index) in listColorPicker"
              :key="index"
              class="item-color"
              :style="
                `background-color: ${color.hex}; border: ${
                  index === 1 ? '1px solid grey' : 'none'
                }`
              "
              @click="onChooseColor(color)"
            ></div>
          </div>
        </div>
        <div v-else class="wrapper-item-color">
          <div
            v-for="(color, index) in listColorPalettes"
            :key="index"
            class="item-color"
            :style="`background-color: ${color.hex};`"
            @click="onChooseColor(color)"
          ></div>
        </div>
      </div>
      <div class="opacity">
        <div class="title-opacity">
          <span style="font-weight: 600;color: rgb(55, 64, 70); font-size:14px"
            >Opacity</span
          >
          <span
            style="font-weight: 400;color: rgb(99, 109, 116); font-size:14px"
            >{{ colorSelected.opacity }}%</span
          >
        </div>
        <div>
          <vue-slider
            class="opacity-slider"
            :value="colorSelected.opacity"
            @change="onChangeOpacity"
            style="flex: 1"
            :min="0"
            :max="100"
            :step="1"
            tooltip="none"
            dotSize="16"
          ></vue-slider>
        </div>
      </div>
      <div class="input-custom">
        <span
          class="dot-preview"
          :style="`background-color: ${getColorPreview}`"
        ></span>
        <input
          v-model="colorSelected.hex"
          type="text"
          style="width: 150px; border: none"
          class="mx-2 input-hex"
          @input="onChangeCustom"
        />
        <span class="label-hex">hex</span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["stylePosition"],
  data() {
    return {
      isShow: false,
      colorSelected: {
        rgb: {
          r: 0,
          g: 0,
          b: 0
        },
        hex: "#000000",
        opacity: 100
      },
      indexHeaderActive: 0,
      listColorPicker: [
        {
          rgb: {
            r: 0,
            g: 0,
            b: 0
          },
          hex: "#000000"
        },
        {
          rgb: {
            r: 255,
            g: 255,
            b: 255
          },
          hex: "#FFFFFF"
        },
        {
          rgb: {
            r: 167,
            g: 102,
            b: 250
          },
          hex: "#A766FA"
        },
        {
          rgb: {
            r: 82,
            g: 105,
            b: 218
          },
          hex: "#5269DA"
        },
        {
          rgb: {
            r: 20,
            g: 125,
            b: 232
          },
          hex: "#147DE8"
        },
        {
          rgb: {
            r: 34,
            g: 207,
            b: 206
          },
          hex: "#22CFCE"
        },
        {
          rgb: {
            r: 234,
            g: 241,
            b: 249
          },
          hex: "#EAF1F9"
        },
        {
          rgb: {
            r: 29,
            g: 195,
            b: 33
          },
          hex: "#1DC321"
        },
        {
          rgb: {
            r: 254,
            g: 203,
            b: 47
          },
          hex: "#FECB2F"
        },
        {
          rgb: {
            r: 253,
            g: 143,
            b: 39
          },
          hex: "#FD8F27"
        },
        {
          rgb: {
            r: 255,
            g: 0,
            b: 106
          },
          hex: "#FF006A"
        },
        {
          rgb: {
            r: 216,
            g: 216,
            b: 216
          },
          hex: "#D8D8D8"
        },
        {
          rgb: {
            r: 36,
            g: 62,
            b: 67
          },
          hex: "#243E43"
        },
        {
          rgb: {
            r: 234,
            g: 122,
            b: 118
          },
          hex: "#EA7A76"
        },
        {
          rgb: {
            r: 53,
            g: 155,
            b: 165
          },
          hex: "#359BA5"
        },
        {
          rgb: {
            r: 246,
            g: 93,
            b: 148
          },
          hex: "#F65D94"
        },
        {
          rgb: {
            r: 255,
            g: 23,
            b: 23
          },
          hex: "#FF1717"
        },
        {
          rgb: {
            r: 97,
            g: 188,
            b: 249
          },
          hex: "#61BCF9"
        },
        {
          rgb: {
            r: 252,
            g: 227,
            b: 113
          },
          hex: "#FCE371"
        },
        {
          rgb: {
            r: 126,
            g: 231,
            b: 194
          },
          hex: "#7EE7C2"
        },
        {
          rgb: {
            r: 240,
            g: 136,
            b: 230
          },
          hex: "#F088E6"
        },
        {
          rgb: {
            r: 255,
            g: 65,
            b: 73
          },
          hex: "#FF4149"
        },
        {
          rgb: {
            r: 1,
            g: 1,
            b: 248
          },
          hex: "#0101F8"
        },
        {
          rgb: {
            r: 254,
            g: 253,
            b: 84
          },
          hex: "#FEFD54"
        }
      ],
      listColorPalettes: [
        {
          rgb: {
            r: 255,
            g: 205,
            b: 210
          },
          hex: "#FFCDD2"
        },
        {
          rgb: {
            r: 239,
            g: 154,
            b: 154
          },
          hex: "#EF9A9A"
        },
        {
          rgb: {
            r: 244,
            g: 132,
            b: 143
          },
          hex: "#F4848F"
        },
        {
          rgb: {
            r: 255,
            g: 94,
            b: 110
          },
          hex: "#FF5E6E"
        },
        {
          rgb: {
            r: 228,
            g: 80,
            b: 99
          },
          hex: "#E45063"
        },
        {
          rgb: {
            r: 255,
            g: 152,
            b: 0
          },
          hex: "#FF9800"
        },
        {
          rgb: {
            r: 251,
            g: 140,
            b: 0
          },
          hex: "#FB8C00"
        },
        {
          rgb: {
            r: 245,
            g: 124,
            b: 0
          },
          hex: "#F57C00"
        },
        {
          rgb: {
            r: 239,
            g: 108,
            b: 0
          },
          hex: "#EF6C00"
        },
        {
          rgb: {
            r: 230,
            g: 81,
            b: 0
          },
          hex: "#E65100"
        },
        {
          rgb: {
            r: 255,
            g: 228,
            b: 92
          },
          hex: "#FFE45C"
        },
        {
          rgb: {
            r: 255,
            g: 225,
            b: 69
          },
          hex: "#FFE145"
        },
        {
          rgb: {
            r: 255,
            g: 221,
            b: 46
          },
          hex: "#FFDD2E"
        },
        {
          rgb: {
            r: 255,
            g: 217,
            b: 23
          },
          hex: "#FFD917"
        },
        {
          rgb: {
            r: 255,
            g: 214,
            b: 0
          },
          hex: "#FFD600"
        },
        {
          rgb: {
            r: 139,
            g: 195,
            b: 74
          },
          hex: "#8BC34A"
        },
        {
          rgb: {
            r: 124,
            g: 179,
            b: 66
          },
          hex: "#7CB342"
        },
        {
          rgb: {
            r: 104,
            g: 159,
            b: 56
          },
          hex: "#689F38"
        },
        {
          rgb: {
            r: 85,
            g: 139,
            b: 47
          },
          hex: "#558B2F"
        },
        {
          rgb: {
            r: 51,
            g: 105,
            b: 30
          },
          hex: "#33691E"
        },
        {
          rgb: {
            r: 178,
            g: 235,
            b: 242
          },
          hex: "#B2EBF2"
        },
        {
          rgb: {
            r: 77,
            g: 208,
            b: 225
          },
          hex: "#4DD0E1"
        },
        {
          rgb: {
            r: 0,
            g: 188,
            b: 212
          },
          hex: "#00BCD4"
        },
        {
          rgb: {
            r: 0,
            g: 151,
            b: 167
          },
          hex: "#0097A7"
        },
        {
          rgb: {
            r: 0,
            g: 96,
            b: 100
          },
          hex: "#006064"
        },
        {
          rgb: {
            r: 225,
            g: 190,
            b: 231
          },
          hex: "#E1BEE7"
        },
        {
          rgb: {
            r: 206,
            g: 147,
            b: 216
          },
          hex: "#CE93D8"
        },
        {
          rgb: {
            r: 186,
            g: 104,
            b: 200
          },
          hex: "#BA68C8"
        },
        {
          rgb: {
            r: 171,
            g: 71,
            b: 188
          },
          hex: "#AB47BC"
        },
        {
          rgb: {
            r: 156,
            g: 39,
            b: 176
          },
          hex: "#9C27B0"
        },
        {
          rgb: {
            r: 99,
            g: 140,
            b: 255
          },
          hex: "#638CFF"
        },
        {
          rgb: {
            r: 79,
            g: 126,
            b: 255
          },
          hex: "#4F7EFF"
        },
        {
          rgb: {
            r: 60,
            g: 112,
            b: 255
          },
          hex: "#3C70FF"
        },
        {
          rgb: {
            r: 41,
            g: 98,
            b: 255
          },
          hex: "#2962FF"
        },
        {
          rgb: {
            r: 38,
            g: 90,
            b: 232
          },
          hex: "#265AE8"
        }
      ]
    };
  },
  computed: {
    getColorPreview() {
      return `rgba(${this.colorSelected.rgb.r},${this.colorSelected.rgb.g},${
        this.colorSelected.rgb.b
      },${this.colorSelected.opacity / 100})`;
    }
  },
  methods: {
    show(color) {
      this.colorSelected = color;
      this.isShow = true;
    },
    hide() {
      this.isShow = false;
    },
    onClickContainer() {
      event.stopPropagation();
    },
    onChooseColor(color) {
      this.colorSelected = { ...color, opacity: 100 };
      this.$emit("onChangeColor", this.colorSelected);
      event.stopPropagation();
    },
    onChangeCustom(event) {
      let rgb = this.hexToRgb(event.target.value);
      if (rgb) {
        this.colorSelected = {
          rgb: rgb,
          hex: event.target.value,
          opacity: 100
        };
        this.$emit("onChangeColor", this.colorSelected);
      }
    },
    hexToRgb(hex) {
      // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
      var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
      hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
      });
      var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
          }
        : null;
    },
    onChangeOpacity(value) {
      this.colorSelected = { ...this.colorSelected, opacity: value };
      this.$emit("onChangeColor", this.colorSelected);
    }
  }
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.label-hex {
  font-weight: 400;
  font-size: 0.8rem;
  margin-top: 0.2rem;
  margin-right: 0.2rem;
  color: rgb(164, 160, 160);
}
.input-hex {
  color: rgb(78, 78, 78);
  width: 70%;
  height: 1.6rem;
  font-size: 1rem;
  margin-top: 0.14rem;
  text-transform: uppercase;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
}
.dot-preview {
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border: 1px solid gray;
}
.input-custom {
  padding: 0 15px 0 15px;
  border: 1px solid rgb(204, 204, 204);
  border-radius: 0.4rem;
  width: 100%;
  height: 2rem;
  margin: 10px auto 5px auto;
  flex-direction: row;
  display: flex;
  align-items: center;
}
.opacity-slider {
  padding-top: 14px !important;
}
.opacity {
  padding: 0 15px 0 15px;
  margin: 5px auto;
}
.title-opacity {
  display: flex;
  justify-content: space-between;
}

.text-title-color {
  font-size: 14px;
  font-weight: 400;
  margin-left: 0.5rem;
}
.item-color {
  width: 2.3rem;
  height: 2.3rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  margin-top: 0.6rem;
  cursor: pointer;
  border-radius: 1.5rem;
  transition: all 0.2s ease-in 0s;
}
.item-divide {
  margin-top: 1rem;
}
.tab-header {
  display: flex;
  flex-direction: row;
  justify-content: left;
  width: 100%;
}
.header-item-active {
  background-color: rgba(245, 245, 245, 0.7);
}
.header-item {
  box-sizing: border-box;
  cursor: pointer;
  width: 120px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  margin: 0px;
  border-radius: 999px;
  padding: 10px;
}
.color-picker-container {
  position: fixed;
  overflow: hidden;
  padding: 5px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 16px;
  border-radius: 5px;
  z-index: 10;
}

.wrapper-content {
  width: 240px;
  height: 250px;
  overflow-y: auto;
}

.wrapper-item-color {
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 0px;
}
</style>



// WEBPACK FOOTER //
// src/screens/SimpleEdit/ColorPickerCustom.vue