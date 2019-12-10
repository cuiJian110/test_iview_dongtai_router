/*
 * @Description: 
 * @Autor: cuiJian
 * @Date: 2019-12-10 17:07:58
 * @LastEditors: cuiJian
 * @LastEditTime: 2019-12-10 17:22:07
 */

import {appRouters} from '../router/router'
const menu = {
    state: {
        menuList: [],
        code: 32,
    },
    mutations: {
        initMenuList(state) {
            console.log('111')
            const newMenuList = []
            const menuList = localStorage.getItem('menu').split(',').map(item => parseInt(item))
            console.log('routers => ',appRouters)
            const originRouters = JSON.parse(JSON.stringify(appRouters))
            originRouters.forEach(item => {
                if(menuList.indexOf(item.access) !== -1) {
                    const obj = item
                    obj.children = item.children.filter(item => menuList.indexOf(item.access) !== -1 )
                    // 数组去重
                    let hash = {}; 
                    obj.children = obj.children.reduce((preVal, curVal) => {
                        hash[curVal.access] ? '' : hash[curVal.access] = true && preVal.push(curVal); 
                        return preVal 
                    }, [])
                    newMenuList.push(obj)
                }
            })
            state.menuList = newMenuList
            console.log('menuList => ',state.menuList)
        },
        addMenuList(state,obj) {
            state.menuList.forEach(item => {
                if(item.name === 'menu1') {
                    item.children.push(obj)
                }
            })
        },
        changeCode(state,num) {
            state.code = num
        }
    }
}
export default menu