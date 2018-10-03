export default {
  state: {
    counter: 0
  },
  mutations: {
    changeCounter(state, payload) {
      state.counter += payload
    }
  },
  actions:{
    asyncChangeCounter({commit}/*context*/, payload) {
      setTimeout(() => {
        commit('changeCounter', payload.counterValue)
      }, payload.timeoutDelay)
    }
  },
  getters: {
    computedCounter(state) {
      return state.counter * (7 - 2 * (5 + 4))
    }
  }
}
