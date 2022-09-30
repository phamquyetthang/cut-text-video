var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-dialog',{attrs:{"max-width":_vm.options.width},on:{"keydown":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return _vm.cancel($event)}},model:{value:(_vm.dialog),callback:function ($$v) {_vm.dialog=$$v},expression:"dialog"}},[_c('v-card',[_c('v-toolbar',{attrs:{"dark":"","color":_vm.options.color,"dense":"","flat":""}},[_c('v-toolbar-title',{staticClass:"white--text"},[_vm._v(_vm._s(_vm.title))])],1),_vm._v(" "),(_vm.message)?_c('v-card-text',{staticClass:"pa-4 text-center",domProps:{"innerHTML":_vm._s(_vm.message)}}):_vm._e(),_vm._v(" "),_c('v-card-actions',{staticClass:"pt-0"},[_c('v-spacer'),_vm._v(" "),_c('v-btn',{attrs:{"text":""},on:{"click":_vm.cancel}},[_vm._v("Cancel")]),_vm._v(" "),_c('v-btn',{attrs:{"depressed":"","color":_vm.options.color},on:{"click":_vm.agree}},[_vm._v("Yes")])],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-8e55fbd6","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/screens/UserProfile/FileManager/Confirm.vue
// module id = null
// module chunks = 