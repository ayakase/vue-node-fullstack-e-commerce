import{_ as B,r as f,u as C,v as I,x as S,c as l,d as q,e as R,n as a,p as e,f as s,h as t,R as n,g as o,y as L,b as N,z as v,q as O,s as D}from"./index-2eb3fb2f.js";const i=d=>(O("data-v-9cd951e5"),d=d(),D(),d),H={class:"admin-container"},Q=i(()=>s("i",{class:"fa-solid fa-house"},null,-1)),z=i(()=>s("i",{class:"fa-solid fa-user"},null,-1)),U=i(()=>s("i",{class:"fa-solid fa-chart-line"},null,-1)),E=i(()=>s("i",{class:"fa-solid fa-box-archive"},null,-1)),G=i(()=>s("i",{class:"fa-solid fa-headset"},null,-1)),M=i(()=>s("i",{class:"fa-regular fa-paper-plane"},null,-1)),P=i(()=>s("i",{class:"fa-solid fa-map"},null,-1)),$=i(()=>s("i",{class:"fa-solid fa-location-dot"},null,-1)),j=i(()=>s("i",{class:"fa-solid fa-fire"},null,-1)),A=i(()=>s("i",{class:"fa-regular fa-image"},null,-1)),F=i(()=>s("i",{class:"fa-solid fa-photo-film"},null,-1)),J=i(()=>s("i",{class:"fa-regular fa-newspaper"},null,-1)),K={class:"log-out"},W=i(()=>s("i",{class:"fa-solid fa-arrow-right-from-bracket"},null,-1)),X={class:"admin-content"},Y={__name:"DashboardView",setup(d){const _=f(!0),h=f(!0),p=C(),g=I();let{cookies:k}=S();function y(){N.get("/admin/login/logout").then(u=>{k.remove("token"),v.info(u.data.message,{autoClose:6e3,theme:"colored",position:v.POSITION.BOTTOM_RIGHT}),g.toggleButton(u.data.state),p.push("/")})}return(u,c)=>{const r=l("v-divider"),b=l("v-list"),w=l("v-navigation-drawer"),T=l("v-main"),V=l("v-layout"),x=l("v-card");return q(),R("div",H,[a(x,{style:{"z-index":"999"}},{default:e(()=>[a(V,null,{default:e(()=>[a(w,{style:{"background-color":"#97CBB4"},modelValue:_.value,"onUpdate:modelValue":c[0]||(c[0]=m=>_.value=m),permanent:"",onClick:c[1]||(c[1]=m=>h.value=!1)},{default:e(()=>[a(b,{density:"compact",class:"side-nav-items",nav:""},{default:e(()=>[a(t(n),{class:"admin-side-item",to:"/","aria-current":"page"},{default:e(()=>[o(" Home page"),Q]),_:1}),a(t(n),{class:"admin-side-item",to:"/admin/tai-khoan-admin"},{default:e(()=>[o("Tài khoản"),z]),_:1}),a(t(n),{class:"admin-side-item",to:"/admin/thong-ke"},{default:e(()=>[o("Thống kê"),U]),_:1}),a(r),a(t(n),{class:"admin-side-item",to:"/admin/dat-tour"},{default:e(()=>[o("Đặt Tour"),E]),_:1}),a(t(n),{class:"admin-side-item",to:"/admin/dang-ky-tu-van"},{default:e(()=>[o("Đăng ký tư vấn"),G]),_:1}),a(t(n),{class:"admin-side-item",to:"/admin/quan-ly-tour"},{default:e(()=>[o("Quản Lí Tour "),M]),_:1}),a(t(n),{class:"admin-side-item",to:"/admin/quan-ly-khu-vuc"},{default:e(()=>[o("Qlý khu vực"),P]),_:1}),a(t(n),{class:"admin-side-item",to:"/admin/quan-ly-dia-diem"},{default:e(()=>[o("Qlý địa điểm"),$]),_:1}),a(t(n),{class:"admin-side-item",to:"/admin/quan-ly-hot-tour"},{default:e(()=>[o("Tour Hot "),j]),_:1}),a(t(n),{class:"admin-side-item",to:"/admin/thu-vien"},{default:e(()=>[o("Thư viện ảnh"),A]),_:1}),a(t(n),{class:"admin-side-item",to:"/admin/quan-ly-slider"},{default:e(()=>[o("Ảnh Slider"),F]),_:1}),a(t(n),{class:"admin-side-item",to:"/admin/bai-viet"},{default:e(()=>[o("Bài viết"),J]),_:1}),s("div",K,[a(r),s("button",{onClick:y,class:"log-out-btn","aria-current":"page"},[o("Logout "),W])])]),_:1})]),_:1},8,["modelValue"]),a(T)]),_:1})]),_:1}),s("div",X,[a(t(L))])])}}},aa=B(Y,[["__scopeId","data-v-9cd951e5"]]);export{aa as default};