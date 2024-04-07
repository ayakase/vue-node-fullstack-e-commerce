import{A as Z,r as l,w as A,d as s,e as I,k as y,i as h,f as e,B as $,C as V,h as p,l as M,t as u,g as n,F as G,z as H,b as R,L as Q,D as ee,_ as te,a as le,o as ae,c as U,n as k,p as v,j as J,S as oe,E as se,q as ne,s as ie}from"./index-cee0335a.js";import{L as de}from"./LoadingComponent-ee3534fe.js";const re={style:{"z-index":"9999"}},ue={style:{"margin-top":"0rem"},class:"modal fade",id:"placeModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},ce={class:"modal-dialog",style:{"background-color":"F1FAF4"}},me={class:"modal-content",style:{"background-color":"#F1FAF4"}},_e=e("div",{class:"modal-header"},[e("h1",{class:"modal-title fs-5",id:"exampleModalLabel"},"Đặt Tour"),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),ve={class:"modal-body"},he={class:"place-form-container"},pe={class:"mb-3"},be=e("label",{class:"form-label"},[n("Họ & Tên "),e("span",{style:{color:"red"}},"*")],-1),fe={class:"mb-3"},ye=e("label",{class:"form-label"},[n("Điện thoại "),e("span",{style:{color:"red"}},"*")],-1),ge={class:"mb-3"},Te=e("label",{class:"form-label"},[n("Email "),e("span",{style:{color:"red"}},"*")],-1),ke={class:"adult",style:{display:"flex","align-items":"center","justify-content":"space-between","margin-bottom":"1rem"}},we=e("p",{style:{margin:"0",padding:"0"}},"Người lớn (Trên 12 tuổi)",-1),$e={style:{margin:"0",padding:"0",color:"orangered"}},Ve={class:"teenager",style:{display:"flex","align-items":"center","justify-content":"space-between","margin-bottom":"1rem"}},Me=e("p",{style:{margin:"0",padding:"0"}},"Trẻ em(Từ 6 - 10 tuổi)",-1),Pe={style:{margin:"0",padding:"0",color:"orangered"}},Ie={class:"children",style:{display:"flex","align-items":"center","justify-content":"space-between","margin-bottom":"1rem"}},Le=e("p",{style:{margin:"0",padding:"0"}},"Trẻ em (Từ 2 - 5 tuổi) ",-1),Oe={style:{margin:"0",padding:"0",color:"orangered"}},xe={class:"infant",style:{display:"flex","align-items":"center","justify-content":"space-between","margin-bottom":"1rem"}},Fe=e("p",{style:{margin:"0",padding:"0"}},"Trẻ em (Dưới 2 tuổi) ",-1),Ce={style:{margin:"0",padding:"0",color:"orangered"}},Ue={class:"mb-4"},He={style:{color:"chocolate"}},Be=e("div",{style:{display:"flex","flex-direction":"row",gap:"1rem","font-size":"1.5rem"}},null,-1),Se={class:"mb-3"},Ne=e("label",{class:"form-label"},"Ghi chú",-1),Ge=e("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"Close",-1),De={__name:"PlaceModal",props:["tourId","childPrice","adultPrice","teenagerPrice","infantPrice","tourTitle"],setup(O){const _=O;let L=Z(()=>_.adultPrice*b.value+_.teenagerPrice*w.value+_.childPrice*f.value+_.infantPrice*i.value),t=l(""),g=l(""),T=l(""),b=l(1),w=l(0),f=l(0),i=l(0),c=l("");A(b,(d,a)=>{d<1&&(b.value=1)}),A(w,(d,a)=>{(d<0||!d)&&(w.value=0)}),A(f,(d,a)=>{(d<0||!d)&&(f.value=0)}),A(i,(d,a)=>{(d<0||!d)&&(i.value=0)});const N=l(!1);function D(){if(!t.value||!g.value||!T.value||!c.value)H.error("Bạn cần điền đầy đủ thông tin đặt tour",{autoClose:1e3,theme:"dark",position:H.POSITION.BOTTOM_RIGHT});else{N.value=!0;const d={tourId:_.tourId,tourTitle:_.tourTitle,name:t.value,phone:g.value,email:T.value,adult:b.value,teenager:w.value,children:f.value,infant:i.value,price:L.value,note:c.value};R.post("/client/order",d).then(a=>{N.value=!1,H.success("Đặt tour thành công",{autoClose:2e3,theme:"colored",position:H.POSITION.BOTTOM_RIGHT})}).catch(a=>{console.error(a)})}}return(d,a)=>(s(),I(G,null,[N.value?(s(),y(Q,{key:0})):h("",!0),e("div",re,[e("div",ue,[e("div",ce,[e("div",me,[_e,e("div",ve,[e("div",he,[e("div",pe,[be,$(e("input",{style:{height:"3rem"},class:"form-control",id:"",placeholder:"","onUpdate:modelValue":a[0]||(a[0]=o=>M(t)?t.value=o:t=o)},null,512),[[V,p(t)]])]),e("div",fe,[ye,$(e("input",{style:{height:"3rem"},class:"form-control",id:"",placeholder:"","onUpdate:modelValue":a[1]||(a[1]=o=>M(g)?g.value=o:g=o)},null,512),[[V,p(g)]])]),e("div",ge,[Te,$(e("input",{type:"email",style:{height:"3rem"},class:"form-control",id:"",placeholder:"","onUpdate:modelValue":a[2]||(a[2]=o=>M(T)?T.value=o:T=o)},null,512),[[V,p(T)]])]),e("div",ke,[we,$(e("input",{type:"number",style:{height:"3rem",width:"8rem"},class:"form-control",id:"",placeholder:"","onUpdate:modelValue":a[3]||(a[3]=o=>M(b)?b.value=o:b=o)},null,512),[[V,p(b)]]),e("p",$e," x "+u(d.numeralFormat(_.adultPrice)),1)]),e("div",Ve,[Me,$(e("input",{type:"number",style:{height:"3rem",width:"8rem"},class:"form-control",id:"",placeholder:"","onUpdate:modelValue":a[4]||(a[4]=o=>M(w)?w.value=o:w=o)},null,512),[[V,p(w)]]),e("p",Pe," x "+u(d.numeralFormat(_.teenagerPrice)),1)]),e("div",Ie,[Le,$(e("input",{type:"number",style:{height:"3rem",width:"8rem"},class:"form-control",id:"",placeholder:"","onUpdate:modelValue":a[5]||(a[5]=o=>M(f)?f.value=o:f=o)},null,512),[[V,p(f)]]),e("p",Oe," x "+u(d.numeralFormat(_.childPrice)),1)]),e("div",xe,[Fe,$(e("input",{type:"number",style:{height:"3rem",width:"8rem"},class:"form-control",id:"",placeholder:"","onUpdate:modelValue":a[6]||(a[6]=o=>M(i)?i.value=o:i=o)},null,512),[[V,p(i)]]),e("p",Ce," x "+u(d.numeralFormat(_.infantPrice)),1)]),e("h4",Ue,[n("Tổng số tiền: "),e("span",He,u(d.numeralFormat(p(L)))+"  VNĐ ",1)]),Be,e("div",Se,[Ne,$(e("textarea",{class:"form-control",rows:"3","onUpdate:modelValue":a[7]||(a[7]=o=>M(c)?c.value=o:c=o)},null,512),[[V,p(c)]])]),e("p",null,u(p(c).length)+"/255",1)])]),e("div",{class:"modal-footer"},[Ge,e("a",{class:"btn",style:{"background-color":"#97CBB4"},target:"_blank",onClick:D},"Đặt Tour")])])])])])],64))}},Ae={style:{"z-index":"9999"}},Re={style:{"margin-top":"0rem"},class:"modal fade",id:"advisoryModal",tabindex:"-1","aria-labelledby":"exampleModalLabel","aria-hidden":"true"},je={class:"modal-dialog",style:{"background-color":"F1FAF4"}},ze={class:"modal-content",style:{"background-color":"#F1FAF4"}},Ee=e("div",{class:"modal-header"},[e("h1",{class:"modal-title fs-5",id:"exampleModalLabel"},"Để lại thông tin"),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),qe={class:"modal-body"},Ke={class:"advisory-form-container"},Je={class:"mb-3"},Qe=e("label",{class:"form-label"},[n("Họ & Tên "),e("span",{style:{color:"red"}},"*")],-1),We={class:"mb-3"},Xe=e("label",{class:"form-label"},[n("Điện thoại "),e("span",{style:{color:"red"}},"*")],-1),Ye={class:"mb-3"},Ze=e("label",{class:"form-label"},[n("Email "),e("span",{style:{color:"red"}},"*")],-1),et={class:"mb-3"},tt=e("label",{class:"form-label"},"Ghi chú",-1),lt={class:"modal-footer"},at=e("button",{type:"button",class:"btn btn-secondary","data-bs-dismiss":"modal"},"Close",-1),ot=["onClick"],st={__name:"AdvisoryModal",props:["tourId","tourTitle"],setup(O){const _=O,L=l(),t=l(),g=l(),T=l();console.log(_);const b=l(!1);function w(){if(!L.value||!t.value||!g.value||!T.value)H.error("Bạn cần điền đầy đủ thông tin",{autoClose:1e3,theme:"dark",position:H.POSITION.BOTTOM_RIGHT});else{b.value=!0;const f={name:L.value,phone:t.value,email:g.value,note:T.value,tour_id:_.tourId,tour_title:_.tourTitle};R.post("/client/advisory",f).then(i=>{b.value=!1,H.success("Đã nhận thông tin",{autoClose:2e3,theme:"dark",position:H.POSITION.BOTTOM_RIGHT})}).catch(i=>{console.error(i)})}}return(f,i)=>(s(),I(G,null,[b.value?(s(),y(Q,{key:0})):h("",!0),e("div",Ae,[e("div",Re,[e("div",je,[e("div",ze,[Ee,e("div",qe,[e("div",Ke,[e("div",Je,[Qe,$(e("input",{style:{height:"3rem"},class:"form-control",id:"",placeholder:"","onUpdate:modelValue":i[0]||(i[0]=c=>L.value=c)},null,512),[[V,L.value]])]),e("div",We,[Xe,$(e("input",{style:{height:"3rem"},class:"form-control",id:"",placeholder:"","onUpdate:modelValue":i[1]||(i[1]=c=>t.value=c)},null,512),[[V,t.value]])]),e("div",Ye,[Ze,$(e("input",{type:"email",style:{height:"3rem"},class:"form-control",id:"",placeholder:"","onUpdate:modelValue":i[2]||(i[2]=c=>g.value=c)},null,512),[[V,g.value]])]),e("div",et,[tt,$(e("textarea",{class:"form-control",rows:"3","onUpdate:modelValue":i[3]||(i[3]=c=>T.value=c)},null,512),[[V,T.value]])])])]),e("div",lt,[at,e("a",{class:"btn",style:{"background-color":"#97CBB4"},target:"_blank",onClick:ee(w,["prevent"])},"Đặt Tour",8,ot)])])])])])],64))}};const P=O=>(ne("data-v-ec15228a"),O=O(),ie(),O),nt={"aria-label":"breadcrumb"},it={class:"breadcrumb"},dt=P(()=>e("li",{class:"breadcrumb-item"},[e("i",{class:"fa-solid fa-house"}),n(),e("a",{href:"/",class:"home-breadcrumb"},"Trang chủ")],-1)),rt={key:0,class:"breadcrumb-item"},ut=P(()=>e("hr",{class:"hr"},null,-1)),ct={key:3,class:"content-container-outer"},mt={class:"main-content"},_t={class:"tour-title"},vt={key:0,class:"slide"},ht=P(()=>e("p",{class:"separator"},null,-1)),pt=P(()=>e("p",{class:"separator"},null,-1)),bt=P(()=>e("p",{class:"separator"},null,-1)),ft=P(()=>e("p",{class:"separator"},null,-1)),yt=P(()=>e("i",{class:"fa-solid fa-link"},null,-1)),gt=[yt],Tt={class:"side-bar"},kt={key:0,class:"place-order"},wt={style:{color:"#ff6b00"}},$t={style:{color:"#ff6b00"}},Vt={style:{color:"#ff6b00"}},Mt={style:{color:"#ff6b00"}},Pt={style:{color:"#ff6b00"}},It=P(()=>e("div",{style:{height:"5rem"}},null,-1)),Lt={style:{color:"#ff6b00"}},Ot={style:{color:"#ff6b00"}},xt=P(()=>e("div",{class:"action-button"},[e("button",{class:"btn place-btn","data-bs-toggle":"modal","data-bs-target":"#placeModal"},"Đặt tour"),e("button",{class:"btn advise-btn","data-bs-toggle":"modal","data-bs-target":"#advisoryModal"},"Tư vấn")],-1)),Ft={class:"hot-tour"},Ct=P(()=>e("h2",{style:{"padding-left":"1rem"}},[n("Tour hot   "),e("i",{style:{color:"orangered"},class:"fa-solid fa-fire fa-bounce"})],-1)),Ut=["onClick"],Ht=["src"],Bt={class:"card-body"},St={class:"card-title"},Nt={style:{"font-weight":"bold",color:"#ff6b00"}},Gt=P(()=>e("div",null,null,-1)),Dt={__name:"TourView",setup(O){const _=l(!1),L=le(),t=l(),g=l(),T=l(),b=l(),w=l(),f=l(),i=l(!1),c=l(),N=l(),D=l(),d=l(),a=l();l();const o={rewind:!0,perMove:1,autoplay:!0,focus:"center"};function W(){d.value=window.location.href}const j=l();ae(()=>{R.get("client/each-tour/"+L.params.slug).then(r=>{t.value=r.data[0],g.value=r.data[0].adult_price,T.value=r.data[0].teenager_price,b.value=r.data[0].child_price,w.value=r.data[0].infant_price,c.value=r.data[0].id,D.value=r.data[0].tik_tok_id,f.value=r.data[0].title,N.value="https://www.tiktok.com/embed/"+D.value,a.value=r.data[0].images.split(",")}).catch(r=>{console.error(r)}),setTimeout(()=>{i.value=!0},1e3),R.get("/client/region/hot-sidebar").then(r=>{j.value=r.data.rows}).catch(r=>{console.error(r)})});let x=l(),F=l();return(r,C)=>{const X=U("LoadingOverlay"),Y=U("v-img"),B=U("v-tab"),z=U("v-tabs"),S=U("v-window-item"),E=U("v-window"),q=U("v-card-text"),K=U("v-card");return s(),I(G,null,[_.value?(s(),y(X,{key:0})):h("",!0),e("nav",nt,[e("ol",it,[dt,t.value?(s(),I("li",rt,u(t.value.title),1)):h("",!0)])]),t.value?(s(),y(De,{key:1,tourId:c.value,childPrice:b.value,adultPrice:g.value,teenagerPrice:T.value,infantPrice:w.value,tourTitle:f.value},null,8,["tourId","childPrice","adultPrice","teenagerPrice","infantPrice","tourTitle"])):h("",!0),t.value?(s(),y(st,{key:2,tourId:c.value,tourTitle:f.value},null,8,["tourId","tourTitle"])):h("",!0),ut,t.value?(s(),I("div",ct,[e("div",mt,[e("h2",_t,u(t.value.title),1),e("div",null,[a.value&&a.value[0]!=""?(s(),I("div",vt,[k(p(se),{options:o,"aria-label":""},{default:v(()=>[(s(!0),I(G,null,J(a.value,m=>(s(),y(p(oe),{key:m},{default:v(()=>[e("a",null,[k(Y,{class:"slide-image",src:m},null,8,["src"])])]),_:2},1024))),128))]),_:1})])):h("",!0)]),t.value.special!="undefined"&&t.value.bonus!="undefined"&&t.value.visa!="undefined"?(s(),y(K,{key:0,class:"first-section",elevation:"0"},{default:v(()=>[k(z,{class:"tab-slider",modelValue:p(x),"onUpdate:modelValue":C[0]||(C[0]=m=>M(x)?x.value=m:x=m),color:"white","align-tabs":"start"},{default:v(()=>[t.value.special!="undefined"?(s(),y(B,{key:0,class:"each-tab",value:"one"},{default:v(()=>[n("Điểm khác biệt")]),_:1})):h("",!0),ht,t.value.bonus!="undefined"?(s(),y(B,{key:1,class:"each-tab",value:"two"},{default:v(()=>[n("Dịch vụ đi kèm")]),_:1})):h("",!0),pt,t.value.visa!="undefined"?(s(),y(B,{key:2,class:"each-tab",value:"three"},{default:v(()=>[n("Visa")]),_:1})):h("",!0)]),_:1},8,["modelValue"]),k(q,null,{default:v(()=>[k(E,{modelValue:p(x),"onUpdate:modelValue":C[1]||(C[1]=m=>M(x)?x.value=m:x=m)},{default:v(()=>[k(S,{value:"one",innerHTML:t.value.special},null,8,["innerHTML"]),k(S,{value:"two",innerHTML:t.value.bonus},null,8,["innerHTML"]),k(S,{value:"three",innerHTML:t.value.visa},null,8,["innerHTML"])]),_:1},8,["modelValue"])]),_:1})]),_:1})):h("",!0),t.value.detail!="undefined"&&t.value.priceservice!="undefined"&&t.value.guide!="undefined"?(s(),y(K,{key:1,class:"second-section",elevation:"0"},{default:v(()=>[k(z,{class:"tab-slider",modelValue:p(F),"onUpdate:modelValue":C[2]||(C[2]=m=>M(F)?F.value=m:F=m),color:"white","align-tabs":"start"},{default:v(()=>[t.value.detail!="undefined"?(s(),y(B,{key:0,class:"each-tab",value:"one"},{default:v(()=>[n("Lịch trình chi tiết")]),_:1})):h("",!0),bt,t.value.priceservice!="undefined"?(s(),y(B,{key:1,class:"each-tab",value:"two"},{default:v(()=>[n("Bảng giá và dịch vụ")]),_:1})):h("",!0),ft,t.value.guide!="undefined"?(s(),y(B,{key:2,class:"each-tab",value:"three"},{default:v(()=>[n("Lưu ý và hướng dẫn")]),_:1})):h("",!0)]),_:1},8,["modelValue"]),k(q,null,{default:v(()=>[k(E,{modelValue:p(F),"onUpdate:modelValue":C[3]||(C[3]=m=>M(F)?F.value=m:F=m)},{default:v(()=>[k(S,{value:"one",innerHTML:t.value.detail},null,8,["innerHTML"]),k(S,{value:"two",innerHTML:t.value.priceservice},null,8,["innerHTML"]),k(S,{value:"three",innerHTML:t.value.guide},null,8,["innerHTML"])]),_:1},8,["modelValue"])]),_:1})]),_:1})):h("",!0),e("div",null,[e("button",{class:"btn",onClick:W,style:{height:"3rem",width:"3rem","background-color":"#86c5a9","font-size":"large",color:"white"}},gt),e("p",null,u(d.value),1)])]),e("div",Tt,[t.value?(s(),I("div",kt,[e("h5",null,u(t.value.title),1),e("p",null,[n("Lịch trình: "),e("span",wt,u(t.value.schedule),1)]),e("p",null,[n("Loại tour: "),e("span",$t,u(t.value.tourtype),1)]),e("p",null,[n("Thời gian "),e("span",Vt,u(t.value.days)+"N"+u(t.value.days-1)+"Đ",1)]),e("p",null,[n("Khởi hành: "),e("span",Mt,u(t.value.departure),1)]),e("p",null,[n("Vận chuyển: "),e("span",Pt,u(t.value.transportation),1)]),It,e("p",null,[n("Gia goc "),e("span",Lt,u(r.numeralFormat(t.value.original_price)),1)]),e("p",null,[n("Giá tour: "),e("span",Ot,u(r.numeralFormat(t.value.adult_price)),1)]),xt])):h("",!0),e("div",Ft,[Ct,(s(!0),I(G,null,J(j.value,m=>(s(),I("div",{onClick:At=>r.router.push({path:"/"+m.slug}),class:"card",style:{border:"none"}},[e("img",{src:m.thumbnail,style:{height:"10rem"},class:"card-img-top",alt:"..."},null,8,Ht),e("div",Bt,[e("h5",St,u(m.title),1),e("p",null,[n("Giá: "),e("span",Nt,u(r.numeralFormat(m.adult_price)),1),n(" VNĐ ")])])],8,Ut))),256))])])])):(s(),y(de,{key:4})),Gt],64)}}},zt=te(Dt,[["__scopeId","data-v-ec15228a"]]);export{zt as default};