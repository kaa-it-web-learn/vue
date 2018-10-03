<template>
  <div>
    <h2>Form inputs</h2>
    <input type="text" v-model="name">
    <textarea v-model="name">{{ name }}</textarea>
    <p>{{ name }}</p>
    <hr>
    <label>
      <input type="checkbox" value="instagram" v-model="social">Instagram
    </label>
    <label>
      <input type="checkbox" value="vk" v-model="social">Vk
    </label>
    <label>
      <input type="checkbox" value="facebook" v-model="social">Facebook
    </label>
    <hr>
    <ul>
      <li v-for="s of social">{{ s }}</li>
    </ul>
    <hr>
    <label>
      <input type="radio" value="instagram" v-model="social2">Instagram
    </label>
    <label>
      <input type="radio" value="vk" v-model="social2">Vk
    </label>
    <label>
      <input type="radio" value="facebook" v-model="social2">Facebook
    </label>
    <p>{{ social2 }}</p>
    <hr>
    <select v-model="social3">
      <!--<option v-for="s of socialList" :selected="s === defaultSocial">{{ s }}</option>-->
      <option v-for="s of socialList">{{ s }}</option>
    </select>
    <p>{{ social3 }}</p>
    <hr>
    <input type="text" v-model.number="age">
    <p>{{ age }}</p>
    <hr>
    <app-onoff v-model="switched"></app-onoff>
    <div>
      <h3 v-if="switched">Component is enabled</h3>
      <h3 v-else>Component is disabled</h3>
    </div>
  </div>
</template>

<script>
import Onoff from './Onoff'

export default {
  data () {
    return {
      name: 'Initial state',
      social: ['vk'],
      social2: 'vk',
      socialList: ['instagram', 'vk', 'facebook'],
      defaultSocial: 'facebook',
      social3: 'facebook',
      age: 20,
      switched: false
    }
  },
  watch: {
    age(value) {
      console.log(value)
      console.log(typeof(value))
    }
  },
  components: {
    appOnoff: Onoff
  }
}
</script>

<style scoped>
  textarea {
    width: 300px;
    height: 100px;
  }
  p {
    white-space: pre;
  }
</style>
