import { BASE_URL } from "@/config"
import axios from "axios"

axios.defaults.baseURL = BASE_URL
async function request(url: string) {
  try {
    const res = await axios({
      url,
      method: 'GET',
      responseType: 'json',
      headers: {
        'Content-Type': 'text/json;charset=utf-8'
      }
    })
    return res.data
  } catch (err) {
    console.error(err)
  }
}

export default request