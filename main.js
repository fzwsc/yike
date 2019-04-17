import Vue from 'vue'
import App from './App'
import api from '/request/api.js'
import yapi from '/request/yapi.js'
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
