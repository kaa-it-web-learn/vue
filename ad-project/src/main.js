import Vue from 'vue'
import App from './App'
import BuyModelComponent from './components/Common/BuyModal'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import store from './store'
import * as fb from 'firebase'
// import colors from 'vuetify/es5/util/colors'
import './stylus/main.styl'

Vue.use(Vuetify, {
  // theme: {
  //   primary: colors.green.darken1, // #E53935
  //   secondary: colors.green.lighten4, // #FFCDD2
  //   accent: colors.indigo.base // #3F51B5
  // }
})
Vue.component('app-buy-modal', BuyModelComponent)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    var config = {
      apiKey: 'AIzaSyCW_KCsTLbSh_olz_iVAd7XtrA6xr0dYeY',
      authDomain: 'itc-ads-17e7c.firebaseapp.com',
      databaseURL: 'https://itc-ads-17e7c.firebaseio.com',
      projectId: 'itc-ads-17e7c',
      storageBucket: 'itc-ads-17e7c.appspot.com',
      messagingSenderId: '940651290883'
    }
    fb.initializeApp(config)

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })
    this.$store.dispatch('fetchAds')
  }
})
