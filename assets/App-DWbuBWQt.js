import{j as t,T as S,u as C,b as O,r as j,a as y,L}from"./index-CbBnwisx.js";import{s as a,C as B}from"./ChatRoom-SyDm67xj.js";import{M as w,a as k,D as E,S as M,L as T}from"./MenuButton-BTe-qOjR.js";import{O as A}from"./OpenFullAppButton-DI6_XFty.js";const I=({rooms:u,onRoomButtonClick:h,onRoomClose:m,children:p})=>t.jsxs("div",{className:a.container,children:[t.jsx("div",{className:a.roomListContainer,children:u.map(s=>t.jsx("div",{className:a.chatRoomItem,children:t.jsx("button",{onClick:()=>h(s.path),className:s.bool?a.active:"",children:s.name})},s.path))}),t.jsxs("div",{className:a.chatRoomsContainer,children:[u.map(s=>s.bool&&t.jsxs("div",{className:`${a.chatRoom} ${a.activeRoom}`,children:[t.jsx(B,{path:s.path}),t.jsx("button",{className:a.closeButton,onClick:()=>m(s.path),children:"x"})]},s.path)),t.jsx(S,{position:"right"}),t.jsx(w,{position:"right"}),p]})]}),D=()=>{C();const u=O(),[h,m]=j.useState(""),[p,s]=j.useState(()=>JSON.parse(decodeURI(u.hash.slice(1))||"[]").map(e=>({path:e,bool:!0}))),n=y(e=>e.credentials),f=(e,x)=>{s(g=>{const l=g.map(o=>o.path===e?{...o,bool:x}:o),i=l.filter(o=>o.bool).map(o=>o.path);return window.history.pushState(null,"","#"+(i.length?JSON.stringify(i):"")),l})},N=({domain:e,token:x,hostId:g})=>{const l=new E({domain:e,sso:{token:x,hostId:g},container:"#chat"},M.Team,{layout:T.list,pathname:"/"});return l.on("widget.ERROR",i=>{console.error("Widget error:",i),m(JSON.stringify(i))}),l.once("dashboard.ROOM_LIST",i=>{var R;const o=[],v=Object.values(i.rooms).map(r=>{const c=r.accounts.map(d=>d.name);if(c.length===1){const d=`${c[0]} (you)`;return o.push(c[0]),{name:d,path:r.path,bool:!1}}return{name:c.filter(d=>!o.includes(d)).join(", "),path:r.path,bool:!1}});s(r=>v.map(c=>({...c,bool:!!r.find(b=>b.path===c.path)}))),(R=document.querySelector("#loading"))==null||R.remove()}),l};return j.useEffect(()=>{if(n&&n.token&&n.domain&&n.hostId){const e=N(n);return setTimeout(()=>e.toggle(!1)),()=>{e.unload()}}},[n]),t.jsxs("div",{children:[t.jsx("div",{id:"room-buttons",children:t.jsx(I,{rooms:p,onRoomButtonClick:e=>f(e,!0),onRoomClose:e=>f(e,!1),children:t.jsx("div",{className:k.extraMenu,children:t.jsx(A,{origin:`https://${n.domain}`})})})}),t.jsx("div",{id:"chat",children:t.jsx(L,{id:"loading",error:h})})]})};export{D as default};
