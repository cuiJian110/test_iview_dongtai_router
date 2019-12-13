<template>
    <div class="layout">
        <Layout style='width: 100%; height: 100%'>
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu theme="dark" width="auto" :class="menuitemClasses" @on-select='handleMenuSelect'>
                    <Submenu :name="item.name" v-for='item in menuList' :key='item.name'>
                        <template slot="title">
                            <Icon type="ios-paper" />
                            {{item.title}}
                        </template>
                        <MenuItem v-for='i in item.children' :key='i.name' :name="i.name" :to='i.path'>
                            {{i.title}}
                        </MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <Layout>
                <Header :style="{padding: 0}" class="layout-header-bar">
                    <Button @click='handleLoginout'>logout</Button>
                    <Button @click='$router.push({name: "center"})'>个人中心</Button>
                    面包屑：
                    <span v-for="item in mianbaoxie" :key="item">{{item}}</span>
                </Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '260px'}">
                    <router-view @getSonVale="handleGetSon"></router-view>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import axios from 'axios'
import menu12 from '@/page/menu1/menu12.vue'
import {getmenu} from '@/api'
export default {
    data () {
        return {
            isCollapsed: false,
            mianbaoxie: [],
        }
    },
    computed: {
        ...mapState({
            menuList: state => state.menu.menuList
        }),
        rotateIcon () {
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {
            return [
                'menu-item',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
        
    },
    methods: {
        handleGetSon(v) {
            console.log("子页面传过来的值===>>>:",v);
            this.mianbaoxie = v;
        },
        ...mapMutations(['initMenuList','changeCode','addMenuList']),
        collapsedSider () {
            this.$refs.side1.toggleCollapse();
        },
        handleLoginout() {
            localStorage.removeItem('menu')
            this.$router.push({path: '/'})
        },
        digui(arr) {
            const newArr = []
            arr.forEach(item => {
                if(item.children) {
                    item.children.forEach(i => {
                        newArr.push(i)
                    })
                }
            })
            return newArr
        },
        handleMenuSelect(name) {
            const routeInfo = this.digui(this.$router.options.routes)
            // console.log(routeInfo)
            // console.log(name)
            routeInfo.reduce((p,i) => {
                if(i.name === name) {
                    this.changeCode(i.access)
                }
            },0)
        },
        getNewMenuList() {
            console.log('222')
            // axios.get('http://localhost:8080/static/menuList.json').then(res => {
            getmenu().then(res => {
            // this.$api.getmenu().then(res => {
                console.log(res)
                const {data, status} = res
                if(status) {
                    const newArrMenu = []
                    data.forEach(item => {
                        const obj = {
                            path: `/${item.name}`,
                            name: item.name, 
                            title: item.title, 
                            access: item.access,
                            components: () => import('@/page/menu1/menu12.vue')
                        }
                        newArrMenu.push(obj)
                    })
                    // this.$router.options.routes.forEach(item => {
                    //     if(item.name === 'menu1') {
                    //         newArrMenu.forEach(i => {
                    //             item.children.push(i)
                    //         })
                    //     }
                    // })
                    // this.$router.addRoutes(this.$router.options.routes)
                    this.$router.options.routes.forEach(item => {
                        if(item.name === 'menu1') {
                            newArrMenu.forEach(e => {
                                item.children.push(e)
                            })
                        }
                    })
                    this.$router.addRoutes(this.$router.options.routes)
                    this.initMenuList()
                    localStorage.setItem('newMenuList',JSON.stringify(newArrMenu))
                    // this.initMenuList()
                }
            })
        }
    },
    created() {
        this.initMenuList()
        this.getNewMenuList()
        // console.log(this.menuList)
    },
    watch: {
        $route: {
            handler: function(to, from){
                console.log(to.path);
                if(to.path === '/menu12') {
                    this.changeCode(12)
                } else if(to.path === '/menu15') {
                    this.changeCode(15)
                } else if(to.path === '/menu16') {
                    this.changeCode(16)
                } else if(to.path === '/menu17') {
                    this.changeCode(17)
                }
            },
                // 深度观察监听
            deep: true
        }
    },
    
}
</script>
<style scoped>
    .layout{
        width: 100%;
        height: 100%;
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .menu-icon{
        transition: all .3s;
    }
    .rotate-icon{
        transform: rotate(-90deg);
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
