<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Envios</ion-title>
         <ion-progress-bar v-if="loading" type="indeterminate"></ion-progress-bar>
      </ion-toolbar>
    </ion-header>
    <ion-content >
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Envios</ion-title>
         
        </ion-toolbar>
      </ion-header>
      <div id="container">
        <div v-if="step == 1">
          <div v-for="type in types" :key="type" >
            <br>
            <ion-chip  @click="selectType(type)">
              <ion-avatar>
                <img alt="Icono del tipo de envio" :src="baseURL+'/'+type.icon_path" />
              </ion-avatar>
              <ion-label>{{type.name}}</ion-label>
            </ion-chip>
            <!--<ion-button color="primary" :title="type.name" @click="selectType(type)">
              {{type.name}}
            </ion-button>-->
          </div>
        </div>
      </div>  
      <div v-if="step == 2">
        <ion-grid>
          <ion-row>
            <ion-col size="6" :key="photo" v-for="photo in photos">
              <img
                :src="photo.url"
                @click="showOption(photo)"
              >
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    
      <ion-fab v-if="step == 2" vertical="bottom" horizontal="start" slot="fixed">
        <ion-fab-button  @click="step = 1">
          <ion-icon :icon="arrowBack"></ion-icon>
        </ion-fab-button>
      </ion-fab>
      
      <ion-fab v-if="step == 2" vertical="bottom" horizontal="center" slot="fixed">
        
        <ion-fab-button @click="takePicture()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
        
      
      </ion-fab>
      
       <ion-fab v-if="step == 2" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button @click="sendShipment"> 
          <ion-icon :icon="send"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    
    </ion-content>
  </ion-page>
</template>

<script >
import { defineComponent } from 'vue';
import axios from 'axios'
import { IonPage, IonAvatar, IonChip, IonLabel,actionSheetController, IonHeader, IonProgressBar, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton  ,isPlatform ,IonCol,IonRow } from '@ionic/vue';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Geolocation } from '@capacitor/geolocation';
import { Capacitor } from '@capacitor/core';
import { camera,arrowBack, share, trash, close ,send} from 'ionicons/icons';
import { mapGetters } from 'vuex'
import toast from '@/plugins/toast'

