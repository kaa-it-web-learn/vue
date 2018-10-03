<template>
  <div>
    <h1 v-colored:background.font="'green'" v-if="visible">Parent: {{ carName | uppercase | lowercase }}</h1>
    <h1 v-colored:color.delay.font="'yellow'" v-if="visible">Parent: {{ carName | lowercase }}</h1>
    <button @click="visible = !visible">Toggle</button>
    <button @click="carName = 'newName'">Change name</button>
    <app-counter></app-counter>
    <app-car
      :carName="carName"
      :carYear="carYear"
      @nameChanged="carName = $event"
      :changeFunc="changeNameToAudi"
      @counterUpdated="counter = $event">
      <h2 v-font slot="title">{{ carName }}</h2>
      <p slot="text">Lorem ipsum dolor.</p>
    </app-car>
    <input type="text" v-model="searchName">
    <ul>
      <li v-for="name of filteredNames">{{ name }}</li>
    </ul>
    <app-list></app-list>
  </div>
</template>

<script>
import Car from './Car.vue'
import Counter from './Counter'
import ListMixin from './listMixin'

export default {
  data () {
    return {
      carName: 'Ford from parent',
      carYear: 2018,
      visible: true,
    }
  },
  components: {
    appCounter: Counter,
    appCar: Car
  },
  methods: {
    changeNameToAudi() {
      this.carName = 'Audi'
    }
  },
  directives: {
    font: {
      bind(el, bindings, vnode) {
        el.style.fontSize = '70px'
      }
    }
  },
  filters: {
    lowercase(value) {
      return value.toLowerCase()
    }
  },
  mixins: [ListMixin]
}
</script>

<style scoped>
  h2 {
    color: green
  }
</style>
