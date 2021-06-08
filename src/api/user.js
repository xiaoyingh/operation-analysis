import request from '@/utils/request'

export function getInfo(params) {
  return request({
    url: 'http://bjcloudhongqi.wengegroup.com:10008/userInfo/getUserPerm',
    method: 'get',
    params
  })
}

export function login(data) {
  return request({
    url: '/vue-admin-template/user/login',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
