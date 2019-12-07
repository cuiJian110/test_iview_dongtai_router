import {getReq , postReq} from './https'
export const getmenu = () => getReq('menuList.json')
export const getTreeData = () => getReq('treeData.json')
export const testPost = params => postReq('testAdditem',params)
export const getUserList = () => getReq('userList.json')
export const getRoleList = () => getReq('roleList.json')