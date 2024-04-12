import{_ as U,y as j,r as h,o as q,a as i,c as u,d as p,e as t,q as I,g as X,j as s,t as l,z as v,F as J,A as Q,l as W,k as o,I as Y,b as N,B as a,N as Z,s as tt,x as et,G as y}from"./index-4e6a6190.js";import{T as nt}from"./TableLoading-5344880a.js";/* empty css                                                                     */const n=g=>(tt("data-v-abce1748"),g=g(),et(),g),ot={class:"order-manage-container"},lt={class:"sorting-container"},st=n(()=>t("div",{style:{"font-size":"larger",width:"6rem"}},"Bộ lọc:",-1)),at={class:"sorting-button-container"},ct={class:"d-flex search-container"},it=n(()=>t("i",{class:"fas fa-search"},null,-1)),dt=[it],rt={class:"btn-group"},ut={type:"button",class:"btn btn-success dropdown-toggle","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false",style:{color:"white"}},_t=n(()=>t("i",{class:"fa-solid fa-check-to-slot"},": ",-1)),ht=n(()=>t("i",{class:"fa-solid fa-xmark"},null,-1)),pt=n(()=>t("i",{class:"fa-solid fa-check"},null,-1)),vt=n(()=>t("i",{class:"fa-solid fa-arrow-up-wide-short"},null,-1)),ft=n(()=>t("i",{class:"fa-solid fa-arrow-down-wide-short"},null,-1)),mt=n(()=>t("i",{class:"fa-solid fa-rotate-right"},null,-1)),gt=[mt],bt={key:0,class:"table table-success table-striped",style:{width:"80vw","box-shadow":"rgba(0, 0, 0, 0.24) 0px 3px 8px"}},kt=n(()=>t("thead",null,[t("tr",null,[t("th",{style:{"vertical-align":"top"},scope:"col"},"Tên khách hàng"),t("th",{style:{"vertical-align":"top"},scope:"col"},"Tour"),t("th",{style:{"vertical-align":"top"},scope:"col"},"Đặt lúc"),t("th",null,"Chi tiết"),t("th",{style:{"vertical-align":"top"},scope:"col"},"Hành động")])],-1)),yt=["onClick"],xt=n(()=>t("i",{class:"fa-solid fa-circle-info"},null,-1)),Ct=n(()=>t("thead",null,[t("tr",null,[t("th",{class:"text-left"}," Loại khách "),t("th",{class:"text-left"}," Số lượng ")])],-1)),Tt=n(()=>t("td",null,"Người lớn (Trên 12 tuổi)",-1)),wt=n(()=>t("td",null,"Trẻ em(Từ 6 - 10 tuổi) ",-1)),Ot=n(()=>t("td",null,"Trẻ em (Từ 2 - 5 tuổi)",-1)),St=n(()=>t("td",null,"Trẻ em (Dưới 2 tuổi) ",-1)),It={style:{color:"orangered"}},Nt={key:0,style:{"vertical-align":"middle"}},Bt=["onClick"],Mt=n(()=>t("i",{class:"fa-regular fa-circle-check fa-lg"},null,-1)),Vt=[Mt],Dt={key:1,style:{"vertical-align":"middle"}},Lt=["onClick"],Pt=n(()=>t("i",{class:"fa-regular fa-circle-xmark fa-lg"},null,-1)),At=[Pt],Et={__name:"OrderManage",setup(g){const B=j();let f=h(1),T=h(),x=h("DESC"),b=h(),C=h("Chưa xử lý"),k=h(0);function r(){b.value=null,N.get("/admin/order/"+x.value+"/"+k.value+"/"+f.value).then(d=>{b.value=d.data.rows,T.value=d.data.count/10+1}).catch(d=>{console.error(d)})}q(()=>{r()});function M(){x.value="DESC",r()}function V(){x.value="ASC",r()}function D(){C.value="Đã xử lý",k.value=1,r()}function L(){C.value="Chưa xử lý",k.value=0,r()}function w(d){const c={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"};return new Date(d).toLocaleString("vi-VN",c).replace(" tháng ","/").replace("lúc","").replace(", ","/")}function P(){r()}function O(d){N.put("/admin/order/"+d).then(c=>{r(),k.value==0?y.success("Đã chuyển sang mục đã xử lý",{autoClose:2e3,theme:"colored",position:y.POSITION.BOTTOM_RIGHT}):y.info("Đã chuyển sang mục chưa xử lý",{autoClose:2e3,theme:"colored",position:y.POSITION.BOTTOM_RIGHT})}).catch(c=>{console.log(c)})}return(d,c)=>{const S=i("v-divider"),m=i("v-card-text"),A=i("v-table"),E=i("v-card-title"),G=i("v-card-item"),R=i("v-spacer"),F=i("v-btn"),H=i("v-card-actions"),K=i("v-card"),$=i("v-dialog"),z=i("v-pagination");return u(),p("div",ot,[t("div",lt,[st,t("div",at,[t("form",ct,[t("button",{class:"btn btn-outline-success",onClick:c[0]||(c[0]=I(()=>{},["prevent"]))},dt),t("input",{onKeydown:c[1]||(c[1]=X(I(()=>{},["prevent"]),["enter"])),class:"form-control me-2 search-box",type:"search",placeholder:"Tìm kiếm theo tên","aria-label":"Search"},null,32)]),t("div",rt,[t("button",ut,[s(" Trạng thái   "),_t,s(" "+l(v(C)),1)]),t("div",{class:"dropdown-menu"},[t("button",{class:"dropdown-item",onClick:L},[s("Chưa xử lí   "),ht]),t("button",{class:"dropdown-item",onClick:D},[s("Đã xử lí  "),pt])])]),t("button",{class:"sort-button btn btn-success",onClick:M},[s("Mới nhất   "),vt]),t("button",{class:"sort-button btn btn-success",onClick:V},[s("Cũ nhất   "),ft]),t("button",{class:"btn btn-success",onClick:r},gt)])]),v(b)?(u(),p("table",bt,[kt,t("tbody",null,[(u(!0),p(J,null,Q(v(b),e=>(u(),p("tr",{key:e,class:"each-tour-row"},[t("td",null,l(e.name),1),t("td",{onClick:_=>v(B).push("/"+e.Tour.slug)},l(e.Tour.title),9,yt),t("td",null,l(w(e.createdAt)),1),t("td",null,[o($,{"max-width":"500"},{activator:a(({props:_})=>[t("a",Z({class:"detail-popup"},_),[s(" Xem   "),xt],16)]),default:a(({isActive:_})=>[o(K,{title:"Thông tin chi tiết",color:"#d1e7dd","prepend-icon":"fa-solid fa-circle-info"},{default:a(()=>[o(S,{thickness:2}),o(m,null,{default:a(()=>[s("Khách hàng: "+l(e.name),1)]),_:2},1024),o(m,null,{default:a(()=>[s("Số điện thoại: "+l(e.phone),1)]),_:2},1024),o(m,null,{default:a(()=>[s(" Đặt lúc: "+l(w(e.createdAt)),1)]),_:2},1024),o(m,null,{default:a(()=>[s(" Email: "+l(e.email),1)]),_:2},1024),o(m,null,{default:a(()=>[s(" Ghi chú: "+l(e.note),1)]),_:2},1024),o(G,null,{default:a(()=>[o(A,{density:"compact",style:{background:"none"}},{default:a(()=>[Ct,t("tbody",null,[t("tr",null,[Tt,t("td",null,l(e.adult),1)]),t("tr",null,[wt,t("td",null,l(e.teenager),1)]),t("tr",null,[Ot,t("td",null,l(e.children),1)]),t("tr",null,[St,t("td",null,l(e.infant),1)])])]),_:2},1024),o(S),o(E,null,{default:a(()=>[s("Đơn giá tour: "),t("span",It,l(d.numeralFormat(e.price))+" VNĐ ",1)]),_:2},1024)]),_:2},1024),o(H,null,{default:a(()=>[o(R),o(F,{text:"Thoát",onClick:Gt=>_.value=!1},null,8,["onClick"])]),_:2},1024)]),_:2},1024)]),_:2},1024)]),e.solved==0?(u(),p("td",Nt,[t("button",{class:"solve-btn",onClick:_=>O(e.id)},Vt,8,Bt)])):(u(),p("td",Dt,[t("button",{class:"solve-btn",onClick:_=>O(e.id)},At,8,Lt)]))]))),128))])])):(u(),W(nt,{key:1})),o(z,{onClick:P,modelValue:v(f),"onUpdate:modelValue":c[2]||(c[2]=e=>Y(f)?f.value=e:f=e),length:parseInt(v(T)),"total-visible":5,"prev-icon":"fa-solid fa-chevron-left","next-icon":"fa-solid fa-chevron-right"},null,8,["modelValue","length"])])}}},Kt=U(Et,[["__scopeId","data-v-abce1748"]]);export{Kt as default};
