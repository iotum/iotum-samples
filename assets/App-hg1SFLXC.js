import{j as o,T as w,u as v,r as u,a as N}from"./index-OptuiEFi.js";import{s as d,C as L}from"./ChatRoom-f-LtzO__.js";import{M as T,D as _,S as f,L as x}from"./MenuButton-G5JOkzV9.js";const y=({rooms:h,onRoomClose:a})=>o.jsxs("div",{className:d.chatRoomsContainer,children:[h.map(t=>t.bool&&o.jsxs("div",{className:`${d.chatRoom} ${d.activeRoom}`,children:[o.jsx(L,{path:t.path}),o.jsx("button",{className:d.closeButton,onClick:()=>a(t.path),children:"x"})]},t.path)),o.jsx(w,{position:"right"}),o.jsx(T,{position:"right"})]}),A="_container_1w0rt_3",k="_roomListContainer_1w0rt_8",R={container:A,roomListContainer:k},$=()=>{v();const[h,a]=u.useState([]),t=N(e=>e.credentials),j=e=>{a(n=>n.map(s=>s.path===e?{...s,bool:!0}:s))},C=e=>{console.log(e+" was closed"),a(n=>n.map(s=>s.path===e?{...s,bool:!1}:s))},p=u.useCallback(({domain:e,token:n,hostId:s})=>{console.log("renderWidget ran");const i=new _({domain:e,sso:{token:n,hostId:s},container:"#chat"},f.Team,{layout:x.list,pathname:"/"});return i.once("dashboard.ROOM_LIST",r=>{const g=[],b=Object.values(r.rooms).map(m=>{const c=m.accounts.map(l=>l.name);if(c.length===1){const l=`${c[0]} (you)`;return g.push(c[0]),{name:l,path:m.path,bool:!1}}return{name:c.filter(l=>!g.includes(l)).join(", "),path:m.path,bool:!1}});a(b)}),i.on("dashboard.NAVIGATE",r=>{r.pathname!=="/"&&(i.load(f.Team,{layout:x.list}),console.log("There was a navigate event to "+r.pathname+" in the list widget and the list widget was reloaded")),j(r.pathname)}),i.on("dashboard.READY",()=>{console.log("The list widget was rendered")}),i},[]);return u.useEffect(()=>{if(t&&t.token&&t.domain&&t.hostId){const e=p(t);return()=>{e.unload()}}},[t,p]),o.jsxs("div",{className:R.container,children:[o.jsx("div",{id:"chat",className:R.roomListContainer}),o.jsx("div",{children:o.jsx(y,{rooms:h,onRoomClose:C})})]})};export{$ as default};