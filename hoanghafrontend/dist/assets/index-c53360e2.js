import{H as A,I as O,h as C,r as l,A as w,w as E,J as V,o as x}from"./index-2eb3fb2f.js";function D(e){return A()?(O(e),!0):!1}function b(e){return typeof e=="function"?e():C(e)}const W=typeof window<"u"&&typeof document<"u",_=e=>e!=null,a=()=>{};function c(e){var t;const n=b(e);return(t=n==null?void 0:n.$el)!=null?t:n}const y=W?window:void 0;function B(){const e=l(!1);return V()&&x(()=>{e.value=!0}),e}function H(e){const t=B();return w(()=>(t.value,!!e()))}function J(e,t,n={}){const{root:u,rootMargin:i="0px",threshold:I=.1,window:f=y,immediate:p=!0}=n,d=H(()=>f&&"IntersectionObserver"in f),g=w(()=>{const r=b(e);return(Array.isArray(r)?r:[r]).map(c).filter(_)});let s=a;const o=l(p),M=d.value?E(()=>[g.value,c(u),o.value],([r,S])=>{if(s(),!o.value||!r.length)return;const h=new IntersectionObserver(t,{root:c(S),rootMargin:i,threshold:I});r.forEach(m=>m&&h.observe(m)),s=()=>{h.disconnect(),s=a}},{immediate:p,flush:"post"}):a,v=()=>{s(),M(),o.value=!1};return D(v),{isSupported:d,isActive:o,pause(){s(),o.value=!1},resume(){o.value=!0},stop:v}}function $(e,{window:t=y,scrollTarget:n}={}){const u=l(!1);return J(e,([{isIntersecting:i}])=>{u.value=i},{root:n,window:t,threshold:0}),u}export{$ as u};