"use strict";(self["webpackChunkionic_app_base"]=self["webpackChunkionic_app_base"]||[]).push([[990],{8990:function(e,t,n){n.r(t),n.d(t,{createSwipeBackGesture:function(){return o}});var i=n(6587),r=n(545),a=n(6515);
/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
const o=(e,t,n,o,c)=>{const s=e.ownerDocument.defaultView,u=(0,r.i)(e),h=e=>{const t=50,{startX:n}=e;return u?n>=s.innerWidth-t:n<=t},l=e=>u?-e.deltaX:e.deltaX,d=e=>u?-e.velocityX:e.velocityX,p=e=>h(e)&&t(),b=e=>{const t=l(e),n=t/s.innerWidth;o(n)},f=e=>{const t=l(e),n=s.innerWidth,r=t/n,a=d(e),o=n/2,u=a>=0&&(a>.2||t>o),h=u?1-r:r,p=h*n;let b=0;if(p>5){const e=p/Math.abs(a);b=Math.min(e,540)}c(u,r<=0?.01:(0,i.e)(0,r,.9999),b)};return(0,a.A)({el:e,gestureName:"goback-swipe",gesturePriority:40,threshold:10,canStart:p,onStart:n,onMove:b,onEnd:f})}}}]);
//# sourceMappingURL=990.1e7a2b2a.js.map