(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-3f8a"],{11:function(t,n){},12:function(t,n){},13:function(t,n){},14:function(t,n){},"2w1v":function(t,n,e){"use strict";var a=e("a+ml");e.n(a).a},"3ms0":function(t,n,e){},"6Bog":function(t,n,e){"use strict";e.r(n);var a=e("S583"),i=e("YP4+"),r={name:"StatisticsPannel",beforecreate:function(){},props:{},data:function(){return{statistics:{}}},computed:{},watch:{},mounted:function(){this.search()},methods:{judge_direction:function(t){return+t>=100?"upper":"down"},load_summary:function(t){var n=this;Object(a.U)(t).then(function(t){n.statistics=t.data})},search:function(){var t=(new Date).getTime()-i.j,n={begin_time:t,end_time:t};this.load_summary(n)}}},o=(e("wXBS"),e("KHd+")),c=Object(o.a)(r,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[t._v("整体数据指标(昨日)")])]),t._v(" "),e("div",{staticClass:"component-card"},[e("div",{staticClass:"row row-1"},[e("div",{staticClass:"column column-1"},[t._v("新增注册用户")]),t._v(" "),e("div",{staticClass:"column column-2"},[t._v(t._s(t.statistics.increased_user))]),t._v(" "),e("div",{staticClass:"column column-3"},[t._v("\n        日\n        "),e("svg-icon",{class:t.judge_direction(t.statistics.increased_user_percent),attrs:{"icon-class":t.judge_direction(t.statistics.increased_user_percent)}}),t._v("\n        "+t._s(t.statistics.increased_user_percent)+"%\n      ")],1)]),t._v(" "),e("div",{staticClass:"row row-2"},[e("div",{staticClass:"column column-1"},[t._v("新增绑定用户")]),t._v(" "),e("div",{staticClass:"column column-2"},[t._v(t._s(t.statistics.increased_bind_user))]),t._v(" "),e("div",{staticClass:"column column-3"},[t._v("\n        日\n        "),e("svg-icon",{class:t.judge_direction(t.statistics.increased_user_percent),attrs:{"icon-class":t.judge_direction(t.statistics.increased_bind_user_percent)}}),t._v("\n        "+t._s(t.statistics.increased_bind_user_percent)+"%\n      ")],1)]),t._v(" "),e("div",{staticClass:"row row-3"},[e("div",{staticClass:"column column-1"},[t._v("新增绑定设备")]),t._v(" "),e("div",{staticClass:"column column-2"},[t._v(t._s(t.statistics.increased_bind_device))]),t._v(" "),e("div",{staticClass:"column column-3"},[t._v("\n        日\n        "),e("svg-icon",{class:t.judge_direction(t.statistics.increased_user_percent),attrs:{"icon-class":t.judge_direction(t.statistics.increased_bind_device_percent)}}),t._v("\n        "+t._s(t.statistics.increased_bind_device_percent)+"%\n      ")],1)]),t._v(" "),e("div",{staticClass:"row row-4"},[e("div",{staticClass:"column column-1"},[t._v("总注册用户数")]),t._v(" "),e("div",{staticClass:"column column-2"},[t._v(t._s(t.statistics.total_user))]),t._v(" "),e("div",{staticClass:"column column-3"})])])])},[],!1,null,"0b2e544a",null);c.options.__file="statistics_pannel.vue";var s=c.exports,u={name:"Diagram",beforecreate:function(){},props:{condition:{type:Object,default:function(){return{}}}},data:function(){return{active_name:"1",options:{}}},computed:{},watch:{active_name:function(t){var n=this;this.$nextTick(function(e){n.$refs["chart"+t].echarts.resize()})}},mounted:function(){},methods:{tab_change:function(t){"1"===this.active_name?this.build_xzyh():"2"===this.active_name?this.build_xzsb():"3"===this.active_name?this.build_bd_yh():console.error("error active name",this.active_name)},chart_events:function(t){},build_xzyh:function(){var t=this,n=this.condition;Object(a.V)(n).then(function(n){t.options={columns:["日期","新增注册用户"],rows:n.data.map(function(t){return{"日期":t.date,"新增注册用户":t.count}})}})},build_xzsb:function(){var t=this,n=this.condition;Object(a.A)(n).then(function(n){t.options={columns:["日期","新增绑定用户"],rows:n.data.map(function(t){return{"日期":t.date,"新增绑定用户":t.count}})}})},build_bd_yh:function(){var t=this,n=this.condition;Object(a.z)(n).then(function(n){t.options={columns:["日期","新增绑定设备"],rows:n.data.map(function(t){return{"日期":t.date,"新增绑定设备":t.count}})}})},search:function(){this.tab_change(this.active_name)}}},d=(e("vo1G"),Object(o.a)(u,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"component-card"},[e("el-tabs",{attrs:{type:"border-card"},on:{"tab-click":t.tab_change},model:{value:t.active_name,callback:function(n){t.active_name=n},expression:"active_name"}},[e("el-tab-pane",{attrs:{label:"新增注册用户",name:"1"}},[e("ve-line",{ref:"chart1",attrs:{data:t.options}})],1),t._v(" "),e("el-tab-pane",{attrs:{label:"新增绑定用户",name:"2"}},[e("ve-line",{ref:"chart2",attrs:{data:t.options}})],1),t._v(" "),e("el-tab-pane",{attrs:{label:"新增绑定设备",name:"3"}},[e("ve-line",{ref:"chart3",attrs:{data:t.options}})],1)],1)],1)},[],!1,null,"05996316",null));d.options.__file="diagram.vue";var l=d.exports,_=e("QbLZ"),m=e.n(_),f=e("z0WU"),h={name:"",beforecreate:function(){},props:{condition:{type:Object,default:function(){return{}}}},data:function(){return{active_tab:"parent",download_loading:!1,data_list:[],page:1,page_size:i.k,total:0,data_child_list:[],page_child:1,page_size_child:i.k,total_child:0,date_range:[]}},computed:{},watch:{},mounted:function(){},methods:{download:function(){"parent"===this.active_tab?this.download_parent_data():"child"===this.active_tab&&this.download_child_data()},download_parent_data:function(){var t=this;this.download_loading=!0;var n=m()({},this.condition,{page_no:1,page_num:this.total}),r=Object(f.b)(this.condition.begin_time),o=Object(f.b)(this.condition.end_time),c=void 0;c=r===o?[i.d,"家长端",r].join("_"):[i.d,"家长端",r,o].join("_"),Object(a.T)(n).then(function(n){var a=n.data;Promise.all([e.e("chunk-0274"),e.e("chunk-77e8")]).then(e.bind(null,"hTCZ")).then(function(n){var e={header:["时间","新增注册用户","新增绑定用户","新增绑定设备","绑定设备总数","绑定用户总数","总注册用户数"],data:t.formatJson(["date","increased_user","increased_bind_user","increased_bind_device","total_bind_device","total_bind_user","total_user"],a),filename:c,autoWidth:!0,bookType:"xlsx"};n.export_json_to_excel(e),t.download_loading=!1})}).finally(function(){t.download_loading=!1})},download_child_data:function(){var t=this;this.download_loading=!0;var n=m()({},this.condition,{page_no:1,page_num:this.total_child}),r=Object(f.b)(this.condition.begin_time),o=Object(f.b)(this.condition.end_time),c=void 0;c=r===o?[i.d,"孩子端",r].join("_"):[i.d,"孩子端",r,o].join("_"),Object(a.S)(n).then(function(n){var a=n.data;Promise.all([e.e("chunk-0274"),e.e("chunk-77e8")]).then(e.bind(null,"hTCZ")).then(function(n){var e={header:["时间","新增用户数","新增绑定用户数","当前绑定用户数","累计绑定用户数","累计用户数"],data:t.formatJson(["date","increased_user","increased_bind_user","cur_total_bind_user","total_bind_user","total_user"],a),filename:c,autoWidth:!0,bookType:"xlsx"};n.export_json_to_excel(e),t.download_loading=!1})}).finally(function(){t.download_loading=!1})},formatJson:function(t,n){return n.map(function(n){return t.map(function(t){return n[t]})})},table_size_change:function(t){this.page_size=t,this.fetch_user_analysis_details()},change_current:function(t){this.page=t,this.fetch_user_analysis_details()},child_table_size_change:function(t){this.page_size_child=t,this.fetch_user_analysis_child_details()},change_current_child:function(t){this.page_child=t,this.fetch_user_analysis_child_details()},get_options:function(){var t={page_no:this.page,page_num:this.page_size};return this.condition.begin_time&&(t.begin_time=new Date(this.condition.begin_time).getTime()),this.condition.end_time&&(t.end_time=new Date(this.condition.end_time).getTime()),t},get_child_options:function(){var t={page_no:this.page_child,page_num:this.page_size_child};return this.condition.begin_time&&(t.begin_time=new Date(this.condition.begin_time).getTime()),this.condition.end_time&&(t.end_time=new Date(this.condition.end_time).getTime()),t},search:function(){this.page=1,this.page_size=i.k,this.fetch_user_analysis_details(),this.page_child=1,this.page_size_child=i.k,this.fetch_user_analysis_child_details()},fetch_user_analysis_details:function(){var t=this,n=this.get_options();Object(a.T)(n).then(function(n){t.data_list=n.data,t.total=n.total_count})},fetch_user_analysis_child_details:function(){var t=this,n=this.get_child_options();Object(a.S)(n).then(function(n){t.data_child_list=n.data,t.total_child=n.total_count})},tab_change:function(){}}},p=(e("Pppk"),e("2w1v"),Object(o.a)(h,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("el-card",{staticClass:"box-card"},[e("el-button",{staticClass:"download details-tab",attrs:{loading:t.download_loading,size:"mini",type:"success"},on:{click:t.download}},[t._v("导出"),e("svg-icon",{attrs:{"icon-class":"download"}})],1),t._v(" "),e("el-tabs",{attrs:{"tab-position":"top"},on:{"tab-click":t.tab_change},model:{value:t.active_tab,callback:function(n){t.active_tab=n},expression:"active_tab"}},[e("el-tab-pane",{attrs:{label:"家长端 - 详细数据",name:"parent"}},[e("div",{staticClass:"table-block"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.data_list,size:"mini"}},[e("el-table-column",{attrs:{align:"center",label:"时间",prop:"date"}}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"新增注册用户",prop:"increased_user"}}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"新增绑定用户",prop:"increased_bind_user"}}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"新增绑定设备",prop:"increased_bind_device"}}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"当前绑定设备数",prop:"cur_total_bind_device"}}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"累计绑定设备数",prop:"total_bind_device"}}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"累计绑定用户数",prop:"total_bind_user"}}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"总注册用户数",prop:"total_user"}})],1),t._v(" "),e("el-pagination",{attrs:{"current-page":t.page,"page-size":t.page_size,"page-sizes":[100,200,300,400],total:t.total,layout:"total, prev, pager, next, jumper"},on:{"current-change":t.change_current,"size-change":t.table_size_change}})],1)]),t._v(" "),e("el-tab-pane",{attrs:{label:"孩子端 - 详细数据",name:"child"}},[e("div",{staticClass:"table-block"},[e("el-table",{staticStyle:{width:"100%"},attrs:{data:t.data_child_list,size:"mini"}},[e("el-table-column",{attrs:{align:"center",label:"时间",prop:"date"}}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"新增用户数",prop:"increased_user"}}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"新增绑定用户数",prop:"increased_bind_user"}}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"当前绑定用户数",prop:"cur_total_bind_user"}}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"累计绑定用户数",prop:"total_bind_user"}}),t._v(" "),e("el-table-column",{attrs:{align:"center",label:"累计用户数",prop:"total_user"}})],1),t._v(" "),e("el-pagination",{attrs:{"current-page":t.page_child,"page-size":t.page_size_child,"page-sizes":[100,200,300,400],total:t.total_child,layout:"total, prev, pager, next, jumper"},on:{"current-change":t.change_current_child,"size-change":t.child_table_size_change}})],1)])],1)],1)},[],!1,null,"0f055699",null));p.options.__file="details.vue";var b=p.exports,g=e("Wgwc"),v=e.n(g),j={components:{statisticsPannel:s,diagram:l,statics_details:b},data:function(){return{datetime_range:[],condition:{}}},computed:{},create:function(){},mounted:function(){var t=this;this.init_data(),this.$nextTick(function(){t.load_data()})},methods:{init_data:function(){var t=v()().subtract(1,"month").subtract(1,"day").valueOf(),n=v()().subtract(1,"day").valueOf();this.datetime_range=[t,n],this.condition={begin_time:t,end_time:n}},date_range_change:function(t){var n=this;this.condition={begin_time:this.datetime_range[0].getTime(),end_time:this.datetime_range[1].getTime()},this.$nextTick(function(){n.search()})},get_config:function(){return{begin_time:this.datetime_range[0].getTime(),end_time:this.datetime_range[1].getTime()}},search:function(){this.load_data()},load_data:function(){this.$refs.diagram.search(),this.$refs.details.search()}}},O=(e("8VMX"),Object(o.a)(j,function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"content"},[e("div",{staticClass:"header-line"},[e("div",{staticClass:"header-line-left"},[e("div",{staticClass:"header-block search-time"},[e("label",{staticClass:"search-item"},[t._v("时间范围:")]),t._v(" "),e("div",{staticClass:"block"},[e("el-date-picker",{attrs:{"end-placeholder":"结束日期","range-separator":"至","start-placeholder":"开始日期",type:"daterange","unlink-panels":"",size:"mini"},on:{change:t.date_range_change},model:{value:t.datetime_range,callback:function(n){t.datetime_range=n},expression:"datetime_range"}})],1)])])]),t._v(" "),e("div",{staticClass:"content-body"},[e("div",{staticClass:"statistics-summary"},[e("statistics-pannel",{ref:"summary"})],1),t._v(" "),e("hr",{staticClass:"hr-diviser"}),t._v(" "),e("div",{staticClass:"statistics-diagram"},[e("diagram",{ref:"diagram",attrs:{condition:t.condition}})],1),t._v(" "),e("hr",{staticClass:"hr-diviser"}),t._v(" "),e("statics_details",{ref:"details",attrs:{condition:t.condition}})],1)])},[],!1,null,"100026a8",null));O.options.__file="index.vue";n.default=O.exports},"6HGN":function(t,n,e){},"8VMX":function(t,n,e){"use strict";var a=e("3ms0");e.n(a).a},Pppk:function(t,n,e){"use strict";var a=e("6HGN");e.n(a).a},S583:function(t,n,e){"use strict";e.d(n,"N",function(){return i}),e.d(n,"M",function(){return r}),e.d(n,"B",function(){return o}),e.d(n,"P",function(){return c}),e.d(n,"e",function(){return s}),e.d(n,"Z",function(){return u}),e.d(n,"O",function(){return d}),e.d(n,"U",function(){return l}),e.d(n,"T",function(){return _}),e.d(n,"S",function(){return m}),e.d(n,"V",function(){return f}),e.d(n,"A",function(){return h}),e.d(n,"z",function(){return p}),e.d(n,"C",function(){return b}),e.d(n,"g",function(){return g}),e.d(n,"q",function(){return v}),e.d(n,"t",function(){return j}),e.d(n,"W",function(){return O}),e.d(n,"Q",function(){return w}),e.d(n,"f",function(){return y}),e.d(n,"s",function(){return z}),e.d(n,"R",function(){return C}),e.d(n,"p",function(){return x}),e.d(n,"l",function(){return k}),e.d(n,"k",function(){return T}),e.d(n,"y",function(){return S}),e.d(n,"b",function(){return $}),e.d(n,"j",function(){return P}),e.d(n,"X",function(){return q}),e.d(n,"n",function(){return A}),e.d(n,"x",function(){return W}),e.d(n,"I",function(){return D}),e.d(n,"L",function(){return E}),e.d(n,"K",function(){return U}),e.d(n,"J",function(){return J}),e.d(n,"G",function(){return B}),e.d(n,"H",function(){return F}),e.d(n,"i",function(){return G}),e.d(n,"d",function(){return H}),e.d(n,"Y",function(){return X}),e.d(n,"E",function(){return N}),e.d(n,"D",function(){return V}),e.d(n,"F",function(){return Z}),e.d(n,"c",function(){return I}),e.d(n,"o",function(){return K}),e.d(n,"u",function(){return M}),e.d(n,"a",function(){return Y}),e.d(n,"m",function(){return L}),e.d(n,"h",function(){return Q}),e.d(n,"w",function(){return R}),e.d(n,"v",function(){return tt}),e.d(n,"r",function(){return nt});var a=e("t3Un");function i(t){return Object(a.a)({url:"/manager/user/patriarch/list",method:"post",data:t})}function r(t){return Object(a.a)({url:"/manager/user/patriarch/detail",method:"post",data:t})}function o(t){return Object(a.a)({url:"/manager/user/patriarch/child_device/record/list",method:"post",data:t})}function c(t){return Object(a.a)({url:"/manager/qa/list",method:"post",data:t})}function s(t){return Object(a.a)({url:"/manager/qa/add",method:"post",data:t})}function u(t){return Object(a.a)({url:"/manager/qa/edit",method:"post",data:t})}function d(t){return Object(a.a)({url:"/manager/qa/detail",method:"post",data:t})}function l(t){return Object(a.a)({url:"/manager/user/analyze/summary",method:"post",data:t})}function _(t){return Object(a.a)({url:"/manager/user/analyze/list",method:"post",data:t})}function m(t){return Object(a.a)({url:"/manager/user/analyze/child/list",method:"post",data:t})}function f(t){return Object(a.a)({url:"/manager/user/analyze/increased",method:"post",data:t})}function h(t){return Object(a.a)({url:"/manager/user/analyze/increased/bind_user",method:"post",data:t})}function p(t){return Object(a.a)({url:"/manager/user/analyze/increased/bind_device",method:"post",data:t})}function b(t){return Object(a.a)({url:"/manager/soft/recommend/list",method:"post",data:t})}function g(t){return Object(a.a)({url:"/manager/soft/recommend/add",method:"post",data:t})}function v(t){return Object(a.a)({url:"/manager/soft/recommend/edit",method:"post",data:t})}function j(t){return Object(a.a)({url:"/manager/soft/recommend/delete",method:"post",data:t})}function O(t){return Object(a.a)({url:"/manager/soft/recommend/mark/search",method:"post",data:t})}function w(t){return Object(a.a)({url:"/manager/soft/recommend/group/list",method:"post",data:t})}function y(t){return Object(a.a)({url:"/manager/soft/recommend/group/add",method:"post",data:t})}function z(t){return Object(a.a)({url:"/manager/soft/recommend/group/delete",method:"post",data:t})}function C(t){return Object(a.a)({url:"/manager/soft/recommend/group/detail",method:"post",data:t})}function x(t){return Object(a.a)({url:"/manager/soft/recommend/group/edit",method:"post",data:t})}function k(t){return Object(a.a)({url:"/manager/soft/recommend/group/publish",method:"post",data:t})}function T(t){return Object(a.a)({url:"/manager/qa/publish",method:"post",data:t})}function S(t){return Object(a.a)({url:"/manager/app/version/list",method:"post",data:t})}function $(t){return Object(a.a)({url:"/manager/app/version/add",method:"post",data:t})}function P(t){return Object(a.a)({url:"/manager/app/version/startup",method:"post",data:t})}function q(t){return Object(a.a)({url:"/manager/app/version/send/command",method:"post",data:t})}function A(t){return Object(a.a)({url:"/manager/app/version/update",method:"post",data:t})}function W(t){return Object(a.a)({url:"/manager/app/version/get",method:"post",data:t})}function D(t){return Object(a.a)({url:"/manager/order/list",method:"post",data:t})}function E(){return Object(a.a)({url:"/common/order/type/list",method:"post"})}function U(){return Object(a.a)({url:"/common/order/status/list",method:"post"})}function J(){return Object(a.a)({url:"/common/order/paytype/list",method:"post"})}function B(t){return Object(a.a)({url:"/manager/member/plan/flow/list",method:"post",data:t})}function F(t){return Object(a.a)({url:"/manager/member/plan/list",method:"post",data:t})}function G(t){return Object(a.a)({url:"/manager/member/plan/delete",method:"post",data:t})}function H(t){return Object(a.a)({url:"/manager/member/plan/add",method:"post",data:t})}function X(t){return Object(a.a)({url:"/manager/member/plan/edit",method:"post",data:t})}function N(t){return Object(a.a)({url:"/manager/member/activity/list",method:"post",data:t})}function V(t){return Object(a.a)({url:"/manager/member/activity/info",method:"post",data:t})}function Z(t){return Object(a.a)({url:"/manager/member/activity/user/list",method:"post",data:t})}function I(t){return Object(a.a)({url:"/manager/member/activity/add",method:"post",data:t})}function K(t){return Object(a.a)({url:"/manager/member/activity/edit",method:"post",data:t})}function M(t){return Object(a.a)({url:"/manager/advertising/list",method:"post",data:t})}function Y(t){return Object(a.a)({url:"/manager/advertising/add",method:"post",data:t})}function L(t){return Object(a.a)({url:"/manager/advertising/edit",method:"post",data:t})}function Q(t){return Object(a.a)({url:"/manager/advertising/delete",method:"post",data:t})}function R(){return Object(a.a)({url:"/common/advertising/type/list",method:"post"})}function tt(){return Object(a.a)({url:"/common/advertising/point/list",method:"post"})}function nt(t){return Object(a.a)({url:"/file/data/secondpass",method:"post",data:t})}},"SI+q":function(t,n,e){},"a+ml":function(t,n,e){},hff2:function(t,n,e){},vo1G:function(t,n,e){"use strict";var a=e("SI+q");e.n(a).a},wXBS:function(t,n,e){"use strict";var a=e("hff2");e.n(a).a},z0WU:function(t,n,e){"use strict";e.d(n,"i",function(){return l}),e.d(n,"b",function(){return _}),e.d(n,"m",function(){return m}),e.d(n,"g",function(){return f}),e.d(n,"c",function(){return h}),e.d(n,"e",function(){return p}),e.d(n,"j",function(){return b}),e.d(n,"h",function(){return g}),e.d(n,"l",function(){return v}),e.d(n,"k",function(){return j}),e.d(n,"d",function(){return O}),e.d(n,"f",function(){return w}),e.d(n,"a",function(){return y});var a=e("4d7F"),i=e.n(a),r=e("fs/A"),o=e("YP4+"),c=e("Wgwc"),s=e.n(c),u=e("NFKh"),d=e.n(u);function l(){return Object(r.v1)().replace(/-/g,"").toUpperCase()}function _(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.f;return(t?s()(t):s()()).format(n)}function m(t){return["零","一","二","三","四","五","六","七","八","九","十"][+t]}function f(t){return"0"===t?"女":1==+t?"男":"不限"}function h(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"元";return(+t).toFixed(2)+n}function p(t){return function(){var t={};return o.l.forEach(function(n,e,a){t[n.val]=n.name}),t}()[+t]}function b(t){return o.l.filter(function(n){return-1!==t.indexOf(n.val)}).map(function(t){return t.name})}function g(t){return function(t){var n={};return o.w.forEach(function(t,e,a){n[t.val]=t.name}),n}()[+t]}function v(t){return void 0===t?[]:o.w.filter(function(n){return-1!==t.indexOf(n.val)}).map(function(t){return t.name})}function j(t){return o.w.filter(function(n){return-1!==t.indexOf(n.name)}).map(function(t){return t.val})}function O(t,n){return"1"===t?-1!==["01","1"].indexOf(n)?"未生效":"生效中":-1!==["01","1"].indexOf(n)?"未推送":"已推送"}function w(t){return"1"===t?"系统推荐":"手动推荐"}function y(t){return new i.a(function(n){var e=new FileReader;e.readAsArrayBuffer(t),e.onload=function(t){var e=d.a.SHA256(function(t){for(var n=new Uint8Array(t),e=[],a=0;a<n.length;a+=4)e.push(n[a]<<24|n[a+1]<<16|n[a+2]<<8|n[a+3]);return d.a.lib.WordArray.create(e,n.length)}(t.target.result)).toString();console.log("hexstring:",e,e.toString()),n(e)}})}}}]);