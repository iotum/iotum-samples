"use strict";(self.webpackChunkiotum_samples=self.webpackChunkiotum_samples||[]).push([[906],{1374:function(e,t,n){n.d(t,{Z:function(){return c}});n(2791);var s=n(7689),o="MenuButton_menuButton__e9oFw",i="MenuButton_left__d8Tih",u="MenuButton_right__fbjxn",r=n(184);var c=function(e){var t=e.position,n=void 0===t?"left":t,c=(0,s.s0)(),a="right"===n?u:i;return(0,r.jsx)("div",{children:(0,r.jsx)("button",{className:"".concat(o," ").concat(a),onClick:function(){console.log("Menu Button Clicked, Go To the Menu Page."),c("/iotum-samples/menu")},children:"Menu Page"})})}},7906:function(e,t,n){n.r(t),n.d(t,{default:function(){return h}});var s=n(9439),o=n(2791),i="submitForm_appContainer__fBuO4",u="submitForm_startButton__UFeO6",r="submitForm_accessCodeLabel__grkCR",c="submitForm_accessCodeInput__TIWMW",a="submitForm_startMeetingButton__uwJ8I",l="submitForm_widgetContainer__Kk1Fh",d=n(5177),m=n(1374),_=n(9074),f=n(9434),g=n(184),h=function(){var e=(0,o.useState)(""),t=(0,s.Z)(e,2),n=t[0],h=t[1],p=(0,o.useRef)(null),b=(0,o.useRef)(null),v=(0,f.v9)((function(e){return e.credentials})),k=(0,o.useCallback)((function(){console.log("render meeting widget"),n?(b.current&&b.current.unload(),b.current=new _.Meeting({domain:v.domain,sso:{token:v.token,hostId:v.hostId},container:p.current},n,{skipJoin:!0})):console.log("Access code not set, widget will not be rendered.")}),[v,n]);return(0,g.jsxs)("div",{className:i,children:[(0,g.jsxs)("div",{className:u,children:[(0,g.jsx)("div",{className:r,children:"Access Code:"}),(0,g.jsx)("input",{type:"text",className:c,value:n,onChange:function(e){h(e.target.value)}}),(0,g.jsx)("button",{className:a,onClick:k,children:"Start Meeting"})]}),(0,g.jsx)(d.Z,{position:"right"}),(0,g.jsx)(m.Z,{position:"right"}),(0,g.jsx)("div",{ref:p,className:l})]})}}}]);
//# sourceMappingURL=906.e43221f2.chunk.js.map