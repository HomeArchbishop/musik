import axios from 'axios'
import runtimeConfigs from '@/configs/runtime'

async function request ({ url, params = {} }) {
  try {
    const resp = await axios.request({
      url,
      baseURL: runtimeConfigs.NETEASE_MUSIC_API_URL,
      params
    })
    return resp.data
  } catch (err) {
    if (err.response) {
      throw new Error('1000', { cause: err })
    } else if (err.request) {
      throw new Error('2000', { cause: err })
    } else {
      throw new Error('3000', { cause: err })
    }
  }
}

export {
  request
}
