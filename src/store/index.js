import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 2,安装插件
Vue.use(Vuex)

// 3,创建对象
const store = new Vuex.Store({
    state: {
        cartList: []
    },
    mutations,
    actions,
    getters
})

// 4,导出，挂载到vue实例上
export default store