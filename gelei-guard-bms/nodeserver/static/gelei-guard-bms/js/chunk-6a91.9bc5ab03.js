(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-6a91"],{11:function(t,e){},12:function(t,e){},13:function(t,e){},14:function(t,e){},"4Rua":function(t,e,n){"use strict";n.r(e);var i=n("YP4+"),a=n("QbLZ"),o=n.n(a),r=n("S583"),c=n("z0WU"),s={name:"ApplicationList",props:{},beforecreate:function(){},data:function(){return{data_list:[],page:1,page_size:i.e,total:0}},computed:{},watch:{},mounted:function(){this.reload()},methods:{show_label:function(t){return"1"===t.rec_type?-1!==["01","1"].indexOf(t.status)?"开启":"已开启":-1!==["01","1"].indexOf(t.status)?"推送":"暂停"},table_size_change:function(t){this.reload()},change_current:function(t){this.page=t,console.log("change_current",t),this.reload()},get_pagination_config:function(){return{page:this.page,page_size:this.page_size}},reload:function(){var t=this,e=this.get_pagination_config();Object(r.q)(e).then(function(e){t.data_list=e.data.map(function(t){var e=Object(c.a)(t.create_time);return o()({},t,{create_time:e,grade_name:Object(c.c)(t.grade),rec_type_label:Object(c.d)(t.rec_type),status_name:Object(c.b)(t.rec_type,t.status)})}),t.total=e.total_count})},edit_is_enabled:function(t){if("1"===t.rec_type){if("1"===t.enabled)return!1}else if("2"===t.rec_type){if(-1!==["02","2"].indexOf(t.status))return!0;if("0"===t.enabled)return!0}return!0},control_is_enabled:function(t){if("1"===t.rec_type){if("1"===t.enabled&&-1!==["01","1"].indexOf(t.status))return!1}else if("2"===t.rec_type)return!1;return!0},edit_combinaion:function(t){this.$emit("edit",t)},control_combinaion:function(t){if(this.$emit("control",t),-1!==["01","1"].indexOf(t.rec_type)&&-1!==["01","1"].indexOf(t.status)){var e=t.rec_group_id;this.depoly_application_group_or_not(e,!0)}},suspend_application_group:function(t){var e=this,n={rec_group_id:t};Object(r.h)(n).then(function(t){0===t.status?e.$message.success(t.message):e.$message.error(t.message)})},depoly_application_group_or_not:function(t,e){var n=this,i={rec_group_id:t,published:e};Object(r.e)(i).then(function(t){0===t.status?(n.$message.success(t.message),n.reload()):n.$message.error(t.message)})}}},u=(n("yI86"),n("KHd+")),l=Object(u.a)(s,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component-card"},[n("div",[n("div",{staticClass:"table-block"},[n("el-table",{staticStyle:{width:"100%"},attrs:{data:t.data_list,stripe:!0,size:"mini"}},[n("el-table-column",{attrs:{align:"center",label:"推荐组合名称",prop:"group_name"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"年级",prop:"grade_name"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"应用数量",prop:"app_count"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"推荐人次",prop:"rec_count"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"安装次数",prop:"install_count"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"推荐方式",prop:"rec_type_label"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"当前状态",prop:"status_name",width:"80"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"生成时间",prop:"create_time",width:"180"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作",prop:"total_user",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{attrs:{disabled:t.control_is_enabled(e.row),size:"small",type:"text"},on:{click:function(n){t.control_combinaion(e.row)}}},[t._v(t._s(t.show_label(e.row))+"\n            ")]),t._v(" "),n("el-button",{attrs:{disabled:t.edit_is_enabled(e.row),size:"small",type:"text"},on:{click:function(n){t.edit_combinaion(e.row)}}},[t._v("编辑\n            ")])]}}])})],1),t._v(" "),n("el-pagination",{attrs:{"current-page":t.page,"page-size":t.page_size,"page-sizes":[10,20,50,100],total:t.total,layout:"total, prev, pager, next, jumper"},on:{"current-change":t.change_current,"size-change":t.table_size_change}})],1)])])},[],!1,null,"4153dd44",null);l.options.__file="combination_list.vue";var d=l.exports,_={name:"CombinationPanel",beforecreate:function(){},props:{condition:{type:Object,default:function(){return{}}},applications:{type:Array,default:function(){return[]}}},data:function(){return{data_list:[],page:1,page_size:10,total:0}},computed:{},watch:{condition:{handler:function(t){this.search()},deep:!0}},methods:{check_if_in_selection:function(t){return!!this.applications.filter(function(e){return e.record_id===t.record_id}).length},search:function(){var t=this,e=i.l.filter(function(e){return-1!==t.condition.subjects.indexOf(e.name)}).map(function(t){return t.val}),n={grade:this.condition.grade,subject_list:e};Object(r.l)(n).then(function(e){t.data_list=e.data.map(function(e){var n=e.start_age!==e.end_age?[e.start_age,"-",e.end_age,"岁"].join(""):[e.start_age,"岁"].join(""),i=Object(c.a)(e.create_time),a=t.check_if_in_selection(e);return o()({},e,{age_label:n,checked:a,create_time:i,grade_list_label:Object(c.h)(e.grade_list),subject_list_label:Object(c.j)(e.subject_list),sex_label:Object(c.e)(e.sex)})}),t.total=e.total_count})},table_size_change:function(t){this.search()},change_current:function(t){this.page=t,this.search()},change_check_box:function(t){this.$emit("rsync_app",t)},sync_table_rows:function(){var t=this;this.data_list.forEach(function(e,n,i){e.checked=t.check_if_in_selection(e)})}}},f=(n("yEdd"),Object(u.a)(_,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component-card"},[n("el-table",{attrs:{data:t.data_list,stripe:!0,size:"mini"}},[n("el-table-column",{attrs:{align:"center",label:"",width:"60"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-checkbox",{on:{change:function(n){t.change_check_box(e.row)}},model:{value:e.row.checked,callback:function(n){t.$set(e.row,"checked",n)},expression:"scope.row.checked"}})]}}])}),t._v(" "),n("el-table-column",{attrs:{align:"left",label:"应用名称",prop:"soft_name"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"学科",prop:"subject_list_label",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.subject_list_label,function(e,i){return n("div",{key:i},[t._v(t._s(e))])})}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"所属年级",prop:"grade_list_label",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){return t._l(e.row.grade_list_label,function(e,i){return n("div",{key:i},[t._v(t._s(e))])})}}])}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"适用年龄",prop:"start_age",width:"100"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"适用性别",prop:"sex_label",width:"100"}})],1),t._v(" "),n("el-pagination",{attrs:{"current-page":t.page,"page-size":t.page_size,"page-sizes":[10,20,50,100],total:t.total,layout:"total, prev, pager, next, jumper"},on:{"current-change":t.change_current,"size-change":t.table_size_change}})],1)},[],!1,null,"280d6364",null));f.options.__file="combination_panel.vue";var m={name:"CombinationCreate",beforecreate:function(){},components:{combinationPanel:f.exports},props:{isCreate:{type:Boolean,default:!0},isShow:{type:Boolean,default:!1},condition:{type:Object,default:function(){return{}}}},data:function(){return{panel_condition:{},grade_labels:[],app_list:[],rec_type:"1",grade_list:i.f,subject_list:i.l,combination_form:{rec_group_id:"",group_name:"",grade:"",subjects:[],applications:[]},combination_rules:{group_name:{required:!0,message:"应用组合名不能为空",trigger:"blur"},grade:{required:!0,message:"请选择应用组合的年级",trigger:"blur"},applications:{required:!0,message:"至少选择一个符合条件应用组合",trigger:"blur"}}}},computed:{title:function(){return this.isCreate?"创建应用组合":"编辑应用组合"}},watch:{},mounted:function(){this.isCreate||this.load_edit_details()},methods:{manual_load:function(){!(arguments.length>0&&void 0!==arguments[0])||arguments[0]?this.init_new_dialog():this.edit_new_dialog()},init_new_dialog:function(){this.combination_form.rec_group_id="",this.combination_form.group_name="",this.combination_form.grade="",this.combination_form.subjects=[],this.combination_form.applications=[]},edit_new_dialog:function(){this.combination_form.rec_group_id=this.condition.rec_group_id,this.combination_form.group_name=this.condition.group_name,this.combination_form.grade=this.condition.grade,this.combination_form.subjects=this.condition.subjects,this.combination_form.applications=this.condition.applications},handle_close:function(t){var e=this;this.$confirm("确认关闭？").then(function(t){e.$emit("receive",!1)}).catch(function(t){})},get_application_config:function(){var t=this.combination_form.applications.map(function(t){return t.record_id});return{rec_group_id:this.condition.rec_group_id,grade:this.combination_form.grade,group_name:this.combination_form.group_name,record_id_list:t,rec_type:this.rec_type}},emmit_application:function(){var t=this;this.$refs.combination.validate(function(e){if(!e)return!1;var n=t.get_application_config();t.isCreate?t.create(n):t.edit(n)})},create:function(t){var e=this;Object(r.b)(t).then(function(t){0===t.status?(e.$emit("receive",!1),e.$message.success(t.message)):e.$message.error(t.message)})},edit:function(t){var e=this;Object(r.f)(t).then(function(t){0!==t.status?e.$message.error(t.message):e.$message.success(t.message)}),this.$emit("receive",!1)},change_condition:function(){this.panel_condition={grade:this.combination_form.grade,subjects:this.combination_form.subjects}},change_grade:function(t){this.change_condition()},change_subject:function(t){this.change_condition()},rsync_application:function(t){if(t.checked){var e={name:t.soft_name,record_id:t.record_id};this.combination_form.applications.push(e)}else this.combination_form.applications=this.combination_form.applications.filter(function(e){return e.record_id!==t.record_id})},close_tags:function(t){var e=this;this.combination_form.applications=this.combination_form.applications.filter(function(e){return e.record_id!==t.record_id}),this.$nextTick(function(){e.$refs.comb_panel.sync_table_rows()})},load_edit_details:function(){var t=this,e={rec_group_id:this.condition.rec_group_id};Object(r.r)(e).then(function(e){if(0===e.status){var n=e.data;t.combination_form.group_name=n.group_name,t.combination_form.grade=n.grade,t.rec_type=n.rec_type,t.combination_form.applications=n.soft_list.map(function(t){return{name:t.soft_name,record_id:t.record_id}}),t.change_condition(),t.$nextTick(function(){t.$refs.comb_panel.search()})}})}}},p=(n("oQC1"),Object(u.a)(m,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"component-card"},[n("el-dialog",{staticClass:"gg-el-dialog",attrs:{"before-close":t.handle_close,title:t.title,visible:t.isShow,size:"mini",top:"5vh",width:"50%"},on:{"update:visible":function(e){t.isShow=e}}},[n("div",{staticClass:"show-dialog-pannel"},[n("el-form",{ref:"combination",staticClass:"demo-ruleForm",attrs:{model:t.combination_form,rules:t.combination_rules,"label-width":"140px"}},[n("el-form-item",{attrs:{label:"组合名称:",prop:"group_name"}},[n("el-input",{attrs:{placeholder:"组合名称",size:"mini"},model:{value:t.combination_form.group_name,callback:function(e){t.$set(t.combination_form,"group_name",e)},expression:"combination_form.group_name"}})],1),t._v(" "),n("el-form-item",{attrs:{label:"年级选择:",prop:"grade"}},[n("el-select",{attrs:{disabled:!t.isCreate,placeholder:"请选择应用组合年级",size:"mini"},on:{change:t.change_grade},model:{value:t.combination_form.grade,callback:function(e){t.$set(t.combination_form,"grade",e)},expression:"combination_form.grade"}},t._l(t.grade_list,function(t,e){return n("el-option",{key:e,staticClass:"el-select-dropdown__item__recommend",attrs:{label:t.name,value:t.val}})}))],1),t._v(" "),n("el-form-item",{attrs:{label:"学科选择:",prop:"subjects"}},[n("el-checkbox-group",{on:{change:t.change_subject},model:{value:t.combination_form.subjects,callback:function(e){t.$set(t.combination_form,"subjects",e)},expression:"combination_form.subjects"}},[n("el-row",{attrs:{span:24}},t._l(t.subject_list,function(e,i){return n("el-col",{key:i,attrs:{span:4}},[n("el-checkbox",{key:e.val,attrs:{label:e.name}},[t._v(t._s(e.name))])],1)}))],1)],1),t._v(" "),n("el-form-item",{attrs:{label:"符合条件的应用:",prop:"applications"}},[n("div",{staticClass:"application-items"},t._l(t.combination_form.applications,function(e){return n("div",{key:e.name,staticClass:"application-item"},[n("el-tag",{attrs:{closable:"",size:"medium"},on:{close:function(n){t.close_tags(e)}}},[t._v("\n                APP:"+t._s(e.name)+"\n              ")])],1)}))]),t._v(" "),n("combination-panel",{ref:"comb_panel",attrs:{applications:t.combination_form.applications,condition:t.panel_condition},on:{rsync_app:t.rsync_application}})],1)],1),t._v(" "),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{attrs:{size:"mini"},on:{click:function(e){t.$emit("receive",!1)}}},[t._v("取 消")]),t._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:t.emmit_application}},[t._v("确 定")])],1)])],1)},[],!1,null,"8a6cf986",null));p.options.__file="create_combination.vue";var b={components:{combinationList:d,combinationCreate:p.exports},data:function(){return{information:{grade_from:"",grade_to:"",subject:"",app_name:""},is_create:!1,show_app_dialog:!1,current_row:{},subject_list:i.l,grade_list_1:i.f,grade_list_2:i.f}},computed:{},watch:{information:{handler:function(t,e){t.grade_from!==e.grade&&this.grade_from_change(t.grade_from,e.grade)},deep:!0}},mounted:function(){},methods:{grade_from_change:function(t,e){this.grade_list_2=i.f.filter(function(e){return e.val>=t}),this.grade_to<t&&(this.grade_to=this.grade_list_2[0].val)},create_system_recomend:function(){this.is_create=!0,this.show_app_dialog=!0},create_manual_recomend:function(){this.is_create=!0,this.show_app_dialog=!0},edit_app:function(){this.is_create=!1,this.show_app_dialog=!0},receive:function(t){this.show_app_dialog=t,this.$refs.comb_list.reload()},edit_combination:function(t){this.current_row=t,this.is_create=!1,this.show_app_dialog=!0},control_combination:function(t){}}},g=(n("ZeSl"),Object(u.a)(b,function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("div",{staticClass:"new-combination"},[n("el-button",{staticClass:"new-combination-button",attrs:{round:"",size:"mini",type:"success"},on:{click:t.create_system_recomend}},[t._v("\n      创建系统推荐\n    ")])],1),t._v(" "),n("div",{staticClass:"content-body"},[n("combination-list",{ref:"comb_list",on:{control:t.control_combination,edit:t.edit_combination}}),t._v(" "),t.show_app_dialog?n("combination-create",{attrs:{condition:t.current_row,"is-create":t.is_create,"is-show":t.show_app_dialog},on:{receive:t.receive}}):t._e()],1)])},[],!1,null,"65ca6fda",null));g.options.__file="combination.vue";e.default=g.exports},"75GH":function(t,e,n){},"8AFk":function(t,e,n){},S583:function(t,e,n){"use strict";n.d(e,"n",function(){return a}),n.d(e,"m",function(){return o}),n.d(e,"p",function(){return r}),n.d(e,"a",function(){return c}),n.d(e,"w",function(){return s}),n.d(e,"o",function(){return u}),n.d(e,"t",function(){return l}),n.d(e,"s",function(){return d}),n.d(e,"u",function(){return _}),n.d(e,"k",function(){return f}),n.d(e,"j",function(){return m}),n.d(e,"l",function(){return p}),n.d(e,"c",function(){return b}),n.d(e,"g",function(){return g}),n.d(e,"i",function(){return h}),n.d(e,"v",function(){return v}),n.d(e,"q",function(){return j}),n.d(e,"b",function(){return w}),n.d(e,"h",function(){return y}),n.d(e,"r",function(){return O}),n.d(e,"f",function(){return k}),n.d(e,"e",function(){return x}),n.d(e,"d",function(){return z});var i=n("t3Un");function a(t){return Object(i.a)({url:"/manager/user/patriarch/list",method:"post",data:t})}function o(t){return Object(i.a)({url:"/manager/user/patriarch/detail",method:"post",data:t})}function r(t){return Object(i.a)({url:"/manager/qa/list",method:"post",data:t})}function c(t){return Object(i.a)({url:"/manager/qa/add",method:"post",data:t})}function s(t){return Object(i.a)({url:"/manager/qa/edit",method:"post",data:t})}function u(t){return Object(i.a)({url:"/manager/qa/detail",method:"post",data:t})}function l(t){return Object(i.a)({url:"/manager/user/analyze/summary",method:"post",data:t})}function d(t){return Object(i.a)({url:"/manager/user/analyze/list",method:"post",data:t})}function _(t){return Object(i.a)({url:"/manager/user/analyze/increased",method:"post",data:t})}function f(t){return Object(i.a)({url:"/manager/user/analyze/increased/bind_user",method:"post",data:t})}function m(t){return Object(i.a)({url:"/manager/user/analyze/increased/bind_device",method:"post",data:t})}function p(t){return Object(i.a)({url:"/manager/soft/recommend/list",method:"post",data:t})}function b(t){return Object(i.a)({url:"/manager/soft/recommend/add",method:"post",data:t})}function g(t){return Object(i.a)({url:"/manager/soft/recommend/edit",method:"post",data:t})}function h(t){return Object(i.a)({url:"/manager/soft/recommend/delete",method:"post",data:t})}function v(t){return Object(i.a)({url:"/manager/soft/recommend/mark/search",method:"post",data:t})}function j(t){return Object(i.a)({url:"/manager/soft/recommend/group/list",method:"post",data:t})}function w(t){return Object(i.a)({url:"/manager/soft/recommend/group/add",method:"post",data:t})}function y(t){return Object(i.a)({url:"/manager/soft/recommend/group/delete",method:"post",data:t})}function O(t){return Object(i.a)({url:"/manager/soft/recommend/group/detail",method:"post",data:t})}function k(t){return Object(i.a)({url:"/manager/soft/recommend/group/edit",method:"post",data:t})}function x(t){return Object(i.a)({url:"/manager/soft/recommend/group/publish",method:"post",data:t})}function z(t){return Object(i.a)({url:"/manager/qa/publish",method:"post",data:t})}},Xoq4:function(t,e,n){},ZeSl:function(t,e,n){"use strict";var i=n("75GH");n.n(i).a},oQC1:function(t,e,n){"use strict";var i=n("8AFk");n.n(i).a},v3WH:function(t,e,n){},yEdd:function(t,e,n){"use strict";var i=n("Xoq4");n.n(i).a},yI86:function(t,e,n){"use strict";var i=n("v3WH");n.n(i).a},z0WU:function(t,e,n){"use strict";n.d(e,"g",function(){return c}),n.d(e,"a",function(){return s}),n.d(e,"k",function(){return u}),n.d(e,"e",function(){return l}),n.d(e,"c",function(){return d}),n.d(e,"h",function(){return _}),n.d(e,"f",function(){return f}),n.d(e,"j",function(){return m}),n.d(e,"i",function(){return p}),n.d(e,"b",function(){return b}),n.d(e,"d",function(){return g});var i=n("fs/A"),a=n("YP4+"),o=n("Wgwc"),r=n.n(o);function c(){return Object(i.v1)().replace(/-/g,"").toUpperCase()}function s(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:a.b;return(t?r()(t):r()()).format(e)}function u(t){return["零","一","二","三","四","五","六","七","八","九","十"][+t]}function l(t){return"0"===t?"女":1==+t?"男":"不限"}function d(t){return function(){var t={};return a.f.forEach(function(e,n,i){t[e.val]=e.name}),t}()[+t]}function _(t){return a.f.filter(function(e){return-1!==t.indexOf(e.val)}).map(function(t){return t.name})}function f(t){return function(t){var e={};return a.l.forEach(function(t,n,i){e[t.val]=t.name}),e}()[+t]}function m(t){return a.l.filter(function(e){return-1!==t.indexOf(e.val)}).map(function(t){return t.name})}function p(t){return a.l.filter(function(e){return-1!==t.indexOf(e.name)}).map(function(t){return t.val})}function b(t,e){return"1"===t?-1!==["01","1"].indexOf(e)?"未生效":"生效中":-1!==["01","1"].indexOf(e)?"未推送":"已推送"}function g(t){return"1"===t?"系统推荐":"手动推荐"}}}]);