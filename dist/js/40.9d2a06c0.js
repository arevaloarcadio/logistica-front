"use strict";(self["webpackChunkionic_app_base"]=self["webpackChunkionic_app_base"]||[]).push([[40],{40:function(e,l,a){a.r(l),a.d(l,{default:function(){return E}});var n=a(6252),t=a(3577);const i=e=>((0,n.dD)("data-v-7ec4467c"),e=e(),(0,n.Cn)(),e),s=i((()=>(0,n._)("br",null,null,-1))),o=i((()=>(0,n._)("br",null,null,-1))),d=i((()=>(0,n._)("br",null,null,-1))),r=i((()=>(0,n._)("br",null,null,-1))),u={style:{"margin-left":"24px","margin-right":"24px"}},c={class:"card"},m={class:"table table-responsive-sm table-striped table-align-middle"},p=i((()=>(0,n._)("thead",null,[(0,n._)("tr",null,[(0,n._)("th",null,"Nombre"),(0,n._)("th",null,"Apellido"),(0,n._)("th",null,"Correo Electrónico"),(0,n._)("th",null,"Estatus"),(0,n._)("th",null,"Acciones")])],-1))),_={"aria-label":"page navigation example"},g={class:"pagination justify-content-center"},h={class:"page-item"},f={class:"page-link"},w={style:{"text-align":"center"}},b={style:{"text-align":"center"}};function k(e,l,a,i,k,U){const W=(0,n.up)("ion-title"),y=(0,n.up)("ion-progress-bar"),C=(0,n.up)("ion-toolbar"),V=(0,n.up)("ion-header"),A=(0,n.up)("ion-searchbar"),v=(0,n.up)("ion-col"),O=(0,n.up)("ion-icon"),E=(0,n.up)("ion-button"),I=(0,n.up)("ion-row"),x=(0,n.up)("ion-buttons"),Z=(0,n.up)("ion-input"),D=(0,n.up)("ion-content"),z=(0,n.up)("ion-modal"),j=(0,n.up)("ion-page");return(0,n.wg)(),(0,n.j4)(j,null,{default:(0,n.w5)((()=>[(0,n.Wm)(V,null,{default:(0,n.w5)((()=>[(0,n.Wm)(C,null,{default:(0,n.w5)((()=>[(0,n.Wm)(W,null,{default:(0,n.w5)((()=>[(0,n.Uk)("Usuarios")])),_:1}),e.loading?((0,n.wg)(),(0,n.j4)(y,{key:0,type:"indeterminate"})):(0,n.kq)("",!0)])),_:1})])),_:1}),(0,n.Wm)(D,null,{default:(0,n.w5)((()=>[(0,n.Wm)(V,{collapse:"condense"},{default:(0,n.w5)((()=>[(0,n.Wm)(C,null,{default:(0,n.w5)((()=>[(0,n.Wm)(W,{size:"large"},{default:(0,n.w5)((()=>[(0,n.Uk)("Usuarios")])),_:1})])),_:1})])),_:1}),s,o,(0,n.Wm)(I,null,{default:(0,n.w5)((()=>[(0,n.Wm)(v,{sizeLg:"4",sizeMd:"4",sizeXs:"8"},{default:(0,n.w5)((()=>[(0,n.Wm)(A,{style:{"margin-left":"11px"},debounce:1e3,modelValue:e.filter_like,"onUpdate:modelValue":l[0]||(l[0]=l=>e.filter_like=l),onIonChange:e.getFilterUsers,animated:"true","show-clear-button":"focus",placeholder:"Buscar usuario","cancel-button-text":"Custom Cancel"},null,8,["modelValue","onIonChange"])])),_:1}),(0,n.Wm)(v,null,{default:(0,n.w5)((()=>[(0,n.Wm)(E,{color:"primary",title:"Agregar Usuario",onClick:l[1]||(l[1]=l=>e.isOpenAdd=!0),style:{float:"right","margin-right":"25px"}},{default:(0,n.w5)((()=>[(0,n.Wm)(O,{icon:e.personAdd,ios:e.personAddOutline,md:e.personAdd},null,8,["icon","ios","md"])])),_:1})])),_:1})])),_:1}),d,r,(0,n._)("div",u,[(0,n._)("div",c,[(0,n._)("table",m,[p,(0,n._)("tbody",null,[((0,n.wg)(!0),(0,n.iD)(n.HY,null,(0,n.Ko)(e.users.data,(l=>((0,n.wg)(),(0,n.iD)("tr",{key:l},[(0,n._)("td",null,(0,t.zw)(l.first_name),1),(0,n._)("td",null,(0,t.zw)(l.last_name),1),(0,n._)("td",null,(0,t.zw)(l.email),1),(0,n._)("td",null,(0,t.zw)(1==l.is_active?"Habilitado":"Deshabilitado"),1),(0,n._)("td",null,[(0,n.Wm)(E,{color:"primary",title:"Editar Usuario",onClick:a=>e.showModalEdit(l)},{default:(0,n.w5)((()=>[(0,n.Wm)(O,{icon:e.create,ios:e.createOutline,md:e.create},null,8,["icon","ios","md"])])),_:2},1032,["onClick"]),!l.is_admin&&l.is_active?((0,n.wg)(),(0,n.j4)(E,{key:0,color:"danger",title:"Deshabilitar Usuario",onClick:a=>e.confirmDisabledUser(l)},{default:(0,n.w5)((()=>[(0,n.Wm)(O,{icon:e.ban,ios:e.banOutline,md:e.ban},null,8,["icon","ios","md"])])),_:2},1032,["onClick"])):(0,n.kq)("",!0),l.is_active?(0,n.kq)("",!0):((0,n.wg)(),(0,n.j4)(E,{key:1,color:"success",title:"Habilitar Usuario",onClick:a=>e.confirmEnableUser(l)},{default:(0,n.w5)((()=>[(0,n.Wm)(O,{icon:e.checkmarkCircle,ios:e.checkmarkCircleOutline,md:e.checkmarkCircle},null,8,["icon","ios","md"])])),_:2},1032,["onClick"]))])])))),128))])]),(0,n._)("nav",_,[(0,n._)("ul",g,[(0,n._)("li",{class:(0,t.C_)({"page-item":!0,disabled:!e.users.prev_page_url})},[(0,n._)("a",{class:"page-link",onClick:l[2]||(l[2]=l=>e.page(e.users.prev_page_url)),tabindex:"-1"},"Anterior")],2),(0,n._)("li",h,[(0,n._)("a",f,(0,t.zw)(e.users.current_page),1)]),(0,n._)("li",{class:(0,t.C_)({"page-item":!0,disabled:!e.users.next_page_url})},[(0,n._)("a",{class:"page-link",onClick:l[3]||(l[3]=l=>e.page(e.users.next_page_url))},"Siguiente")],2)])])])]),(0,n.Wm)(z,{"is-open":e.isOpenAdd,onIonModalWillDismiss:l[11]||(l[11]=l=>e.isOpenAdd=!1),"enter-animation":e.enterAnimation,"leave-animation":e.leaveAnimation},{default:(0,n.w5)((()=>[(0,n.Wm)(V,null,{default:(0,n.w5)((()=>[(0,n.Wm)(C,null,{default:(0,n.w5)((()=>[(0,n.Wm)(W,null,{default:(0,n.w5)((()=>[(0,n.Uk)("Agregar Usuario")])),_:1}),(0,n.Wm)(x,{slot:"end"},{default:(0,n.w5)((()=>[(0,n.Wm)(E,{onClick:l[4]||(l[4]=l=>e.setOpenAdd(!1))},{default:(0,n.w5)((()=>[(0,n.Wm)(O,{icon:e.close,ios:e.closeOutline,md:e.close},null,8,["icon","ios","md"])])),_:1})])),_:1}),e.loadingAdd?((0,n.wg)(),(0,n.j4)(y,{key:0,type:"indeterminate"})):(0,n.kq)("",!0)])),_:1})])),_:1}),(0,n.Wm)(D,{class:"ion-padding"},{default:(0,n.w5)((()=>[(0,n.Wm)(Z,{type:"text",modelValue:e.first_name,"onUpdate:modelValue":l[5]||(l[5]=l=>e.first_name=l),placeholder:"Ingrese el nombre"},null,8,["modelValue"]),(0,n.Wm)(Z,{type:"text",modelValue:e.last_name,"onUpdate:modelValue":l[6]||(l[6]=l=>e.last_name=l),placeholder:"Ingrese el apellido"},null,8,["modelValue"]),(0,n.Wm)(Z,{type:"text",modelValue:e.email,"onUpdate:modelValue":l[7]||(l[7]=l=>e.email=l),placeholder:"Ingrese el correo electrónico"},null,8,["modelValue"]),(0,n.Wm)(Z,{type:"password",modelValue:e.password,"onUpdate:modelValue":l[8]||(l[8]=l=>e.password=l),placeholder:"Ingrese la contreseña"},null,8,["modelValue"]),(0,n.Wm)(Z,{type:"password",modelValue:e.password_confirmation,"onUpdate:modelValue":l[9]||(l[9]=l=>e.password_confirmation=l),placeholder:"Repite la contreseña"},null,8,["modelValue"]),(0,n._)("div",w,[(0,n.Wm)(E,{disabled:e.loadingAdd,color:"primary",onClick:l[10]||(l[10]=l=>e.addUser())},{default:(0,n.w5)((()=>[(0,n.Uk)(" Enviar ")])),_:1},8,["disabled"])])])),_:1})])),_:1},8,["is-open","enter-animation","leave-animation"]),(0,n.Wm)(z,{"is-open":e.isOpenEdit,onIonModalWillDismiss:l[19]||(l[19]=l=>e.isOpenEdit=!1),"enter-animation":e.enterAnimation,"leave-animation":e.leaveAnimation},{default:(0,n.w5)((()=>[(0,n.Wm)(V,null,{default:(0,n.w5)((()=>[(0,n.Wm)(C,null,{default:(0,n.w5)((()=>[(0,n.Wm)(W,null,{default:(0,n.w5)((()=>[(0,n.Uk)("Editar Usuario")])),_:1}),(0,n.Wm)(x,{slot:"end"},{default:(0,n.w5)((()=>[(0,n.Wm)(E,{onClick:l[12]||(l[12]=l=>e.setOpenEdit(!1))},{default:(0,n.w5)((()=>[(0,n.Wm)(O,{icon:e.close,ios:e.closeOutline,md:e.close},null,8,["icon","ios","md"])])),_:1})])),_:1}),e.loadingEdit?((0,n.wg)(),(0,n.j4)(y,{key:0,type:"indeterminate"})):(0,n.kq)("",!0)])),_:1})])),_:1}),(0,n.Wm)(D,{class:"ion-padding"},{default:(0,n.w5)((()=>[(0,n.Wm)(Z,{type:"text",modelValue:e.user.first_name,"onUpdate:modelValue":l[13]||(l[13]=l=>e.user.first_name=l),placeholder:"Ingrese el nombre"},null,8,["modelValue"]),(0,n.Wm)(Z,{type:"text",modelValue:e.user.last_name,"onUpdate:modelValue":l[14]||(l[14]=l=>e.user.last_name=l),placeholder:"Ingrese el apellido"},null,8,["modelValue"]),(0,n.Wm)(Z,{type:"text",modelValue:e.user.email,"onUpdate:modelValue":l[15]||(l[15]=l=>e.user.email=l),placeholder:"Ingrese el correo electrónico"},null,8,["modelValue"]),(0,n.Wm)(Z,{type:"password",modelValue:e.user.password,"onUpdate:modelValue":l[16]||(l[16]=l=>e.user.password=l),placeholder:"Ingrese la contreseña"},null,8,["modelValue"]),(0,n.Wm)(Z,{type:"password",modelValue:e.user.password_confirmation,"onUpdate:modelValue":l[17]||(l[17]=l=>e.user.password_confirmation=l),placeholder:"Repite la contreseña"},null,8,["modelValue"]),(0,n._)("div",b,[(0,n.Wm)(E,{disabled:e.loadingEdit,color:"primary",onClick:l[18]||(l[18]=l=>e.editUser())},{default:(0,n.w5)((()=>[(0,n.Uk)(" Enviar ")])),_:1},8,["disabled"])])])),_:1})])),_:1},8,["is-open","enter-animation","leave-animation"])])),_:1})])),_:1})}var U=a(941),W=a(5980),y=a(196),C=a(5113),V=a(8903),A=(0,n.aZ)({name:"Tab2Page",components:{IonHeader:U.Gu,IonSearchbar:U.VI,IonModal:U.ki,IonButton:U.YG,IonInput:U.pK,IonToolbar:U.sr,IonProgressBar:U.X7,IonTitle:U.wd,IonContent:U.W2,IonPage:U._i},data(){return{first_name:null,last_name:null,email:null,password:null,password_confirmation:null,users:[],user:null,loading:!0,loadingAdd:!1,loadingEdit:!1,isOpenAdd:!1,isOpenEdit:!1}},setup(){const e=e=>{const l=e.shadowRoot,a=(0,W.c)().addElement(l.querySelector("ion-backdrop")).fromTo("opacity","0.01","var(--backdrop-opacity)"),n=(0,W.c)().addElement(l.querySelector(".modal-wrapper")).keyframes([{offset:0,opacity:"0",transform:"scale(0)"},{offset:1,opacity:"0.99",transform:"scale(1)"}]);return(0,W.c)().addElement(e).easing("ease-out").duration(500).addAnimation([a,n])},l=l=>e(l).direction("reverse");return{enterAnimation:e,leaveAnimation:l,createOutline:V.mjL,create:V.Ue8,banOutline:V.L6S,close:V.xvD,closeOutline:V.fID,ban:V.KC,personAddOutline:V.$$h,personAdd:V.vi8,checkmarkCircleOutline:V.Nwd,checkmarkCircle:V.I1A}},mounted(){this.getUsers()},methods:{setOpenAdd(e){this.isOpenAdd=e},setOpenEdit(e){this.isOpenEdit=e},showModalEdit(e){this.user=e,this.isOpenEdit=!0},getUsers(){y.Z.get("/api/users").then((e=>{this.users=e.data.data,this.loading=!1})).catch((e=>{this.loading=!1,console.log(e)}))},getFilterUsers(){this.loading=!0,y.Z.get("/api/users?filter_like="+this.filter_like).then((e=>{this.users=e.data.data,this.loading=!1})).catch((e=>{this.loading=!1,console.log(e)}))},addUser(){this.loadingAdd=!0,y.Z.post("/api/users",{first_name:this.first_name,last_name:this.last_name,email:this.email,password:this.password,password_confirmation:this.password_confirmation}).then((e=>{console.log(e),C.Z.openToast("Usuario registrado exitosamente","success",1e4),this.loadingAdd=!1,this.getUsers(),this.isOpenAdd=!1})).catch((e=>{this.loadingAdd=!1,console.log(e)}))},editUser(){this.loadingEdit=!0,y.Z.post("/api/users/"+this.user.id,{first_name:this.user.first_name,last_name:this.user.last_name,email:this.user.email,password:this.user.password??null,password_confirmation:this.user.password_confirmation??null}).then((e=>{console.log(e),C.Z.openToast("Usuario modificado exitosamente","success",1e4),this.loadingEdit=!1,this.getUsers(),this.isOpenEdit=!1})).catch((e=>{this.loadingEdit=!1,console.log(e)}))},async confirmDisabledUser(e){const l=await U.Cl.create({header:"Confirmación",message:"¿Realmente desea deshabilitar al usuario "+e.first_name+" "+e.last_name+"?",buttons:[{text:"Cancelar",role:"cancel",handler:()=>{console.log("Usuario cancelado")}},{text:"OK",role:"confirm",handler:()=>{this.disabledUser(e)}}]});await l.present()},disabledUser(e){this.loading=!0,y.Z["delete"]("/api/users/"+e.id).then((e=>{C.Z.openToast("Usuario deshabilitado exitosamente","success",1e4),console.log(e),this.getUsers(),this.loading=!1})).catch((e=>{this.loading=!1,console.log(e)}))},async confirmEnableUser(e){const l=await U.Cl.create({header:"Confirmación",message:"¿Realmente desea habilitar al usuario "+e.first_name+" "+e.last_name+"?",buttons:[{text:"Cancelar",role:"cancel",handler:()=>{console.log("Usuario cancelado")}},{text:"OK",role:"confirm",handler:()=>{this.enabledUser(e)}}]});await l.present()},enabledUser(e){this.loading=!0,y.Z.put("/api/users/"+e.id).then((e=>{C.Z.openToast("Usuario habilitado exitosamente","success",1e4),console.log(e),this.getUsers(),this.loading=!1})).catch((e=>{this.loading=!1,console.log(e)}))},page(e){this.loading=!0,y.Z.get(e).then((e=>{this.users=e.data.data,this.loading=!1})).catch((e=>{this.loading=!1,console.log(e)}))}}}),v=a(3744);const O=(0,v.Z)(A,[["render",k],["__scopeId","data-v-7ec4467c"]]);var E=O}}]);
//# sourceMappingURL=40.9d2a06c0.js.map