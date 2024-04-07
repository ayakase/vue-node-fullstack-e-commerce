import{_ as P,u as z,r as a,o as F,w as j,d as n,e as i,h as l,k as R,i as M,f as t,g,t as c,F as y,j as x,B as I,C,l as O,b as T,z as _,q,s as A,L as E}from"./index-cee0335a.js";import{s as K}from"./slugify-5345872c.js";import{T as X}from"./TableLoading-383b2ed1.js";/* empty css                                                                     */const d=m=>(q("data-v-e15e0ae3"),m=m(),A(),m),$={class:"admin-tour-crud"},J={class:"sorting-container",style:{"margin-top":"2rem"}},Q=d(()=>t("div",{style:{"font-size":"larger",width:"5rem"}},"Bộ lọc:",-1)),W={class:"sorting-button-container"},Y={class:"btn-group"},Z={type:"button",class:"btn btn-success dropdown-toggle","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false",style:{color:"white"}},tt=d(()=>t("i",{class:"fa-solid fa-book"}," :",-1)),et={key:0,class:"dropdown-menu"},ot=["onClick"],st=d(()=>t("i",{class:"fa-solid fa-rotate-right"},null,-1)),lt=[st],nt={key:0,class:"table table-success table-striped table-hover",style:{"box-shadow":"rgba(0, 0, 0, 0.24) 0px 3px 8px"}},at=d(()=>t("thead",null,[t("tr",null,[t("th",{scope:"col"},"ID"),t("th",{scope:"col"},"Tên khu vực"),t("th",{scope:"col"},"Slug"),t("th",{scope:"col"},"Note"),t("th",{scope:"col",style:{"text-align":"center"}}," Xóa")])],-1)),ct={style:{"text-align":"center"}},it=["onClick"],dt=d(()=>t("i",{class:"fa-solid fa-trash"},null,-1)),ut=[dt],rt={class:"add-container"},_t={class:""},pt={class:""},ht={class:""},gt={class:"btn-group"},mt={type:"button",class:"btn btn-success dropdown-toggle","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false",style:{color:"white"}},vt=d(()=>t("i",{class:"fa-solid fa-book"}," :",-1)),ft={class:"dropdown-menu"},bt=["onClick"],yt=d(()=>t("i",{class:"fa-solid fa-plus"},null,-1)),Tt={__name:"LocationManage",setup(m){z();let v=a(),k=a(!1),L=a("Tất cả"),w=a(""),S=a(),f=a();function B(o,s){w.value=o,L.value=s,p()}function V(o,s){f.value=o,S.value=s}function p(){v.value=null,T.get("/admin/location/locationlist",{params:{region:w.value}}).then(o=>{v.value=o.data})}let b=a();function D(){T.get("/admin/location/region").then(o=>{b.value=o.data}).catch(o=>{console.log(o)})}F(()=>{p(),D()});function U(o){let s="Bạn có chắc chắn muốn xóa Tour "+o;confirm(s)==!0&&T.delete("/admin/location/"+o).then(e=>{console.log(e),_.info("Đã xóa",{autoClose:2e3,theme:"colored",position:_.POSITION.BOTTOM_RIGHT}),p()}).catch(e=>{console.error(e)})}let u=a(),r=a(),h=a();function G(o){return K(o,{locale:"vi",lower:!0})}j(u,o=>{r.value=G(o)});function H(){if(f.value){k.value=!0;let o={name:u.value,slug:r.value,note:h.value,region_id:f.value};T.post("/admin/location",o).then(s=>{console.log(s),_.info(s.data,{autoClose:2e3,theme:"colored",position:_.POSITION.BOTTOM_RIGHT}),k.value=!1,p()}).catch(s=>{console.log(s)})}else _.info("Vui lòng chọn khu vực cho địa điểm của bạn",{autoClose:2e3,theme:"colored",position:_.POSITION.BOTTOM_RIGHT})}return(o,s)=>(n(),i(y,null,[l(k)?(n(),R(E,{key:0})):M("",!0),t("div",$,[t("div",J,[Q,t("div",W,[t("div",Y,[t("button",Z,[g(" Địa điểm   "),tt,g(" "+c(l(L)),1)]),l(b)?(n(),i("div",et,[t("button",{class:"dropdown-item",onClick:s[0]||(s[0]=e=>B("","Tất cả"))},"Tất cả"),(n(!0),i(y,null,x(l(b),e=>(n(),i("button",{class:"dropdown-item",onClick:N=>B(e.slug,e.name)},c(e.name),9,ot))),256))])):M("",!0)]),t("p",null,c(l(w)),1),t("button",{class:"btn btn-success",onClick:p},lt)])]),l(v)?(n(),i("table",nt,[at,t("tbody",null,[(n(!0),i(y,null,x(l(v),e=>(n(),i("tr",{key:e,class:"each-tour-row"},[t("td",null,c(e.id),1),t("td",null,c(e.name),1),t("td",null,c(e.slug),1),t("td",null,c(e.note),1),t("td",ct,[t("button",{class:"delete-button",onClick:N=>U(e.id)},ut,8,it)])]))),128))])])):(n(),R(X,{key:1})),t("div",rt,[t("div",_t,[I(t("input",{"onUpdate:modelValue":s[1]||(s[1]=e=>O(u)?u.value=e:u=e),type:"text",class:"form-control",id:"",placeholder:"Tên khu vực	"},null,512),[[C,l(u)]])]),t("div",pt,[I(t("input",{"onUpdate:modelValue":s[2]||(s[2]=e=>O(r)?r.value=e:r=e),type:"text",class:"form-control",id:"",placeholder:"Slug"},null,512),[[C,l(r)]])]),t("div",ht,[I(t("input",{"onUpdate:modelValue":s[3]||(s[3]=e=>O(h)?h.value=e:h=e),type:"text",class:"form-control",id:"",placeholder:"Note"},null,512),[[C,l(h)]])]),t("div",gt,[t("button",mt,[g(" Địa điểm   "),vt,g(" "+c(l(S)),1)]),t("div",ft,[(n(!0),i(y,null,x(l(b),e=>(n(),i("button",{class:"dropdown-item",onClick:N=>V(e.id,e.name)},c(e.name),9,bt))),256))])]),t("button",{onClick:H,class:"btn btn-success"},[g(" Khu vực mới "),yt]),t("p",null,c(l(f)),1)])])],64))}},Ct=P(Tt,[["__scopeId","data-v-e15e0ae3"]]);export{Ct as default};