import axios from 'axios'
import qs from 'qs'
axios.defaults.baseURL = 'http://localhost:8080/static'
const getReq = (url , params) => {
    return new Promise((resolve , reject) => {
        axios.get(url,{params: params}).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err.data)
        })
    })
}
const postReq = (url , params) => {
    return new Promise((resolve , reject) => {
        axios.post(url,qs.stringify(params)).then(res => {
            resolve(res.data)
        }).catch(err => {
            reject(err)
        })
    })
}
export {getReq, postReq}