import{L as R}from"./LoadingComponent-d4366f2b.js";import{_ as $,u as D,r as l,o as F,b as y,c as k,d as s,e as i,f as t,F as m,j as g,i as d,h as o,k as w,l as j,m as E,t as u,g as h,n as x,p as M,q as O,s as U}from"./index-2eb3fb2f.js";const V=_=>(O("data-v-4e7ced30"),_=_(),U(),_),q={class:"domestic-container"},z=E('<nav aria-label="breadcrumb" data-v-4e7ced30><ol class="breadcrumb" data-v-4e7ced30><li class="breadcrumb-item" data-v-4e7ced30><i class="fa-solid fa-house" data-v-4e7ced30></i> <a href="/" class="home-breadcrumb" data-v-4e7ced30>Trang chủ</a></li><li class="breadcrumb-item" data-v-4e7ced30>Du lịch trong nước</li></ol></nav>',1),A={class:"section-container"},G={class:"side-bar-container"},H={key:0,class:"category-list"},J=V(()=>t("div",{style:{display:"flex","align-items":"center",height:"3rem","padding-left":"1rem","font-size":"20px","font-weight":"bold"}},[h(" Địa điểm   "),t("span",{style:{color:"#ff6b00"}},"HOT"),h("   trong nước")],-1)),K=["onClick"],Q=["onClick"],W={key:1,class:"hot-tour"},X=V(()=>t("h2",{style:{"padding-left":"1rem"}},[h("Tour hot   "),t("i",{style:{color:"orangered"},class:"fa-solid fa-fire fa-bounce"})],-1)),Y=["onClick"],Z=["src"],ee={class:"card-body"},te={class:"card-title"},se={style:{"font-weight":"bold",color:"#ff6b00"}},ae={class:"tour-container"},oe=["onClick"],ie={class:"d-flex align-center justify-center fill-height"},le=["onClick"],ce={__name:"PostList",setup(_){const n=D();let f=l(),r=l(1),v=l(),N=l("createdAt");l("Mới nhất");let T=l("DESC"),b=l();const p=l();F(()=>{C(),y.get("/client/category/hot-sidebar").then(a=>{b.value=a.data.rows}).catch(a=>{console.error(a)}),y.get("/client/category/side-bar-list/1").then(a=>{p.value=a.data})});function P(){C(),window.scrollTo(0,0)}function C(){v.value=null,y.get("/client/post/1/"+N.value+"/"+T.value+"/"+r.value).then(a=>{v.value=a.data.rows,f.value=a.data.count/10+1}).catch(a=>{console.error(a)})}return(a,L)=>{const S=k("v-progress-circular"),B=k("v-img"),I=k("v-pagination");return s(),i("div",q,[z,t("div",A,[t("div",G,[p.value?(s(),i("div",H,[J,p.value.Regions?(s(!0),i(m,{key:0},g(p.value.Regions,e=>(s(),i("div",{key:e},[t("div",{class:"region-list",onClick:c=>o(n).push({path:"/khu-vuc/"+e.slug})},u(e.name),9,K),e.Locations?(s(!0),i(m,{key:0},g(e.Locations,c=>(s(),i("div",null,[t("div",{class:"location-list",onClick:ne=>o(n).push({path:"/dia-diem/"+c.slug})},u(c.name),9,Q)]))),256)):d("",!0)]))),128)):d("",!0)])):d("",!0),o(b)?(s(),i("div",W,[X,(s(!0),i(m,null,g(o(b),e=>(s(),i("div",{onClick:c=>o(n).push({path:"/"+e.slug}),class:"card",style:{border:"none"}},[t("img",{src:e.thumbnail,class:"card-img-top",style:{height:"20rem"},alt:"..."},null,8,Z),t("div",ee,[t("h5",te,u(e.title),1),t("p",null,[h("Giá: "),t("span",se,u(a.numeralFormat(e.adult_price)),1),h(" VNĐ ")])])],8,Y))),256))])):d("",!0)]),t("div",null,[t("div",ae,[o(v)?(s(!0),i(m,{key:0},g(o(v),e=>(s(),i("div",{key:e,class:"tour-individual"},[t("div",{class:"image-container",onClick:c=>o(n).push({path:"/bai-viet/"+e.slug})},[x(B,{style:{height:"10rem",width:"100%"},cover:"",class:"thumbnail",src:e.thumbnail},{placeholder:M(()=>[t("div",ie,[x(S,{color:"grey-lighten-4",indeterminate:""})])]),_:2},1032,["src"])],8,oe),t("div",{class:"title",onClick:c=>o(n).push({path:"/bai-viet"+e.slug})},u(e.title),9,le)]))),128)):(s(),w(R,{key:1}))]),o(f)?(s(),w(I,{key:0,onClick:P,modelValue:o(r),"onUpdate:modelValue":L[0]||(L[0]=e=>j(r)?r.value=e:r=e),length:o(f),"total-visible":5,"prev-icon":"fa-solid fa-chevron-left","next-icon":"fa-solid fa-chevron-right"},null,8,["modelValue","length"])):d("",!0)])])])}}},ue=$(ce,[["__scopeId","data-v-4e7ced30"]]);export{ue as default};
