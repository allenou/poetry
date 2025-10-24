import axios from "axios"
import { BASE_URL } from "@/config"

axios.defaults.baseURL = BASE_URL
async function request<T = any>(url: string): Promise<T | undefined> {
  try {
    const res = await axios({
      url,
      method: 'GET',
      responseType: 'json',
      headers: {
        'Content-Type': 'text/json;charset=utf-8'
      }
    })
    return res.data as T
  } catch (err) {
    console.error(err)
  }
}

export default request