(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-c437"],{11:function(e,t){},12:function(e,t){},"12yw":function(e,t,n){"use strict";n.d(t,"h",function(){return r}),n.d(t,"b",function(){return a}),n.d(t,"g",function(){return u}),n.d(t,"f",function(){return o}),n.d(t,"e",function(){return d}),n.d(t,"d",function(){return i}),n.d(t,"a",function(){return c}),n.d(t,"c",function(){return l});var r=[{value:"01",label:"启动中"},{value:"00",label:"未启动"},{value:"02",label:"已停止"}],a=[{value:"1",label:"格雷盒子家长端",select_item:{update_platforms:[{value:"01",label:"IOS家长端"},{value:"11",label:"安卓家长端"}],update_models:[{value:"0",label:"推荐升级",disabled:!1},{value:"1",label:"强制升级",disabled:!1}],update_ranges:[{value:"01",label:"全量"},{value:"03",label:"用户手机"}]}},{value:"2",label:"格雷盒子孩子端",select_item:{update_platforms:[{value:"02",label:"IOS孩子端"},{value:"F2",label:"安卓孩子端"}],update_models:[{value:"0",label:"推荐升级",disabled:!0},{value:"1",label:"强制升级",disabled:!1}],update_ranges:[{value:"01",label:"全量"},{value:"02",label:"设备ID白名单"}]}},{value:"3",label:"定制机孩子端",select_item:{update_platforms:[{value:"12",label:"VIVO孩子端"},{value:"22",label:"OPPO孩子端"},{value:"42",label:"小格雷定制机"}],update_models:[{value:"0",label:"推荐升级",disabled:!0},{value:"1",label:"强制升级",disabled:!1}],update_ranges:[{value:"01",label:"全量"},{value:"02",label:"设备ID白名单"}]}},{value:"4",label:"中间件",select_item:{update_platforms:[{value:"13",label:"VIVO中间件"},{value:"23",label:"OPPO中间件"},{value:"43",label:"小格雷中间件"}],update_models:[{value:"0",label:"推荐升级",disabled:!1},{value:"1",label:"强制升级",disabled:!1}],update_ranges:[{value:"01",label:"全量"},{value:"02",label:"设备ID白名单"}]}}],u=[{value:"01",label:"IOS家长端"},{value:"11",label:"安卓家长端"},{value:"02",label:"IOS孩子端"},{value:"F2",label:"安卓孩子端"},{value:"12",label:"vivo孩子端"},{value:"22",label:"oppo孩子端"},{value:"42",label:"小格雷定制机"},{value:"13",label:"vivo中间件"},{value:"23",label:"oppo中间件"},{value:"43",label:"小格雷中间件"}],o=[{value:"01",label:"IOS家长端"},{value:"11",label:"安卓家长端"},{value:"02",label:"IOS孩子端"},{value:"F2",label:"安卓孩子端"},{value:"12",label:"vivo孩子端"},{value:"22",label:"oppo安卓孩子端"},{value:"42",label:"小格雷定制机"},{value:"13",label:"孩子端+vivo中间件"},{value:"23",label:"孩子端+oppo中间件"},{value:"43",label:"孩子端+小格雷中间件"}],d=[{value:"0",label:"待生效"},{value:"1",label:"已生效"}],i=[{value:"",label:"不限"},{value:"01",label:"PC"},{value:"02",label:"IOS"},{value:"03",label:"Android"}],c=[{value:"00",label:"不限"},{value:"01",label:"PC"},{value:"02",label:"IOS"},{value:"03",label:"Android"}],l=[{value:"01",label:"PC端"},{value:"02",label:"苹果"},{value:"03",label:"安卓"}]},13:function(e,t){},14:function(e,t){},GZ8K:function(e,t,n){"use strict";var r=n("Xxud");n.n(r).a},QO0G:function(e,t,n){"use strict";n.r(t);var r=n("QbLZ"),a=n.n(r),u=n("S583"),o=n("12yw"),d=n("z0WU"),i=n("X4fA"),c=n("YP4+"),l={components:{},data:function(){var e=Object(i.a)();return{loading:!1,query_sets:{platform:""},version_list:[],platforms:o.g,page:1,page_size:e,page_sizes:c.O,total:0}},computed:{},mounted:function(){this.fetch_version_distribution_list()},methods:{table_size_change:function(e){this.page_size=e,Object(i.d)(e),this.query()},change_current:function(e){this.page=e,this.query()},get_condition:function(){return this.query_sets},get_condition_with_pagination:function(){var e=this.get_condition();return(e=Object(d.o)(e)).page_no=this.page,e.page_num=this.page_size,e},query_condition_change:function(){this.page=1,this.page_size=Object(i.a)(),this.query()},query:function(){this.fetch_version_distribution_list()},version_distribution_map:function(e){return e.map(function(e){var t=Object(d.m)(e.platform,o.g);return a()({},e,{platform_label:t})})},fetch_version_distribution_list:function(){var e=this,t=this.get_condition_with_pagination();this.loading=!0,Object(u.Ob)(t).then(function(t){0===t.status&&(e.version_list=e.version_distribution_map(t.data),e.total=t.total_count)}).finally(function(){e.loading=!1})}}},s=(n("GZ8K"),n("KHd+")),g=Object(s.a)(l,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"content"},[n("div",{staticClass:"content-body"},[n("div",{staticClass:"search-area"},[n("el-row",{staticClass:"row-bg",attrs:{gutter:10}},[n("el-col",{staticClass:"col-bg",attrs:{xs:12,sm:8,md:6,lg:6,xl:4}},[n("div",{staticClass:"grid-content bg-purple"},[n("el-row",[n("el-col",{staticClass:"order-number-list",attrs:{span:8}},[e._v("平台:")]),e._v(" "),n("el-col",{attrs:{span:16}},[n("el-select",{attrs:{size:"mini",placeholder:"请选择平台",clearable:""},on:{change:e.query_condition_change},model:{value:e.query_sets.platform,callback:function(t){e.$set(e.query_sets,"platform",t)},expression:"query_sets.platform"}},e._l(e.platforms,function(e){return n("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}))],1)],1)],1)])],1)],1),e._v(" "),n("div",{staticClass:"between-search-area-and-table-display"}),e._v(" "),n("div",{staticClass:"table-content table-block"},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticStyle:{width:"100%"},attrs:{data:e.version_list,size:"mini"}},[n("el-table-column",{attrs:{align:"center",label:"版本号",prop:"version",width:"160"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"升级策略名称",prop:"update_title"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"版本累计用户",prop:"device_count"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"占比",prop:"percent"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"平台",prop:"platform_label",width:"160"}})],1),e._v(" "),n("el-pagination",{attrs:{"current-page":e.page,"page-size":e.page_size,"page-sizes":e.page_sizes,total:e.total,layout:"total, sizes, prev, pager, next, jumper"},on:{"current-change":e.change_current,"size-change":e.table_size_change}})],1)])])},[],!1,null,"12981c8b",null);g.options.__file="version_manager.vue";t.default=g.exports},S583:function(e,t,n){"use strict";n.d(t,"pb",function(){return a}),n.d(t,"ob",function(){return u}),n.d(t,"nb",function(){return o}),n.d(t,"L",function(){return d}),n.d(t,"K",function(){return i}),n.d(t,"Z",function(){return c}),n.d(t,"Y",function(){return l}),n.d(t,"Nb",function(){return s}),n.d(t,"rb",function(){return g}),n.d(t,"sb",function(){return f}),n.d(t,"qb",function(){return m}),n.d(t,"Pb",function(){return b}),n.d(t,"lb",function(){return p}),n.d(t,"Tb",function(){return h}),n.d(t,"T",function(){return v}),n.d(t,"V",function(){return O}),n.d(t,"Lb",function(){return j}),n.d(t,"S",function(){return _}),n.d(t,"U",function(){return y}),n.d(t,"tb",function(){return w}),n.d(t,"vb",function(){return z}),n.d(t,"g",function(){return x}),n.d(t,"Vb",function(){return q}),n.d(t,"ub",function(){return k}),n.d(t,"p",function(){return I}),n.d(t,"Kb",function(){return S}),n.d(t,"Jb",function(){return C}),n.d(t,"Ib",function(){return A}),n.d(t,"Fb",function(){return P}),n.d(t,"Hb",function(){return F}),n.d(t,"Gb",function(){return U}),n.d(t,"Eb",function(){return D}),n.d(t,"Mb",function(){return E}),n.d(t,"P",function(){return K}),n.d(t,"O",function(){return L}),n.d(t,"db",function(){return V}),n.d(t,"j",function(){return B}),n.d(t,"E",function(){return G}),n.d(t,"I",function(){return J}),n.d(t,"Rb",function(){return W}),n.d(t,"zb",function(){return H}),n.d(t,"i",function(){return N}),n.d(t,"H",function(){return Q}),n.d(t,"Ab",function(){return X}),n.d(t,"D",function(){return Z}),n.d(t,"t",function(){return R}),n.d(t,"s",function(){return T}),n.d(t,"N",function(){return Y}),n.d(t,"b",function(){return M}),n.d(t,"r",function(){return $}),n.d(t,"Sb",function(){return ee}),n.d(t,"w",function(){return te}),n.d(t,"M",function(){return ne}),n.d(t,"mb",function(){return re}),n.d(t,"ib",function(){return ae}),n.d(t,"jb",function(){return ue}),n.d(t,"m",function(){return oe}),n.d(t,"e",function(){return de}),n.d(t,"Ub",function(){return ie}),n.d(t,"gb",function(){return ce}),n.d(t,"fb",function(){return le}),n.d(t,"hb",function(){return se}),n.d(t,"d",function(){return ge}),n.d(t,"A",function(){return fe}),n.d(t,"J",function(){return me}),n.d(t,"a",function(){return be}),n.d(t,"v",function(){return pe}),n.d(t,"l",function(){return he}),n.d(t,"Ob",function(){return ve}),n.d(t,"xb",function(){return Oe}),n.d(t,"h",function(){return je}),n.d(t,"C",function(){return _e}),n.d(t,"G",function(){return ye}),n.d(t,"wb",function(){return we}),n.d(t,"Qb",function(){return ze}),n.d(t,"Cb",function(){return xe}),n.d(t,"Bb",function(){return qe}),n.d(t,"Db",function(){return ke}),n.d(t,"k",function(){return Ie}),n.d(t,"F",function(){return Se}),n.d(t,"q",function(){return Ce}),n.d(t,"X",function(){return Ae}),n.d(t,"W",function(){return Pe}),n.d(t,"c",function(){return Fe}),n.d(t,"y",function(){return Ue}),n.d(t,"o",function(){return De}),n.d(t,"bb",function(){return Ee}),n.d(t,"ab",function(){return Ke}),n.d(t,"z",function(){return Le}),n.d(t,"x",function(){return Ve}),n.d(t,"Q",function(){return Be}),n.d(t,"R",function(){return Ge}),n.d(t,"eb",function(){return Je}),n.d(t,"cb",function(){return We}),n.d(t,"u",function(){return He}),n.d(t,"yb",function(){return Ne}),n.d(t,"kb",function(){return Qe}),n.d(t,"f",function(){return Xe}),n.d(t,"B",function(){return Ze}),n.d(t,"n",function(){return Re});var r=n("t3Un");function a(){return Object(r.a)({url:"/greenguard/common/order/type/list",method:"post"})}function u(){return Object(r.a)({url:"/greenguard/common/order/status/list",method:"post"})}function o(){return Object(r.a)({url:"/greenguard/common/order/paytype/list",method:"post"})}function d(){return Object(r.a)({url:"/greenguard/common/advertising/type/list",method:"post"})}function i(){return Object(r.a)({url:"/greenguard/common/advertising/point/list",method:"post"})}function c(){return Object(r.a)({url:"/greenguard/manager/index/summary",method:"post"})}function l(e){return Object(r.a)({url:"/greenguard/manager/index/list",method:"post",data:e})}function s(e){return Object(r.a)({url:"/greenguard/common/user/reg_from/list",method:"post",data:e})}function g(e){return Object(r.a)({url:"/greenguard/manager/user/patriarch/list",method:"post",data:e})}function f(e){return Object(r.a)({url:"/greenguard/manager/user/patriarch/list/export",method:"post",data:e})}function m(e){return Object(r.a)({url:"/greenguard/manager/user/patriarch/detail",method:"post",data:e})}function b(e){return Object(r.a)({url:"/greenguard/manager/member/monthlyplan/unsubscribe/ctccsp",method:"post",data:e})}function p(e){return Object(r.a)({url:"/greenguard/manager/member/monthlyplan/unsubscribe/list",method:"post",data:e})}function h(e){return Object(r.a)({url:"/greenguard/manager/device/unbind",method:"post",data:e})}function v(e){return Object(r.a)({url:"/greenguard/manager/user/patriarch/child_device/record/list",method:"post",data:e})}function O(e){return Object(r.a)({url:"/greenguard/manager/device/info/list",method:"post",data:e})}function j(e){return Object(r.a)({url:"/greenguard/manager/user/child/list",method:"post",data:e})}function _(e){return Object(r.a)({url:"/greenguard/manager/user/child/list/export",method:"post",data:e})}function y(e){return Object(r.a)({url:"/greenguard/manager/device/getAppUsage",method:"post",data:e})}function w(e){return Object(r.a)({url:"/greenguard/manager/qa/type/list",method:"post",data:e})}function z(e){return Object(r.a)({url:"/greenguard/manager/qa/list",method:"post",data:e})}function x(e){return Object(r.a)({url:"/greenguard/manager/qa/add",method:"post",data:e})}function q(e){return Object(r.a)({url:"/greenguard/manager/qa/edit",method:"post",data:e})}function k(e){return Object(r.a)({url:"/greenguard/manager/qa/detail",method:"post",data:e})}function I(e){return Object(r.a)({url:"/greenguard/manager/qa/delete",method:"post",data:e})}function S(e){return Object(r.a)({url:"/greenguard/manager/user/analyze/summary",method:"post",data:e})}function C(e){return Object(r.a)({url:"/greenguard/manager/user/analyze/list",method:"post",data:e})}function A(e){return Object(r.a)({url:"/greenguard/manager/user/analyze/child/summary",method:"post",data:e})}function P(e){return Object(r.a)({url:"/greenguard/manager/user/analyze/child/increased",method:"post",data:e})}function F(e){return Object(r.a)({url:"/greenguard/manager/user/analyze/child/increased/bind_user",method:"post",data:e})}function U(e){return Object(r.a)({url:"/greenguard/manager/user/analyze/child/increased/bind_device",method:"post",data:e})}function D(e){return Object(r.a)({url:"/greenguard/manager/user/analyze/child/list",method:"post",data:e})}function E(e){return Object(r.a)({url:"/greenguard/manager/user/analyze/increased",method:"post",data:e})}function K(e){return Object(r.a)({url:"/greenguard/manager/user/analyze/increased/bind_user",method:"post",data:e})}function L(e){return Object(r.a)({url:"/greenguard/manager/user/analyze/increased/bind_device",method:"post",data:e})}function V(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/list",method:"post",data:e})}function B(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/add",method:"post",data:e})}function G(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/edit",method:"post",data:e})}function J(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/delete",method:"post",data:e})}function W(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/mark/search",method:"post",data:e})}function H(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/group/list",method:"post",data:e})}function N(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/group/add",method:"post",data:e})}function Q(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/group/delete",method:"post",data:e})}function X(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/group/detail",method:"post",data:e})}function Z(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/group/edit",method:"post",data:e})}function R(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/group/publish",method:"post",data:e})}function T(e){return Object(r.a)({url:"/greenguard/manager/qa/publish",method:"post",data:e})}function Y(e){return Object(r.a)({url:"/greenguard/manager/app/version/list",method:"post",data:e})}function M(e){return Object(r.a)({url:"/greenguard/manager/app/version/add",method:"post",data:e})}function $(e){return Object(r.a)({url:"/greenguard/manager/app/version/startup",method:"post",data:e})}function ee(e){return Object(r.a)({url:"/greenguard/manager/app/version/send/command",method:"post",data:e})}function te(e){return Object(r.a)({url:"/greenguard/manager/app/version/update",method:"post",data:e})}function ne(e){return Object(r.a)({url:"/greenguard/manager/app/version/get",method:"post",data:e})}function re(e){return Object(r.a)({url:"/greenguard/manager/order/list",method:"post",data:e})}function ae(e){return Object(r.a)({url:"/greenguard/manager/member/plan/flow/list",method:"post",data:e})}function ue(e){return Object(r.a)({url:"/greenguard/manager/member/plan/list",method:"post",data:e})}function oe(e){return Object(r.a)({url:"/greenguard/manager/member/plan/delete",method:"post",data:e})}function de(e){return Object(r.a)({url:"/greenguard/manager/member/plan/add",method:"post",data:e})}function ie(e){return Object(r.a)({url:"/greenguard/manager/member/plan/edit",method:"post",data:e})}function ce(e){return Object(r.a)({url:"/greenguard/manager/member/activity/list",method:"post",data:e})}function le(e){return Object(r.a)({url:"/greenguard/manager/member/activity/info",method:"post",data:e})}function se(e){return Object(r.a)({url:"/greenguard/manager/member/activity/user/list",method:"post",data:e})}function ge(e){return Object(r.a)({url:"/greenguard/manager/member/activity/add",method:"post",data:e})}function fe(e){return Object(r.a)({url:"/greenguard/manager/member/activity/edit",method:"post",data:e})}function me(e){return Object(r.a)({url:"/greenguard/manager/advertising/list",method:"post",data:e})}function be(e){return Object(r.a)({url:"/greenguard/manager/advertising/add",method:"post",data:e})}function pe(e){return Object(r.a)({url:"/greenguard/manager/advertising/edit",method:"post",data:e})}function he(e){return Object(r.a)({url:"/greenguard/manager/advertising/delete",method:"post",data:e})}function ve(e){return Object(r.a)({url:"/greenguard/manager/app/version/distribution",method:"post",data:e})}function Oe(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/subject/list",method:"post",data:e})}function je(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/subject/add",method:"post",data:e})}function _e(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/subject/edit",method:"post",data:e})}function ye(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/subject/delete",method:"post",data:e})}function we(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/subject/detail",method:"post",data:e})}function ze(e){return Object(r.a)({url:"/greenguard/manager/soft/recommend/subject/publish",method:"post",data:e})}function xe(e){return Object(r.a)({url:"/greenguard/manager/sys/param/list",method:"post",data:e})}function qe(e){return Object(r.a)({url:"/greenguard/manager/sys/param/get",method:"post",data:e})}function ke(e){return Object(r.a)({url:"/greenguard/manager/sys/param/get/type/list",method:"post",data:e})}function Ie(e){return Object(r.a)({url:"/greenguard/manager/sys/param/add",method:"post",data:e})}function Se(e){return Object(r.a)({url:"/greenguard/manager/sys/param/edit",method:"post",data:e})}function Ce(e){return Object(r.a)({url:"/greenguard/manager/sys/param/delete",method:"post",data:e})}function Ae(e){return Object(r.a)({url:"/greenguard/manager/risk/soft/list",method:"post",data:e})}function Pe(e){return Object(r.a)({url:"/greenguard/manager/risk/soft/get",method:"post",data:e})}function Fe(e){return Object(r.a)({url:"/greenguard/manager/risk/soft/add",method:"post",data:e})}function Ue(e){return Object(r.a)({url:"/greenguard/manager/risk/soft/edit",method:"post",data:e})}function De(e){return Object(r.a)({url:"/greenguard/manager/risk/soft/delete",method:"post",data:e})}function Ee(e){return Object(r.a)({url:"/greenguard/manager/user/invite/register/statistics/list",method:"post",data:e})}function Ke(){return Object(r.a)({url:"/greenguard/manager/user/invite/register/activity/info",method:"post"})}function Le(e){return Object(r.a)({url:"/greenguard/manager/user/invite/register/activity/edit",method:"post",data:e})}function Ve(e){return Object(r.a)({url:"/greenguard/manager/channel/saveOrUpdate",method:"post",data:e})}function Be(e){return Object(r.a)({url:"/greenguard/manager/channel/info",method:"post",data:e})}function Ge(e){return Object(r.a)({url:"/greenguard/manager/channel/list",method:"post",data:e})}function Je(e){return Object(r.a)({url:"/greenguard/manager/voice/query/record",method:"post",data:e})}function We(e){return Object(r.a)({url:"/greenguard/manager/sms/query/record",method:"post",data:e})}function He(e){return Object(r.a)({url:"/greenguard/manager/user/profile/unbind",method:"post",data:e})}function Ne(e){return Object(r.a)({url:"/greenguard/manager/index/querySoftByBundleId",method:"post",data:e})}function Qe(e){return Object(r.a)({url:"/greenguard/manager/miniprogram/list",method:"post",data:e})}function Xe(e){return Object(r.a)({url:"/greenguard/manager/miniprogram/add",method:"post",data:e})}function Ze(e){return Object(r.a)({url:"/greenguard/manager/miniprogram/edit",method:"post",data:e})}function Re(e){return Object(r.a)({url:"/greenguard/manager/miniprogram/del",method:"post",data:e})}},Xxud:function(e,t,n){},z0WU:function(e,t,n){"use strict";n.d(t,"l",function(){return s}),n.d(t,"b",function(){return g}),n.d(t,"j",function(){return f}),n.d(t,"r",function(){return m}),n.d(t,"i",function(){return b}),n.d(t,"f",function(){return p}),n.d(t,"c",function(){return h}),n.d(t,"e",function(){return v}),n.d(t,"n",function(){return O}),n.d(t,"k",function(){return j}),n.d(t,"q",function(){return _}),n.d(t,"p",function(){return y}),n.d(t,"d",function(){return w}),n.d(t,"h",function(){return z}),n.d(t,"a",function(){return x}),n.d(t,"o",function(){return q}),n.d(t,"m",function(){return k}),n.d(t,"g",function(){return I});var r=n("4d7F"),a=n.n(r),u=(n("EJiy"),n("fs/A")),o=n("YP4+"),d=n("Wgwc"),i=n.n(d),c=n("NFKh"),l=n.n(c);function s(){return Object(u.v1)().replace(/-/g,"").toUpperCase()}function g(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.g,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return e?i()(e).format(t):n?i()().format(t):e}function f(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=g(e,o.g),a=void 0;return a=t?r+" 00:00:00":r+" 23:59:59",n?new Date(a).getTime():a}function m(e){return["零","一","二","三","四","五","六","七","八","九","十"][+e]}function b(e){return"0"===e?"女":1==+e?"男":"不限"}function p(){var e={};return o.u.forEach(function(t,n,r){e[t.val]=t.name}),e}function h(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"元";return(+e).toFixed(2)+t}function v(e){return p()[+e]}function O(e){return o.u.filter(function(t){return-1!==e.indexOf(t.val)}).map(function(e){return e.name})}function j(e){return function(e){var t={};return o.L.forEach(function(e,n,r){t[e.val]=e.name}),t}()[+e]}function _(e){return void 0===e?[]:o.L.filter(function(t){return-1!==e.indexOf(t.val)}).map(function(e){return e.name})}function y(e){return o.L.filter(function(t){return-1!==e.indexOf(t.name)}).map(function(e){return e.val})}function w(e,t){return"1"===e?-1!==["01","1"].indexOf(t)?"未生效":"生效中":-1!==["01","1"].indexOf(t)?"未推送":"已推送"}function z(e){return"1"===e?"系统推荐":"手动推荐"}function x(e){return new a.a(function(t){var n=new FileReader;n.readAsArrayBuffer(e),n.onload=function(e){var n=l.a.SHA256(function(e){for(var t=new Uint8Array(e),n=[],r=0;r<t.length;r+=4)n.push(t[r]<<24|t[r+1]<<16|t[r+2]<<8|t[r+3]);return l.a.lib.WordArray.create(n,t.length)}(e.target.result)).toString();t(n)}})}function q(e){for(var t in e)e[t]||delete e[t];return e}function k(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"-",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"1";if("1"===r){var a=t.filter(function(t){return t.value===e});if(a.length)return a[0].label}else if("2"===r){var u=t.filter(function(t){return t.val===e});if(u.length)return u[0].name}return n}function I(){!(arguments.length>0&&void 0!==arguments[0])||arguments[0];var e=window.location.hostname;return"https://"+(-1!==["g8ddev.dev.zhixike.net","g8dtes.dev.zhixike.net"].indexOf(e)?e:"greenguard-bms-beta.gwchina.cn"===e?"greenguard-h5-beta.gwchina.cn":"greenguard-bms.gwchina.cn"===e?"greenguard-h5.gwchina.cn":"g8ddev.dev.zhixike.net")}}}]);