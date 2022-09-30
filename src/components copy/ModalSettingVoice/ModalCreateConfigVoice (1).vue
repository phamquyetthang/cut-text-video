var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-dialog',{attrs:{"scrollable":"","persistent":_vm.isLoading,"max-width":"500px"},model:{value:(_vm.showDialog),callback:function ($$v) {_vm.showDialog=$$v},expression:"showDialog"}},[_c('v-card',[_c('v-card-title',{staticClass:"d-block"},[_c('div',{staticClass:"d-flex justify-center"},[_c('span',{staticClass:"h3 font-weight-bold"},[_vm._v("Tạo tài khoản")]),_vm._v(" "),_c('v-btn',{staticStyle:{"position":"absolute","right":"10px","top":"10px"},attrs:{"icon":""},on:{"click":function($event){_vm.showDialog = false}}},[_c('v-icon',[_vm._v("mdi-close")])],1)],1)]),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('v-card-text',[_c('v-text-field',{attrs:{"label":"Tên config","placeholder":"Nhập tên config"},model:{value:(_vm.name),callback:function ($$v) {_vm.name=$$v},expression:"name"}})],1),_vm._v(" "),_c('v-card-actions',{staticClass:"d-block text-center pb-5 "},[_c('v-btn',{staticClass:"px-5 ml-3",attrs:{"disabled":_vm.isLoading},on:{"click":function($event){_vm.showDialog = false}}},[_vm._v("Hủy")]),_vm._v(" "),_c('v-btn',{staticClass:"px-8",attrs:{"color":"primary","loading":_vm.isLoading},on:{"click":function($event){return _vm.onCreate()}}},[_vm._v("Tạo")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-47cfaa64","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/ModalSettingVoice/ModalCreateConfigVoice.vue
// module id = null
// module chunks = 