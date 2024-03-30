// TODO: complete APIs

import { request } from './request'

async function topPlaylist ({ order = 'hot', cat = '全部', limit = 50, offset = 50 }) {
  return await request({
    url: '/top/playlist',
    params: { order, cat, limit, offset }
  })
}

async function playlistDetail ({ id }) {
  return await request({
    url: '/playlist/detail',
    params: { id }
  })
}

async function songURL ({ id }) {
  return await request({
    url: '/song/url',
    params: { id }
  })
}

async function lyric ({ id }) {
  return await request({
    url: '/lyric',
    params: { id }
  })
}

export {
  topPlaylist, playlistDetail, songURL, lyric
}
