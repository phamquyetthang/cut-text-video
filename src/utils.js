import axios from "axios";

class Utils {
  static getHtmlSubtitle(itemData) {
    let css = "";
    let css_wrap = "";
    if (itemData.opaqueBox) {
      switch (itemData.opaqueBoxType) {
        case "FIXED":
          css_wrap = "padding: 10px !important";
          break;
        case "FIXED_WIDTH":
          css = `padding: 10px !important; display: block; background-color: rgba(${
            itemData.shadow.color.rgb.r
          },${itemData.shadow.color.rgb.g},${
            itemData.shadow.color.rgb.b
          },${itemData.shadow.color.opacity / 100});`;
          break;
        case "AUTO":
          css = `background-color: rgba(${itemData.shadow.color.rgb.r},${
            itemData.shadow.color.rgb.g
          },${itemData.shadow.color.rgb.b},${itemData.shadow.color.opacity /
            100});`;
          break;
        case "AUTO2":
          css = `padding: 10px !important; display: inline-block; background-color: rgba(${
            itemData.shadow.color.rgb.r
          },${itemData.shadow.color.rgb.g},${
            itemData.shadow.color.rgb.b
          },${itemData.shadow.color.opacity / 100});`;
          break;
      }
    } else {
      css_wrap = "padding: 10px !important";
    }

    let rowContents =
      `<span style="${css_wrap}"><span style="${css}">` +
      itemData.contentHtml.split("\n").join("<br>") +
      "</span></span>";

    return rowContents;
  }

  static pasreFileText(contentText) {
    let listItemSubtitle = [];
    try {
      if (
        contentText &&
        (contentText.includes("Script generated by Aegisub") ||
          contentText.includes(
            "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut"
          ))
      ) {
        listItemSubtitle = contentText.split("\n");
        listItemSubtitle = listItemSubtitle.filter(x =>
          x.startsWith("Dialogue")
        );
        listItemSubtitle = listItemSubtitle.map(item => {
          let lines = item.split(",");
          let content = "";
          let count = 0;
          for (let i = 0; i < item.length; i++) {
            const charrac = item[i];
            if (charrac === ",") {
              count++;
              if (count === 9) {
                content = item.substring(i + 1, item.length);
              }
            }
          }
          let subtitleStartTime = lines[1];
          let subtitleEndTime = lines[2];
          let subtitleTimeString =
            subtitleStartTime + " --> " + subtitleEndTime;

          subtitleStartTime = Utils.converTimeSubToSecound(subtitleStartTime);
          subtitleEndTime = Utils.converTimeSubToSecound(subtitleEndTime);
          return {
            subtitleStartTime,
            subtitleEndTime,
            subtitleTimeString,
            content: content.replace(/\\N/g, "\n")
          };
        });
      } else {
        let listLines = contentText.split("\n");
        let itemSubtitle = [];
        let currentIndex = 0;
        for (let index = 0; index < listLines.length; index++) {
          try {
            let item = listLines[index].trim();
            if (itemSubtitle.length === 0) {
              currentIndex = Number.parseInt(item);
              if (!currentIndex) {
                return {
                  status: "ERROR",
                  message: `Lỗi dòng subtitle thứ ${index + 1}.!`
                };
              }
              itemSubtitle.push(currentIndex);
            } else if (itemSubtitle.length === 1) {
              itemSubtitle.push(item);
            } else if (itemSubtitle.length === 2) {
              itemSubtitle.push(item);
            } else {
              let nextIndex = Number.parseInt(item);
              if (nextIndex) {
                listItemSubtitle.push(JSON.stringify(itemSubtitle));
                itemSubtitle = [nextIndex];
                currentIndex = nextIndex;
              } else if (item.trim() != "") {
                itemSubtitle.push(item);
              }
            }
            if (index === listLines.length - 1) {
              listItemSubtitle.push(JSON.stringify(itemSubtitle));
            }
          } catch (error) {
            console.log(error);
            return {
              status: "ERROR",
              message: `Lỗi dòng subtitle thứ ${index + 1}.!`
            };
          }
        }
        listItemSubtitle = listItemSubtitle.map(item => {
          return JSON.parse(item);
        });

        listItemSubtitle = listItemSubtitle.filter(
          listItemSubtitle => listItemSubtitle && listItemSubtitle.length >= 3
        );

        listItemSubtitle = listItemSubtitle.map(item => {
          let time = item[1];
          let subtitleStartTime = time.split(" --> ")[0];
          let subtitleEndTime = time.split(" --> ")[1];
          item.shift();
          item.shift();
          subtitleStartTime = Utils.converTimeSubToSecound(subtitleStartTime);
          subtitleEndTime = Utils.converTimeSubToSecound(subtitleEndTime);
          return {
            subtitleTimeString: time,
            subtitleStartTime,
            subtitleEndTime,
            content: item.join("\n")
          };
        });
      }
      listItemSubtitle = listItemSubtitle.filter(item => item.content);
      return {
        status: "SUCCESS",
        data: listItemSubtitle
      };
    } catch (error) {
      return {
        status: "ERROR",
        message: error.message
      };
    }
  }

