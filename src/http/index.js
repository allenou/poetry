import qs from 'qs'
import axios from 'axios'
const http = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    timeout: 10000,
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/x-www-form-urlencoded'
    }
});

http.interceptors.request.use(
    config => {
        if (!navigator.onLine) {
            alert('网络连接失败，请重试')
        } else {
            if (config.method === 'post') {
                config.data = qs.stringify(config.data)
            }
            return config
        }
    },
    error => {
        return Promise.reject(error)
    }
)

export default http
