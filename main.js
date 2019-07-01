 import './static/sdk/ald-stat'
import Vue from 'vue'
import App from './App'
import api from './request/api.js'
import yapi from './request/yapi.js'
Vue.config.productionTip = false
Vue.prototype.api = api
Vue.prototype.yapi = yapi
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
