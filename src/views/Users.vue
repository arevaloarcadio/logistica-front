<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Usuarios</ion-title>
         <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Usuarios</ion-title>
        </ion-toolbar>
      </ion-header>
      <br><br>
      <ion-row>
        <ion-col sizeLg="4" sizeMd="4" sizeXs="8" >
          <ion-searchbar style="margin-left: 11px;" :debounce="1000" v-model="filter_like" @ionChange="getFilterUsers" animated="true" show-clear-button="focus"  placeholder="Buscar usuario" cancel-button-text="Custom Cancel"></ion-searchbar>
        </ion-col>

        <ion-col  >
          <ion-button color="primary" title="Agregar Usuario" @click="isOpenAdd = true" style="float: right;margin-right: 25px;" >
            <ion-icon  :icon="personAdd" :ios="personAddOutline" :md="personAdd"></ion-icon>
          </ion-button>
        </ion-col>
      </ion-row>
      <br><br>
      <div style="margin-left: 24px;margin-right: 24px;">
        <div class="card">
          <table class="table table-responsive-sm table-striped table-align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Correo Electrónico</th>
                <th>Estatus</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users.data" :key="user">
                <td>{{user.first_name}}</td>
                <td>{{user.last_name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.is_active == true ? 'Habilitado' : 'Deshabilitado' }}</td>
                <td>
                  <ion-button color="primary" title="Editar Usuario" @click="showModalEdit(user)">
                    <ion-icon  :icon="create" :ios="createOutline" :md="create"></ion-icon>
                  </ion-button>
                  <ion-button v-if="!user.is_admin && user.is_active" color="danger" title="Deshabilitar Usuario" @click="confirmDisabledUser(user)">
                    <ion-icon  :icon="ban" :ios="banOutline" :md="ban"></ion-icon>
                  </ion-button>
                  <ion-button v-if="!user.is_active" color="success" title="Habilitar Usuario" @click="confirmEnableUser(user)">
                    <ion-icon  :icon="checkmarkCircle" :ios="checkmarkCircleOutline" :md="checkmarkCircle"></ion-icon>
                  </ion-button>
                </td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="page navigation example">
            <ul class="pagination justify-content-center">
              <li  :class="{'page-item' : true , 'disabled' : !users.prev_page_url }">
                <a class="page-link"   @click="page(users.prev_page_url)" tabindex="-1">Anterior</a>
              </li>
              <li class="page-item"><a class="page-link">{{users.current_page}}</a></li>
              <li :class="{'page-item' : true , 'disabled' : !users.next_page_url }">
                <a class="page-link"  @click="page(users.next_page_url)">Siguiente</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <ion-modal :is-open="isOpenAdd" @ionModalWillDismiss="isOpenAdd = false" :enter-animation="enterAnimation" :leave-animation="leaveAnimation">
        <ion-header>
          <ion-toolbar>
            <ion-title>Agregar Usuario</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpenAdd(false)">
                <ion-icon  :icon="close" :ios="closeOutline" :md="close"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-progress-bar v-if="loadingAdd" type="indeterminate"></ion-progress-bar>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-input type="text"  v-model="first_name" placeholder="Ingrese el nombre"/>
          <ion-input type="text"  v-model="last_name" placeholder="Ingrese el apellido"/>
          <ion-input type="text"  v-model="email" placeholder="Ingrese el correo electrónico"/>
          <!--<ion-input type="text"  v-model="user_name" placeholder="Ingrese el usuario"/>-->
          <ion-input type="password"  v-model="password" placeholder="Ingrese la contreseña"/>
          <ion-input type="password"  v-model="password_confirmation" placeholder="Repite la contreseña"/>
          
          <div style="text-align: center;">
            <ion-button  :disabled="loadingAdd"  color="primary" @click="addUser()">
              Enviar
            </ion-button>
          </div>
       
        </ion-content>
      </ion-modal>
      
      <ion-modal :is-open="isOpenEdit" @ionModalWillDismiss="isOpenEdit = false" :enter-animation="enterAnimation" :leave-animation="leaveAnimation">
        <ion-header>
          <ion-toolbar>
            <ion-title>Editar Usuario</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpenEdit(false)">
                <ion-icon  :icon="close" :ios="closeOutline" :md="close"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-progress-bar v-if="loadingEdit" type="indeterminate"></ion-progress-bar>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-input type="text"  v-model="user.first_name" placeholder="Ingrese el nombre"/>
          <ion-input type="text"  v-model="user.last_name" placeholder="Ingrese el apellido"/>
          <ion-input type="text"  v-model="user.email" placeholder="Ingrese el correo electrónico"/>
          <!--<ion-input type="text"  v-model="user_name" placeholder="Ingrese el usuario"/>-->
          <ion-input type="password"  v-model="user.password" placeholder="Ingrese la contreseña"/>
          <ion-input type="password"  v-model="user.password_confirmation" placeholder="Repite la contreseña"/>
          
          <div style="text-align: center;">
            <ion-button :disabled="loadingEdit"  color="primary" @click="editUser()">
              Enviar
            </ion-button>
          </div>
       
        </ion-content>
      </ion-modal>

    </ion-content>
  </ion-page>
