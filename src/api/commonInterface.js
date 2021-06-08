import request from '@/utils/request'

// 获取拖拽模板
export function getTemplate(data) {
  return request({
    url: 'template/get',
    method: 'post',
    data
  })
}

// 获取拖拽模板
export function updateTemplate(data) {
  return request({
    url: 'template/add',
    method: 'post',
    data
  })
}
