<template>
    <div>
        menu1_2
        <br>
        wode code shi {{code}}

        div

    </div>
</template>
<script>
import {mapState} from 'vuex'
import axios from 'axios'
export default {
   computed: {
       ...mapState({
           code: state => state.menu.code
       })
   },
   watch: {
       code: {
           handler(newVale) {
            //    this.initData()
           },
           deep: true
       }
   },
   methods: {
       initData() {
           axios.get(`${this.code}testhost`).then(res => {
               console.log(res)
           })
       }
   },
   created() {
    //    this.initData()
   }
}
</script>
<style scoped>

</style>

