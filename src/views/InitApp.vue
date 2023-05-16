

<script >
import { defineComponent } from 'vue';
import { mapGetters } from "vuex";

export default defineComponent({
  name: 'Tab2Page',
   computed : {
    ...mapGetters([
        'getUser'
    ]),
  },
  beforeMount(){

    if (this.$route.path == '/') {

      if (this.getUser.id != null ) {
        if (this.getUser.is_admin) {
          location.href = '/admin/users'
        }else{
          location.href = '/user/envios'
        }
      }else{
        location.href = '/login'
      } 
    }
  },
});
</script>
