import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        loadingTrigger: false,
    },
    mutations: {
        handleLoading(state, loadingTrigger) {
            state.loadingTrigger = loadingTrigger;
        },
    },
})

export default store;