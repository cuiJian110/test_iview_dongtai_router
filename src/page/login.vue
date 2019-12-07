<template>
    <div>
        <div class="login">
            <Input type='text' v-model="userName" placeholder="userName" />
            <Input type='password' v-model="password" placeholder="userName" />
            <button @click='handleCommit'>commit</button>
        </div>
    </div>
</template>
<script>
import {mapMutations} from 'vuex'
export default {
    data() {
        return {
            userName: '',
            password: '',
        }
    },
    methods: {
        ...mapMutations(['initMenuList']),
        handleCommit() {
            if(this.userName.length === 0) return alert('userName 不能为空')
            if(this.userName === this.password ) {
                if(this.userName === 'admin') {
                    localStorage.setItem('menu','1,2,3,11,12,13,14,15,21,32,602,603')
                } else if(this.userName === 'zs') {
                    localStorage.setItem('menu','1,2,11,13,22')
                } else if(this.userName === 'ls') {
                    localStorage.setItem('menu','3,31,32')
                }
                this.$router.push({name: 'menu1'})
            } else {
                return alert('用户名与密码不对')
            }
        }
    }
}
</script>
<style scoped>

</style>
