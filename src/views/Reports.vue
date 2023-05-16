<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Reportes de Envios</ion-title>
         <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content >
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Reportes de Envios</ion-title>
        </ion-toolbar>
      </ion-header>
      <br><br>
      <ion-row style="margin-left: 20px;">
        <ion-col sizeLg="3" sizeMd="3" sizeXs="11">
           <ion-input placeholder="Buscar chofer" v-model="filter_like_user"/>
        </ion-col>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <ion-col sizeLg="2" sizeMd="3" sizeXs="11">
          <input type="text" onfocus="(this.type='date')" @change="getFilterShipments" v-model="from_date" placeholder="Fecha desde" class="input-date">
        </ion-col>
        <ion-col sizeLg="2" sizeMd="3" sizeXs="11">
          <input type="text" onfocus="(this.type='date')" @change="getFilterShipments" v-model="to_date" placeholder="Fecha hasta" class="input-date">
        </ion-col>
        <ion-col sizeLg="3" sizeMd="3" sizeXs="11">
          <ion-select  class="input-date" v-model="type_shipment_id" @ionChange="getFilterShipments" placeholder="Seleccione el tipo de envio" interface="action-sheet" > 
            <ion-select-option value="" >Cualquiera</ion-select-option>
            <ion-select-option v-for="type in types" :key="type" :value="type.id" >{{type.name}}</ion-select-option>
            
          </ion-select>
        </ion-col>
      </ion-row>
      <br><br>
      <div style="margin-left: 24px;margin-right: 24px;">
        <div class="card">
          <table class="table table-responsive-sm table-striped table-align-middle">
            <thead>
              <tr>
                <th>Chofer</th>
                <th>Tipo de Envio</th>
                <th>Fecha de registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="shipment in shipments.data" :key="shipment">
                <td>{{shipment?.user?.first_name}} {{shipment?.user?.last_name}} </td>
                <td>{{shipment?.type_shipment?.name}}</td>
                <td>{{ new Date(shipment?.created_at).toLocaleDateString()}} {{ new Date(shipment?.created_at).toLocaleTimeString()}}</td>
                <td>
                  <ion-button color="primary" title="Ver detalles" @click="setOpenDetails(true,shipment)">
                    <ion-icon  :icon="eye" :ios="eyeOutline" :md="eye"></ion-icon>
                  </ion-button>
                </td>
              </tr>
            </tbody>
          </table>
          <nav aria-label="page navigation example">
            <ul class="pagination justify-content-center">
              <li  :class="{'page-item' : true , 'disabled' : !shipments.prev_page_url }">
                <a class="page-link"   @click="page(shipments.prev_page_url)" tabindex="-1">Anterior</a>
              </li>
              <li class="page-item"><a class="page-link">{{shipments.current_page}}</a></li>
              <li :class="{'page-item' : true , 'disabled' : !shipments.next_page_url }">
                <a class="page-link"  @click="page(shipments.next_page_url)">Siguiente</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <ion-modal :is-open="isOpenDetails" class="modal-a" @ionModalWillDismiss="isOpenDetails = false" :enter-animation="enterAnimation" :leave-animation="leaveAnimation">
        <ion-header>
          <ion-toolbar>
            <ion-title>Detalles del Envio</ion-title>
            <ion-buttons slot="end">
              <ion-button @click="setOpenDetails(false)">
                <ion-icon  :icon="close" :ios="closeOutline" :md="close"></ion-icon>
              </ion-button>
            </ion-buttons>
            <ion-progress-bar v-if="loadingEdit" type="indeterminate"></ion-progress-bar>
          </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
          <ion-item lines="none">
            <ion-label >
              Chofer: <b>{{shipment?.user?.first_name}} {{shipment?.user?.last_name}}</b>
            </ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-label >
              Tipo de envio: <b>{{shipment?.type_shipment?.name}}</b>
            </ion-label>
          </ion-item>
           <ion-item lines="none" v-if="shipment?.latitude != null && shipment?.latitude != null">
            <ion-label>
              Coordenadas
            </ion-label>
          </ion-item>
           <ion-item lines="none" v-if="shipment?.latitude != null && shipment?.latitude != null">
            <ion-label>
              Latitud: <b>{{shipment?.latitude}}</b> &nbsp;&nbsp;
              Longitud: <b>{{shipment?.longitude}}</b>
            </ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-label >
              Fecha de registro: <b>{{new Date(shipment?.created_at).toLocaleDateString()}} {{ new Date(shipment?.created_at).toLocaleTimeString()}}</b>
            </ion-label>
          </ion-item>
          <br>
           <div style="margin-left: 15px;display: flex; overflow-x: auto;white-space: nowrap;">
            <template v-for="image in shipment?.images" :key="image">
               <img style="height:210px;border-radius: 15px" :src="baseURL+'/'+image.path">   &nbsp;&nbsp;&nbsp;&nbsp;
             </template>
          </div>
          <br><br><br><br>
        </ion-content>
      </ion-modal>
    </ion-content>
  </ion-page>