</template>

<script >
import { defineComponent } from 'vue';
import { createAnimation,alertController,IonSearchbar , IonPage,IonButton, IonInput, IonHeader,IonModal, IonToolbar,IonProgressBar, IonTitle, IonContent } from '@ionic/vue';
import axios from 'axios'
import toast from '@/plugins/toast'
import { 
  personAddOutline,
  personAdd,
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
  components: {  IonHeader,IonSearchbar ,IonModal,IonButton, IonInput, IonToolbar,IonProgressBar, IonTitle, IonContent, IonPage },
  data(){
    return{
      first_name : null,
      last_name : null,
      email : null,
      password : null,
      password_confirmation : null,
      users : [],
      user : null,
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
      personAddOutline,
      personAdd,
      checkmarkCircleOutline,
      checkmarkCircle
    }
  },
  mounted(){
    this.getUsers()
  },
  methods: {
    setOpenAdd(isOpen) {
      this.isOpenAdd = isOpen;
    },
    setOpenEdit(isOpen) {
      this.isOpenEdit = isOpen;
    },
    showModalEdit(user){
      this.user = user;
      this.isOpenEdit = true;
    },
    getUsers(){
      axios.get('/api/users')
      .then(res => {
       this.users = res.data.data
       this.loading = false
      })
      .catch(error => {
        this.loading = false
        console.log(error);
      });
    },
    getFilterUsers(){
      this.loading = true

      axios.get('/api/users?filter_like='+this.filter_like)
      .then(res => {
       this.users = res.data.data
       this.loading = false
      })
      .catch(error => {
        this.loading = false
        console.log(error);
      });
    },
    addUser(){

      this.loadingAdd = true

      axios.post('/api/users',{
        first_name : this.first_name,
        last_name : this.last_name,
        email : this.email,
        password : this.password, 
        password_confirmation : this.password_confirmation, 
      })
      .then(res => {
        console.log(res)
        toast.openToast("Usuario registrado exitosamente","success",10000);
        this.loadingAdd = false
        this.getUsers()
        this.isOpenAdd = false
      })
      .catch(error => {
        this.loadingAdd = false
        console.log(error);
      });
    },
    editUser(){

      this.loadingEdit = true

      axios.post('/api/users/'+this.user.id,{
        first_name : this.user.first_name,
        last_name : this.user.last_name,
        email : this.user.email,
        password : this.user.password ?? null, 
        password_confirmation : this.user.password_confirmation ?? null, 
      })
      .then(res => {
        console.log(res)
        toast.openToast("Usuario modificado exitosamente","success",10000);
        this.loadingEdit = false
        this.getUsers()
        this.isOpenEdit = false
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
        this.users = res.data.data
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

</style>

