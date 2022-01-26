import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import mixin from './mixin'
import './styles/tailwindcss.css'
import "tailwindcss/tailwind.css"

Vue.mixin(mixin)
Vue.config.productionTip = false


Vue.prototype.highlight = function (content, keyword) {
  if (!keyword || !content.includes(keyword)) {
    return content
  }
  return content.split(keyword).join(`<b class="keyword">${keyword}</b>`)
}


new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
