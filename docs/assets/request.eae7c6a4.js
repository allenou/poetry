import{d as cr,o as Re,b as we,f as be,g as dr}from"./index.fd673c81.js";const hr={key:0,text:"center"},pr={key:1,"px-4":"","py-4":""},vr={class:"wrap"},St=cr({__name:"Article",props:{loading:Boolean},setup(e){return(r,t)=>e.loading?(Re(),we("div",hr,"\u52A0\u8F7D\u4E2D...")):(Re(),we("div",pr,[be("div",vr,[be("article",null,[dr(r.$slots,"default")])])]))}});const mr="https://cdn.statically.io/gh/chinese-poetry/chinese-poetry/master",Ct={shijing:"shijing/shijing.json",lunyu:"lunyu/lunyu.json",caocao:"caocaoshiji/caocao.json",daxue:"sishuwujing/daxue.json",zhongyong:"sishuwujing/zhongyong.json",mengzi:"sishuwujing/mengzi.json",youmengying:"youmengying/youmengying.json",yuanqu:"yuanqu/yuanqu.json"};function Er(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var We={exports:{}},ue={exports:{}},Xe=function(r,t){return function(){for(var n=new Array(arguments.length),a=0;a<n.length;a++)n[a]=arguments[a];return r.apply(t,n)}},yr=Xe,fe=Object.prototype.toString,le=function(e){return function(r){var t=fe.call(r);return e[t]||(e[t]=t.slice(8,-1).toLowerCase())}}(Object.create(null));function O(e){return e=e.toLowerCase(),function(t){return le(t)===e}}function ce(e){return Array.isArray(e)}function j(e){return typeof e>"u"}function Rr(e){return e!==null&&!j(e)&&e.constructor!==null&&!j(e.constructor)&&typeof e.constructor.isBuffer=="function"&&e.constructor.isBuffer(e)}var Ke=O("ArrayBuffer");function wr(e){var r;return typeof ArrayBuffer<"u"&&ArrayBuffer.isView?r=ArrayBuffer.isView(e):r=e&&e.buffer&&Ke(e.buffer),r}function br(e){return typeof e=="string"}function Or(e){return typeof e=="number"}function Qe(e){return e!==null&&typeof e=="object"}function U(e){if(le(e)!=="object")return!1;var r=Object.getPrototypeOf(e);return r===null||r===Object.prototype}var Ar=O("Date"),Sr=O("File"),Cr=O("Blob"),_r=O("FileList");function de(e){return fe.call(e)==="[object Function]"}function xr(e){return Qe(e)&&de(e.pipe)}function Tr(e){var r="[object FormData]";return e&&(typeof FormData=="function"&&e instanceof FormData||fe.call(e)===r||de(e.toString)&&e.toString()===r)}var Pr=O("URLSearchParams");function gr(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}function Nr(){return typeof navigator<"u"&&(navigator.product==="ReactNative"||navigator.product==="NativeScript"||navigator.product==="NS")?!1:typeof window<"u"&&typeof document<"u"}function he(e,r){if(!(e===null||typeof e>"u"))if(typeof e!="object"&&(e=[e]),ce(e))for(var t=0,i=e.length;t<i;t++)r.call(null,e[t],t,e);else for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.call(null,e[n],n,e)}function oe(){var e={};function r(n,a){U(e[a])&&U(n)?e[a]=oe(e[a],n):U(n)?e[a]=oe({},n):ce(n)?e[a]=n.slice():e[a]=n}for(var t=0,i=arguments.length;t<i;t++)he(arguments[t],r);return e}function Dr(e,r,t){return he(r,function(n,a){t&&typeof n=="function"?e[a]=yr(n,t):e[a]=n}),e}function qr(e){return e.charCodeAt(0)===65279&&(e=e.slice(1)),e}function Ur(e,r,t,i){e.prototype=Object.create(r.prototype,i),e.prototype.constructor=e,t&&Object.assign(e.prototype,t)}function Br(e,r,t){var i,n,a,o={};r=r||{};do{for(i=Object.getOwnPropertyNames(e),n=i.length;n-- >0;)a=i[n],o[a]||(r[a]=e[a],o[a]=!0);e=Object.getPrototypeOf(e)}while(e&&(!t||t(e,r))&&e!==Object.prototype);return r}function jr(e,r,t){e=String(e),(t===void 0||t>e.length)&&(t=e.length),t-=r.length;var i=e.indexOf(r,t);return i!==-1&&i===t}function Lr(e){if(!e)return null;var r=e.length;if(j(r))return null;for(var t=new Array(r);r-- >0;)t[r]=e[r];return t}var Fr=function(e){return function(r){return e&&r instanceof e}}(typeof Uint8Array<"u"&&Object.getPrototypeOf(Uint8Array)),v={isArray:ce,isArrayBuffer:Ke,isBuffer:Rr,isFormData:Tr,isArrayBufferView:wr,isString:br,isNumber:Or,isObject:Qe,isPlainObject:U,isUndefined:j,isDate:Ar,isFile:Sr,isBlob:Cr,isFunction:de,isStream:xr,isURLSearchParams:Pr,isStandardBrowserEnv:Nr,forEach:he,merge:oe,extend:Dr,trim:gr,stripBOM:qr,inherits:Ur,toFlatObject:Br,kindOf:le,kindOfTest:O,endsWith:jr,toArray:Lr,isTypedArray:Fr,isFileList:_r},_=v;function Oe(e){return encodeURIComponent(e).replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}var Ge=function(r,t,i){if(!t)return r;var n;if(i)n=i(t);else if(_.isURLSearchParams(t))n=t.toString();else{var a=[];_.forEach(t,function(f,h){f===null||typeof f>"u"||(_.isArray(f)?h=h+"[]":f=[f],_.forEach(f,function(d){_.isDate(d)?d=d.toISOString():_.isObject(d)&&(d=JSON.stringify(d)),a.push(Oe(h)+"="+Oe(d))}))}),n=a.join("&")}if(n){var o=r.indexOf("#");o!==-1&&(r=r.slice(0,o)),r+=(r.indexOf("?")===-1?"?":"&")+n}return r},$r=v;function L(){this.handlers=[]}L.prototype.use=function(r,t,i){return this.handlers.push({fulfilled:r,rejected:t,synchronous:i?i.synchronous:!1,runWhen:i?i.runWhen:null}),this.handlers.length-1};L.prototype.eject=function(r){this.handlers[r]&&(this.handlers[r]=null)};L.prototype.forEach=function(r){$r.forEach(this.handlers,function(i){i!==null&&r(i)})};var Ir=L,kr=v,Mr=function(r,t){kr.forEach(r,function(n,a){a!==t&&a.toUpperCase()===t.toUpperCase()&&(r[t]=n,delete r[a])})},J,Ae;function P(){if(Ae)return J;Ae=1;var e=v;function r(n,a,o,s,f){Error.call(this),this.message=n,this.name="AxiosError",a&&(this.code=a),o&&(this.config=o),s&&(this.request=s),f&&(this.response=f)}e.inherits(r,Error,{toJSON:function(){return{message:this.message,name:this.name,description:this.description,number:this.number,fileName:this.fileName,lineNumber:this.lineNumber,columnNumber:this.columnNumber,stack:this.stack,config:this.config,code:this.code,status:this.response&&this.response.status?this.response.status:null}}});var t=r.prototype,i={};return["ERR_BAD_OPTION_VALUE","ERR_BAD_OPTION","ECONNABORTED","ETIMEDOUT","ERR_NETWORK","ERR_FR_TOO_MANY_REDIRECTS","ERR_DEPRECATED","ERR_BAD_RESPONSE","ERR_BAD_REQUEST","ERR_CANCELED"].forEach(function(n){i[n]={value:n}}),Object.defineProperties(r,i),Object.defineProperty(t,"isAxiosError",{value:!0}),r.from=function(n,a,o,s,f,h){var l=Object.create(t);return e.toFlatObject(n,l,function(u){return u!==Error.prototype}),r.call(l,n.message,a,o,s,f),l.name=n.name,h&&Object.assign(l,h),l},J=r,J}var Ye={silentJSONParsing:!0,forcedJSONParsing:!0,clarifyTimeoutError:!1},z,Se;function Ze(){if(Se)return z;Se=1;var e=v;function r(t,i){i=i||new FormData;var n=[];function a(s){return s===null?"":e.isDate(s)?s.toISOString():e.isArrayBuffer(s)||e.isTypedArray(s)?typeof Blob=="function"?new Blob([s]):Buffer.from(s):s}function o(s,f){if(e.isPlainObject(s)||e.isArray(s)){if(n.indexOf(s)!==-1)throw Error("Circular reference detected in "+f);n.push(s),e.forEach(s,function(l,d){if(!e.isUndefined(l)){var u=f?f+"."+d:d,m;if(l&&!f&&typeof l=="object"){if(e.endsWith(d,"{}"))l=JSON.stringify(l);else if(e.endsWith(d,"[]")&&(m=e.toArray(l))){m.forEach(function(q){!e.isUndefined(q)&&i.append(u,a(q))});return}}o(l,u)}}),n.pop()}else i.append(f,a(s))}return o(t),i}return z=r,z}var V,Ce;function Hr(){if(Ce)return V;Ce=1;var e=P();return V=function(t,i,n){var a=n.config.validateStatus;!n.status||!a||a(n.status)?t(n):i(new e("Request failed with status code "+n.status,[e.ERR_BAD_REQUEST,e.ERR_BAD_RESPONSE][Math.floor(n.status/100)-4],n.config,n.request,n))},V}var W,_e;function Jr(){if(_e)return W;_e=1;var e=v;return W=e.isStandardBrowserEnv()?function(){return{write:function(i,n,a,o,s,f){var h=[];h.push(i+"="+encodeURIComponent(n)),e.isNumber(a)&&h.push("expires="+new Date(a).toGMTString()),e.isString(o)&&h.push("path="+o),e.isString(s)&&h.push("domain="+s),f===!0&&h.push("secure"),document.cookie=h.join("; ")},read:function(i){var n=document.cookie.match(new RegExp("(^|;\\s*)("+i+")=([^;]*)"));return n?decodeURIComponent(n[3]):null},remove:function(i){this.write(i,"",Date.now()-864e5)}}}():function(){return{write:function(){},read:function(){return null},remove:function(){}}}(),W}var zr=function(r){return/^([a-z][a-z\d+\-.]*:)?\/\//i.test(r)},Vr=function(r,t){return t?r.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):r},Wr=zr,Xr=Vr,er=function(r,t){return r&&!Wr(t)?Xr(r,t):t},X,xe;function Kr(){if(xe)return X;xe=1;var e=v,r=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];return X=function(i){var n={},a,o,s;return i&&e.forEach(i.split(`
`),function(h){if(s=h.indexOf(":"),a=e.trim(h.substr(0,s)).toLowerCase(),o=e.trim(h.substr(s+1)),a){if(n[a]&&r.indexOf(a)>=0)return;a==="set-cookie"?n[a]=(n[a]?n[a]:[]).concat([o]):n[a]=n[a]?n[a]+", "+o:o}}),n},X}var K,Te;function Qr(){if(Te)return K;Te=1;var e=v;return K=e.isStandardBrowserEnv()?function(){var t=/(msie|trident)/i.test(navigator.userAgent),i=document.createElement("a"),n;function a(o){var s=o;return t&&(i.setAttribute("href",s),s=i.href),i.setAttribute("href",s),{href:i.href,protocol:i.protocol?i.protocol.replace(/:$/,""):"",host:i.host,search:i.search?i.search.replace(/^\?/,""):"",hash:i.hash?i.hash.replace(/^#/,""):"",hostname:i.hostname,port:i.port,pathname:i.pathname.charAt(0)==="/"?i.pathname:"/"+i.pathname}}return n=a(window.location.href),function(s){var f=e.isString(s)?a(s):s;return f.protocol===n.protocol&&f.host===n.host}}():function(){return function(){return!0}}(),K}var Q,Pe;function F(){if(Pe)return Q;Pe=1;var e=P(),r=v;function t(i){e.call(this,i==null?"canceled":i,e.ERR_CANCELED),this.name="CanceledError"}return r.inherits(t,e,{__CANCEL__:!0}),Q=t,Q}var G,ge;function Gr(){return ge||(ge=1,G=function(r){var t=/^([-+\w]{1,25})(:?\/\/|:)/.exec(r);return t&&t[1]||""}),G}var Y,Ne;function De(){if(Ne)return Y;Ne=1;var e=v,r=Hr(),t=Jr(),i=Ge,n=er,a=Kr(),o=Qr(),s=Ye,f=P(),h=F(),l=Gr();return Y=function(u){return new Promise(function(q,A){var g=u.data,N=u.headers,D=u.responseType,S;function me(){u.cancelToken&&u.cancelToken.unsubscribe(S),u.signal&&u.signal.removeEventListener("abort",S)}e.isFormData(g)&&e.isStandardBrowserEnv()&&delete N["Content-Type"];var c=new XMLHttpRequest;if(u.auth){var ur=u.auth.username||"",fr=u.auth.password?unescape(encodeURIComponent(u.auth.password)):"";N.Authorization="Basic "+btoa(ur+":"+fr)}var k=n(u.baseURL,u.url);c.open(u.method.toUpperCase(),i(k,u.params,u.paramsSerializer),!0),c.timeout=u.timeout;function Ee(){if(!!c){var R="getAllResponseHeaders"in c?a(c.getAllResponseHeaders()):null,C=!D||D==="text"||D==="json"?c.responseText:c.response,b={data:C,status:c.status,statusText:c.statusText,headers:R,config:u,request:c};r(function(H){q(H),me()},function(H){A(H),me()},b),c=null}}if("onloadend"in c?c.onloadend=Ee:c.onreadystatechange=function(){!c||c.readyState!==4||c.status===0&&!(c.responseURL&&c.responseURL.indexOf("file:")===0)||setTimeout(Ee)},c.onabort=function(){!c||(A(new f("Request aborted",f.ECONNABORTED,u,c)),c=null)},c.onerror=function(){A(new f("Network Error",f.ERR_NETWORK,u,c,c)),c=null},c.ontimeout=function(){var C=u.timeout?"timeout of "+u.timeout+"ms exceeded":"timeout exceeded",b=u.transitional||s;u.timeoutErrorMessage&&(C=u.timeoutErrorMessage),A(new f(C,b.clarifyTimeoutError?f.ETIMEDOUT:f.ECONNABORTED,u,c)),c=null},e.isStandardBrowserEnv()){var ye=(u.withCredentials||o(k))&&u.xsrfCookieName?t.read(u.xsrfCookieName):void 0;ye&&(N[u.xsrfHeaderName]=ye)}"setRequestHeader"in c&&e.forEach(N,function(C,b){typeof g>"u"&&b.toLowerCase()==="content-type"?delete N[b]:c.setRequestHeader(b,C)}),e.isUndefined(u.withCredentials)||(c.withCredentials=!!u.withCredentials),D&&D!=="json"&&(c.responseType=u.responseType),typeof u.onDownloadProgress=="function"&&c.addEventListener("progress",u.onDownloadProgress),typeof u.onUploadProgress=="function"&&c.upload&&c.upload.addEventListener("progress",u.onUploadProgress),(u.cancelToken||u.signal)&&(S=function(R){!c||(A(!R||R&&R.type?new h:R),c.abort(),c=null)},u.cancelToken&&u.cancelToken.subscribe(S),u.signal&&(u.signal.aborted?S():u.signal.addEventListener("abort",S))),g||(g=null);var M=l(k);if(M&&["http","https","file"].indexOf(M)===-1){A(new f("Unsupported protocol "+M+":",f.ERR_BAD_REQUEST,u));return}c.send(g)})},Y}var Z,qe;function Yr(){return qe||(qe=1,Z=null),Z}var p=v,Ue=Mr,Be=P(),Zr=Ye,et=Ze(),rt={"Content-Type":"application/x-www-form-urlencoded"};function je(e,r){!p.isUndefined(e)&&p.isUndefined(e["Content-Type"])&&(e["Content-Type"]=r)}function tt(){var e;return(typeof XMLHttpRequest<"u"||typeof process<"u"&&Object.prototype.toString.call(process)==="[object process]")&&(e=De()),e}function nt(e,r,t){if(p.isString(e))try{return(r||JSON.parse)(e),p.trim(e)}catch(i){if(i.name!=="SyntaxError")throw i}return(t||JSON.stringify)(e)}var $={transitional:Zr,adapter:tt(),transformRequest:[function(r,t){if(Ue(t,"Accept"),Ue(t,"Content-Type"),p.isFormData(r)||p.isArrayBuffer(r)||p.isBuffer(r)||p.isStream(r)||p.isFile(r)||p.isBlob(r))return r;if(p.isArrayBufferView(r))return r.buffer;if(p.isURLSearchParams(r))return je(t,"application/x-www-form-urlencoded;charset=utf-8"),r.toString();var i=p.isObject(r),n=t&&t["Content-Type"],a;if((a=p.isFileList(r))||i&&n==="multipart/form-data"){var o=this.env&&this.env.FormData;return et(a?{"files[]":r}:r,o&&new o)}else if(i||n==="application/json")return je(t,"application/json"),nt(r);return r}],transformResponse:[function(r){var t=this.transitional||$.transitional,i=t&&t.silentJSONParsing,n=t&&t.forcedJSONParsing,a=!i&&this.responseType==="json";if(a||n&&p.isString(r)&&r.length)try{return JSON.parse(r)}catch(o){if(a)throw o.name==="SyntaxError"?Be.from(o,Be.ERR_BAD_RESPONSE,this,null,this.response):o}return r}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,maxBodyLength:-1,env:{FormData:Yr()},validateStatus:function(r){return r>=200&&r<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};p.forEach(["delete","get","head"],function(r){$.headers[r]={}});p.forEach(["post","put","patch"],function(r){$.headers[r]=p.merge(rt)});var pe=$,it=v,at=pe,st=function(r,t,i){var n=this||at;return it.forEach(i,function(o){r=o.call(n,r,t)}),r},ee,Le;function rr(){return Le||(Le=1,ee=function(r){return!!(r&&r.__CANCEL__)}),ee}var Fe=v,re=st,ot=rr(),ut=pe,ft=F();function te(e){if(e.cancelToken&&e.cancelToken.throwIfRequested(),e.signal&&e.signal.aborted)throw new ft}var lt=function(r){te(r),r.headers=r.headers||{},r.data=re.call(r,r.data,r.headers,r.transformRequest),r.headers=Fe.merge(r.headers.common||{},r.headers[r.method]||{},r.headers),Fe.forEach(["delete","get","head","post","put","patch","common"],function(n){delete r.headers[n]});var t=r.adapter||ut.adapter;return t(r).then(function(n){return te(r),n.data=re.call(r,n.data,n.headers,r.transformResponse),n},function(n){return ot(n)||(te(r),n&&n.response&&(n.response.data=re.call(r,n.response.data,n.response.headers,r.transformResponse))),Promise.reject(n)})},y=v,tr=function(r,t){t=t||{};var i={};function n(l,d){return y.isPlainObject(l)&&y.isPlainObject(d)?y.merge(l,d):y.isPlainObject(d)?y.merge({},d):y.isArray(d)?d.slice():d}function a(l){if(y.isUndefined(t[l])){if(!y.isUndefined(r[l]))return n(void 0,r[l])}else return n(r[l],t[l])}function o(l){if(!y.isUndefined(t[l]))return n(void 0,t[l])}function s(l){if(y.isUndefined(t[l])){if(!y.isUndefined(r[l]))return n(void 0,r[l])}else return n(void 0,t[l])}function f(l){if(l in t)return n(r[l],t[l]);if(l in r)return n(void 0,r[l])}var h={url:o,method:o,data:o,baseURL:s,transformRequest:s,transformResponse:s,paramsSerializer:s,timeout:s,timeoutMessage:s,withCredentials:s,adapter:s,responseType:s,xsrfCookieName:s,xsrfHeaderName:s,onUploadProgress:s,onDownloadProgress:s,decompress:s,maxContentLength:s,maxBodyLength:s,beforeRedirect:s,transport:s,httpAgent:s,httpsAgent:s,cancelToken:s,socketPath:s,responseEncoding:s,validateStatus:f};return y.forEach(Object.keys(r).concat(Object.keys(t)),function(d){var u=h[d]||a,m=u(d);y.isUndefined(m)&&u!==f||(i[d]=m)}),i},ne,$e;function nr(){return $e||($e=1,ne={version:"0.27.2"}),ne}var ct=nr().version,w=P(),ve={};["object","boolean","number","function","string","symbol"].forEach(function(e,r){ve[e]=function(i){return typeof i===e||"a"+(r<1?"n ":" ")+e}});var Ie={};ve.transitional=function(r,t,i){function n(a,o){return"[Axios v"+ct+"] Transitional option '"+a+"'"+o+(i?". "+i:"")}return function(a,o,s){if(r===!1)throw new w(n(o," has been removed"+(t?" in "+t:"")),w.ERR_DEPRECATED);return t&&!Ie[o]&&(Ie[o]=!0,console.warn(n(o," has been deprecated since v"+t+" and will be removed in the near future"))),r?r(a,o,s):!0}};function dt(e,r,t){if(typeof e!="object")throw new w("options must be an object",w.ERR_BAD_OPTION_VALUE);for(var i=Object.keys(e),n=i.length;n-- >0;){var a=i[n],o=r[a];if(o){var s=e[a],f=s===void 0||o(s,a,e);if(f!==!0)throw new w("option "+a+" must be "+f,w.ERR_BAD_OPTION_VALUE);continue}if(t!==!0)throw new w("Unknown option "+a,w.ERR_BAD_OPTION)}}var ht={assertOptions:dt,validators:ve},ir=v,pt=Ge,ke=Ir,Me=lt,I=tr,vt=er,ar=ht,x=ar.validators;function T(e){this.defaults=e,this.interceptors={request:new ke,response:new ke}}T.prototype.request=function(r,t){typeof r=="string"?(t=t||{},t.url=r):t=r||{},t=I(this.defaults,t),t.method?t.method=t.method.toLowerCase():this.defaults.method?t.method=this.defaults.method.toLowerCase():t.method="get";var i=t.transitional;i!==void 0&&ar.assertOptions(i,{silentJSONParsing:x.transitional(x.boolean),forcedJSONParsing:x.transitional(x.boolean),clarifyTimeoutError:x.transitional(x.boolean)},!1);var n=[],a=!0;this.interceptors.request.forEach(function(m){typeof m.runWhen=="function"&&m.runWhen(t)===!1||(a=a&&m.synchronous,n.unshift(m.fulfilled,m.rejected))});var o=[];this.interceptors.response.forEach(function(m){o.push(m.fulfilled,m.rejected)});var s;if(!a){var f=[Me,void 0];for(Array.prototype.unshift.apply(f,n),f=f.concat(o),s=Promise.resolve(t);f.length;)s=s.then(f.shift(),f.shift());return s}for(var h=t;n.length;){var l=n.shift(),d=n.shift();try{h=l(h)}catch(u){d(u);break}}try{s=Me(h)}catch(u){return Promise.reject(u)}for(;o.length;)s=s.then(o.shift(),o.shift());return s};T.prototype.getUri=function(r){r=I(this.defaults,r);var t=vt(r.baseURL,r.url);return pt(t,r.params,r.paramsSerializer)};ir.forEach(["delete","get","head","options"],function(r){T.prototype[r]=function(t,i){return this.request(I(i||{},{method:r,url:t,data:(i||{}).data}))}});ir.forEach(["post","put","patch"],function(r){function t(i){return function(a,o,s){return this.request(I(s||{},{method:r,headers:i?{"Content-Type":"multipart/form-data"}:{},url:a,data:o}))}}T.prototype[r]=t(),T.prototype[r+"Form"]=t(!0)});var mt=T,ie,He;function Et(){if(He)return ie;He=1;var e=F();function r(t){if(typeof t!="function")throw new TypeError("executor must be a function.");var i;this.promise=new Promise(function(o){i=o});var n=this;this.promise.then(function(a){if(!!n._listeners){var o,s=n._listeners.length;for(o=0;o<s;o++)n._listeners[o](a);n._listeners=null}}),this.promise.then=function(a){var o,s=new Promise(function(f){n.subscribe(f),o=f}).then(a);return s.cancel=function(){n.unsubscribe(o)},s},t(function(o){n.reason||(n.reason=new e(o),i(n.reason))})}return r.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},r.prototype.subscribe=function(i){if(this.reason){i(this.reason);return}this._listeners?this._listeners.push(i):this._listeners=[i]},r.prototype.unsubscribe=function(i){if(!!this._listeners){var n=this._listeners.indexOf(i);n!==-1&&this._listeners.splice(n,1)}},r.source=function(){var i,n=new r(function(o){i=o});return{token:n,cancel:i}},ie=r,ie}var ae,Je;function yt(){return Je||(Je=1,ae=function(r){return function(i){return r.apply(null,i)}}),ae}var se,ze;function Rt(){if(ze)return se;ze=1;var e=v;return se=function(t){return e.isObject(t)&&t.isAxiosError===!0},se}var Ve=v,wt=Xe,B=mt,bt=tr,Ot=pe;function sr(e){var r=new B(e),t=wt(B.prototype.request,r);return Ve.extend(t,B.prototype,r),Ve.extend(t,r),t.create=function(n){return sr(bt(e,n))},t}var E=sr(Ot);E.Axios=B;E.CanceledError=F();E.CancelToken=Et();E.isCancel=rr();E.VERSION=nr().version;E.toFormData=Ze();E.AxiosError=P();E.Cancel=E.CanceledError;E.all=function(r){return Promise.all(r)};E.spread=yt();E.isAxiosError=Rt();ue.exports=E;ue.exports.default=E;(function(e){e.exports=ue.exports})(We);const or=Er(We.exports);or.defaults.baseURL=mr;async function _t(e){try{return(await or({url:e,method:"GET",responseType:"json",headers:{"Content-Type":"text/json;charset=utf-8"}})).data}catch(r){console.error(r)}}export{Ct as P,St as _,_t as r};
