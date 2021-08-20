import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css';

import FastClick from 'fastclick';

import VueLazyload from 'vue-lazyload'

Vue.use(Mint);
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false

//解决移动端300ms延迟
FastClick.attach(document.body)

//图片懒加载
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
