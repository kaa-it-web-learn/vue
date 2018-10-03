import Vue from 'vue'
import App from './App'
import ColorDerective from './color'
import List from './List'
//import Car from './Car.vue'

//Vue.component('app-car', Car)

Vue.directive('colored', ColorDerective)
Vue.component('app-list', List)
Vue.filter('uppercase', value => value.toUpperCase())

// Vue.mixin({
//})

export const eventEmitter = new Vue()

new Vue({
  el: '#app',
  render: h => h(App)
})

