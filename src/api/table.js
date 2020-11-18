import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/y-admin-template/table/list',
    method: 'get',
    params
  })
}
