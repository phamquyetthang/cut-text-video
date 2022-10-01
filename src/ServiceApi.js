import Api from "./Api";
var routerApi = "/api/v1/service";

export default class ServiceApi {
  static getFolderData() {
    return Api.get(routerApi + "/get-folder-data", {
      timeout: 60 * 1000
    });
  }

  static getApiCaptureText() {
    return Api.get(routerApi + "/get-api-capture-text", {
      timeout: 60 * 1000
    });
  }
  static updateApiKeyExpired(data) {
    return Api.post(routerApi + "/update-api-key-exprired", data, {
      timeout: 60 * 1000
    });
  }

  static imageToText(payload) {
    return Api.post(routerApi + "/image-to-text", payload, {
      timeout:5 * 60 * 1000
    });
  }
  static getInfoServer() {
    return Api.get(routerApi + "/get-info-server", {
      timeout: 60 * 1000
    });
  }
  static exportSubtitle(payload) {
    return Api.post(routerApi + "/export-subtitle", payload, {
      timeout: 30 * 1000
    });
  }

  static getInfoVideoYoutubeDL(urlVideo) {
    return Api.post(routerApi + "/get-info-video-youtubedl", urlVideo, {
      timeout: 60 * 1000
    });
  }

  static getInfoVideoOnServer(data) {
    return Api.post(routerApi + "/get-info-video-on-server", data, {
      timeout: 60 * 1000
    });
  }

  static searchImageGoogle(payload) {
    return Api.post(routerApi + "/search-image-google", payload, {
      timeout: 5 * 60 * 1000
    });
  }

  static getListVoice() {
    return Api.get(routerApi + "/get-list-voice");
  }

  static previewVoice(payload) {
    return Api.post(routerApi + "/voice-preview", payload, {
      timeout: 60 * 1000
    });
  }

  static getInfoYoutube(data) {
    try {
      return Api.post(routerApi + "/get-info-youtube", data, {
        timeout: 60 * 1000
      });
    } catch (error) {
      return null;
    }
  }
  static searchVideoBlocks(payload) {
    return Api.post(routerApi + "/search-video-blocks", payload, {
      timeout: 30 * 1000
    });
  }

  static changePassword(payload) {
    return Api.post(routerApi + "/change-password", payload);
  }

  static googleTranslate(payload) {
    return Api.post(routerApi + "/google-translate", payload, { timeout: 60 * 1000 });
  }

  static createVoice(payload) {
    return Api.post(routerApi + "/create-voice", payload);
  }

  static checkProxy(payload) {
    return Api.post(routerApi + "/check-proxy", payload, {
      timeout: 60 * 1000
    });
  }
}



// WEBPACK FOOTER //
// ./src/services/ServiceApi.js