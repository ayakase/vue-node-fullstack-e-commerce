import{_ as y,r as i,d as p,e as T,k as I,i as S,f as e,B as h,C as f,h as m,l as g,F as O,b as w,z as c,q as k,s as x,L as B}from"./index-cee0335a.js";const r=n=>(k("data-v-33584c43"),n=n(),x(),n),C={class:"add-container"},L=r(()=>e("h2",{style:{"text-align":"center","padding-top":"2rem"}},"Tạo Slide mới",-1)),U={class:"mb-3"},F=r(()=>e("label",{for:"",class:"form-label"},"Tiêu đề",-1)),R={class:"mb-3"},N=r(()=>e("label",{for:"",class:"form-label"},"Liên kết",-1)),V={class:"mb-3 thumbnail"},A=r(()=>e("label",{for:"formFile",class:"form-label"},"Hình ảnh",-1)),D={style:{width:"20rem","margin-top":"1rem"}},H=["src"],M={style:{width:"20rem","margin-top":"1rem"}},E=["src"],G=r(()=>e("div",{class:"mt-10 mb-2"},null,-1)),P={__name:"AddSlider",setup(n){const d=i(!1);let l=i(),a=i(),u=i(),_=i();function v(s){s.target.files.length&&(_.value=URL.createObjectURL(s.target.files[0])),u.value=s.target.files[0]}function b(){d.value=!0;const s=new FormData;s.append("title",l.value),s.append("url",a.value),s.append("image",u.value),w.post("/admin/slider",s,{headers:{"Content-Type":"multipart/form-data"}}).then(t=>{if(t.status==200)d.value=!1,c.success("Đã nhận thông tin",{autoClose:2e3,theme:"colored",position:c.POSITION.BOTTOM_RIGHT});else if(t.status==404)throw new Error(t.status)}).catch(t=>{console.error(t),d.value=!1,c.error("Lỗi "+t+" , đảm bảo là bạn đã điền đủ thông tin, hãy đợi 1p rồi submit lại hoặc là reload lại trang",{autoClose:2e3,theme:"colored",position:c.POSITION.BOTTOM_RIGHT})})}return(s,t)=>(p(),T(O,null,[d.value?(p(),I(B,{key:0})):S("",!0),e("div",C,[L,e("div",U,[F,h(e("input",{type:"text",class:"form-control",id:"",placeholder:"","onUpdate:modelValue":t[0]||(t[0]=o=>g(l)?l.value=o:l=o)},null,512),[[f,m(l)]])]),e("div",R,[N,h(e("input",{type:"text",class:"form-control",id:"",placeholder:"","onUpdate:modelValue":t[1]||(t[1]=o=>g(a)?a.value=o:a=o)},null,512),[[f,m(a)]])]),e("div",V,[A,e("input",{class:"form-control",accept:"image/*",type:"file",id:"formFile",onChange:v},null,32),e("div",D,[e("img",{src:s.thumbnailSrc,alt:"",style:{width:"100%"}},null,8,H)])]),e("div",M,[e("img",{src:m(_),alt:"",style:{width:"100%"}},null,8,E)]),G,e("div",{onClick:b,class:"btn btn-success",style:{"margin-top":"1rem",right:"0",float:"right"}}," Tạo mới ")])],64))}},q=y(P,[["__scopeId","data-v-33584c43"]]);export{q as default};