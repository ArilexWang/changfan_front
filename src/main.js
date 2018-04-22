import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import VueResource from 'vue-resource'
Vue.use(ElementUI)
Vue.use(VueResource)
Vue.http.options.emulateHTTP = true
Vue.http.options.emulateJSON = true
new Vue({
  el: '#app',
  render: h => h(App)
})
