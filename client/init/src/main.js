import Vue from 'vue'
import App from './App.vue'
import router from './router'

// function myxx () {
// 	console.log(66661111)
// 	var x=200
// 	// console.log(this)
// 	Vue.prototype.$x=x
// }
// Vue.use(myxx)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
