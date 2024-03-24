// TODO: complete APIs
// TODO: error handler

import configs from '@/configs/runtime'
import axios from 'axios'

async function topPlaylist ({ order = 'hot', cat = '全部', limit = 50, offset = 50 }) {
  return (await axios.request({
    baseURL: configs.neteaseApiURL,
    url: '/top/playlist',
    params: { order, cat, limit, offset }
  })).data
}

export {
  topPlaylist
}
