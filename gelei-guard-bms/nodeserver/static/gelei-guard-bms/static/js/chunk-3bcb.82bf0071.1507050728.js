(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3bcb"],{Bj8o:function(e,t,i){"use strict";i.r(t);var n=i("QbLZ"),s=i.n(n),a=i("4d7F"),o=i.n(a),r=i("14Xm"),d=i.n(r),l=i("D3Ub"),c=i.n(l);function u(e,t,i){var n=this;setTimeout(function(){e.loading?u.call(n,e,t,i):n.append(e,t,i)},300)}var _=i("bja8"),p={name:"WorkOrdersTags",components:{},data:function(){return{is_edit:!1,origin_edit_name:"",edit_name:"",is_bluring:!1,modified_type:0,over_cancel_or_submit_symbol:0,select_id:null,is_superuser:!0,loading:!1,tags:[],tag_levels:[],default_props:{label:"name",children:"child",isLeaf:"is_leaf"}}},computed:{tree_root:function(){return this.$refs.work_order_tree}},methods:{node_collapse:function(e,t,i){!function e(t){for(var i=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=0;n<t.childNodes.length;n++){var s=t.childNodes[n];s.expanded=i,e(s,i)}}(t)},edit_tag:function(){var e=c()(d.a.mark(function e(t,i,n){var s,a,o,r=this;return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!i.loading){e.next=4;break}return this.edit_name||self.close(t,i),e.abrupt("return");case 4:if(i.loading=!0,(n=event||window.event)&&n.stopPropagation(),!this.edit_name.replace(/^\s+|\s+$/g,"")){e.next=19;break}if(t.id){e.next=15;break}return s=i,a={name:this.edit_name,id:t.p_id},this.add_item(this.tags,a).then(function(e){e.status&&(r.$notify({type:"success",title:"操作提示",message:"添加标签成功！",duration:2e3}),e.remote_data.is_edit=!1,e.remote_data.name=e.remote_data.type_name,s.data=e.remote_data,r.is_edit=!1,r.select_id=null,r.select_level=null)}).finally(function(){i.loading=!1}),e.abrupt("return");case 15:return this.edit_name!==this.origin_edit_name.trim()?(o={name:this.edit_name,id:t.id},this.update_node(this.tags,o).then(function(e){e?(t.name=r.edit_name,r.$notify({type:"success",title:"操作提示",message:"重命名标签成功！",duration:2e3}),r.origin_edit_name="",r.is_edit=!1,r.select_id=null,r.select_level=null,i.loading=!1):i.loading=!1})):i.loading=!1,e.abrupt("return");case 17:e.next=20;break;case 19:this.close(t,i);case 20:case"end":return e.stop()}},e,this)}));return function(t,i,n){return e.apply(this,arguments)}}(),delete_node:function(){},load_node:function(e,t){var i=this;if(this.is_edit){if(-1!==[1,3,5].indexOf(this.modified_type))return t([]);var n=this;setTimeout(function(){i.load_node.call(n,e,t)},100)}if(e.level>=3&&e.data.is_new)return t([]);this.loading=!0,this.fetch_tree_nodes(e.data.id,e.level).then(function(e){t(e)}).finally(function(){i.loading=!1})},fetch_tree_nodes:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return new o.a(function(i,n){var a={type_id:e},o=t+1;Object(_.f)(a).then(function(e){if(0===e.status){var t=4===o,n=e.data.map(function(e){return s()({},e,{name:e.type_name,level:o,is_leaf:t})});i(n)}}).catch(function(e){n(e)})})},update_node:function(e,t){return new o.a(function(e){var i={type_name:t.name,type_id:t.id};Object(_.d)(i).then(function(t){0!==t.status?e(!1):e(!0)}).catch(function(){e(!1)})})},add_item:function(e,t){var i=this;return new o.a(function(e){var n={type_name:t.name,type_id:t.id};Object(_.b)(n).then(function(t){0!==t.status?(i.$message.error(t.message),e({status:!1})):e({status:!0,remote_data:t.data})}).catch(function(){e({status:!1})})})},close:function(e,t,i){(i=event||window.event)&&i.stopPropagation(),e.id||t.parent.childNodes.forEach(function(e,t){e.data.id||e.parent.childNodes.splice(t,1)}),this.select_id=null,this.select_level=null,this.edit_name=e.name,this.is_edit=!1,t.loading=!1},update:function(e,t,i){var n=this;(i=event||window.event)&&i.stopPropagation(),this.is_edit?this.$notify({type:"error",title:"操作提示",message:"有正在重命名或添加的选项未完成！",duration:2e3}):(this.select_id=t.id,this.select_level=t.level,this.edit_name=t.name,this.origin_edit_name=t.name,this.is_edit=!0,this.$nextTick(function(){n.cursor_positioning()}))},cursor_positioning:function(){var e=document.querySelector("#edit_input");e.focus(),e.value="",e.value=this.edit_name},append:function(e,t,i){var n=this;if((i=event||window.event)&&i.stopPropagation(),this.is_edit)this.$notify({type:"error",title:"操作提示",message:"有正在重命名或添加的选项未完成！",duration:2e3});else{this.select_id=t.id,this.edit_name="";var s={name:"",level:t.level+1,is_edit:!0,p_id:t.id};this.is_edit=!0,this.tree_root.append(s,e),this.$nextTick(function(){n.cursor_positioning()})}},append_peer:function(e,t,i){var n=this;if((i=event||window.event)&&i.stopPropagation(),this.is_edit)this.$notify({type:"error",title:"操作提示",message:"有正在重命名或添加的选项未完成！",duration:2e3});else{this.select_id=t.id,this.edit_name="";var s={name:"",p_id:t.p_id,level:t.level,is_edit:!0};this.is_edit=!0,this.tree_root.insertAfter(s,e),this.$nextTick(function(){n.cursor_positioning()})}},remove:function(e,t,i){(i=event||window.event)&&i.stopPropagation(),this.is_edit?this.$notify({type:"error",title:"操作提示",message:"有正在重命名或添加的选项未完成！",duration:2e3}):this.select_node=e},name_change:function(e,t,i){(e=event||window.event)&&e.stopPropagation(),this.edit_name=e.target.value,13===(e.which||e.keyCode||e.charCode)&&this.edit_tag(i,t)},keyup_name_change:function(e,t,i){(e=event||window.event)&&e.stopPropagation(),this.edit_name=e.target.value,13===(e.which||e.keyCode||e.charCode)&&(-1!==[1,3].indexOf(this.modified_type)&&e.target.blur(),2===this.modified_type&&(this.modified_type=4,this.edit_tag(i,t)))},is_select:function(e){return e.id===this.select_id&&e.level===this.select_level},render_content:function(e,t){var i=this,n=t.node,s=t.data,a=(t.store,void 0);a=!0===this.is_edit&&this.is_select(s)||s.is_edit?e("input",{attrs:{id:"edit_input",placeholder:"标签名称不能为空",class:"ly-edit__text",value:this.edit_name,maxlength:50},on:{keyup:function(e){i.keyup_name_change(e,n,s)},click:function(e){},blur:function(e){i.is_bluring=!0,setTimeout(function(){i.is_bluring=!1},500);var t=i;-1!==[1,3].indexOf(i.modified_type)&&(i.edit_name?setTimeout(function(){-1===[1,2].indexOf(t.over_cancel_or_submit_symbol)&&(t.edit_name?i.edit_tag.call(t,s,n):i.close.call(t,s,n))},300):i.close(s,n)),2===i.modified_type&&(i.edit_name===i.origin_edit_name?i.close(s,n):setTimeout(function(){-1===[1,2].indexOf(t.over_cancel_or_submit_symbol)&&i.close.call(t,s,n)},300))}}}):e("span",s.name);var o=void 0,r=void 0;return!0===this.is_edit&&this.is_select(s)||s.is_edit?(r=function(e,t,i){var n=this,s=this;return e("span",{class:"ly-visible"},[e("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(){n.over_cancel_or_submit_symbol=1,setTimeout(function(){n.over_cancel_or_submit_symbol=0},500),s.close(t,i)}}},"取消"),e("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(){n.over_cancel_or_submit_symbol=2,setTimeout(function(){n.over_cancel_or_submit_symbol=0},500),s.edit_tag(t,i)}}},"保存")])}.call(this,e,s,n),o="btn-nearby"):(r=function(e,t,i){var n,s,a=this,o=this,r=void 0;if(o.is_superuser){var l=[],_=e("el-button",{attrs:{size:"mini",type:"text",disabled:o.is_edit},on:{click:function(){o.is_bluring||(o.modified_type=2,o.update(i,t))}}},"重命名");if(l.push(_),i.level<5){var p=e("el-button",{attrs:{size:"mini",type:"text",disabled:o.is_edit},on:{click:(s=c()(d.a.mark(function e(n){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!o.is_bluring){e.next=2;break}return e.abrupt("return");case 2:if(a.modified_type=1,4!==i.level){e.next=8;break}return o.$notify({type:"error",title:"操作提示",message:"无法添加更低层标签",duration:2e3}),e.abrupt("return");case 8:if(!i.expanded){e.next=12;break}o.append(i,t,n),e.next=15;break;case 12:return e.next=14,i.expand();case 14:u.call(o,i,t,n);case 15:case"end":return e.stop()}},e,a)})),function(e){return s.apply(this,arguments)})}},"添加子层级");l.push(p)}var f=e("el-button",{attrs:{size:"mini",type:"text",disabled:o.is_edit},on:{click:(n=c()(d.a.mark(function e(n){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(!o.is_bluring){e.next=2;break}return e.abrupt("return");case 2:o.modified_type=3,o.append_peer(i,t);case 4:case"end":return e.stop()}},e,a)})),function(e){return n.apply(this,arguments)})}},"添加同层级");if(l.push(f),-1===i.level){var h=e("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(){o.is_bluring||(o.modified_type=5,o.remove(i,t))}}},"删除");l.push(h)}r=e("div",{class:"ly-visible"},[e("span",l)])}else r=e("div",{class:"ly-visible"});return r}.call(this,e,s,n),o=""),e("span",{class:"ly-tree-node "+o},[a,r])}}},f=(i("rn0j"),i("KHd+")),h=Object(f.a)(p,function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"work-orders-tags"},[i("div",{staticClass:"content-body scroller-bar noscroller"},[i("div",{staticClass:"table-content"},[i("el-card",[i("div",{staticClass:"ly-tree-container"},[i("div",{staticClass:"tag-title"},[i("span",[e._v("标签名称")]),e._v(" "),i("span",{staticClass:"control-area"},[e._v("操作")])]),e._v(" "),i("el-tree",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"work_order_tree",attrs:{props:e.default_props,data:e.tags,load:e.load_node,"expand-on-click-node":!1,"render-content":e.render_content,"node-key":"id",lazy:""},on:{"node-collapse":e.node_collapse}})],1)])],1)])])},[],!1,null,"17d1dc9f",null);t.default=h.exports},LoEm:function(e,t,i){},rn0j:function(e,t,i){"use strict";var n=i("LoEm");i.n(n).a}}]);