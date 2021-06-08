import request from '@/utils/request'
// 获取机构下账号数监测
export function accountCount(data) {
  return request({
    url: '/system/account-count/5',
    method: 'get',
    data
  })
}
// 获取机构下账号数监测
export function getAccount(data) {
  return request({
    url: '/system/getAccount',
    method: 'post',
    data
  })
}
// 系统设置-查询媒体知识库账号
export function getMediaAccountInfo(data) {
  return request({
    url: '/system/getMediaAccountInfo',
    method: 'post',
    data
  })
}
// 添加账号
export function addAccount(data) {
  return request({
    url: '/system/addAccount',
    method: 'post',
    data
  })
}
// 编辑账号
export function updateAccount(data) {
  return request({
    url: '/system/updateAccount',
    method: 'post',
    data
  })
}
// 删除账号
export function deleteAccount(data) {
  return request({
    url: '/system/deleteAccount',
    method: 'post',
    data
  })
}

// 批量导出
export function downloadAll(data) {
  return request({
    url: '/system/download',
    method: 'post',
    data,
    isIntercept: true, // 是否响应拦截
    responseType: 'blob', // 表明返回服务器返回的数据类型
    timeout: 30000
  })
}

// 批量导出/system/upload
export function upload(data) {
  return request({
    url: '/system/upload',
    method: 'post',
    data
  })
}
