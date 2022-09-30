var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('v-card',{staticClass:"d-flex flex-column folders-tree-card",attrs:{"flat":"","tile":"","min-height":"500px"}},[_c('div',{staticClass:"grow scroll-x"},[_c('v-treeview',{staticClass:"folders-tree",staticStyle:{"width":"100%"},attrs:{"activatable":"","open":_vm.open,"active":_vm.active,"items":_vm.items,"search":_vm.filter,"load-children":_vm.readFolder,"item-key":"path","item-text":"basename","dense":"","transition":""},on:{"update:active":_vm.activeChanged},scopedSlots:_vm._u([{key:"prepend",fn:function(ref){
var item = ref.item;
var open = ref.open;
return [(item.type === 'dir')?_c('v-icon',[_vm._v(_vm._s(open ? "mdi-folder-open-outline" : "mdi-folder-outline"))]):_c('v-icon',[_vm._v(_vm._s(_vm.icons[item.extension.toLowerCase()] || _vm.icons["other"]))])]}},{key:"label",fn:function(ref){
var item = ref.item;
return [_c('span',[_vm._v("\n          "+_vm._s(item.basename)+"\n        ")]),_vm._v(" "),(item.type === 'dir')?_c('v-btn',{staticClass:"ml-1",attrs:{"icon":""},on:{"click":function($event){$event.stopPropagation();return _vm.readFolder(item)}}},[_c('v-icon',{staticClass:"pa-0 mdi-18px",attrs:{"color":"grey lighten-1"}},[_vm._v("mdi-refresh")])],1):_vm._e()]}}])})],1),_vm._v(" "),_c('v-divider'),_vm._v(" "),_c('v-toolbar',{staticClass:"shrink",attrs:{"dense":"","flat":""}},[_c('v-text-field',{staticClass:"ml-n3",attrs:{"solo":"","flat":"","hide-details":"","label":"Filter","prepend-inner-icon":"mdi-filter-outline"},model:{value:(_vm.filter),callback:function ($$v) {_vm.filter=$$v},expression:"filter"}}),_vm._v(" "),_c('v-tooltip',{attrs:{"top":"","open-delay":"500"},scopedSlots:_vm._u([{key:"activator",fn:function(ref){
var on = ref.on;
return [_c('v-btn',_vm._g({attrs:{"icon":""},on:{"click":_vm.init}},on),[_c('v-icon',[_vm._v("mdi-collapse-all-outline")])],1)]}}])},[_vm._v(" "),_c('span',[_vm._v("Collapse All")])])],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3b13b38e","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/screens/UserProfile/FileManager/Tree.vue
// module id = null
// module chunks = 