<!--
 * @Description: 
 * @Autor: cuiJian
 * @Date: 2019-12-10 17:07:58
 * @LastEditors: cuiJian
 * @LastEditTime: 2019-12-10 17:36:46
 -->
<template>
    <div>
        <input type="text" v-model='name' placeholder="name">
        <input type="text" v-model='title' placeholder="title">
        <input type="text" v-model='access' placeholder="access">
        <Button @click='handleAddMenu'>addMenu</Button>
        <Button @click='handleTestPost'>testPost</Button>
    </div>
</template>
<script>
import Menu12 from '../menu1/menu12'
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            name: '',
            title: '',
            access: 100,
        }
    },
    methods: {
        ...mapMutations(['addMenuList']),
        handleAddMenu() {
            console.log('this.$router.options.routes => ', this.$router.options.routes)
            const obj = {
                path: `/${this.name}`,
                name: this.name,
                title: this.title,
                access: parseInt(this.access),
                component: Menu12
            }
            // this.addMenuList(obj)
            console.log("this.$router=>>>>>>",this.$router);
            console.log(this.$router.options.routes)
            this.$router.options.routes.forEach(item => {
                if(item.name === 'menu1') {
                    item.children.push(obj)
                }
            })
            this.$router.addRoutes(this.$router.options.routes)
            this.$store.commit('initMenuList')
            console.log(this.$router.options.routes)
            this.name = ''
            this.title = ''
            this.access = ''
        },
        handleTestPost() {
            const obj = {
                name: 'zs',
                sex: 'man'
            }
            this.$api.testPost(obj).then(res => {
                console.log(res)
            }).catch(err => {
                console.log(err.response.data.message,)
            })
        }
        
    }
}
</script>
<style scoped>

</style>

