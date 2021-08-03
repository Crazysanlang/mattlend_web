import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/coinsList',
    method: 'get',
    params
  })
}
export function updateCoin(params) {
  return request({
    url: `/setOneCoin?name=${params.name}&apy6=${params.apy6}&apy10=${params.apy10}`,
    method: 'get',
  })
}
