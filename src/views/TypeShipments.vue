<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Tipo de envios</ion-title>
         <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content >
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Tipo de envios</ion-title>
        </ion-toolbar>
      </ion-header>
      <br><br>
      <ion-row>
        <ion-col sizeLg="4" sizeMd="6" sizeXs="10" >
          <ion-searchbar style="margin-left: 11px;" :debounce="1000" v-model="filter_like" @ionChange="getFilterUsers" animated="true" show-clear-button="focus"  placeholder="Buscar tipo de envio" cancel-button-text="Custom Cancel"></ion-searchbar>
        </ion-col>

        <ion-col>
          <ion-button color="primary" title="Agregar tipo de envio" @click="isOpenAdd = true" style="float: right;margin-right: 25px;" >
            <ion-icon  :icon="add" :ios="addOutline" :md="add"></ion-icon>
          </ion-button>
        </ion-col>
      </ion-row>
      <br><br>
       <ion-modal :is-open="isOpenAdd" @ionModalWillDismiss="isOpenAdd = false" :enter-animation="enterAnimation" :leave-animation="leaveAnimation">
        <ion-header>
          <ion-toolbar>
            <ion-title>Agregar tipo de envio</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpenAdd(false)">
                <ion-icon  :icon="close" :ios="closeOutline" :md="close"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-progress-bar v-if="loadingAdd" type="indeterminate"></ion-progress-bar>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <br>
          <div style="justify-content: center;display: flex;">
             <ion-thumbnail slot="start" @click="showFileAdd()" >
              <div class="pencil-icon">
                <img src="/assets/icon/pencil-white.svg">
              </div>
              <ion-img class="border-img" id="icon-path-add" src="https://ionicframework.com/docs/img/demos/avatar.svg"></ion-img>
            </ion-thumbnail>
            <input type="file" ref="file" id="icon-add" @change="getFileAdd($event)"  accept="image/*" style="display: none;">
          </div>
        
          <br>
        
          <ion-input type="text"  v-model="name" placeholder="Ingrese el nombre"/>
          
          <div style="text-align: center;">
            <ion-button :disabled="loadingEdit"  color="primary" @click="addType()">
              Enviar
            </ion-button>
          </div>
       
        </ion-content>
      </ion-modal>
      
      <ion-modal :is-open="isOpenEdit" @ionModalWillDismiss="isOpenEdit = false" :enter-animation="enterAnimation" :leave-animation="leaveAnimation">
        <ion-header>
          <ion-toolbar>
            <ion-title>Editar tipo de envio</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpenEdit(false)">
                <ion-icon  :icon="close" :ios="closeOutline" :md="close"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-progress-bar v-if="loadingEdit" type="indeterminate"></ion-progress-bar>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <br>
          <div style="justify-content: center;display: flex;">
             <ion-thumbnail slot="start" @click="showFile()" >
              <div class="pencil-icon">
                <img src="/assets/icon/pencil-white.svg">
              </div>
              <ion-img class="border-img" id="icon-path" :src="type.icon_path == '' ? 'https://ionicframework.com/docs/img/demos/avatar.svg' : baseURL+'/'+type.icon_path"></ion-img>
            </ion-thumbnail>
            <input type="file" ref="file" id="icon" @change="getFile($event)"  accept="image/*" style="display: none;">
          </div>
          <br>
          <ion-input type="text"  v-model="type.name" placeholder="Ingrese el nombre"/>
          
          <div style="text-align: center;">
            <ion-button :disabled="loadingEdit"  color="primary" @click="editType()">
              Enviar
            </ion-button>
          </div>
       
        </ion-content>
      </ion-modal>
      
      <div style="margin-left: 24px;margin-right: 24px;">
        <div class="card">
          <table class="table table-responsive-sm table-striped table-align-middle">
            <thead>
              <tr>
                <th>Icono</th>
                 <th></th>
                <th>Descripción</th>
               
                <th></th>
                <th></th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="type in types.data" :key="type">
                <td>
                  <div style="justify-content: center;display: flex;">
                    <ion-thumbnail slot="start">
                      <ion-img class="border-img" :src="type.icon_path == '' ? 'https://ionicframework.com/docs/img/demos/avatar.svg' : baseURL+'/'+type.icon_path">
                      </ion-img>
                    </ion-thumbnail>
                  </div>
                </td>
                <td></td>
                <td>
                  {{type.name}}
                </td>
                <td>
                  
                </td>
                <td>
                  
                </td>
                <td>
                  <ion-button color="primary" title="Editar tipo de envio" @click="showModalEdit(type)">
                    <ion-icon  :icon="create" :ios="createOutline" :md="create"></ion-icon>
                  </ion-button>
                </td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="page navigation example">
            <ul class="pagination justify-content-center">
              <li  :class="{'page-item' : true , 'disabled' : !types.prev_page_url }">
                <a class="page-link"   @click="page(types.prev_page_url)" tabindex="-1">Anterior</a>
              </li>
              <li class="page-item"><a class="page-link">{{types.current_page}}</a></li>
              <li :class="{'page-item' : true , 'disabled' : !types.next_page_url }">
                <a class="page-link"  @click="page(types.next_page_url)">Siguiente</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
     

    </ion-content>
  </ion-page>
