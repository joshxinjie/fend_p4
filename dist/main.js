var Client=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=2)}([function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return r}));e.env.PORT;function r(e){e.preventDefault();let t=document.getElementById("input").value;console.log("formText: ",t);let n=document.getElementById("selected-format").value;if(console.log("News Format: ",n),0==n)alert("Please select the news format!");else if(1==n)!function(e){if(/^((http|https):\/\/)/.test(e)){let t=window.location.origin+"/inferNewsSentimentURL";o(t,{inputText:e}).then((e=>Client.updateUI(e)))}else alert("Please enter a valid url that starts with http or https!")}(t);else{if(2!=n)throw{name:"NotImplementedError",message:"News format is not implemented"};!function(e){let t=window.location.origin+"/inferNewsSentimentText";o(t,{inputText:e}).then((e=>Client.updateUI(e)))}(t)}}const o=async(e="",t={})=>{const n=await fetch(e,{method:"POST",credentials:"same-origin",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});try{const e=await n.json();return console.log("New Data",e),e}catch(e){console.log("error",e)}}}).call(this,n(1))},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function s(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:s}catch(e){r=s}}();var u,c=[],l=!1,f=-1;function d(){l&&u&&(l=!1,u.length?c=u.concat(c):f=-1,c.length&&m())}function m(){if(!l){var e=a(d);l=!0;for(var t=c.length;t;){for(u=c,c=[];++f<t;)u&&u[f].run();f=-1,t=c.length}u=null,l=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===s||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function h(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new p(e,t)),1!==c.length||l||a(m)},p.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=h,o.addListener=h,o.once=h,o.off=h,o.removeListener=h,o.removeAllListeners=h,o.emit=h,o.prependListener=h,o.prependOnceListener=h,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";n.r(t),n.d(t,"handleSubmit",(function(){return r.a})),n.d(t,"updateUI",(function(){return i}));var r=n(0);const o={"P+":"strongly positive",P:"positive",NEU:"neutral",N:"negative","N+":"strongly negative",NONE:"none"};function i(e){try{document.getElementById("results-header").innerHTML="<p>Analysis Results</p>",document.getElementById("sentiment").innerHTML=`<i class="fa fa-search"></i> The sentiment of the news is <span>${o[e.score_tag]}</span>`,document.getElementById("agreement").innerHTML=`<i class="fa fa-search"></i> The sentiments of the news' elements are in <span>${e.agreement.toLowerCase()}</span>`,document.getElementById("subjectivity").innerHTML=`<i class="fa fa-search"></i> The news is <span>${e.subjectivity.toLowerCase()}</span>`,document.getElementById("irony").innerHTML=`<i class="fa fa-search"></i> The news is <span>${e.irony.toLowerCase()}</span>`,document.getElementById("confidence").innerHTML=`<i class="fa fa-search"></i> The model is <span>${e.confidence}%</span> confident about the results`}catch(e){console.log("error",e)}}console.log("CHANGE!!")}]);