import{_ as T,r as f,y as C,C as I,D as S,a as l,c as R,d as q,k as a,B as e,e as t,z as s,R as n,j as o,E as D,b as L,G as v,s as N,x as O}from"./index-4e6a6190.js";const i=c=>(N("data-v-5219c43a"),c=c(),O(),c),Q={class:"admin-container"},z=i(()=>t("i",{class:"fa-solid fa-house"},null,-1)),E=i(()=>t("i",{class:"fa-solid fa-user"},null,-1)),G=i(()=>t("i",{class:"fa-solid fa-chart-line"},null,-1)),H=i(()=>t("i",{class:"fa-solid fa-box-archive"},null,-1)),U=i(()=>t("i",{class:"fa-solid fa-headset"},null,-1)),j=i(()=>t("i",{class:"fa-regular fa-paper-plane"},null,-1)),M=i(()=>t("i",{class:"fa-solid fa-map"},null,-1)),P=i(()=>t("i",{class:"fa-solid fa-location-dot"},null,-1)),$=i(()=>t("i",{class:"fa-solid fa-photo-film"},null,-1)),A=i(()=>t("i",{class:"fa-regular fa-newspaper"},null,-1)),F={class:"log-out"},J=i(()=>t("i",{class:"fa-solid fa-arrow-right-from-bracket"},null,-1)),K={class:"admin-content"},W={__name:"DashboardView",setup(c){const _=f(!0),p=f(!0),h=C(),g=I();let{cookies:k}=S();function y(){L.get("/admin/login/logout").then(d=>{k.remove("token"),v.info(d.data.message,{autoClose:6e3,theme:"colored",position:v.POSITION.BOTTOM_RIGHT}),g.toggleButton(d.data.state),h.push("/")}).catch(d=>{console.error(d)})}return(d,u)=>{const r=l("v-divider"),b=l("v-list"),w=l("v-navigation-drawer"),V=l("v-main"),x=l("v-layout"),B=l("v-card");return R(),q("div",Q,[a(B,{style:{"z-index":"999"}},{default:e(()=>[a(x,null,{default:e(()=>[a(w,{style:{"background-color":"#97CBB4"},modelValue:_.value,"onUpdate:modelValue":u[0]||(u[0]=m=>_.value=m),permanent:"",onClick:u[1]||(u[1]=m=>p.value=!1)},{default:e(()=>[a(b,{density:"compact",class:"side-nav-items",nav:""},{default:e(()=>[a(s(n),{class:"admin-side-item",to:"/","aria-current":"page"},{default:e(()=>[o(" Home page"),z]),_:1}),a(s(n),{class:"admin-side-item",to:"/admin/tai-khoan-admin"},{default:e(()=>[o("Tài khoản"),E]),_:1}),a(s(n),{class:"admin-side-item",to:"/admin/thong-ke"},{default:e(()=>[o("Thống kê"),G]),_:1}),a(r),a(s(n),{class:"admin-side-item",to:"/admin/dat-tour"},{default:e(()=>[o("Đặt Tour"),H]),_:1}),a(s(n),{class:"admin-side-item",to:"/admin/dang-ky-tu-van"},{default:e(()=>[o("Đăng ký tư vấn"),U]),_:1}),a(s(n),{class:"admin-side-item",to:"/admin/quan-ly-tour"},{default:e(()=>[o("Quản Lí Tour "),j]),_:1}),a(s(n),{class:"admin-side-item",to:"/admin/quan-ly-khu-vuc"},{default:e(()=>[o("Qlý khu vực"),M]),_:1}),a(s(n),{class:"admin-side-item",to:"/admin/quan-ly-dia-diem"},{default:e(()=>[o("Qlý địa điểm"),P]),_:1}),a(s(n),{class:"admin-side-item",to:"/admin/quan-ly-slider"},{default:e(()=>[o("Ảnh Slider"),$]),_:1}),a(s(n),{class:"admin-side-item",to:"/admin/bai-viet"},{default:e(()=>[o("Bài viết"),A]),_:1}),t("div",F,[a(r),t("button",{onClick:y,class:"log-out-btn","aria-current":"page"},[o("Logout "),J])])]),_:1})]),_:1},8,["modelValue"]),a(V)]),_:1})]),_:1}),t("div",K,[a(s(D))])])}}},Y=T(W,[["__scopeId","data-v-5219c43a"]]);export{Y as default};