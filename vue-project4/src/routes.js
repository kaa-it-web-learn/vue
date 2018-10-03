import VueRouter from 'vue-router'
import Home from './pages/Home'
//import Cars from './pages/Cars'
//import Car from './pages/Car'
import CarFull from './pages/CarFull'
import ErrorCmp from './pages/Error'

const Cars = resolve => {
  require.ensure(['./pages/Cars'], () => {
    resolve(require('./pages/Cars'))
  })
}

const Car = resolve => {
  require.ensure(['./pages/Car'], () => {
    resolve(require('./pages/Car'))
  })
}

export default new VueRouter({
  routes: [
    {
      path: '',
      component: Home
    },
    {
      path: '/cars',
      component: Cars,
      name: 'cars'
    },
    {
      path: '/car/:id',
      component: Car,
      children: [
        {
          path: 'full',  // localhost:8080/car/10/full
          component: CarFull,
          name: 'carFull',
          beforeEnter(to, from, next) {
            console.log('beforeEnter')
            next()
            /*if (false) {
              next(true)
            } else {
              next(false)
            }*/
          }
        }
      ]
    },
    {
      path: '/none',
      redirect: {
        name: 'cars'
      }
    },
    {
      path: '*',
      component: ErrorCmp
    }
  ],
  mode: 'history',
  scrollBehavior(to, from, savedPosiiton) {

    if (savedPosiiton) {
      return savedPosiiton
    }

    if (to.hash) {
      return { selector: to.hash }
    }

    return {
      x: 0,
      y: 0
    }
  }
})
