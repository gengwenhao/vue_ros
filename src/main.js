import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import SuiVue from 'semantic-ui-vue'
import ElementUI from 'element-ui';
import Toast from "vue-toastification"
// import style
import 'semantic-ui-css/semantic.css'
import 'element-ui/lib/theme-chalk/index.css'
import "vue-toastification/dist/index.css"
import "animate.css/animate.css"

// vue config
Vue.config.productionTip = false

// vue use
Vue.use(SuiVue)
Vue.use(ElementUI)
Vue.use(Toast, {
  position: 'bottom-right',
  timeout: 4500
})

// create instance
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
