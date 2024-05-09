import{_ as P,r as l,y as q,u as O,w as D,o as J,b as U,a as Q,c as p,d as _,e,t as E,m as M,f as r,v as L,g as W,h as G,i as H,j as m,k as B,n as f,l as X,q as Y,s as Z,x as ee,p as te}from"./index-4e6a6190.js";import{T as oe}from"./TourList-b0902e01.js";import{H as se}from"./HotTours-aa803165.js";import{C as ae}from"./CategoryList-ff777df4.js";import"./LoadingComponent-f93700b2.js";/* empty css                                                                         *//* empty css                                                                 */const s=h=>(Z("data-v-7d1c145b"),h=h(),ee(),h),le={class:"view-container"},ne={"aria-label":"breadcrumb"},ie={class:"breadcrumb"},ce=s(()=>e("li",{class:"breadcrumb-item"},[e("i",{class:"fa-solid fa-house"}),m(),e("a",{href:"/",class:"home-breadcrumb"},"Trang chủ")],-1)),re=s(()=>e("li",{class:"breadcrumb-item"},"Địa điểm",-1)),de={key:0,class:"breadcrumb-item"},ue={class:"section-container"},ve={class:"left-side-bar-container"},pe={class:"filter-container"},me=s(()=>e("div",{style:{display:"flex","align-items":"center","justify-content":"center",height:"3rem","font-size":"20px","font-weight":"bold","background-color":"#97CBB4",width:"100%",color:"#045B48"}}," Bộ lọc",-1)),he={class:"search-outer-container",style:{width:"100%",padding:"0.5rem"}},_e={class:"d-flex search-container",style:{"margin-top":".3rem",padding:"0"}},fe=s(()=>e("i",{class:"fas fa-search"},null,-1)),be=[fe],ye={class:"checkBoxes",style:{width:"100%",padding:"0.5rem"}},ge={class:"form-check"},we=s(()=>e("label",{class:"form-check-label",for:"hotFilter"}," Tour hot ",-1)),ke={class:"form-check"},xe=s(()=>e("label",{class:"form-check-label",for:"discountFilter"}," Khuyến mãi ",-1)),Ce={class:"",style:{width:"100%",padding:"0.5rem"}},Te=s(()=>e("label",{for:"",class:"form-label"},"Loại tour",-1)),Se=s(()=>e("option",{value:"",selected:""},"Tất cả",-1)),Ve=s(()=>e("option",{value:"Ghép đoàn",selected:""},"Ghép đoàn",-1)),De=s(()=>e("option",{value:"Đi riêng"},"Đi riêng",-1)),Le=s(()=>e("option",{value:"Ghép đoàn / Đi riêng"},"Ghép đoàn/đi riêng",-1)),Be=[Se,Ve,De,Le],Ne={class:"",style:{width:"100%",padding:"0.5rem"}},Ue=s(()=>e("label",{for:"",class:"form-label"},"Giá tour",-1)),Ee=te('<option value="0" selected data-v-7d1c145b>Tất cả</option><option value="1" selected data-v-7d1c145b>Nhỏ hơn 2tr</option><option value="2" data-v-7d1c145b>Từ 2tr đến 5tr</option><option value="3" data-v-7d1c145b>Từ 5tr đến 8tr</option><option value="4" data-v-7d1c145b>Trên 8tr</option>',5),Me=[Ee],Ge=s(()=>e("div",{style:{width:"100%","padding-left":"0.5rem"}},[e("p",null,"Số ngày")],-1)),He={class:"",style:{display:"flex","align-items":"center",gap:"0.5rem",padding:"0.5rem",width:"100%"}},Ae=s(()=>e("i",{class:"fa-solid fa-arrow-right"},null,-1)),Fe=s(()=>e("i",{class:"fa-solid fa-filter"},null,-1)),Ie={class:"tour-container"},Re={class:"sort-container"},ze={class:"sort-text",style:{"font-size":"larger"}},Ke={style:{color:"#1f8726","font-weight":"bolder"}},$e={class:"sort-types"},je=s(()=>e("i",{class:"fa-solid fa-arrow-down-wide-short"},null,-1)),Pe=s(()=>e("i",{class:"fa-solid fa-arrow-up-wide-short"},null,-1)),qe={class:"right-side-bar-container"},Oe={__name:"LocationView",setup(h){const b=l(),y=l(1),g=l(),i=l("createdAt"),d=l("Mới nhất"),c=l("DESC"),w=l(""),k=l(!1),x=l(!1),C=l(""),u=l(1),v=l(20),T=l(0);q();const S=O();D(u,(a,t)=>{a<1&&(u.value=1)}),D(v,(a,t)=>{a<1&&(v.value=1)});function A(){c.value="ASC",n()}function F(){c.value="DESC",n()}function I(){i.value="createdAt",d.value="Mới nhất",c.value="DESC",n()}function R(){i.value="recommend",d.value="Hoàng Hà đề xuất",c.value="DESC",n()}function z(){i.value="adult_price",c.value="ASC",d.value="Giá tour",n()}function K(){i.value="days",c.value="DESC",d.value="Thời lượng tour",n()}J(()=>{n(),N()});function $(){n(),window.scrollTo(0,0)}const V=l();function N(){U.get("/client/location/name/"+S.params.slug).then(a=>{V.value=a.data.name}).catch(a=>{console.log(a)})}function n(){g.value=null,U.get("/client/location/"+S.params.slug+"/"+i.value+"/"+c.value+"/"+y.value,{params:{keyword:w.value,isHot:k.value,isDiscount:x.value,tourType:C.value,minDay:u.value,maxDay:v.value,priceRange:T.value}}).then(a=>{g.value=a.data.rows,b.value=a.data.count/10+1}).catch(a=>{console.error(a)})}return D(()=>S.params.slug,(a,t)=>{a!==t&&(n(),N())}),(a,t)=>{const j=Q("v-pagination");return p(),_("div",le,[e("nav",ne,[e("ol",ie,[ce,re,V.value?(p(),_("li",de,E(V.value),1)):M("",!0)])]),e("div",ue,[e("div",ve,[e("div",pe,[me,e("div",he,[e("form",_e,[r(e("input",{onKeydown:t[0]||(t[0]=W(Y(o=>n(),["prevent"]),["enter"])),"onUpdate:modelValue":t[1]||(t[1]=o=>w.value=o),class:"form-control me-2 search-box",type:"search",placeholder:"Tìm kiếm","aria-label":"Search"},null,544),[[L,w.value]])]),e("button",{onClick:t[2]||(t[2]=o=>n()),style:{"margin-top":".3rem"},class:"btn btn-outline-success"},be)]),e("div",ye,[e("div",ge,[r(e("input",{"onUpdate:modelValue":t[3]||(t[3]=o=>k.value=o),class:"form-check-input",type:"checkbox",id:"hotFilter"},null,512),[[G,k.value]]),we]),e("div",ke,[r(e("input",{"onUpdate:modelValue":t[4]||(t[4]=o=>x.value=o),class:"form-check-input",type:"checkbox",id:"discountFilter"},null,512),[[G,x.value]]),xe])]),e("div",Ce,[Te,r(e("select",{class:"form-select mb-3","aria-label":"Small select example","onUpdate:modelValue":t[5]||(t[5]=o=>C.value=o)},Be,512),[[H,C.value]])]),e("div",Ne,[Ue,r(e("select",{class:"form-select mb-3","aria-label":"Small select example","onUpdate:modelValue":t[6]||(t[6]=o=>T.value=o)},Me,512),[[H,T.value]])]),Ge,e("div",He,[r(e("input",{"onUpdate:modelValue":t[7]||(t[7]=o=>u.value=o),min:"1",max:"20",class:"form-control me-2",type:"number"},null,512),[[L,u.value]]),Ae,r(e("input",{"onUpdate:modelValue":t[8]||(t[8]=o=>v.value=o),min:"1",max:"20",class:"form-control me-2",type:"number"},null,512),[[L,v.value]])]),e("button",{onClick:t[9]||(t[9]=o=>n()),style:{color:"white"},type:"button",class:"btn btn-success mt-4"},[m("Lọc "),Fe])]),B(se)]),e("div",Ie,[e("div",Re,[e("p",ze,[m("Sắp xếp theo:  "),e("span",Ke,E(d.value),1)]),e("div",$e,[e("div",{class:f([{"sort-active":i.value=="recommend"},"sort-type"]),onClick:R}," Hoàng Hà đề xuất",2),e("div",{class:f([{"sort-active":i.value=="createdAt"},"sort-type"]),onClick:I},"Mới nhất",2),e("div",{class:f([{"sort-active":i.value=="days"},"sort-type"]),onClick:K},"Thời lượng tour",2),e("div",{class:f([{"sort-active":i.value=="adult_price"},"sort-type"]),onClick:z},"Giá tour",2),c.value=="DESC"?(p(),_("div",{key:0,class:"sort-type",onClick:A},[m("Từ cao đến thấp   "),je])):(p(),_("div",{key:1,class:"sort-type",onClick:F},[m("Từ thấp đến cao   "),Pe]))])]),B(oe,{tourList:g.value},null,8,["tourList"]),b.value?(p(),X(j,{key:0,onClick:$,modelValue:y.value,"onUpdate:modelValue":t[10]||(t[10]=o=>y.value=o),length:parseInt(b.value),"total-visible":5,"prev-icon":"fa-solid fa-chevron-left","next-icon":"fa-solid fa-chevron-right"},null,8,["modelValue","length"])):M("",!0)]),e("div",qe,[B(ae)])])])}}},tt=P(Oe,[["__scopeId","data-v-7d1c145b"]]);export{tt as default};