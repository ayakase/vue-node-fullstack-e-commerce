import{_ as u,u as m,r as g,o as p,b as v,c as h,d as a,e as l,f as e,h as i,F as b,j as f,n as y,t as n}from"./index-2eb3fb2f.js";const k={class:"slider-manage-container"},S={class:"slider-list"},x={class:"slider-item-img"},M={class:"slider-content"},w={__name:"SliderManage",setup(B){let c=m(),o=g();return p(()=>{v.get("/admin/slider").then(s=>{console.log(s.data.rows),o.value=s.data.rows}).catch(s=>{console.log(s)})}),(s,r)=>{const d=h("v-img");return a(),l("div",k,[e("button",{onClick:r[0]||(r[0]=t=>i(c).push("quan-ly-slider/them-slide")),style:{"margin-bottom":"2rem"},class:"btn btn-success"}," Thêm Slider "),e("div",S,[(a(!0),l(b,null,f(i(o),(t,_)=>(a(),l("div",{class:"slider-item",key:_},[e("div",x,[y(d,{class:"slider-img",src:t.image_src,alt:"",style:{width:"100%"}},null,8,["src"])]),e("div",M,[e("p",null,"ID: "+n(t.id),1),e("p",null,"Tiêu đề: "+n(t.title),1),e("p",null,"Liên kết: "+n(t.tour_url),1)])]))),128))])])}}},C=u(w,[["__scopeId","data-v-301652ab"]]);export{C as default};
