(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-0868"],{11:function(e,t){},12:function(e,t){},13:function(e,t){},14:function(e,t){},15:function(e,t){},16:function(e,t){},17:function(e,t){},18:function(e,t){},19:function(e,t){},20:function(e,t){},21:function(e,t){},22:function(e,t){},23:function(e,t){},24:function(e,t){},25:function(e,t){},FwNe:function(e,t,n){},Yahv:function(e,t,n){"use strict";n.r(t);var r=n("Zkmf"),i=n("fe1z"),a={name:"Resume",components:{},data:function(){var e=this.$store.getters.avatar,t=void 0;return t=e?[{url:e,name:"avatar.png"}]:[],{form:{user_id:this.$store.getters.name,real_name:this.$store.getters.real_name,role_name:this.$store.getters.role_name,img_url:this.$store.getters.avatar},rules:{img_url:[{type:"string",required:!0,message:"请按规则上传一张个人图片",trigger:"change"}]},file_list:t,upload_disabled:!1}},watch:{file_list:{handler:function(e){e.length>=1?(this.upload_disabled=!0,this.img_url=e[0].url):this.upload_disabled=!1},immediate:!0}},mounted:function(){},methods:{save:function(e){var t=this;this.$refs[e].validate(function(e){if(!e)return!1;t.save_user_avatar()})},save_user_avatar:function(){var e=this,t={img_url:this.form.img_url};Object(i.f)(t).then(function(t){0===t.status?(e.$message.success(t.message),e.$store.dispatch("GetInfo")):e.$message.error(t.message)})},delete_avatar:function(){this.form.img_url="",this.remove_picture()},remove_picture:function(){this.file_list=[]},push_picture_to_cloud:function(e){var t=this;if(this.file_list.length>=1)this.$message.warning("只能上传一张图片");else{var n=e.file;Object(r.a)(n).then(function(i){var a=i.data;if(-1!==[1,-2,"-2"].indexOf(a.status))Object(r.b)(n).then(function(n){var r=n.data;if(0===r.status){var i=r.data.url,a={name:e.file.name,url:i};t.file_list.push(a),t.form.img_url=i}else t.$message.error(r.message)});else if(-1===a.status)t.$message.error(a.message);else if(0===a.status){var u=a.data.url,o={name:e.file.name,url:u};t.file_list.push(o),t.form.img_url=u,t.$message.success("上传成功")}else t.$message.error(a.message)})}}}},u=(n("zngp"),n("KHd+")),o=Object(u.a)(a,function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"resume"},[n("el-card",{staticClass:"title"},[n("span",[e._v("个人信息")])]),e._v(" "),n("el-card",{staticClass:"box-card"},[n("el-form",{ref:"form",staticClass:"demo-ruleForm",attrs:{model:e.form,rules:e.rules,size:"small","label-width":"100px","label-suffix":":"}},[n("el-form-item",{attrs:{label:"账号",prop:"user_id"}},[n("el-input",{attrs:{disabled:""},model:{value:e.form.user_id,callback:function(t){e.$set(e.form,"user_id",t)},expression:"form.user_id"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"真实姓名",prop:"real_name"}},[n("el-input",{attrs:{disabled:""},model:{value:e.form.real_name,callback:function(t){e.$set(e.form,"real_name",t)},expression:"form.real_name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"部门",prop:"role_name"}},[n("el-input",{attrs:{disabled:""},model:{value:e.form.role_name,callback:function(t){e.$set(e.form,"role_name",t)},expression:"form.role_name"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"个人头像",prop:"img_url"}},[n("el-upload",{directives:[{name:"show",rawName:"v-show",value:!e.upload_disabled,expression:"!upload_disabled"}],class:{"hidden-img":e.upload_disabled},attrs:{"http-request":e.push_picture_to_cloud,"on-remove":e.remove_picture,multiple:!1,limit:1,"file-list":e.file_list,"show-file-list":!1,action:"",accept:"image/png, image/jpeg","list-type":"picture"}},[n("template",{slot:"tip"},[n("div",{staticClass:"upload-file-to-server"},[e._v("备注: 支持上传jpg/png图片格式, 尺寸为50x50，且不超过100kb.")])]),e._v(" "),n("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("点击上传")])],2),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.upload_disabled,expression:"upload_disabled"}],staticClass:"avatar-area"},[n("img",{staticClass:"avatar",attrs:{src:e.form.img_url,alt:""}}),e._v(" "),n("i",{staticClass:"el-icon-delete avatar-delete",on:{click:e.delete_avatar}})])],1),e._v(" "),n("el-form-item",{staticClass:"update-action"},[n("el-button",{attrs:{size:"mini",type:"primary"},on:{click:function(t){return e.save("form")}}},[e._v("保存")])],1)],1)],1)],1)},[],!1,null,"8c8eeb8e",null);t.default=o.exports},Zkmf:function(e,t,n){"use strict";n.d(t,"a",function(){return m}),n.d(t,"b",function(){return v});var r,i,a=n("14Xm"),u=n.n(a),o=n("D3Ub"),s=n.n(o),l=n("+bwJ"),c=n("vDqi"),f=n.n(c),d=n("z0WU"),m=(r=s()(u.a.mark(function e(t){var n,r,i,a,o,s;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(d.a)(t);case 2:return n=e.sent,r={hash:n},i={headers:{"Content-Type":"application/json"},baseURL:"/gelei-guard-bms/api"},a="/file/data/secondpass",o=Object(l.a)(r),s=JSON.parse(o),e.next=10,f.a.post(a,s,i);case 10:return e.abrupt("return",e.sent);case 11:case"end":return e.stop()}},e,this)})),function(e){return r.apply(this,arguments)}),v=(i=s()(u.a.mark(function e(t){var n,r,i,a,o,s,c,m;return u.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return(n=new FormData).append("file",t),e.next=4,Object(d.a)(t);case 4:for(m in r=e.sent,i={hash:r},a={headers:{"Content-Type":"multipart/form-data"},baseURL:"/gelei-guard-bms/api"},o=Object(l.a)(i),s="/file/data/upload",c=JSON.parse(o))n.append(m,c[m]);return e.next=13,f.a.post(s,n,a);case 13:return e.abrupt("return",e.sent);case 14:case"end":return e.stop()}},e,this)})),function(e){return i.apply(this,arguments)})},z0WU:function(e,t,n){"use strict";n.d(t,"f",function(){return f}),n.d(t,"n",function(){return d}),n.d(t,"b",function(){return m}),n.d(t,"l",function(){return v}),n.d(t,"t",function(){return p}),n.d(t,"k",function(){return h}),n.d(t,"h",function(){return g}),n.d(t,"d",function(){return _}),n.d(t,"g",function(){return b}),n.d(t,"p",function(){return w}),n.d(t,"m",function(){return x}),n.d(t,"s",function(){return y}),n.d(t,"r",function(){return O}),n.d(t,"e",function(){return $}),n.d(t,"j",function(){return k}),n.d(t,"a",function(){return j}),n.d(t,"q",function(){return C}),n.d(t,"o",function(){return H}),n.d(t,"i",function(){return z}),n.d(t,"c",function(){return E});var r=n("4d7F"),i=n.n(r),a=(n("EJiy"),n("fs/A")),u=n("YP4+"),o=n("Wgwc"),s=n.n(o),l=n("NFKh"),c=n.n(l);function f(){return document.body.clientHeight&&document.documentElement.clientHeight?document.body.clientHeight<document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight:document.body.clientHeight>document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight}function d(){return Object(a.v1)().replace(/-/g,"").toUpperCase()}function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:u.i,n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];return e?s()(e).format(t):n?s()().format(t):e}function v(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=m(e,u.i),i=void 0;return i=t?r+" 00:00:00":r+" 23:59:59",n?new Date(i).getTime():i}function p(e){return["零","一","二","三","四","五","六","七","八","九","十"][+e]}function h(e){return"0"===e?"女":1==+e?"男":"不限"}function g(){var e={};return u.w.forEach(function(t,n,r){e[t.val]=t.name}),e}function _(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"元";return(+e).toFixed(2)+t}function b(e){return g()[+e]}function w(e){return u.w.filter(function(t){return-1!==e.indexOf(t.val)}).map(function(e){return e.name})}function x(e){return function(e){var t={};return u.P.forEach(function(e,n,r){t[e.val]=e.name}),t}()[+e]}function y(e){return void 0===e?[]:u.P.filter(function(t){return-1!==e.indexOf(t.val)}).map(function(e){return e.name})}function O(e){return u.P.filter(function(t){return-1!==e.indexOf(t.name)}).map(function(e){return e.val})}function $(e,t){return"1"===e?-1!==["01","1"].indexOf(t)?"未生效":"生效中":-1!==["01","1"].indexOf(t)?"未推送":"已推送"}function k(e){return"1"===e?"系统推荐":"手动推荐"}function j(e){return new i.a(function(t){var n=new FileReader;n.readAsArrayBuffer(e),n.onload=function(e){var n=c.a.SHA256(function(e){for(var t=new Uint8Array(e),n=[],r=0;r<t.length;r+=4)n.push(t[r]<<24|t[r+1]<<16|t[r+2]<<8|t[r+3]);return c.a.lib.WordArray.create(n,t.length)}(e.target.result)).toString();t(n)}})}function C(e){for(var t in e)e[t]||delete e[t];return e}function H(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"-",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"1";if("1"===r){var i=t.filter(function(t){return t.value===e});if(i.length)return i[0].label}else if("2"===r){var a=t.filter(function(t){return t.val===e});if(a.length)return a[0].name}return n}function z(){!(arguments.length>0&&void 0!==arguments[0])||arguments[0];var e=window.location.hostname;return"https://"+(-1!==["g8ddev.dev.zhixike.net","g8dtes.dev.zhixike.net"].indexOf(e)?e:"greenguard-bms-beta.gwchina.cn"===e?"greenguard-h5-beta.gwchina.cn":"greenguard-bms.gwchina.cn"===e?"greenguard-h5.gwchina.cn":"g8ddev.dev.zhixike.net")}function E(e){var t=[];return function e(n){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=r.code||0;n.map(function(n){var r=n.children;delete n.children;var u=n;u.pcode=a,u.level=i,t.push(u),r.length&&e(r,n,i+1)})}(e),t}},zngp:function(e,t,n){"use strict";var r=n("FwNe");n.n(r).a}}]);