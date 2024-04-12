import{_ as D,y as M,r as a,o as V,a as B,c as u,d as r,e as t,j as g,z as o,q as C,f as N,v as O,g as q,F as K,A as L,l as P,k as A,I as E,b as y,t as i,s as R,x as U,G as T}from"./index-4e6a6190.js";import{T as j}from"./TableLoading-5344880a.js";/* empty css                                                                     */const d=_=>(R("data-v-3b33935e"),_=_(),U(),_),z={class:"admin-tour-crud"},F=d(()=>t("i",{class:"fa-solid fa-plus"},null,-1)),G={class:"sorting-container"},H=d(()=>t("div",{style:{"font-size":"larger",width:"5rem"}},"Bộ lọc:",-1)),X={class:"sorting-button-container"},J={class:"d-flex search-container"},Q=d(()=>t("i",{class:"fas fa-search"},null,-1)),W=[Q],Y=["onKeydown"],Z=d(()=>t("i",{class:"fa-solid fa-arrow-up-wide-short"},null,-1)),tt=d(()=>t("i",{class:"fa-solid fa-arrow-down-wide-short"},null,-1)),et=d(()=>t("i",{class:"fa-solid fa-rotate-right"},null,-1)),ot=[et],st={key:0,class:"table table-success table-striped table-hover",style:{"box-shadow":"rgba(0, 0, 0, 0.24) 0px 3px 8px"}},nt=d(()=>t("thead",null,[t("tr",null,[t("th",{scope:"col"},"ID"),t("th",{scope:"col"},"Tên tour"),t("th",{scope:"col"},"Dia diem"),t("th",{scope:"col"},"Slug"),t("th",{scope:"col"},"Lịch trình"),t("th",{scope:"col"},"Khởi hành"),t("th",{scope:"col"},"Số ngày"),t("th",{scope:"col"},"Tour Hot"),t("th",{scope:"col"},"Phương tiện"),t("th",{scope:"col"}," Tạo lúc "),t("th",{scope:"col"}," Chỉnh sửa "),t("th",{scope:"col"}," Xóa")])],-1)),lt=["onClick"],ct=["onClick"],at=["onClick"],it=["onClick"],dt=["onClick"],ht=["onClick"],ut=["onClick"],rt=["onClick"],pt=["onClick"],_t=["onClick"],mt=["onClick"],ft=["onClick"],vt=d(()=>t("i",{class:"fa-solid fa-pen-to-square"},null,-1)),bt=[vt],gt=["onClick"],kt=d(()=>t("i",{class:"fa-solid fa-trash"},null,-1)),Ct=[kt],yt={__name:"TourManage",setup(_){const s=M();let p=a(1),m=a(),k=a();a("Đã xuất bản"),a();const v=a("");function h(){m.value=null,y.get("/admin/tour/fetch/"+b.value+"/"+p.value,{params:{keyword:v.value}}).then(c=>{m.value=c.data.rows,k.value=c.data.count/10+1}).catch(c=>{console.error(c)})}V(()=>{h()});function w(){h()}function x(c){let n="Bạn có chắc chắn muốn xóa Tour "+c;confirm(n)==!0&&y.delete("/admin/tour/delete/"+c).then(f=>{T.info("Đã xóa",{autoClose:2e3,theme:"colored",position:T.POSITION.BOTTOM_RIGHT}),h()}).catch(f=>{console.error(f)})}a("Tất cả"),a(0);let b=a("DESC");function $(){b.value="DESC",h()}function S(){b.value="ASC",h()}function I(c){const n={year:"numeric",month:"long",day:"numeric",hour:"numeric",minute:"numeric",second:"numeric"};return new Date(c).toLocaleString("vi-VN",n).replace(" tháng ","/").replace("lúc","").replace(", ","/")}return(c,n)=>{const f=B("v-pagination");return u(),r("div",z,[t("button",{onClick:n[0]||(n[0]=e=>o(s).push("/admin/quan-ly-tour/them-tour")),class:"btn btn-success add-btn",style:{"margin-bottom":"1rem"}},[g(" Thêm tour mới "),F]),t("div",G,[H,t("div",X,[t("form",J,[t("button",{class:"btn btn-outline-success",onClick:n[1]||(n[1]=C(()=>{},["prevent"]))},W),N(t("input",{onKeydown:q(C(h,["prevent"]),["enter"]),class:"form-control me-2 search-box",type:"search",placeholder:"Tìm kiếm theo tên","aria-label":"Search","onUpdate:modelValue":n[2]||(n[2]=e=>v.value=e)},null,40,Y),[[O,v.value]])]),t("div",{style:{width:"30%",display:"flex","justify-content":"space-between"}},[t("button",{class:"sort-button btn btn-success",onClick:$},[g("Mới nhất   "),Z]),t("button",{class:"sort-button btn btn-success",onClick:S},[g("Cũ nhất   "),tt]),t("button",{class:"btn btn-success",onClick:h},ot)])])]),o(m)?(u(),r("table",st,[nt,t("tbody",null,[(u(!0),r(K,null,L(o(m),e=>(u(),r("tr",{key:e,class:"each-tour-row"},[t("th",{scope:"row",onClick:l=>o(s).push({path:"/"+e.slug})},i(e.id),9,lt),t("td",{onClick:l=>o(s).push({path:"/"+e.slug})},i(e.title),9,ct),t("td",{onClick:l=>o(s).push({path:"/"+e.slug})},i(e.Location.name),9,at),t("td",{onClick:l=>o(s).push({path:"/"+e.slug})},i(e.slug),9,it),t("td",{onClick:l=>o(s).push({path:"/"+e.slug})},i(e.schedule),9,dt),t("td",{onClick:l=>o(s).push({path:"/"+e.slug})},i(e.departure),9,ht),t("td",{onClick:l=>o(s).push({path:"/"+e.slug})},i(e.days),9,ut),e.ishottour==1?(u(),r("td",{key:0,onClick:l=>o(s).push({path:"/"+e.slug})}," Có ",8,rt)):(u(),r("td",{key:1,onClick:l=>o(s).push({path:"/"+e.slug})}," Không",8,pt)),t("td",{onClick:l=>o(s).push({path:"/"+e.slug})},i(e.transportation),9,_t),t("td",{onClick:l=>o(s).push({path:"/"+e.slug})},i(I(e.createdAt)),9,mt),t("td",null,[t("button",{onClick:l=>o(s).push({path:"/admin/quan-ly-tour/chinh-sua-tour",query:{id:e.id}}),class:"edit-button"},bt,8,ft)]),t("td",null,[t("button",{class:"delete-button",onClick:l=>x(e.id)},Ct,8,gt)])]))),128))])])):(u(),P(j,{key:1})),A(f,{onClick:w,modelValue:o(p),"onUpdate:modelValue":n[3]||(n[3]=e=>E(p)?p.value=e:p=e),length:o(k),"total-visible":5,"prev-icon":"fa-solid fa-chevron-left","next-icon":"fa-solid fa-chevron-right"},null,8,["modelValue","length"])])}}},$t=D(yt,[["__scopeId","data-v-3b33935e"]]);export{$t as default};
