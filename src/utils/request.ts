import axios from "axios"

function request<T = unknown>(url: string): Promise<T> {
  return axios({
    url,
    method: 'GET',
    responseType: 'json',
    headers: {
      'Content-Type': 'text/json;charset=utf-8'
    }
  }).then(res => res.data)
    .catch(err => console.error(err))
}

export default request