export default  defineComponent({
  name: 'Tab1Page',
  components: {  IonAvatar,IonChip, IonLabel,IonHeader,IonCol,IonRow, IonToolbar, IonProgressBar, IonTitle, IonContent, IonPage, IonFab, IonFabButton },
  data(){
    return{
      baseURL : axios.defaults.baseURL,
      types : [],
      loading : true,
      type_shipment : null,
      step : 1,
      photos : [],
      photo_files :[],
      position : null
    }
  },
  setup(){
    return{
      camera, trash, close ,share,send,arrowBack
    }
  },
  async mounted(){
   
   
    if (this.types.length == 0) {
      this.getTypes();
    }
    this.position = await this.printCurrentPosition()
     console.log(this.position)
  },
  computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  methods :{
     async showOption (photo){
      const actionSheet = await actionSheetController.create({
        header: 'Fotos',
        buttons: [
          {
            text: 'Borrar',
            role: 'destructive',
            icon: trash,
            handler: () => {
              this.deletePhoto(photo);
            },
          },
          {
            text: 'Cancelar',
            icon: close,
            role: 'cancel',
            handler: () => {
              // Nothing to do, action sheet is automatically closed
            },
          },
        ],
      });
      await actionSheet.present();
    },
    async sendShipment(){

      var loading = await toast.showLoading()

      loading.present();
     
      var formData = new FormData;
     
      formData.append("type_shipment_id",this.type_shipment.id)
      formData.append("latitude",this.position?.coords?.latitude ?? '')
      formData.append("longitude",this.position?.coords?.longitude ?? '')
      
      for (var i = 0; i < this.photo_files.length; i++) {
        formData.append("photo-"+i,this.photo_files[i])
      }
      
      axios.post('/api/shipments',formData)
      .then(res =>{
        loading.dismiss()
        console.log(res)
        location.reload()
        toast.openToast("Envio registrado exitosamente","success",10000);
      }).catch(error => {
        loading.dismiss()
        if (error.response.status == 400) {
          toast.openToast("Creendenciales Invalidas","error",10000);
        }
        console.log(error)
      })
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
    selectType(type){
      this.type_shipment = type
      this.step = 2
    },
    async selectPicture(){

      const photo = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.PHOTOS,
        quality: 100,
      });
      console.log(photo)
      const fileName = new Date().getTime() + '.jpeg';
      const savedFileImage = await this.savePicture(photo, fileName);

      this.photos = [savedFileImage, ...this.photos];
      console.log(this.photos)
    },
    async takePicture(){
      
      const photo = await Camera.getPhoto({
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        quality: 20,
      });

      this.loading = true
      
      const fileName = new Date().getTime() + '.' + photo.format;
      const file = this.dataURLtoFile(photo.dataUrl,fileName)
      
      if (file.size > 500000) {
        const buf = Buffer.from(photo.dataUrl.split(',')[1], 'base64');
        
        var self = this
        
        window.jimp.read(buf).then(info => {
          info.resize(550, window.jimp.AUTO,window.jimp.RESIZE_BEZIER)
          .getBase64(window.jimp.MIME_PNG, function (err, src) {
            var file_ = self.dataURLtoFile(src,fileName)
            self.photo_files.push(file_)
            self.photos.push({url : URL.createObjectURL(file_), name : fileName })
            console.log("new ->" , file_)
            self.loading = false
          })
        })
        .catch(err => {
          self.loading = false
          console.log('error - '+err)
        })
      
      }else{
        this.loading = false
        this.photo_files.push(file)
        this.photos.push({url : URL.createObjectURL(file), name : fileName })
      }
    
    },
    dataURLtoFile : function(dataurl, filename) {
      var arr = dataurl.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]), 
          n = bstr.length, 
          u8arr = new Uint8Array(n);
          
      while(n--){
          u8arr[n] = bstr.charCodeAt(n);
      }
      
      return new File([u8arr], filename, {type:mime});
    },
    async savePicture(photo,fileName){
      let base64Data;
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
        
      // "hybrid" will detect Cordova or Capacitor;
      if (isPlatform('hybrid')) {
        const file = await Filesystem.readFile({
          // eslint-disable-next-line
          path: photo.path,
        });
        base64Data = file.data;
      } else {
        // Fetch the photo, read as a blob, then convert to base64 format
        // eslint-disable-next-line
        base64Data = await this.convertBlobToBase64(blob);
      }

      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
      });

      if (isPlatform('hybrid')) {
        // Display the new image by rewriting the 'file://' path to HTTP
        // Details: https://ionicframework.com/docs/building/webview#file-protocol
        return {
          blob : blob,
          filepath: savedFile.uri,
          webviewPath: Capacitor.convertFileSrc(savedFile.uri),
        };
      } else {
        // Use webPath to display the new image instead of base64 since it's
        // already loaded into memory
        return {
          blob : blob,
          filepath: fileName,
          webviewPath: photo.webPath,
        };
      }
    },
    async deletePhoto(photo){
      // Remove this photo from the Photos reference data array
     this.photos = this.photos.filter((p) => p.url !== photo.url);
     this.photo_files = this.photo_files.filter((p) => p.name !== photo.name);

      // delete photo file from filesystem
     // const filename = this.photo.filepath.substr(photo.filepath.lastIndexOf('/') + 1);
      /*await Filesystem.deleteFile({
        path: filename,
        directory: Directory.Data,
      });*/
    },
    async printCurrentPosition(){
      const coordinates = await Geolocation.getCurrentPosition();

      return coordinates
    },
    async convertBlobToBase64(blob){
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onerror = reject;
        reader.onload = () => {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    }
  }
});
</script>

<style scoped>
  #container {
    text-align: center;
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  #container strong {
    font-size: 20px;
    line-height: 26px;
  }

  #container p {
    font-size: 16px;
    line-height: 22px;
    color: #8c8c8c;
    margin: 0;
  }

  #container a {
    text-decoration: none;
  }
</style>