</template>

<script >

import { defineComponent } from 'vue';
import { 
  createAnimation,
  IonThumbnail, 
  IonImg,
  alertController,
  IonSearchbar,
  IonPage,
  IonButton, 
  IonInput, 
  IonHeader, 
  IonModal, 
  IonToolbar,
  IonProgressBar, 
  IonTitle, 
  IonContent 
} from '@ionic/vue';
import axios from 'axios'
import toast from '@/plugins/toast'
import { 
  addOutline,
  add,
  createOutline, 
  create,
  ban,
  banOutline,
  close,
  closeOutline,
  checkmarkCircleOutline,
  checkmarkCircle
} from 'ionicons/icons';

export default defineComponent({
  name: 'Tab2Page',
  components: { 
    IonThumbnail, 
    IonImg,
    IonHeader,
    IonSearchbar,
    IonModal,
    IonButton, 
    IonInput, 
    IonToolbar,
    IonProgressBar, 
    IonTitle, 
    IonContent, 
    IonPage 
  },
  data(){
    return{
      baseURL : axios.defaults.baseURL,
      types : [],
      type : null,
      name : null,
      icon_path : null,
      icon_path_add : null,
      loading : true,
      loadingAdd : false,
      loadingEdit : false,
      isOpenAdd : false,
      isOpenEdit : false
    }
  },
  setup(){
    const enterAnimation = (baseEl) => {
      const root = baseEl.shadowRoot;

      const backdropAnimation = createAnimation()
        .addElement(root.querySelector('ion-backdrop'))
        .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

      const wrapperAnimation = createAnimation()
        .addElement(root.querySelector('.modal-wrapper'))
        .keyframes([
          { offset: 0, opacity: '0', transform: 'scale(0)' },
          { offset: 1, opacity: '0.99', transform: 'scale(1)' },
        ]);

      return createAnimation()
        .addElement(baseEl)
        .easing('ease-out')
        .duration(500)
        .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    const leaveAnimation = (baseEl) => {
      return enterAnimation(baseEl).direction('reverse');
    };

    return{
      enterAnimation,
      leaveAnimation,
      createOutline,
      create,
      banOutline,
      close,
      closeOutline,
      ban,
      addOutline,
      add,
      checkmarkCircleOutline,
      checkmarkCircle
    }
  },
  mounted(){
    this.getTypes()
  },
  methods: {
    showFile(){
      document.querySelector('#icon').click()
    },
    showFileAdd(){
      document.querySelector('#icon-add').click()
    },
    getFile($event){
      var reader = new FileReader();
      
      reader.onload = function(){
        var logo_path = document.querySelector('#icon-path');
        logo_path.src = reader.result;
      };
      
      this.icon_path = $event.target.files[0]
      
      reader.readAsDataURL($event.target.files[0]);
    },
    getFileAdd($event){
      var reader = new FileReader();
      
      reader.onload = function(){
        var logo_path = document.querySelector('#icon-path-add');
        logo_path.src = reader.result;
      };
      
      this.icon_path_add = $event.target.files[0]
      
      reader.readAsDataURL($event.target.files[0]);
    },
    setOpenAdd(isOpen) {
      this.isOpenAdd = isOpen;
    },
    setOpenEdit(isOpen) {
      this.isOpenEdit = isOpen;
    },
    showModalEdit(type){
      this.type = type;
      this.isOpenEdit = true;
    },
    getTypes(){
     axios.get('/api/type_shipments')
      .then(res => {
       this.types = res.data.data
       this.loading = false
      })
      .catch(error => {
        this.loading = false
        console.log(error);
      });
    },
    getFilterUsers(){
      this.loading = true

      axios.get('/api/type_shipments?filter_like='+this.filter_like)
      .then(res => {
       this.types = res.data.data
       this.loading = false
      })
      .catch(error => {
        this.loading = false
        console.log(error);
      });
    },
    addType(){

      this.loadingAdd = true
      
      var formData = new FormData;

      formData.append("icon_path",this.icon_path_add)
      formData.append("name",this.name)
      
      axios.post('/api/type_shipments',formData)
      .then(res => {
        console.log(res)
        toast.openToast("Tipo de envio registrado exitosamente","success",10000);
        this.loadingAdd = false
        this.isOpenAdd = false
        this.getTypes()

      })
      .catch(error => {
        this.isOpenAdd = false
        console.log(error);
      });
    },
    editType(){

      this.loadingEdit = true
      
      var formData = new FormData;
      formData.append("icon_path",this.icon_path)
      formData.append("name",this.type.name)
      
      axios.post('/api/type_shipments/'+this.type.id,formData)
      .then(res => {
        console.log(res)
        toast.openToast("Tipo de envio modificado exitosamente","success",10000);
        this.loadingEdit = false
        this.isOpenEdit = false
        this.getTypes()

      })
      .catch(error => {
        this.loadingEdit = false
        console.log(error);
      });
    },
    async confirmDisabledUser(user){
      const alert = await alertController.create({
        header: 'Confirmación',
        message: '¿Realmente desea deshabilitar al usuario '+user.first_name+' '+user.last_name+'?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log("Usuario cancelado")
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              this.disabledUser(user);
            },
          },
        ],
      });

      await alert.present();

      //const { role } = await alert.onDidDismiss();
     
    },
    disabledUser(user){
      
      this.loading = true

      axios.delete('/api/users/'+user.id)
      .then(res => {
        toast.openToast("Usuario deshabilitado exitosamente","success",10000);
        console.log(res)
        this.getUsers()
        this.loading = false
      })
      .catch(error => {
        this.loading = false
        console.log(error);
      });
    },
    async confirmEnableUser(user){
      const alert = await alertController.create({
        header: 'Confirmación',
        message: '¿Realmente desea habilitar al usuario '+user.first_name+' '+user.last_name+'?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log("Usuario cancelado")
            },
          },
          {
            text: 'OK',
            role: 'confirm',
            handler: () => {
              this.enabledUser(user);
            },
          },
        ],
      });

      await alert.present();

      //const { role } = await alert.onDidDismiss();
     
    },
    enabledUser(user){
      
      this.loading = true

      axios.put('/api/users/'+user.id)
      .then(res => {
        toast.openToast("Usuario habilitado exitosamente","success",10000);
        console.log(res)
        this.getUsers()
        this.loading = false
      })
      .catch(error => {
        this.loading = false
        console.log(error);
      });
    },
    page(url){
      
      this.loading = true

      axios.get(url)
      .then(res => {
        this.types = res.data.data
        this.loading = false
      })
      .catch(error => {
        this.loading = false
        console.log(error);
      });
    }
  }
});
</script>

<style scoped>

ion-input {
  background: rgba(63,81,181,.15);
  border-radius: 20px;
  padding: 5px 8px !important;
  margin: 10px 0;
  text-align: center;
}
.border-img{
  border-radius: 15px;
}

.pencil-icon{
  display: block;
  width: 19px;
  height: 19px;
  border-radius: 100%;
  background-color: #3880ff;
  margin-left: 35px;
  margin-top: -7px;
  position: absolute;
  text-align: center;
}

</style>

