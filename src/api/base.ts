import axios from 'axios'
import { showDialog } from 'vant'

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.response.use(
  (response) => {
    console.log('🚀 ~ file: base.ts:10 ~ response:', response)
    const { data: _data } = response
    const { code, data, msg } = _data
    if (code != 0) {
      showDialog({
        message: msg
      }).then(() => {
        // on close
      })
      return Promise.reject(new Error(msg || 'Error'))
    } else {
      return data
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default instance
