import Vue from 'vue'
import Router from 'vue-router'
import {routers} from './router'
import menu12 from '@/page/menu1/menu12.vue'
import store from '../store'
Vue.use(Router)
console.log(routers)
const routerConfig = {
  routes: routers
}
const router =  new Router(routerConfig)
// router.$addRoutes = (params) => {
//   router.matcher = new Router({mode: 'history'}).matcher;
//   router.addRoutes(params)
// }
router.beforeEach((to, from, next) => {
    console.log('to =>',to)
    console.log('from =>',from)
    console.log(router)
    console.log(store)
    console.log(store.state.menu.code)
    if(from.name === null) {
      console.log('666 执行了么')
      if(localStorage.getItem('newMenuList')) {
        const newMenuList = JSON.parse(localStorage.getItem('newMenuList'))
        newMenuList.forEach(item => item.component = menu12)
        router.options.routes.forEach(item => {
          if(item.name === 'menu1') {
            const k = []
            item.children.forEach(item => k.push(item.access))
            newMenuList.forEach(e => {
              if(k.indexOf(e.access) === -1) {
                item.children.push(e)
              }
            })
          }
        })
        router.addRoutes(router.options.routes)
        localStorage.removeItem('newMenuList')
        const path = window.location.hash.split('/')[1]
        newMenuList.forEach(item => {
          if(item.path.includes(path)) {
            next({
              name: item.name
            })
          }
        })
      }
    }
    next()
})
export default router
