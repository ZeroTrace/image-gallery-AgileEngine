import Vue from 'vue'
import App from './App.vue'
import router from './router'


Vue.config.productionTip = false
window.axios = require('axios')
window.axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
window.axios.interceptors.response.use(undefined, (err) => {
    if (err.response.status === 401) {
        // clears local storage if token is invalid to be able to get a new one
        localStorage.clear()
        location.reload()
    }
})
new Vue({
    router,
    render: h => h(App),
}).$mount('#app')
