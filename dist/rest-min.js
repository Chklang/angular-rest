!function(){!function(){"use strict";var e=angular.module("RestModule",[]);e.provider("rest",function(){var e="",t={"default":function(e){alert("Internal server error : "+e)}};this.restPath=function(t){e=t},this.setDefaultErrorCode=function(e,r){t[e]=r},this.$get=[function(){return{restPath:e,defaultErrorsCodes:t}}]})}(),function(){"use strict";angular.module("RestModule").service("restRequest",["$http","rest",function(e,t){var r="function";this.base=function(o){var s=o.url,u=o.method,d=o.data,f=o.contentType,a=o.success,n=o.error,l=o.errorsCodes,i={};i.method=u,i.url=t.restPath+s,d&&(i.data=d),void 0!==f&&null!==f&&""!==f&&(i.headers={"Content-Type":f});var c=e(i);return c.success(function(e,t){a(e)}),c.error(function(e,o){var s=!0,u=null,d=null;if(t.defaultErrorsCodes["default"]&&typeof t.defaultErrorsCodes["default"]!=r){u=u||{};for(d in t.defaultErrorsCodes["default"])u[d]=t.defaultErrorsCodes["default"][d]}if(t.defaultErrorsCodes[o]&&typeof t.defaultErrorsCodes[o]!=r){u=u||{};for(d in t.defaultErrorsCodes[o])u[d]=t.defaultErrorsCodes[o][d]}if(l&&l["default"]&&typeof l["default"]!=r){u=u||{};for(d in l["default"])u[d]=l["default"][d]}if(l&&l[o]&&typeof l[o]!=r){u=u||{};for(d in l[o])u[d]=l[o][d]}var f=[e];null!==u&&f.push(u),s&&l&&l[o]&&typeof l[o]==r&&l[o].apply(window,f)!==!0&&(s=!1),s&&l&&l["default"]&&typeof l["default"]==r&&l["default"].apply(window,f)!==!0&&(s=!1),s&&t.defaultErrorsCodes[o]&&typeof t.defaultErrorsCodes[o]==r&&t.defaultErrorsCodes[o].apply(window,f)!==!0&&(s=!1),s&&t.defaultErrorsCodes["default"]&&typeof t.defaultErrorsCodes["default"]==r&&t.defaultErrorsCodes["default"].apply(window,f)!==!0&&(s=!1),n&&(null!==u?n(e,o,u):n(e,o))}),c},this.get=function(e){return e.method="GET",this.base(e)},this.post=function(e){return e.method="POST",this.base(e)},this.put=function(e){return e.method="PUT",this.base(e)},this["delete"]=function(e){return e.method="DELETE",this.base(e)}}])}()}();