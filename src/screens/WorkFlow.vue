<template>
  <v-container class="container">
    <v-card class="card-item" :to="{ path: '/simple-edit/new' }">
      <v-card-title class="title">
        <p>Chỉnh sửa video</p>
      </v-card-title>
      <v-card-text>
        <img
          class="img-item img-fluid"
          src="/static/assets/images/VideoEditting.png"
          alt
        />
      </v-card-text>
    </v-card>
    <v-card class="card-item" :to="{ name: 'newsVideo' }">
      <v-card-title class="title">
        <span class="d-block">Tạo video từ nhiều</span>
        <span>layout</span>
      </v-card-title>
      <v-card-text>
        <img
          class="img-item img-fluid"
          src="/static/assets/images/MakeVideo.png"
          alt
        />
      </v-card-text>
    </v-card>
    <v-card class="card-item" :to="{ name: 'createVoice' }">
      <v-card-title class="title">
        <span class="d-block">Tạo giọng đọc từ</span>
        <span>văn bản</span>
      </v-card-title>
      <v-card-text>
        <img
          class="img-item img-fluid"
          src="/static/assets/images/TextToVoice.png"
          alt
        />
      </v-card-text>
    </v-card>
    <v-card
      class="card-item"
      :to="{ name: 'exportSubtitleFromVideo', params: { id: 'new' } }"
    >
      <v-card-title class="title">
        <span class="d-block">Lấy subtitle của</span>
        <span>video (1k/p)</span>
      </v-card-title>
      <v-card-text>
        <img
          class="img-item img-fluid"
          src="/static/assets/images/exportSubtitle.jpg"
          alt
        />
      </v-card-text>
    </v-card>
    <v-card class="card-item" :to="{ name: 'CaptureTextOnVideo' }">
      <v-card-title class="title">
        <span class="d-block">Quét text trong</span>
        <span>video</span>
      </v-card-title>
      <v-card-text>
        <img
          class="img-item img-fluid"
          src="/static/assets/images/getTextInVideo.png"
          alt
        />
      </v-card-text>
    </v-card>
    <v-card class="card-item" :to="{ name: 'TranslateFileSubtitle' }">
      <v-card-title class="title">
        <p>Dịch file subtitle</p>
      </v-card-title>
      <v-card-text>
        <img
          class="img-item img-fluid"
          src="/static/assets/images/iconTranslateSubtitle.png"
          alt
        />
      </v-card-text>
    </v-card>
    <v-card v-if="checkUser" class="card-item" :to="{ name: 'autoReup' }">
      <v-card-title class="title">
        <p>Auto reup</p>
      </v-card-title>
      <v-card-text>
        <img
          class="img-item img-fluid"
          src="/static/assets/images/AutoReup.png"
          alt
        />
      </v-card-text>
    </v-card>
    <v-card class="card-item" :to="{ name: 'FollowChannelYoutube' }">
      <v-card-title class="title">
        <p>Theo dõi kênh youtube</p>
      </v-card-title>
      <v-card-text>
        <img
          class="img-item img-fluid"
          src="/static/assets/images/follow-channel.png"
          alt
        />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  computed: {
    checkUser() {
      let user = this.$store.state.user;
      if (user && (user.type === "admin" || user.type === "TEAM_MEMBER")) {
        return true;
      }
      return false;
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.card-item {
  margin: 15px;
  width: 250px;
  text-align: center;
  padding-bottom: 20px;
}

.card-item > .title {
  font-size: 18px;
  font-weight: 600;
  height: 75px;
  display: block;
  margin-bottom: 10px;
}

.img-item {
  object-fit: contain;
  border-radius: 20px;
  width: 120px;
  height: 120px;
}

.card-item {
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
  border: 1px solid #ececec;
  border-radius: 6px;
  background: #fff;
}

.card-item:hover {
  box-shadow: 0px 10px 30px 0px rgba(133, 66, 189, 0.1);
  border: 1px solid rgb(0, 119, 255);
  transform: scale(1.06);
}

/* 
.split-item {
  margin: 0 10px 0 10px;
}
.container-item {
  padding: 10px;
}
.wrapper-item {
  width: 380px;
  height: 480px;
  -webkit-transition: all 0.3s ease-out 0s;
  -moz-transition: all 0.3s ease-out 0s;
  -ms-transition: all 0.3s ease-out 0s;
  -o-transition: all 0.3s ease-out 0s;
  transition: all 0.3s ease-out 0s;
  border: 1px solid #ececec;
  border-radius: 6px;
  background: #fff;
}

.wrapper-item:hover {
  box-shadow: 0px 10px 30px 0px rgba(133, 66, 189, 0.1);
  border: 1px solid transparent;
  transform: scale(1.06);
}

.features .item {
  color: black;
  box-sizing: border-box;
  max-width: 500px;
  margin: 5px 0px 5px;
  background: rgb(241, 243, 246);
  border-radius: 8px;
  padding: 10px 20px;
}

.container {
  max-width: 1350px !important;
}
 */
</style>



// WEBPACK FOOTER //
// src/screens/WorkFlow.vue