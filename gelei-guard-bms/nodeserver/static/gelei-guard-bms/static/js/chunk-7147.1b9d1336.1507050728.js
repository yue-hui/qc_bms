(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-7147"],{Cwmg:function(e,t,a){},FyfS:function(e,t,a){e.exports={default:a("Rp86"),__esModule:!0}},Rp86:function(e,t,a){a("bBy9"),a("FlQf"),e.exports=a("fXsU")},fXsU:function(e,t,a){var s=a("5K7Z"),l=a("fNZA");e.exports=a("WEpk").getIterator=function(e){var t=l(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return s(t.call(e))}},gqWT:function(e,t,a){"use strict";var s=a("Cwmg");a.n(s).a},tYNH:function(e,t,a){"use strict";a.r(t);var s=a("GQeE"),l=a.n(s),r=a("FyfS"),n=a.n(r),i=a("gDS+"),o=a.n(i),c=a("QbLZ"),_=a.n(c),p=a("X4fA"),u=a("YP4+"),d=a("bja8"),g=a("iXUw"),b=a("z0WU"),m=a("L2JU"),v={name:"WorkOrdersNotices",components:{},data:function(){var e=Object(p.a)();return{loading:!1,query_sets:{page_type:"02",ticket_no:"",ticket_title:"",degree:"",state:"",ticket_type_name:"",device_type_name:"",question_type_name:"",question_detail_name:"",problem_type:"",p_phone:"",assigned_ao_name:"",applicant_name:"",begin_time:"",end_time:""},datetime_range:[],work_orders:[],work_orders_urgency_degree:u.ab,work_orders_status:u.Z,advertise_platform_types:u.d,work_orders_question_classifies:u.Y,work_orders_types:[],work_orders_classification:[],work_orders_subdivide:[],page:1,page_size:e,page_sizes:u.V,total:0}},computed:_()({},Object(m.b)(["name"])),mounted:function(){this.search()},methods:{get_condition:function(){var e=JSON.parse(o()(this.query_sets)),t={},a=!0,s=!1,r=void 0;try{for(var i,c=n()(l()(e));!(a=(i=c.next()).done);a=!0){var _=i.value;e[_]&&(t[_]=e[_])}}catch(e){s=!0,r=e}finally{try{!a&&c.return&&c.return()}finally{if(s)throw r}}return t},get_condition_with_pagination:function(){var e=this.get_condition();return e.page_no=this.page,e.page_num=this.page_size,this.datetime_range&&2===this.datetime_range.length&&(e.begin_time=""+this.datetime_range[0].getTime(),e.end_time=""+(this.datetime_range[1].getTime()+(u.P-1))),e},table_size_change:function(e){this.page_size=e,Object(p.d)(e),this.search()},change_current:function(e){this.page=e,this.search()},edit_work_order:function(e){var t={action:"3",ticket_id:e.ticket_id},a=this.$router.resolve({name:"WorkOrdersSystemDetails",query:t});window.open(a.href,"_blank","scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes")},refresh:function(){this.this.page=1,this.fetch_notices_create_work_orders()},search:function(){this.fetch_notices_create_work_orders()},notices_work_order:function(e){var t={action:e.applicant_id===this.name&&"3"===e.state?2:3,ticket_id:e.ticket_id},a=this.$router.resolve({name:"WorkOrdersSystemDetails",query:t});window.open(a.href,"_blank","scrollbars=yes,resizable=1,modal=false,alwaysRaised=yes")},fetch_notices_create_work_orders:function(){var e=this;this.loading=!0;var t=this.get_condition_with_pagination();Object(d.g)(Object(b.q)(t)).then(function(t){0===t.status?(e.work_orders=t.data.map(function(e){var t=Object(g.beautifyWordsFormatter)(e.ticket_title,10),a=Object(b.o)(e.degree,u.ab),s=Object(b.o)(e.state,u.Z),l=Object(b.o)(e.problem_type,u.Y,""),r=Object(b.b)(e.create_time,u.p),n=Object(b.b)(e.update_time,u.p);return _()({},e,{short_ticket_title:t,degree_label:a,state_label:s,problem_type_label:l,create_time_label:r,update_time_label:n})}),e.total=t.total_count):(e.work_orders=[],e.total=0,e.$message.error(t.message))}).finally(function(){e.loading=!1})}}},h=(a("gqWT"),a("KHd+")),y=Object(h.a)(v,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"work-orders-notices"},[a("div",{staticClass:"content-body"},[a("div",{staticClass:"search-area"},[a("el-row",{staticClass:"row-bg",attrs:{gutter:10}},[a("el-col",{staticClass:"col-bg",attrs:{xs:12,sm:7,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-row",[a("el-col",{staticClass:"order-number-list",attrs:{span:8}},[e._v("工单编号:")]),e._v(" "),a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{size:"mini",clearable:"",placeholder:"请输入工单编号"},on:{change:e.search},model:{value:e.query_sets.ticket_no,callback:function(t){e.$set(e.query_sets,"ticket_no",t)},expression:"query_sets.ticket_no"}})],1)],1)],1)]),e._v(" "),a("el-col",{staticClass:"col-bg",attrs:{xs:12,sm:7,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-row",[a("el-col",{staticClass:"order-number-list",attrs:{span:8}},[e._v("工单标题:")]),e._v(" "),a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{size:"mini",clearable:"",placeholder:"请输入工单标题"},on:{change:e.search},model:{value:e.query_sets.ticket_title,callback:function(t){e.$set(e.query_sets,"ticket_title",t)},expression:"query_sets.ticket_title"}})],1)],1)],1)]),e._v(" "),a("el-col",{staticClass:"col-bg",attrs:{xs:12,sm:7,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-row",[a("el-col",{staticClass:"order-number-list",attrs:{span:8}},[e._v("紧急程度:")]),e._v(" "),a("el-col",{attrs:{span:16}},[a("el-select",{attrs:{size:"mini",clearable:"",placeholder:"请选择紧急程度"},on:{change:e.search},model:{value:e.query_sets.degree,callback:function(t){e.$set(e.query_sets,"degree",t)},expression:"query_sets.degree"}},e._l(e.work_orders_urgency_degree,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1)],1)]),e._v(" "),a("el-col",{staticClass:"col-bg",attrs:{xs:12,sm:7,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-row",[a("el-col",{staticClass:"order-number-list",attrs:{span:8}},[e._v("工单状态:")]),e._v(" "),a("el-col",{attrs:{span:16}},[a("el-select",{attrs:{size:"mini",clearable:"",placeholder:"请选择工单状态"},on:{change:e.search},model:{value:e.query_sets.state,callback:function(t){e.$set(e.query_sets,"state",t)},expression:"query_sets.state"}},e._l(e.work_orders_status,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1)],1)]),e._v(" "),a("el-col",{staticClass:"col-bg",attrs:{xs:12,sm:7,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-row",[a("el-col",{staticClass:"order-number-list",attrs:{span:8}},[e._v("终端类型:")]),e._v(" "),a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{size:"mini",clearable:"",placeholder:"请输入终端类型"},on:{change:e.search},model:{value:e.query_sets.device_type_name,callback:function(t){e.$set(e.query_sets,"device_type_name",t)},expression:"query_sets.device_type_name"}})],1)],1)],1)]),e._v(" "),a("el-col",{staticClass:"col-bg",attrs:{xs:12,sm:7,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-row",[a("el-col",{staticClass:"order-number-list",attrs:{span:8}},[e._v("工单类别:")]),e._v(" "),a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{size:"mini",clearable:"",placeholder:"请输入工单类别"},on:{change:e.search},model:{value:e.query_sets.ticket_type_name,callback:function(t){e.$set(e.query_sets,"ticket_type_name",t)},expression:"query_sets.ticket_type_name"}})],1)],1)],1)]),e._v(" "),a("el-col",{staticClass:"col-bg",attrs:{xs:12,sm:7,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-row",[a("el-col",{staticClass:"order-number-list",attrs:{span:8}},[e._v("问题分类:")]),e._v(" "),a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{size:"mini",clearable:"",placeholder:"请输入问题分类"},on:{change:e.search},model:{value:e.query_sets.question_type_name,callback:function(t){e.$set(e.query_sets,"question_type_name",t)},expression:"query_sets.question_type_name"}})],1)],1)],1)]),e._v(" "),a("el-col",{staticClass:"col-bg",attrs:{xs:12,sm:7,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-row",[a("el-col",{staticClass:"order-number-list",attrs:{span:8}},[e._v("问题细分:")]),e._v(" "),a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{size:"mini",clearable:"",placeholder:"请输入问题细分"},on:{change:e.search},model:{value:e.query_sets.question_detail_name,callback:function(t){e.$set(e.query_sets,"question_detail_name",t)},expression:"query_sets.question_detail_name"}})],1)],1)],1)]),e._v(" "),a("el-col",{staticClass:"col-bg",attrs:{xs:12,sm:7,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-row",[a("el-col",{staticClass:"order-number-list",attrs:{span:8}},[e._v("家长手机号:")]),e._v(" "),a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{size:"mini",clearable:"",placeholder:"请输入家长手机号"},on:{change:e.search},model:{value:e.query_sets.p_phone,callback:function(t){e.$set(e.query_sets,"p_phone",t)},expression:"query_sets.p_phone"}})],1)],1)],1)]),e._v(" "),a("el-col",{staticClass:"col-bg",attrs:{xs:12,sm:7,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-row",[a("el-col",{staticClass:"order-number-list",attrs:{span:8}},[e._v("处理人:")]),e._v(" "),a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{size:"mini",clearable:"",placeholder:"请输入处理人"},on:{change:e.search},model:{value:e.query_sets.assigned_ao_name,callback:function(t){e.$set(e.query_sets,"assigned_ao_name",t)},expression:"query_sets.assigned_ao_name"}})],1)],1)],1)]),e._v(" "),a("el-col",{staticClass:"col-bg",attrs:{xs:12,sm:7,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple-light"},[a("el-row",[a("el-col",{staticClass:"order-number-list",attrs:{span:8}},[e._v("问题归类:")]),e._v(" "),a("el-col",{attrs:{span:16}},[a("el-select",{attrs:{size:"mini",clearable:"",filterable:"",placeholder:"请选择问题归类"},on:{change:e.search},model:{value:e.query_sets.problem_type,callback:function(t){e.$set(e.query_sets,"problem_type",t)},expression:"query_sets.problem_type"}},e._l(e.work_orders_question_classifies,function(e){return a("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})}),1)],1)],1)],1)]),e._v(" "),a("el-col",{staticClass:"col-bg",attrs:{xs:12,sm:7,md:6,lg:4,xl:4}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-row",[a("el-col",{staticClass:"order-number-list",attrs:{span:8}},[e._v("创建人:")]),e._v(" "),a("el-col",{attrs:{span:16}},[a("el-input",{attrs:{size:"mini",clearable:"",placeholder:"请输入创建人"},on:{change:e.search},model:{value:e.query_sets.applicant_name,callback:function(t){e.$set(e.query_sets,"applicant_name",t)},expression:"query_sets.applicant_name"}})],1)],1)],1)]),e._v(" "),a("el-col",{staticClass:"col-bg",attrs:{xs:24,sm:12,md:12,lg:8,xl:8}},[a("div",{staticClass:"grid-content bg-purple"},[a("el-row",[a("el-col",{staticClass:"order-number-list",attrs:{span:4}},[e._v("创建时间:")]),e._v(" "),a("el-col",{attrs:{span:20}},[a("el-date-picker",{attrs:{"end-placeholder":"结束日期","range-separator":"至","start-placeholder":"开始日期",type:"daterange",clearable:"",size:"mini","unlink-panels":""},on:{change:e.search},model:{value:e.datetime_range,callback:function(t){e.datetime_range=t},expression:"datetime_range"}})],1)],1)],1)])],1)],1),e._v(" "),a("div",{staticClass:"table-content"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.work_orders,size:"mini",stripe:""}},[a("el-table-column",{attrs:{align:"center",label:"工单编号",width:"108",prop:"ticket_no"}}),e._v(" "),a("el-table-column",{attrs:{label:"工单标题",width:"300",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",{staticClass:"ticket-title gl-global-violet",attrs:{title:t.row.ticket_title},on:{click:function(a){return e.edit_work_order(t.row)}}},[e._v(e._s(e._f("beautifyWordsFormatter")(t.row.ticket_title,30)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"紧急程度",prop:"degree_label"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",{class:{"gl-global-red":"1"===t.row.degree},attrs:{title:t.row.degree_label}},[e._v(e._s(t.row.degree_label))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"工单类别",prop:"ticket_type_name"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"问题分类",prop:"question_type_name"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"问题细分",prop:"question_detail_name"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"家长手机号",width:"100",prop:"p_phone"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"工单状态"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("p",{class:{"gl-global-red":"3"===t.row.state,"gl-global-red":"4"===t.row.state,"gl-global-green":"1"===t.row.state},attrs:{title:t.row.ticket_title}},[e._v("\n              "+e._s(t.row.state_label))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"处理人",prop:"assigned_ao_name"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"问题归类",prop:"problem_type_label"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"创建人",prop:"applicant_name"}}),e._v(" "),a("el-table-column",{attrs:{width:"136",align:"center",label:"创建时间",prop:"create_time_label"}}),e._v(" "),a("el-table-column",{attrs:{width:"136",align:"center",label:"最近更新时间",prop:"update_time_label"}})],1),e._v(" "),a("el-pagination",{attrs:{"current-page":e.page,"page-size":e.page_size,"page-sizes":e.page_sizes,total:e.total,layout:"total, sizes, prev, pager, next, jumper"},on:{"current-change":e.change_current,"size-change":e.table_size_change}})],1)])])},[],!1,null,"2fa9e2fb",null);t.default=y.exports}}]);