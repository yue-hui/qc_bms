(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-db8b"],{11:function(n,t){},12:function(n,t){},13:function(n,t){},14:function(n,t){},15:function(n,t){},16:function(n,t){},17:function(n,t){},18:function(n,t){},19:function(n,t){},20:function(n,t){},21:function(n,t){},22:function(n,t){},23:function(n,t){},24:function(n,t){},25:function(n,t){},"Cml/":function(n,t,e){"use strict";e.r(t);var r=e("QbLZ"),i=e.n(r),u=e("z0WU"),o=e("L2JU"),c={name:"NoNavigationPage",data:function(){return{height:Object(u.f)()-60+"px"}},computed:i()({},Object(o.b)(["is_agent"]))},f=(e("PHqh"),e("KHd+")),d=Object(f.a)(c,function(){var n=this.$createElement;return(this._self._c||n)("div",{staticClass:"no-navigation-page",class:{agent:this.is_agent},style:{height:this.height}})},[],!1,null,"ca1afba0",null);t.default=d.exports},PHqh:function(n,t,e){"use strict";var r=e("b3/u");e.n(r).a},"b3/u":function(n,t,e){},z0WU:function(n,t,e){"use strict";e.d(t,"f",function(){return l}),e.d(t,"n",function(){return h}),e.d(t,"b",function(){return g}),e.d(t,"l",function(){return v}),e.d(t,"t",function(){return m}),e.d(t,"k",function(){return s}),e.d(t,"h",function(){return b}),e.d(t,"d",function(){return p}),e.d(t,"g",function(){return w}),e.d(t,"p",function(){return H}),e.d(t,"m",function(){return x}),e.d(t,"s",function(){return y}),e.d(t,"r",function(){return O}),e.d(t,"e",function(){return E}),e.d(t,"j",function(){return k}),e.d(t,"a",function(){return P}),e.d(t,"q",function(){return z}),e.d(t,"o",function(){return A}),e.d(t,"i",function(){return j}),e.d(t,"c",function(){return U});var r=e("4d7F"),i=e.n(r),u=(e("EJiy"),e("fs/A")),o=e("YP4+"),c=e("Wgwc"),f=e.n(c),d=e("NFKh"),a=e.n(d);function l(){return document.body.clientHeight&&document.documentElement.clientHeight?document.body.clientHeight<document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight:document.body.clientHeight>document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight}function h(){return Object(u.v1)().replace(/-/g,"").toUpperCase()}function g(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.i,e=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return n?f()(n).format(t):e?f()().format(t):n}function v(n){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],e=arguments.length>2&&void 0!==arguments[2]&&arguments[2],r=g(n,o.i),i=void 0;return i=t?r+" 00:00:00":r+" 23:59:59",e?new Date(i).getTime():i}function m(n){return["零","一","二","三","四","五","六","七","八","九","十"][+n]}function s(n){return"0"===n?"女":1==+n?"男":"不限"}function b(){var n={};return o.w.forEach(function(t,e,r){n[t.val]=t.name}),n}function p(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"元";return(+n).toFixed(2)+t}function w(n){return b()[+n]}function H(n){return o.w.filter(function(t){return-1!==n.indexOf(t.val)}).map(function(n){return n.name})}function x(n){return function(n){var t={};return o.P.forEach(function(n,e,r){t[n.val]=n.name}),t}()[+n]}function y(n){return void 0===n?[]:o.P.filter(function(t){return-1!==n.indexOf(t.val)}).map(function(n){return n.name})}function O(n){return o.P.filter(function(t){return-1!==n.indexOf(t.name)}).map(function(n){return n.val})}function E(n,t){return"1"===n?-1!==["01","1"].indexOf(t)?"未生效":"生效中":-1!==["01","1"].indexOf(t)?"未推送":"已推送"}function k(n){return"1"===n?"系统推荐":"手动推荐"}function P(n){return new i.a(function(t){var e=new FileReader;e.readAsArrayBuffer(n),e.onload=function(n){var e=a.a.SHA256(function(n){for(var t=new Uint8Array(n),e=[],r=0;r<t.length;r+=4)e.push(t[r]<<24|t[r+1]<<16|t[r+2]<<8|t[r+3]);return a.a.lib.WordArray.create(e,t.length)}(n.target.result)).toString();t(e)}})}function z(n){for(var t in n)n[t]||delete n[t];return n}function A(n){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"-",r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"1";if("1"===r){var i=t.filter(function(t){return t.value===n});if(i.length)return i[0].label}else if("2"===r){var u=t.filter(function(t){return t.val===n});if(u.length)return u[0].name}return e}function j(){!(arguments.length>0&&void 0!==arguments[0])||arguments[0];var n=window.location.hostname;return"https://"+(-1!==["g8ddev.dev.zhixike.net","g8dtes.dev.zhixike.net","g8dtes2.dev.zhixike.net"].indexOf(n)?n:"greenguard-bms-beta.gwchina.cn"===n?"greenguard-h5-beta.gwchina.cn":"greenguard-bms.gwchina.cn"===n?"greenguard-h5.gwchina.cn":"g8ddev.dev.zhixike.net")}function U(n){var t=[];return function n(e){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,u=r.code||0;e.map(function(e){var r=e.children;delete e.children;var o=e;o.pcode=u,o.level=i,t.push(o),r.length&&n(r,e,i+1)})}(n),t}}}]);