  static canvasToBlob(canvas) {
    return new Promise((resolve, reject) => {
      try {
        canvas.toBlob(function(blob) {
          resolve(blob);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  static formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  static converTimeSubToSecound(time) {
    try {
      let charPlit = "";
      if (time.includes(",")) {
        charPlit = ",";
      } else if (time.includes(".")) {
        charPlit = ".";
      }
      let times = time.split(":");
      let totalTime =
        parseInt(times[0]) * 3600 +
        parseInt(times[1]) * 60 +
        parseInt(times[2].split(charPlit)[0]) +
        parseInt(times[2].split(charPlit)[1]) /
          Math.pow(10, times[2].split(charPlit)[1].trim().length);
      return totalTime;
    } catch (error) {
      console.log(" ######## error: ", error);
      return 0;
    }
  }

  static generateStroke(size, color) {
    if (size == 0) {
      return "none";
    }
    let phanDu = parseFloat("0." + size.toString().split(".")[1]);
    var maxi = parseInt(size) + 1;
    var text_shadow = "";
    for (var i = maxi; i > 0; i--) {
      for (var j = parseInt(size) + 1; j > 0; j--) {
        text_shadow += `${i - 1 + phanDu}px ${j - 1 + phanDu}px 0 ${color},`;
        text_shadow += `${i - 1 + phanDu}px -${j - 1 + phanDu}px 0 ${color},`;
        text_shadow += `-${i - 1 + phanDu}px -${j - 1 + phanDu}px 0 ${color},`;
        text_shadow += `-${i - 1 + phanDu}px ${j - 1 + phanDu}px 0 ${color},`;
      }
    }
    text_shadow += `0 0 0 ${color}`;
    return text_shadow;
  }

  static bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes == 0) return "0 Byte";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  }

  static secondsToHms = sec => {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "00");
    // sec < 1 ? (sec = '00') : void 0;
    min.toString().length == 1 ? (min = "0" + min) : void 0;
    sec = sec.toFixed(3);

    sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

    if (sec > 0 && sec < 10) {
      sec = "0" + sec;
    }
    let time = hours + ":" + min + ":" + sec;
    return time;
  };

  static secondsToHHMMSSM = sec => {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "00");
    // sec < 1 ? (sec = '00') : void 0;
    min.toString().length == 1 ? (min = "0" + min) : void 0;
    sec = sec.toFixed(1);

    sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

    if (sec >= 0 && sec < 10) {
      sec = "0" + sec;
    }
    let time = hours + ":" + min + ":" + sec;
    return time;
  };

  static secondsToHHMMSSMM = sec => {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "00");
    // sec < 1 ? (sec = '00') : void 0;
    min.toString().length == 1 ? (min = "0" + min) : void 0;
    sec = sec.toFixed(2).replace(".", ",");

    sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

    if (sec >= 0 && sec < 10) {
      sec = "0" + sec;
    }
    let time = hours + ":" + (min.toString().length == 1 ? "0" + min : min) + ":" + (sec.toString().length == 4 ? "0" + sec : sec);
    return time;
  };

  static secondsToHHMMSSMMM = sec => {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "00");
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "00");
    // sec < 1 ? (sec = '00') : void 0;
    min.toString().length == 1 ? (min = "0" + min) : void 0;
    sec = sec.toFixed(3).replace(".", ",");

    sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

