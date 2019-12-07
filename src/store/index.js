import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
import menu from './modules'

const store = new Vuex.Store({
    modules: {
        menu
    }
})
export default store