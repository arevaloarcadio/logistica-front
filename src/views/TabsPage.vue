<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
    
      <ion-tab-bar slot="bottom">
        <ion-tab-button v-for="page in appPages" :class="{'not-active' : page.is_admin != getUser.is_admin } " :key="page" :tab="page.title" :href="page.url">
          <ion-icon :icon="page.mdIcon" :ios="page.iosIcon" :md="page.mdIcon" />
          <ion-label>{{page.title}}</ion-label>
        </ion-tab-button>
        
       <ion-tab-button @click="logout">
          <ion-icon :icon="logOutOutline"/>
          <ion-label>Salir</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    
    </ion-tabs>
  </ion-page>
</template>

<script >
import { defineComponent } from 'vue';
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { ellipse, square,paperPlaneOutline, triangle, personCircleOutline,clipboardOutline, peopleCircle,carOutline,logOutOutline } from 'ionicons/icons';
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'TabsPage',
  components: { IonLabel, IonTabs, IonTabBar, IonTabButton, IonIcon, IonPage, IonRouterOutlet },
  setup() {
    return {
      ellipse, 
      square, 
      triangle,
      personCircleOutline,
      carOutline,
      logOutOutline,
      peopleCircle,
      clipboardOutline,
      paperPlaneOutline
    }
  },
  data(){
    return{
      appPages : [
        {
          title: 'Envios',
          url: '/user/envios',
          meta : 'envios',
          is_admin: false,
          iosIcon: carOutline,
          mdIcon: carOutline
        },
        {
          title: 'Mis Envios',
          url: '/user/mis_envios',
          meta : 'mis-envios',
          is_admin: false,
          iosIcon: paperPlaneOutline,
          mdIcon: paperPlaneOutline
        },
        {
          title: 'Usuarios',
          url: '/admin/users',
          meta : 'usuarios',
          is_admin: true,
          iosIcon: peopleCircle,
          mdIcon: peopleCircle
        },
        {
          title: 'Reportes de Envios',
          url: '/admin/reports',
          meta : 'reportes-de-envios',
          is_admin: true,
          iosIcon: peopleCircle,
          mdIcon: peopleCircle
        },
        {
          title: 'Tipos de envios',
          url: '/admin/type-shipments',
          meta : 'reportes-de-envios',
          is_admin: true,
          iosIcon: paperPlaneOutline,
          mdIcon: paperPlaneOutline
        }
      ]  
    }
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods:{
    logout(){
      this.$store.dispatch('unsetAuthUser')
      .then(() => {
        location.href = "/login"
      });
    }
  }
});
</script>
<style type="text/css">
  .not-active{
    display: none;
  }
</style>