    if (sec >= 0 && sec < 10) {
      sec = "0" + sec;
    }
    let time = hours + ":" + min + ":" + sec;
    return time;
  };

  static convertSecoundInCreateVoice = sec => {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "");
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "");
    // sec < 1 ? (sec = '00') : void 0;
    min.toString().length == 1 ? (min = "0" + min) : void 0;
    if (typeof sec === "string") {
      sec = parseFloat(sec);
    }
    sec = sec.toFixed(3);

    sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

    if (sec > 0 && sec < 10) {
      sec = "0" + sec;
    }

    if (hours != "") {
      hours += ":";
    }
    if (min != "") {
      min += ":";
    }
    let time = hours + min + sec;
    return time;
  };

  static secondsToHHMMSS = sec => {
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "");
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "");
    // sec < 1 ? (sec = '00') : void 0;
    min.toString().length == 1 ? (min = "0" + min) : void 0;
    sec = sec.toFixed(2);

    sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

    if (sec > 0 && sec < 10) {
      sec = "0" + sec;
    }
    hours = hours !== "" ? hours + ":" : "";
    min = min !== "" ? min + ":" : "";

    let time = hours + min + sec;
    return time;
  };

  static secondsToTime = sec => {
    if (typeof sec === "string") {
      sec = parseFloat(sec);
    }
    var hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = "");
    var min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = "");
    // sec < 1 ? (sec = '00') : void 0;
    min.toString().length == 1 ? (min = "0" + min) : void 0;
    sec = sec.toFixed(0);

    sec.toString().length == 1 ? (sec = "0" + sec) : void 0;

    hours = hours !== "" ? hours + ":" : "00:";
    min = min !== "" ? min + ":" : "00:";

    let time = hours + min + sec;
    return time;
  };

  static readInfoImage(url) {
    return new Promise((resolve) => {
      try {
        var imgRender = new Image();
        imgRender.addEventListener("load", function() {
          let info = {
            width: imgRender.naturalWidth,
            height: imgRender.naturalHeight,
            display: imgRender.naturalWidth + "x" + imgRender.naturalHeight
          };
          imgRender.remove();
          return resolve(info);
        });
        imgRender.addEventListener("error", function() {
          return resolve(false);
        });
        imgRender.src = url;
      } catch (error) {
        return resolve(false);
      }
    });
  }

  static readInfoAudio(url) {
    return new Promise((resolve) => {
      try {
        var audio = new Audio();
        audio.addEventListener("loadedmetadata", function() {
          let info = {
            duration: audio.duration
          };
          audio.remove();
          return resolve(info);
        });
        audio.addEventListener("error", function() {
          return resolve(false);
        });
        audio.src = url;
      } catch (error) {
        return resolve(false);
      }
    });
  }

  static readInfoVideo(url) {
    return new Promise((resolve) => {
      try {
        let video = document.createElement("video");
        video.addEventListener("error", function() {
          return resolve(false);
        });
        video.addEventListener("loadedmetadata", () => {
          let info = {
            duration: {
              value: parseInt(video.duration),
              display: Utils.secondsToHms(parseInt(video.duration))
            },
            resolution: {
              width: video.videoWidth,
              height: video.videoHeight,
              display: video.videoWidth + "x" + video.videoHeight
            }
          };
          video.remove();
          return resolve(info);
        });
        video.src = url;
      } catch (error) {
        return resolve(false);
      }
    });
  }

  static canvasToUrl = canvas => {
    return new Promise((resolve, reject) => {
      try {
        canvas.toBlob(blob => {
          try {
            let url = URL.createObjectURL(blob);
            resolve(url);
          } catch (error) {
            reject(error);
          }
        });
      } catch (error) {
        reject(error);
      }
    });
  };

  static generateKey() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < 20; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  static getCanvasVideoWithTime(time, urlVideo, height) {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      const video = document.createElement("video");
      video.crossOrigin = "anonymous";
      video.onloadedmetadata = () => {
        video.currentTime = time;
      };

      video.onseeked = () => {
        // delay the drawImage call, otherwise we get an empty canvas on iOS
        // see https://stackoverflow.com/questions/44145740/how-does-double-requestanimationframe-work
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => {
            canvas.height = video.videoHeight;
            canvas.width = video.videoWidth;
            let ratio = video.videoWidth / video.videoHeight;
            // canvas.style.height = height + "px";
            let ctx = canvas.getContext("2d");
            ctx.canvas.width = height * ratio;
            ctx.canvas.height = height;
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            video.remove();
            resolve(canvas);
          });
        });
      };

      video.onerror = () => {
        reject(video.error);
      };

      video.src = urlVideo;
      video.load();
    });
  }

  static async renderRangThumbnail(
    idContainer,
    numImages,
    timePerFrame,
    urlVideo
  ) {
    document.getElementById(idContainer).innerHTML = "";
    const video = document.createElement("video");
    let height = 50;
    let currentTime = 0;

    video.onseeked = () => {
      // delay the drawImage call, otherwise we get an empty canvas on iOS
      // see https://stackoverflow.com/questions/44145740/how-does-double-requestanimationframe-work
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const canvas = document.createElement("canvas");
          canvas.height = video.videoHeight;
          canvas.width = video.videoWidth;
          let ratio = video.videoWidth / video.videoHeight;
          // canvas.style.height = height + "px";
          let ctx = canvas.getContext("2d");
          ctx.canvas.width = height * ratio;
          ctx.canvas.height = height;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          let element = document.getElementById(idContainer);
          if (element) {
            element.appendChild(canvas);
          }
          currentTime = parseFloat(parseFloat(video.currentTime).toFixed(2));

          // resolve(canvas);
        });
      });
    };
    let videoLoaded = false;
    video.onloadedmetadata = () => {
      videoLoaded = true;
    };

    video.onerror = error => {
      console.log(error);
    };

    video.src = urlVideo;
    video.load();
    while (!videoLoaded) {
      await Utils.sleep(100);
    }
    for (let i = 0; i < numImages; i++) {
      let time = parseFloat(parseFloat(i * timePerFrame).toFixed(2));
      video.currentTime = time;
      while (currentTime != time) {
        await Utils.sleep(10);
      }
    }

    video.remove();
    return true;
  }

  static sleep(time) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(resolve, time);
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  static formatNumber(num) {
    return parseFloat(Math.round(num * 100) / 100).toFixed(2);
  }

  static async getInfoVideoByUrl(urlVideo) {
    return new Promise((resolve, reject) => {
      try {
        let video = document.createElement("video");
        video.onloadeddata = () => {
          let data = {
            duration: parseInt(video.duration),
            width: video.videoWidth,
            height: video.videoHeight
          };
          resolve(data);
        };
        video.onerror = e => {
          reject(new Error("Error getInfoVideoByUrl: " + e));
        };
        video.src = urlVideo;
      } catch (error) {
        console.log(error);
        reject(new Error("Error getInfoVideoByUrl: " + error));
      }
    });
  }

  static async getInfoAudioByUrl(urlAudio) {
    return new Promise((resolve, reject) => {
      try {
        let audio = document.createElement("audio");
        audio.onloadeddata = e => {
          let data = {
            duration: parseInt(e.target.duration)
          };
          resolve(data);
        };
        audio.onerror = e => {
          reject(new Error("Error getInfoVideoByUrl: " + e));
        };
        audio.src = urlAudio;
      } catch (error) {
        reject(new Error("Error getInfoVideoByUrl: " + error));
      }
    });
  }

  static async getBase64(url) {
    let response = await axios.get(url, { responseType: "arraybuffer" });
    return new Buffer(response.data, "binary").toString("base64");
  }

  static async ConvertObjectUrlToBase64(url) {
    return new Promise((resolve, reject) => {
      try {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onload = function() {
          if (this.status == 200) {
            var myBlob = this.response;
            resolve(myBlob);
            // myBlob is now the blob that the object URL pointed to.
          }
        };
        xhr.send();
      } catch (error) {
        reject(error);
      }
    });
  }
  static formatNumberToCurrency(num) {
    if (!num) return 0;
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  static removeAllTag(text) {
    var regex = /(<([^>]+)>)/gi;
    let result = text.replace(regex, "");
    return result.trim();
  }

  static subRegex(text, regex) {
    let _regex = new RegExp(`${regex}`, "m");
    let resultRegex = text.match(_regex);
    if (resultRegex) {
      text = text.replace(_regex, "$1\n\n$2");

      while (text.match(_regex)) {
        text = text.replace(_regex, "$1\n\n$2");
      }
    }
    return text;
  }

  static removeCharacter(text, character) {
    for (let i = 0; i < character.length; i++) {
      let element = character[i];
      while (text.includes(element)) {
        text = text.replace(element, "");
      }
    }
    return text;
  }
}

export default Utils;



// WEBPACK FOOTER //
// ./src/utils/index.js