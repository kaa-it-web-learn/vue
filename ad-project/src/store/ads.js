import * as fb from 'firebase'

class Ad {
  constructor (title, description, ownerId, imageSrc = '', promo = false, id = null) {
    this.title = title
    this.description = description
    this.ownerId = ownerId
    this.imageSrc = imageSrc
    this.promo = promo
    this.id = id
  }
}

export default {
  state: {
    ads: [

    ]
  },
  mutations: {
    createAd (state, payload) {
      state.ads.push(payload)
      console.log(state.ads)
    },
    loadAds (state, payload) {
      state.ads = payload
    },
    updateAd (state, {title, description, id}) {
      const ad = state.ads.find(a => a.id === id)
      ad.title = title
      ad.description = description
    }
  },
  actions: {
    async createAd ({commit, getters}, payload) {
      commit('clearError')
      commit('setLoading', true)

      const image = payload.image

      try {
        const newAd = new Ad(
          payload.title,
          payload.description,
          getters.user.id,
          '',
          payload.promo)
        const ad = await fb.database().ref('ads').push(newAd)
        const imageExt = image.name.slice(image.name.lastIndexOf('.'))
        const imageRef = fb.storage().ref(`ads/${ad.key}.${imageExt}`)
        await imageRef.put(image)
        const imageSrc = await imageRef.getDownloadURL()
        await fb.database().ref('ads').child(ad.key).update({imageSrc})
        commit('createAd', {
          ...newAd,
          id: ad.key,
          imageSrc
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
      }
    },
    async fetchAds ({commit}) {
      commit('clearError')
      commit('setLoading', true)

      const result = []

      try {
        const fbVal = await fb.database().ref('ads').once('value')
        const ads = fbVal.val()
        Object.keys(ads).forEach(key => {
          const ad = ads[key]
          result.push(new Ad(ad.title, ad.description, ad.ownerId, ad.imageSrc, ad.promo, key))
        })
        commit('loadAds', result)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateAd ({commit}, {title, description, id}) {
      commit('clearError')
      commit('setLoading', true)

      try {
        await fb.database().ref('ads').child(id).update({title, description})
        commit('updateAd', {title, description, id})
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    ads (state) {
      return state.ads
    },
    promoAds (state) {
      return state.ads.filter(ad => ad.promo)
    },
    myAds (state, getters) {
      return state.ads.filter(ad => ad.ownerId === getters.user)
    },
    adById (state) {
      return adId => state.ads.find(ad => ad.id === adId)
    }
  }
}