</template>

<script >
import { defineComponent } from 'vue';
import { createAnimation ,IonSelect,IonSelectOption,IonInput,IonPage,IonButton, IonHeader,IonModal, IonToolbar,IonProgressBar, IonTitle, IonContent } from '@ionic/vue';
import axios from 'axios'
//import toast from '@/plugins/toast'
import { 
  personAddOutline,
  personAdd,
  eyeOutline, 
  eye,
  ban,
  banOutline,
  close,
  closeOutline,
  checkmarkCircleOutline,
  checkmarkCircle
} from 'ionicons/icons';

export default defineComponent({
  name: 'Tab2Page',
  components: {  IonHeader ,IonInput,IonSelect,IonSelectOption,IonModal,IonButton, IonToolbar,IonProgressBar, IonTitle, IonContent, IonPage },

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
      eyeOutline,
      eye,
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
  data(){
    return{
      baseURL : axios.defaults.baseURL,
      first_name : null,
      last_name : null,
      email : null,
      password : null,
      types : [],
      password_confirmation : null,
      shipments : [],
      shipment : null,
      loading : true,
      isOpenDetails : false,
      filter_like_user: null,
      from_date: null,
      to_date: null,
      type_shipment_id: null,
      awaitingSearch : false,
      timer : null
    }
  },
  watch: {
    filter_like_user: function () {
      
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.awaitingSearch = false;
        this.getFilterShipments()
      }, 1000); // 1 sec delay
    },
  },
  mounted(){
    this.getTypes()
    this.getShipments()
  },
  methods: {
    setOpenDetails(isOpen,shipment = null){
      console.log(isOpen)
      this.isOpenDetails = isOpen;
      this.shipment = shipment;
    },
    getShipments(){
      axios.get('/api/shipments')
      .then(res => {
       this.shipments = res.data.data
       this.loading = false
      })
      .catch(error => {
        this.loading = false
        console.log(error);
      });
    },
    getTypes(){
     axios.get('/api/type_shipments?all=true')
      .then(res => {
       this.types = res.data.data
       this.loading = false
      })
      .catch(error => {
        this.loading = false
        console.log(error);
      });
    },
    getFilterShipments(){
      this.loading = true
      
      if (
        this.filter_like_user == null && 
        this.from_date == null && 
        this.to_date == null &&
        this.type_shipment_id == null
      ){
        this.getShipments()
        return
      }
      
      axios.post('/api/shipments/search',{
        filter_like_user : this.filter_like_user,
        from_date : this.from_date,
        to_date : this.to_date,
        type_shipment_id : this.type_shipment_id,
      })
      .then(res => {
       this.shipments = res.data.data
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
        this.shipments = res.data.data
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
  width: 100%;
  height: 40px;
}


ion-input:focus {
  border-color: #fff !important;
}

ion-select {
  background: rgba(63,81,181,.15);
  border-radius: 20px;
  padding: 5px 8px !important;
  margin: 10px 0;
  text-align: center;
}
ion-label{
 color: #666666 !important;
}

.input-date{
  background: rgba(63,81,181,.15);
  border-radius: 20px;
  border-width: 0px;
  padding: 5px 8px !important;
  margin: 10px 0;
  text-align: center;
  height: 40px;
  width: 100%;
}

</style>

