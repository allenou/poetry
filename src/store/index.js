
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        keyword: ''
    },
    getters: {
        keyword: state => state.keyword

    },
    mutations: {
        setKeyword(state, data) {
            state.keyword = data
        }

    }
})
export default store
