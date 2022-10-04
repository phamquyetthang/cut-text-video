(function(){"use strict";var t={2733:function(t,e,i){var o=i(144),a=i(3982),r=i.n(a),n=i(764),s=i.n(n),l=i(4765),d=i.n(l),c=i(998),u=i(2928),h=function(){var t=this,e=t._self._c;return e(c.Z,[e(u.Z,[e("CaptureTextOnVideo")],1)],1)},g=[],p=i(5146),v=i(4324),m=i(2033),y=i(2648),f=function(){var t=this,e=t._self._c;return e("div",{staticStyle:{"max-width":"1400px",margin:"auto"}},[e("div",{staticClass:"d-flex justify-center align-center"},[e("div",{staticClass:"text-center"},[t._m(0),t._m(1),t.videoData&&t.videoData.url?e(p.Z,{staticClass:"btn-default",attrs:{large:""},on:{click:function(e){return t.$refs.modalInputFile.show()}}},[t._v(" Chọn Video Khác ")]):e("div",{staticClass:"text-center"},[e(p.Z,{staticClass:"btn-default",attrs:{large:""},on:{click:function(e){return t.$refs.modalInputFile.show()}}},[t._v(" Tải Lên Video ")])],1)],1)]),t.videoData&&t.videoData.url?e("div",[e("div",{staticClass:"d-flex px-5 mt-5"},[e("div",{ref:"containerVideo",staticClass:"border reset video-content",style:t.getStyleParent,attrs:{id:"container-video"}},[e("canvas",{attrs:{id:"canvas"}}),e("video",{ref:"videoPlay",staticStyle:{width:"100%",height:"100%"},attrs:{id:"videoPlay",src:t.videoData.url,controls:"",hidden:""},on:{timeupdate:t.OnTimeUpdate,play:t.onVideoPlay,loadedmetadata:t.onLoadedMeradata}}),t.videoLoaded?e("vue-draggable-resizable",{key:t.keyUpdateRange,attrs:{"min-width":10,"min-height":10,"class-name":"drag-resize-item-active",active:!0,parent:!0,x:t.videoData&&t.videoData.x&&t.layoutMainWidth?t.videoData.x*t.layoutMainWidth:0,y:t.videoData&&t.videoData.y&&t.layoutMainWidth?t.videoData.y*t.layoutMainHeight:0,w:t.videoData&&t.videoData.width&&t.layoutMainWidth?t.videoData.width*t.layoutMainWidth:600,h:t.videoData&&t.videoData.height&&t.layoutMainWidth?t.videoData.height*t.layoutMainHeight:100},on:{dragstop:t.onDragStop,resizestop:t.onResizeStop,dragging:t.onDragStop,resizing:t.onResizeStop}},[e("div",{staticStyle:{width:"100%",height:"100%","object-fit":"fill"},attrs:{id:"xxx"}})]):t._e()],1)]),e("div",{staticClass:"d-flex mx-5 justify-space-around",staticStyle:{border:"1px dashed gray"}},[e(p.Z,{attrs:{icon:""},on:{click:t.previousTime}},[e(v.Z,{attrs:{color:"black"}},[t._v("mdi-skip-previous")])],1),t.isPlay?e(p.Z,{attrs:{icon:""},on:{click:t.onClickPause}},[e(v.Z,{attrs:{color:"black"}},[t._v("mdi-pause")])],1):e(p.Z,{attrs:{icon:""},on:{click:t.onClickPlay}},[e(v.Z,{attrs:{color:"black"}},[t._v(" mdi-play")])],1),e(p.Z,{attrs:{icon:""},on:{click:t.onNextTime}},[e(v.Z,{attrs:{color:"black"}},[t._v("mdi-skip-next")])],1),e(p.Z,{attrs:{icon:""},on:{click:t.onClickStopVideo}},[e(v.Z,{attrs:{color:"black"}},[t._v("mdi-replay")])],1),e("div",{staticClass:"timer text-center",staticStyle:{"min-width":"150px","max-width":"150px"}},[e("span",{staticClass:"font-weight-bold fs-xl black--text"},[t._v(t._s(t.getTimeVideo))])]),e("div",{staticClass:"d-flex mx-4 justify-center align-center"},[e("span",[t._v("Next-time: ")]),e(m.Z,{staticStyle:{width:"70px"},attrs:{type:"number",outlined:"","hide-details":"",dense:""},model:{value:t.nextTime,callback:function(e){t.nextTime=e},expression:"nextTime"}})],1)],1),e("div",{staticClass:"mx-5"},[e("textarea",{directives:[{name:"model",rawName:"v-model",value:t.textPreview,expression:"textPreview"}],staticStyle:{border:"1px solid gray",width:"100%","text-align":"center"},style:`font-size: ${t.fontSizeResult}px !important;`,attrs:{rows:"3"},domProps:{value:t.textPreview},on:{input:function(e){e.target.composing||(t.textPreview=e.target.value)}}})]),e("canvas",{attrs:{id:"imagePreview",hidden:""}},[t._v(" Your browser does not support the HTML5 canvas tag. ")]),e("div",{staticClass:"d-flex justify-center align-center py-2",staticStyle:{position:"relative"}},[e(p.Z,{staticClass:"px-5",attrs:{color:"primary"},on:{click:t.onGetText}},[t._v(" Lấy Text ")]),e(p.Z,{staticClass:"mx-4 px-10",attrs:{color:"success"},on:{click:t.onSave}},[t._v(" Lưu ")]),t.isAutoRunning?t._e():e(p.Z,{attrs:{color:"info"},on:{click:t.onAuto}},[t._v(" Auto ")]),t.isAutoRunning?e(p.Z,{attrs:{color:"error"},on:{click:t.onStop}},[t._v(" Stop Auto ")]):t._e(),e("div",{staticClass:"d-flex mx-4 justify-center align-center"},[e("span",[t._v("Font-size: ")]),e(m.Z,{staticStyle:{width:"80px"},attrs:{type:"number",outlined:"","hide-details":"",dense:""},model:{value:t.fontSizeResult,callback:function(e){t.fontSizeResult=e},expression:"fontSizeResult"}})],1),e("loading",{attrs:{active:t.isLoading,"can-cancel":!1,"is-full-page":!1,height:25,width:25},on:{"update:active":function(e){t.isLoading=e}}})],1),t.videoData&&t.videoData.url?e("div",{staticClass:"pa-3"},[t._m(2),e(y.Z,{staticStyle:{"font-size":"20px"},attrs:{rows:"10","max-height":"20",outlined:"",label:"Kết quả",id:"textarea_id"},on:{keydown:t.onKeyDown},model:{value:t.contentResult,callback:function(e){t.contentResult=e},expression:"contentResult"}})],1):t._e()]):t._e(),e("ModalUploadFile",{ref:"modalInputFile",attrs:{typeParent:"EXPORT_SUBTITLE"},on:{pushNewVideo:t.uploadVideoMain}}),e("loading",{attrs:{active:t.isLoadingFull,"can-cancel":!1,"is-full-page":!1,height:40,width:40},on:{"update:active":function(e){t.isLoadingFull=e}}})],1)},w=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"mb-2"},[e("h1",{staticClass:"font-weight-bold black--text my-3"},[t._v(" Lấy text trong video ")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"mb-2 text-center"},[e("span",{staticClass:"font-weight-bold ml-2"},[t._v("*Danh sách ngôn ngữ hỗ trợ: ")]),e("span",[t._v("Trung Quốc, Hà Lan, Anh, Pháp, Đức, Ý, Nhật, Bồ Đào Nha, Tây Ba Nha")])])},function(){var t=this,e=t._self._c;return e("div",{staticClass:"mb-2"},[e("span",{staticClass:"font-weight-bold mr-3"},[t._v("Kết quả:")])])}],x=i(9755),b=i.n(x),T=i(9582),S=i(4886),k=i(3049),C=i(2933),M=i(3305),I=function(){var t=this,e=t._self._c;return e(k.Z,{attrs:{"content-class":"radius-20",scrollable:"","max-width":"800px",persistent:t.isLoading},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[e(T.Z,[e(C.Z,{attrs:{absolute:"",value:t.isLoading}},[e(M.Z,{attrs:{size:70,width:7,color:"primary",indeterminate:""}})],1),e(S.EB,[e("div",{staticClass:"text-center mt-5",staticStyle:{flex:"1"}},[e("h3",{staticClass:"font-weight-bold"},[t._v("Tải lên Video")])]),e(p.Z,{staticStyle:{position:"absolute",right:"10px",top:"10px"},attrs:{icon:""},on:{click:function(e){t.showModal=!1}}},[e(v.Z,[t._v("mdi-close")])],1)],1),e(S.ZB,[e("div",{staticClass:"d-block text-center",attrs:{id:"vue-dropzone"},on:{click:function(e){return t.$refs.inputVideoFile.click()}}},[e("div",[e(v.Z,{attrs:{size:"52"}},[t._v("mdi-cloud-upload-outline")])],1),e("span",{staticClass:"mt-3 d-block font-weight-500 black--text"},[t._v("Tải lên video")]),e("span",{staticClass:"d-block mt-2"},[t._v("Click để chọn ")])]),e("div",{staticClass:"choose-items d-flex justify-space-around"},[e("div",{staticClass:"text-center choose-item",on:{click:function(e){return t.$refs.inputVideoFile.click()}}},[e(v.Z,{staticClass:"d-block",attrs:{size:"38"}},[t._v("mdi-folder-outline")]),e("span",{staticClass:"d-block mt-2"},[t._v("Desktop")])],1),t.checkShowOptionsYTBGoogleDriver?e("div",{staticClass:"text-center choose-item",on:{click:function(e){t.typeInputUrl="youtube"}}},[e(v.Z,{staticClass:"d-block",attrs:{size:"38"}},[t._v("mdi-youtube")]),e("span",{staticClass:"d-block mt-2"},[t._v("Youtube")])],1):t._e(),t.checkShowOptionsYTBGoogleDriver?e("div",{staticClass:"text-center choose-item",on:{click:function(e){t.typeInputUrl="google-driver"}}},[e(v.Z,{staticClass:"d-block",attrs:{size:"38"}},[t._v("mdi-google-drive")]),e("span",{staticClass:"d-block mt-2"},[t._v("Google Driver")])],1):t._e()]),e("div",{staticClass:"choose-items"},["youtube"===t.typeInputUrl||"google-driver"===t.typeInputUrl?e(m.Z,{attrs:{"prepend-inner-icon":"youtube"===t.typeInputUrl?"mdi-youtube":"mdi-google-drive",outlined:"","append-icon":"mdi-download",placeholder:"Nhập link youtube"},on:{"click:append":t.onLoadUrlYoutubeGoogleDriver,keydown:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.onLoadUrlYoutubeGoogleDriver.apply(null,arguments)}},model:{value:t.inputUrl,callback:function(e){t.inputUrl=e},expression:"inputUrl"}}):t._e()],1)])],1),e("input",{ref:"inputVideoFile",attrs:{type:"file",name:"inputVideoFile",id:"inputVideoFile",hidden:"",accept:t.getAcceptType,multiple:""},on:{change:t.onSelectFile}})],1)},$=[],L=i(2482),E=(i(7658),i(1703),i(9669)),P=i.n(E);class _{static getHtmlSubtitle(t){let e="",i="";if(t.opaqueBox)switch(t.opaqueBoxType){case"FIXED":i="padding: 10px !important";break;case"FIXED_WIDTH":e=`padding: 10px !important; display: block; background-color: rgba(${t.shadow.color.rgb.r},${t.shadow.color.rgb.g},${t.shadow.color.rgb.b},${t.shadow.color.opacity/100});`;break;case"AUTO":e=`background-color: rgba(${t.shadow.color.rgb.r},${t.shadow.color.rgb.g},${t.shadow.color.rgb.b},${t.shadow.color.opacity/100});`;break;case"AUTO2":e=`padding: 10px !important; display: inline-block; background-color: rgba(${t.shadow.color.rgb.r},${t.shadow.color.rgb.g},${t.shadow.color.rgb.b},${t.shadow.color.opacity/100});`;break}else i="padding: 10px !important";let o=`<span style="${i}"><span style="${e}">`+t.contentHtml.split("\n").join("<br>")+"</span></span>";return o}static pasreFileText(t){let e=[];try{if(t&&(t.includes("Script generated by Aegisub")||t.includes("Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut")))e=t.split("\n"),e=e.filter((t=>t.startsWith("Dialogue"))),e=e.map((t=>{let e=t.split(","),i="",o=0;for(let s=0;s<t.length;s++){const e=t[s];","===e&&(o++,9===o&&(i=t.substring(s+1,t.length)))}let a=e[1],r=e[2],n=a+" --\x3e "+r;return a=_.converTimeSubToSecound(a),r=_.converTimeSubToSecound(r),{subtitleStartTime:a,subtitleEndTime:r,subtitleTimeString:n,content:i.replace(/\\N/g,"\n")}}));else{let o=t.split("\n"),a=[],r=0;for(let t=0;t<o.length;t++)try{let i=o[t].trim();if(0===a.length){if(r=Number.parseInt(i),!r)return{status:"ERROR",message:`Lỗi dòng subtitle thứ ${t+1}.!`};a.push(r)}else if(1===a.length)a.push(i);else if(2===a.length)a.push(i);else{let t=Number.parseInt(i);t?(e.push(JSON.stringify(a)),a=[t],r=t):""!=i.trim()&&a.push(i)}t===o.length-1&&e.push(JSON.stringify(a))}catch(i){return console.log(i),{status:"ERROR",message:`Lỗi dòng subtitle thứ ${t+1}.!`}}e=e.map((t=>JSON.parse(t))),e=e.filter((t=>t&&t.length>=3)),e=e.map((t=>{let e=t[1],i=e.split(" --\x3e ")[0],o=e.split(" --\x3e ")[1];return t.shift(),t.shift(),i=_.converTimeSubToSecound(i),o=_.converTimeSubToSecound(o),{subtitleTimeString:e,subtitleStartTime:i,subtitleEndTime:o,content:t.join("\n")}}))}return e=e.filter((t=>t.content)),{status:"SUCCESS",data:e}}catch(i){return{status:"ERROR",message:i.message}}}static canvasToBlob(t){return new Promise(((e,i)=>{try{t.toBlob((function(t){e(t)}))}catch(o){i(o)}}))}static formatBytes(t,e=2){if(0===t)return"0 bytes";const i=1024,o=e<0?0:e,a=["bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],r=Math.floor(Math.log(t)/Math.log(i));return parseFloat((t/Math.pow(i,r)).toFixed(o))+" "+a[r]}static converTimeSubToSecound(t){try{let e="";t.includes(",")?e=",":t.includes(".")&&(e=".");let i=t.split(":"),o=3600*parseInt(i[0])+60*parseInt(i[1])+parseInt(i[2].split(e)[0])+parseInt(i[2].split(e)[1])/Math.pow(10,i[2].split(e)[1].trim().length);return o}catch(e){return console.log(" ######## error: ",e),0}}static generateStroke(t,e){if(0==t)return"none";let i=parseFloat("0."+t.toString().split(".")[1]);for(var o=parseInt(t)+1,a="",r=o;r>0;r--)for(var n=parseInt(t)+1;n>0;n--)a+=`${r-1+i}px ${n-1+i}px 0 ${e},`,a+=`${r-1+i}px -${n-1+i}px 0 ${e},`,a+=`-${r-1+i}px -${n-1+i}px 0 ${e},`,a+=`-${r-1+i}px ${n-1+i}px 0 ${e},`;return a+=`0 0 0 ${e}`,a}static bytesToSize(t){var e=["Bytes","KB","MB","GB","TB"];if(0==t)return"0 Byte";var i=parseInt(Math.floor(Math.log(t)/Math.log(1024)));return Math.round(t/Math.pow(1024,i),2)+" "+e[i]}static readInfoImage(t){return new Promise((e=>{try{var i=new Image;i.addEventListener("load",(function(){let t={width:i.naturalWidth,height:i.naturalHeight,display:i.naturalWidth+"x"+i.naturalHeight};return i.remove(),e(t)})),i.addEventListener("error",(function(){return e(!1)})),i.src=t}catch(o){return e(!1)}}))}static readInfoAudio(t){return new Promise((e=>{try{var i=new Audio;i.addEventListener("loadedmetadata",(function(){let t={duration:i.duration};return i.remove(),e(t)})),i.addEventListener("error",(function(){return e(!1)})),i.src=t}catch(o){return e(!1)}}))}static readInfoVideo(t){return new Promise((e=>{try{let i=document.createElement("video");i.addEventListener("error",(function(){return e(!1)})),i.addEventListener("loadedmetadata",(()=>{let t={duration:{value:parseInt(i.duration),display:_.secondsToHms(parseInt(i.duration))},resolution:{width:i.videoWidth,height:i.videoHeight,display:i.videoWidth+"x"+i.videoHeight}};return i.remove(),e(t)})),i.src=t}catch(i){return e(!1)}}))}static generateKey(){for(var t="",e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",i=e.length,o=0;o<20;o++)t+=e.charAt(Math.floor(Math.random()*i));return t}static getCanvasVideoWithTime(t,e,i){return new Promise(((o,a)=>{const r=document.createElement("canvas"),n=document.createElement("video");n.crossOrigin="anonymous",n.onloadedmetadata=()=>{n.currentTime=t},n.onseeked=()=>{window.requestAnimationFrame((()=>{window.requestAnimationFrame((()=>{r.height=n.videoHeight,r.width=n.videoWidth;let t=n.videoWidth/n.videoHeight,e=r.getContext("2d");e.canvas.width=i*t,e.canvas.height=i,e.drawImage(n,0,0,r.width,r.height),n.remove(),o(r)}))}))},n.onerror=()=>{a(n.error)},n.src=e,n.load()}))}static async renderRangThumbnail(t,e,i,o){document.getElementById(t).innerHTML="";const a=document.createElement("video");let r=50,n=0;a.onseeked=()=>{window.requestAnimationFrame((()=>{window.requestAnimationFrame((()=>{const e=document.createElement("canvas");e.height=a.videoHeight,e.width=a.videoWidth;let i=a.videoWidth/a.videoHeight,o=e.getContext("2d");o.canvas.width=r*i,o.canvas.height=r,o.drawImage(a,0,0,e.width,e.height);let s=document.getElementById(t);s&&s.appendChild(e),n=parseFloat(parseFloat(a.currentTime).toFixed(2))}))}))};let s=!1;a.onloadedmetadata=()=>{s=!0},a.onerror=t=>{console.log(t)},a.src=o,a.load();while(!s)await _.sleep(100);for(let l=0;l<e;l++){let t=parseFloat(parseFloat(l*i).toFixed(2));a.currentTime=t;while(n!=t)await _.sleep(10)}return a.remove(),!0}static sleep(t){return new Promise(((e,i)=>{try{setTimeout(e,t)}catch(o){console.log(o),i(o)}}))}static formatNumber(t){return parseFloat(Math.round(100*t)/100).toFixed(2)}static async getInfoVideoByUrl(t){return new Promise(((e,i)=>{try{let o=document.createElement("video");o.onloadeddata=()=>{let t={duration:parseInt(o.duration),width:o.videoWidth,height:o.videoHeight};e(t)},o.onerror=t=>{i(new Error("Error getInfoVideoByUrl: "+t))},o.src=t}catch(o){console.log(o),i(new Error("Error getInfoVideoByUrl: "+o))}}))}static async getInfoAudioByUrl(t){return new Promise(((e,i)=>{try{let o=document.createElement("audio");o.onloadeddata=t=>{let i={duration:parseInt(t.target.duration)};e(i)},o.onerror=t=>{i(new Error("Error getInfoVideoByUrl: "+t))},o.src=t}catch(o){i(new Error("Error getInfoVideoByUrl: "+o))}}))}static async getBase64(t){let e=await P().get(t,{responseType:"arraybuffer"});return new Buffer(e.data,"binary").toString("base64")}static async ConvertObjectUrlToBase64(t){return new Promise(((e,i)=>{try{var o=new XMLHttpRequest;o.open("GET",t,!0),o.responseType="blob",o.onload=function(){if(200==this.status){var t=this.response;e(t)}},o.send()}catch(a){i(a)}}))}static formatNumberToCurrency(t){return t?t.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,"):0}static removeAllTag(t){var e=/(<([^>]+)>)/gi;let i=t.replace(e,"");return i.trim()}static subRegex(t,e){let i=new RegExp(`${e}`,"m"),o=t.match(i);if(o){t=t.replace(i,"$1\n\n$2");while(t.match(i))t=t.replace(i,"$1\n\n$2")}return t}static removeCharacter(t,e){for(let i=0;i<e.length;i++){let o=e[i];while(t.includes(o))t=t.replace(o,"")}return t}}(0,L.Z)(_,"secondsToHms",(t=>{var e=Math.floor(t/3600);e>=1?t-=3600*e:e="00";var i=Math.floor(t/60);i>=1?t-=60*i:i="00",1==i.toString().length&&(i="0"+i),t=t.toFixed(3),1==t.toString().length&&(t="0"+t),t>0&&t<10&&(t="0"+t);let o=e+":"+i+":"+t;return o})),(0,L.Z)(_,"secondsToHHMMSSM",(t=>{var e=Math.floor(t/3600);e>=1?t-=3600*e:e="00";var i=Math.floor(t/60);i>=1?t-=60*i:i="00",1==i.toString().length&&(i="0"+i),t=t.toFixed(1),1==t.toString().length&&(t="0"+t),t>=0&&t<10&&(t="0"+t);let o=e+":"+i+":"+t;return o})),(0,L.Z)(_,"secondsToHHMMSSMM",(t=>{var e=Math.floor(t/3600);e>=1?t-=3600*e:e="00";var i=Math.floor(t/60);i>=1?t-=60*i:i="00",1==i.toString().length&&(i="0"+i),t=t.toFixed(2).replace(".",","),1==t.toString().length&&(t="0"+t),t>=0&&t<10&&(t="0"+t);let o=e+":"+(1==i.toString().length?"0"+i:i)+":"+(4==t.toString().length?"0"+t:t);return o})),(0,L.Z)(_,"secondsToHHMMSSMMM",(t=>{var e=Math.floor(t/3600);e>=1?t-=3600*e:e="00";var i=Math.floor(t/60);i>=1?t-=60*i:i="00",1==i.toString().length&&(i="0"+i),t=t.toFixed(3).replace(".",","),1==t.toString().length&&(t="0"+t),t>=0&&t<10&&(t="0"+t);let o=e+":"+i+":"+t;return o})),(0,L.Z)(_,"convertSecoundInCreateVoice",(t=>{var e=Math.floor(t/3600);e>=1?t-=3600*e:e="";var i=Math.floor(t/60);i>=1?t-=60*i:i="",1==i.toString().length&&(i="0"+i),"string"===typeof t&&(t=parseFloat(t)),t=t.toFixed(3),1==t.toString().length&&(t="0"+t),t>0&&t<10&&(t="0"+t),""!=e&&(e+=":"),""!=i&&(i+=":");let o=e+i+t;return o})),(0,L.Z)(_,"secondsToHHMMSS",(t=>{var e=Math.floor(t/3600);e>=1?t-=3600*e:e="";var i=Math.floor(t/60);i>=1?t-=60*i:i="",1==i.toString().length&&(i="0"+i),t=t.toFixed(2),1==t.toString().length&&(t="0"+t),t>0&&t<10&&(t="0"+t),e=""!==e?e+":":"",i=""!==i?i+":":"";let o=e+i+t;return o})),(0,L.Z)(_,"secondsToTime",(t=>{"string"===typeof t&&(t=parseFloat(t));var e=Math.floor(t/3600);e>=1?t-=3600*e:e="";var i=Math.floor(t/60);i>=1?t-=60*i:i="",1==i.toString().length&&(i="0"+i),t=t.toFixed(0),1==t.toString().length&&(t="0"+t),e=""!==e?e+":":"00:",i=""!==i?i+":":"00:";let o=e+i+t;return o})),(0,L.Z)(_,"canvasToUrl",(t=>new Promise(((e,i)=>{try{t.toBlob((t=>{try{let i=URL.createObjectURL(t);e(i)}catch(o){i(o)}}))}catch(o){i(o)}}))));var F=_,B=new o["default"]({}),R=t=>{switch(t.status){case 401:B.$swal.fire({icon:"error",title:"Chưa Đăng Nhập"});break;case 1e3:B.$swal.fire({icon:"error",title:"Lỗi Kết Nối Server"});break;case 500:B.$swal.fire({icon:"error",title:"Lỗi Server. Vui Lòng báo cho Admin.!"});break;case 400:if(t&&t.data&&!1===t.data.isActive)return;B.$swal.fire({icon:"error",title:`${t.data.message?t.data.message:""}`});break;case 404:B.$swal.fire({icon:"error",title:"Không tìm thấy Api"});break;case 409:B.$swal.fire({icon:"error",title:"Đã Tồn Tại.!"});break;default:B.$swal.fire({icon:"error",title:"Lỗi"});break}};class V{}(0,L.Z)(V,"post",(async(t,e,i)=>{let o={baseURL:{NODE_ENV:"production",BASE_URL:"/cut-text-video/"}.SERVER_API||"https://tesseract-ocr2.herokuapp.com",headers:{Authorization:"Bearer  store.state.token"},timeout:1e4};var a={...o,...i};a.headers={...a.headers};var r={};try{r=await P().post(t,e,a)}catch(n){r=n.response}return r&&(r.status||r.data&&r.data.status||r.error&&r.error.response&&(r.error.response.status||r.error.response.data.status))||(r={status:1e3,message:"Netword Error.!"}),200!=r.status&&R(r),r})),(0,L.Z)(V,"get",(async(t,e)=>{let i={baseURL:{NODE_ENV:"production",BASE_URL:"/cut-text-video/"}.SERVER_API,headers:{Authorization:"Bearer  store.state.token"},timeout:1e4};var o={...i,...e},a={};try{a=await P().get(t,o)}catch(r){a=r.response}return a&&(a.status||a.data&&a.data.status||a.error&&a.error.response&&a.error.response.data.status)||(a={status:1e3,message:"Netword Error.!"}),200!=a.status&&R(a),a}));var D="/api/v1/service";class H{static getFolderData(){return V.get(D+"/get-folder-data",{timeout:6e4})}static getApiCaptureText(){return V.get(D+"/get-api-capture-text",{timeout:6e4})}static updateApiKeyExpired(t){return V.post(D+"/update-api-key-exprired",t,{timeout:6e4})}static imageToText(t){return V.post("/images/image-to-text",t,{timeout:3e5})}static getInfoServer(){return V.get(D+"/get-info-server",{timeout:6e4})}static exportSubtitle(t){return V.post(D+"/export-subtitle",t,{timeout:3e4})}static getInfoVideoYoutubeDL(t){return V.post(D+"/get-info-video-youtubedl",t,{timeout:6e4})}static getInfoVideoOnServer(t){return V.post(D+"/get-info-video-on-server",t,{timeout:6e4})}static searchImageGoogle(t){return V.post(D+"/search-image-google",t,{timeout:3e5})}static getListVoice(){return V.get(D+"/get-list-voice")}static previewVoice(t){return V.post(D+"/voice-preview",t,{timeout:6e4})}static getInfoYoutube(t){try{return V.post(D+"/get-info-youtube",t,{timeout:6e4})}catch(e){return null}}static searchVideoBlocks(t){return V.post(D+"/search-video-blocks",t,{timeout:3e4})}static changePassword(t){return V.post(D+"/change-password",t)}static googleTranslate(t){return V.post(D+"/google-translate",t,{timeout:6e4})}static createVoice(t){return V.post(D+"/create-voice",t)}static checkProxy(t){return V.post(D+"/check-proxy",t,{timeout:6e4})}}var U={data(){return{showModal:!1,typeInputUrl:"local",inputUrl:"",isLoading:!1}},props:{typeInput:{type:String,default:"video"},typeParent:{type:String}},computed:{checkShowOptionsYTBGoogleDriver(){return"EXPORT_SUBTITLE"!==this.typeParent},getAcceptType(){let t="";return this.typeInput?(this.typeInput.includes("video")&&(t+="video/mp4,"),this.typeInput.includes("image")&&(t+="image/png, image/jpeg,image/gif"),this.typeInput.includes("audio")&&(t+="audio/mp3,audio/wav"),t):"*"}},methods:{async onLoadUrlYoutubeGoogleDriver(){this.isLoading=!0;let t=this.inputUrl;if(""!==t){let i={id:F.generateKey(),name:"Loading...",date:"Loading...",size:"Loading...",typeFile:"Loading...",url:"",thumbnail:"https://getuikit.com/v2/docs/images/placeholder_600x400.svg",resolution:{width:0,height:0,display:"Loading..."},duration:{value:0,display:"Loading..."},activeSplitTimeIndex:0,isLoading:!0,filter:{crop:{ratio:"",x:0,y:0,width:0,height:0},rotate:0,quality:"Loading..."}};try{let o=await H.getInfoVideoYoutubeDL({urlVideo:t});if(o&&200===o.status){let t=o.data;if(t.duration=t.duration?parseFloat(t.duration.toFixed(2)):0,i={urlOriginal:t.webpageUrl,id:i.id,name:t.title,date:"",size:t.size?F.bytesToSize(t.size):"",typeFile:this.typeInput,url:t.url,thumbnail:t.thumbnail,resolution:{width:t.width,height:t.height,display:t.width+"x"+t.height},duration:{value:t.duration,display:t.duration?F.secondsToHms(t.duration):""},typeUrl:this.linkVideoType},!i.duration.value||!i.resolution.width)try{let e=await F.getInfoVideoByUrl(t.url);e&&e.duration&&(i={...i,duration:{value:e.duration,display:F.secondsToHms(e.duration)},resolution:{width:e.width,height:e.height,display:e.width+"x"+e.height}})}catch(e){i.resolution={width:1280,height:720,display:"1280x720"}}this.$emit("pushNewVideo",i),this.$swal.fire({icon:"success",title:"Get Video Success",showConfirmButton:!1,timer:800}),this.hide()}else this.$emit("pushNewVideo",i,"error"),this.$swal.fire({icon:"error",title:"Server is Overload",showConfirmButton:!1})}catch(e){this.$swal.fire({icon:"error",title:"Error "+e,showConfirmButton:!0}),this.$emit("pushNewVideo",i,"error")}}this.isLoading=!1},show(){this.showModal=!0},hide(){this.showModal=!1},async onSelectFile(t){if(this.isLoading=!0,!this.$refs.inputVideoFile||!this.$refs.inputVideoFile.files)return;let e=this.$refs.inputVideoFile.files;for(let o=0;o<e.length;o++)try{let t=e[o],i=F.generateKey();await this.loadInfoFileAsync(t,this,i)}catch(i){console.error("🚀 ~ file: ModalUploadFile.vue ~ line 277 ~ onSelectFile ~ error",i)}this.isLoading=!1,t.target.value="",this.hide()},async loadInfoFileAsync(t,e,i){return new Promise(((o,a)=>{try{let n=URL.createObjectURL(t),s={id:i,file:t,name:t.name,date:"01/10/2022",size:F.bytesToSize(t.size),typeFile:this.typeInput,url:n,thumbnail:"",resolution:{width:0,height:0,display:"0x0"},duration:{value:0,display:""},typeUrl:"local"};if(t&&t.type.includes("image")){var r=new Image;r.addEventListener("load",(function(){s={...s,typeFile:"image",resolution:{width:r.naturalWidth,height:r.naturalHeight,display:r.naturalWidth+"x"+r.naturalHeight}},e.$emit("pushNewVideo",s),o(!0)})),r.src=n}else{let t=document.createElement("video");t.addEventListener("error",(function(t){console.log(" #### error: ",t),e.$emit("pushNewVideo",s,"error"),e.$swal.fire({icon:"error",title:"Lỗi.! Kiểm tra url video",showConfirmButton:!0}),a(t)})),t.addEventListener("loadedmetadata",(()=>{let i=parseFloat(t.duration.toFixed(2));return s={...s,typeFile:"video",duration:{value:i,display:F.secondsToHms(i)},resolution:{width:t.videoWidth,height:t.videoHeight,display:t.videoWidth+"x"+t.videoHeight}},e.$emit("pushNewVideo",s),t.remove(),o(!0)})),t.src=n}}catch(n){console.log(" #### error: ",n),e.$swal.fire({icon:"error",title:"Lỗi.! Kiểm tra url video",showConfirmButton:!0}),a(n)}}))}},mounted(){}},Z=U,A=i(3736),O=(0,A.Z)(Z,I,$,!1,null,"5e76e686",null),W=O.exports,z=i(7398),N=i.n(z),j={components:{ModalUploadFile:W,Loading:N()},data(){return{videoLoaded:!1,isPlay:!1,currentTimeVideo:0,textPreview:"",contentResult:"",videoData:{name:""},isLoadingFull:!1,isLoading:!1,key:0,imageCrop:{x:0,y:0,width:200,height:200},oldResult:"",isAutoRunning:!1,layoutMainWidth:0,layoutMainHeight:0,progressUpload:0,isCreateFailed:null,isFinish:!1,isEditVideo:!1,idVideoEdit:null,keyUpdateRange:0,fontSizeResult:32,nextTime:1}},computed:{getStyleParent(){return`height: ${this.layoutMainHeight}px; width: ${this.layoutMainWidth}px`},getTimeVideo(){return F.secondsToHHMMSSM(this.currentTimeVideo)}},watch:{textPreview(){}},methods:{auto_grow(){},onSave(){this.textPreview&&(this.contentResult+=this.textPreview.trim()+"\n\n"),this.textPreview="";var t=document.getElementById("textarea_id");t.scrollTop=t.scrollHeight},async onStop(){this.isAutoRunning=!1},similarity(t,e){var i=t,o=e;t.length<e.length&&(i=e,o=t);var a=i.length;return 0==a?1:(a-this.editDistance(i,o))/parseFloat(a)},editDistance(t,e){t=t.toLowerCase(),e=e.toLowerCase();for(var i=new Array,o=0;o<=t.length;o++){for(var a=o,r=0;r<=e.length;r++)if(0==o)i[r]=r;else if(r>0){var n=i[r-1];t.charAt(o-1)!=e.charAt(r-1)&&(n=Math.min(Math.min(n,a),i[r])+1),i[r-1]=a,a=n}o>0&&(i[e.length]=a)}return i[e.length]},async onAuto(){try{let t=document.getElementById("videoPlay");this.isAutoRunning=!0;while(t.currentTime<t.duration){if(!this.isAutoRunning)return;t.currentTime+=parseInt(this.nextTime);let e=await this.getText();if(!e||""===e){await F.sleep(1e3);continue}let i=!1;if(this.oldResult){let t=this.similarity(this.oldResult,e);t>.5&&(i=!0),e.includes(this.oldResult)&&(i=!0)}i||(this.contentResult+=e+"\n\n",this.oldResult=e),await F.sleep(1e3)}this.$swal({type:"success",title:"Xong.!"})}catch(t){console.log(t)}this.isAutoRunning=!1},async imageToText(t){let e=await H.imageToText({image:t});return e.data.result},async getText(){var t=document.getElementById("imagePreview"),e=t.getContext("2d"),i=document.getElementById("canvas");t.width=this.imageCrop.width,t.height=this.imageCrop.height,e.drawImage(i,this.imageCrop.x,this.imageCrop.y,this.imageCrop.width,this.imageCrop.height,0,0,this.imageCrop.width,this.imageCrop.height);let o=t.toDataURL(),a=await this.imageToText(o);if(null!=a)return this.$notify({type:"success",title:"Thành Công.!"}),a.trim()},async onGetText(){this.isLoading=!0;try{this.textPreview=await this.getText()}catch(t){this.$notify({type:"error",title:"Lỗi. Thử lại nhé.!"})}this.isLoading=!1},onResizeStop:function(t,e,i,o){event.stopPropagation(),this.imageCrop.x=t,this.imageCrop.y=e,this.imageCrop.width=i,this.imageCrop.height=o,this.videoData.width=i/this.layoutMainWidth,this.videoData.height=o/this.layoutMainHeight,this.videoData.x=t/this.layoutMainWidth,this.videoData.y=e/this.layoutMainHeight},onDragStop:function(t,e){event.stopPropagation(),this.imageCrop.x=t,this.imageCrop.y=e,this.videoData.x=t/this.layoutMainWidth,this.videoData.y=e/this.layoutMainHeight},uploadVideoMain(t){this.videoData={...t,x:0,y:0,width:.7,height:.2}},onKeyDown(t){t.stopPropagation()},onClickPlay(){this.$refs.videoPlay&&(this.$refs.videoPlay.play(),this.isPlay=!0)},onClickPause(){this.$refs.videoPlay&&(this.$refs.videoPlay.pause(),this.isPlay=!1)},onClickStopVideo(){this.$refs.videoPlay&&(this.$refs.videoPlay.currentTime=0)},OnTimeUpdate(t){this.currentTimeVideo=parseFloat(t.target.currentTime.toFixed(2));var e=document.getElementById("canvas"),i=e.getContext("2d"),o=document.getElementById("videoPlay");i.drawImage(t.target,0,0,o.videoWidth,o.videoHeight,0,0,e.width,e.height)},onVideoPlay(t){var e=document.getElementById("canvas"),i=e.getContext("2d"),o=document.getElementById("videoPlay");function a(){t.target.paused||t.target.ended||(i.drawImage(t.target,0,0,o.videoWidth,o.videoHeight,0,0,e.width,e.height),setTimeout(a,1e3/30))}a()},async onLoadedMeradata(t){var e=document.getElementById("canvas"),i=document.getElementById("container-video");this.layoutMainWidth=i.clientWidth,this.layoutMainHeight=i.clientWidth*t.target.videoHeight/t.target.videoWidth,e.width=i.clientWidth,e.height=i.clientWidth*t.target.videoHeight/t.target.videoWidth,this.videoLoaded=!0,t.target.currentTime=1,t.target.currentTime=0},previousTime(){this.$refs.videoPlay.currentTime-=parseInt(this.nextTime)},onNextTime(){this.$refs.videoPlay.currentTime+=parseInt(this.nextTime)},handleKeyCode(t){if(this.$refs.videoPlay)switch(t.code){case"ArrowLeft":return this.$refs.videoPlay.currentTime-=parseInt(this.nextTime),t.preventDefault(),!0;case"ArrowRight":return this.$refs.videoPlay.currentTime+=parseInt(this.nextTime),t.preventDefault(),!0;case"Space":return this.$refs.videoPlay.paused?this.$refs.videoPlay.play():this.$refs.videoPlay.pause(),this.isPlay=!this.isPlay,t.preventDefault(),!0}},onResizeWindow(){var t=document.getElementById("container-video"),e=document.getElementById("videoPlay");t&&e&&(this.layoutMainWidth=t.clientWidth,this.layoutMainHeight=t.clientWidth*e.videoHeight/e.videoWidth,this.keyUpdateRange++)}},destroyed(){document.removeEventListener("keydown",this.handleKeyCode),window.removeEventListener("resize",this.onResizeWindow)},async mounted(){window.addEventListener("resize",this.onResizeWindow),document.addEventListener("keydown",this.handleKeyCode)},resizeCanvas(){return b()("#canvas").outerHeight(b()(window).height()-b()("#canvas").offset().top-Math.abs(b()("#canvas").outerHeight(!0)-b()("#canvas").outerHeight()))}},K=j,G=(0,A.Z)(K,f,w,!1,null,"10fae4f2",null),Y=G.exports,q={name:"App",components:{CaptureTextOnVideo:Y},data:()=>({})},X=q,J=(0,A.Z)(X,h,g,!1,null,null,null),Q=J.exports,tt=i(8864);o["default"].use(tt.Z);var et=new tt.Z({});i.g.jQuery=i(9755);var it=i.g.jQuery;window.$=it,o["default"].use(d()),o["default"].config.productionTip=!1,o["default"].use(r(),{heightAuto:!1,confirmButtonText:'<span style="padding: 0 10px">OK</span>'}),o["default"].component("vue-draggable-resizable",s()),new o["default"]({vuetify:et,render:t=>t(Q)}).$mount("#app")}},e={};function i(o){var a=e[o];if(void 0!==a)return a.exports;var r=e[o]={exports:{}};return t[o].call(r.exports,r,r.exports,i),r.exports}i.m=t,function(){var t=[];i.O=function(e,o,a,r){if(!o){var n=1/0;for(c=0;c<t.length;c++){o=t[c][0],a=t[c][1],r=t[c][2];for(var s=!0,l=0;l<o.length;l++)(!1&r||n>=r)&&Object.keys(i.O).every((function(t){return i.O[t](o[l])}))?o.splice(l--,1):(s=!1,r<n&&(n=r));if(s){t.splice(c--,1);var d=a();void 0!==d&&(e=d)}}return e}r=r||0;for(var c=t.length;c>0&&t[c-1][2]>r;c--)t[c]=t[c-1];t[c]=[o,a,r]}}(),function(){i.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(e,{a:e}),e}}(),function(){i.d=function(t,e){for(var o in e)i.o(e,o)&&!i.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:e[o]})}}(),function(){i.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){i.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){var t={143:0};i.O.j=function(e){return 0===t[e]};var e=function(e,o){var a,r,n=o[0],s=o[1],l=o[2],d=0;if(n.some((function(e){return 0!==t[e]}))){for(a in s)i.o(s,a)&&(i.m[a]=s[a]);if(l)var c=l(i)}for(e&&e(o);d<n.length;d++)r=n[d],i.o(t,r)&&t[r]&&t[r][0](),t[r]=0;return i.O(c)},o=self["webpackChunkhello_world"]=self["webpackChunkhello_world"]||[];o.forEach(e.bind(null,0)),o.push=e.bind(null,o.push.bind(o))}();var o=i.O(void 0,[998],(function(){return i(2733)}));o=i.O(o)})();
//# sourceMappingURL=app.c0791faa.js.map