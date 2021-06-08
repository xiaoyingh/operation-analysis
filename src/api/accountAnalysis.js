import request from '@/utils/request'

// 不同时间段发文量变化趋势
export function getWechatManuscriptTrend(data) {
  return request({
    url: 'wechatOrMblog/getWechatManuscriptTrend',
    method: 'post',
    data
  })
}

// 不同时间段发文量变化趋势
export function getWechatReadTrend(data) {
  return request({
    url: 'wechatOrMblog/getWechatReadTrend',
    method: 'post',
    data
  })
}

// 不同时间段互动量变化趋势（微信微博共用）
export function getWechatOrMblogInteractionTrend(data) {
  return request({
    url: 'wechatOrMblog/getWechatOrMblogInteractionTrend',
    method: 'post',
    data
  })
}

// 微信粉丝情况-地域分布接口
export function selectProvinceList(data) {
  return request({
    url: 'fansInfoEs/selectProvinceList',
    method: 'post',
    data
  })
}

// 微信粉丝情况-性别比例接口
export function selectSexProportionList(data) {
  return request({
    url: 'fansInfoEs/selectSexProportionList',
    method: 'post',
    data
  })
}

// 微信粉丝情况-新增粉丝量变化
export function selectFansChangeTrend(data) {
  return request({
    url: 'fansInfoEs/selectFansChangeTrend',
    method: 'post',
    data
  })
}

// 微信获取宏观数据
export function getWechatMacroData(data) {
  return request({
    url: 'wechatOrMblog/getWechatMacroData',
    method: 'post',
    data
  })
}

// 微信发文热词
export function getWechatDispatchHotWord(data) {
  return request({
    url: 'wechatOrMblog/getWechatDispatchHotWord',
    method: 'post',
    data
  })
}
