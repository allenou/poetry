
import Vue from 'vue'
import Vuex from 'vuex'
import http from '../http'
import pinyin from "pinyin";

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        shijing: [],
        lunyu: [],
        sishuwujing: [],
        keyword: ''
    },
    getters: {
        shijing: state => state.shijing,
        lunyu: state => state.lunyu,
        sishuwujing: state => state.sishuwujing,
        keyword: state => state.keyword

    },
    actions: {
        fetchShijing({ commit }) {
            return new Promise((resolve, reject) => {
                http.get('/shijing/shijing.json')
                    .then(res => {
                        resolve(res.data)
                        commit('setShijing', res.data)
                    });
            })
        },
        fetchLunyu({ commit }) {
            return new Promise((resolve, reject) => {
                http.get('/lunyu/lunyu.json')
                    .then(res => {
                        resolve(res.data)
                        commit('setLunyu', res.data)
                    });
            })

        },
        fetchSishuwujing({ commit }) {
            const books = ['daxue', 'zhongyong', 'mengzi']
            return new Promise((resolve, reject) => {
                Promise.all(books.map(book =>
                    http.get(`/sishuwujing/${book}.json`).then(res => res.data)
                )).then(data => {
                    const daxuezhongyong = data.splice(0, 2)
                    const list = [...daxuezhongyong, ...data[0]]
                    resolve(list)
                    commit('setSishuwujing', list)
                })
            })

        },

    },
    mutations: {
        setShijing(state, data) {

            state.shijing = data
        },

        setLunyu(state, data) {

            state.lunyu = data
        },
        setSishuwujing(state, data) {


            state.sishuwujing = data
        },
        setKeyword(state, data) {
            state.keyword = data
        }

    }
})
export default store
