<template>
  <ion-app>
    <ion-router-outlet :key="data" />
  </ion-app>
</template>

<script>
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import { defineComponent } from 'vue';
import { mapGetters} from "vuex";

export default defineComponent({
	name: 'App',
	components: {
	IonApp,
	IonRouterOutlet
	},
	data(){
	return{
		data : 0
	}
	},
	computed : {
	...mapGetters([
	'getUser'
	]),
	},
	
	watch: {
	$route(to, from) {
		this.data++
		this.path = to.path
		this.from = from.path
	}
	},
});
</script>

<style type="text/css">

</style>