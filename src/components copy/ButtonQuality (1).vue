var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('v-menu',{attrs:{"offset-y":""},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var attrs = ref.attrs;
var on = ref.on;
return [_c('v-btn',_vm._g(_vm._b({staticClass:"font-weight-bold px-5",staticStyle:{"font-size":"16px","min-width":"110px"},attrs:{"color":_vm.error ? 'error' : 'primary',"outlined":""}},'v-btn',attrs,false),on),[_c('span',{staticClass:"text-truncate",staticStyle:{"max-width":"200px"}},[_vm._v("\n          "+_vm._s((_vm.selected && _vm.selected.name) || "Chọn độ phân giải"))])])]}}])},[_vm._v(" "),_c('v-list',{staticClass:"menu_items",staticStyle:{"max-height":"500px","overflow-y":"auto"}},_vm._l((_vm.listProfile),function(item){return _c('v-list-item',{key:item._id,staticClass:"item-quality pl-2",attrs:{"link":""},on:{"click":function($event){return _vm.onSelectItem(item)}}},[_c('v-list-item-title',{staticClass:"white--text d-flex align-center"},[(_vm.selected && _vm.selected._id === item._id)?_c('span',{staticClass:"active-icon mr-1"}):_c('span',{staticClass:"not-active-icon mr-1"}),_vm._v(" "),_c('span',{staticClass:"text-truncate mr-16 ml-2",class:{
              'active-quality': _vm.selected && _vm.selected._id === item._id,
            },staticStyle:{"font-size":"14px","max-width":"150px"}},[_vm._v(_vm._s(item.name))]),_vm._v(" "),_c('span',{class:{
              'active-quality': _vm.selected && _vm.selected._id === item._id,
            },staticStyle:{"opacity":"50%","font-size":"12px","position":"absolute","right":"35px"}},[_vm._v(_vm._s(item.qualityName))]),_vm._v(" "),(item.value !== 'create' && item.type !== 'default')?_c('v-btn',{staticStyle:{"position":"absolute","right":"0px","color":"red"},attrs:{"icon":""},on:{"click":function($event){return _vm.removeProfile(item)}}},[_c('v-icon',{attrs:{"size":"18"}},[_vm._v(" mdi-trash-can-outline ")])],1):_vm._e()],1)],1)}),1)],1),_vm._v(" "),_c('ModalCreateProfile',{ref:"ModalCreateProfile",attrs:{"isLoading":_vm.isLoading},on:{"setSelected":_vm.setSelected}})],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-c5439688","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/ButtonQuality.vue
// module id = null
// module chunks = 