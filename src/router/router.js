

import Main from '../page/main.vue'
import Menu11 from '../page/menu1/menu11.vue'
import Menu12 from '../page/menu1/menu12.vue'
import Menu13 from '../page/menu1/menu13.vue'
import Menu21 from '../page/menu2/menu21.vue'
import Menu22 from '../page/menu2/menu22.vue'
import Menu23 from '../page/menu2/menu23.vue'
import Menu31 from '../page/menu3/menu31.vue'
import Menu32 from '../page/menu3/menu32.vue'
import Menu33 from '../page/menu3/menu33.vue'
import UserManage from '../page/menu1/usermanger.vue'
import RoleManage from '../page/menu1/rolemanage.vue'
import Test1 from '../page/test/test1.vue'
import Test2 from '../page/test/test2.vue'
import Center from '../page/userCenter/center.vue'
const login = [
    {
        path: '/',
        redirect: '/login',
    },
    {
        path: '/login',
        component: () => import('../page/login.vue')
    }
]
const notFond = {
    path: '*',
    component: () => import('../page/notfond')
}
const otherRouters = {
    path: '/test',name: 'test', title: '测试', component: Main, children: [
        {path: '/test1',name: 'test1', title: '测试1', component: Test1},
        {path: '/test2',name: 'test2', title: '测试2', component: Test2},
        {path: '/center',name: 'center', title: '个人中心', component: Center}
    ]
}
const appRouters = [
    {path: '/menu1',name: 'menu1', title: '菜单一', access: 1, component: Main, children: [
        {path: '/menu11',name: 'menu11', title: '菜单1-1', access: 11, component: Menu11},
        {path: '/menu12',name: 'menu12', title: '菜单1-2', access: 12, component: Menu12},
        {path: '/menu13',name: 'menu13', title: '菜单1-3', access: 13, component: Menu13},
        {path: '/usermanage',name: 'UserManage', title: '用户管理', access: 14, component: UserManage},
        {path: '/rolemanage',name: 'rolemanage', title: '角色管理', access: 15, component: RoleManage}
    ]},
    {path: '/menu2',name: 'menu2', title: '菜单二', access: 2, component: Main, children: [
        {path: '/menu21',name: 'menu21', title: '菜单2-1', access: 21, component: Menu21},
        {path: '/menu22',name: 'menu22', title: '菜单2-2', access: 22, component: Menu22},
        {path: '/menu23',name: 'menu23', title: '菜单2-3', access: 23, component: Menu23},
    ]},
    {path: '/menu3',name: 'menu3', title: '菜单三', access: 3, component: Main, children: [
        {path: '/menu31',name: 'menu31', title: '菜单3-1', access: 31, component: Menu31},
        {path: '/menu32',name: 'menu32', title: '菜单3-2', access: 32, component: Menu32},
        {path: '/menu33',name: 'menu33', title: '菜单3-3', access: 33, component: Menu33},
    ]}
]
const routers = [
    ...login, 
    notFond, 
    otherRouters, 
    ...appRouters
]
export {appRouters, routers}