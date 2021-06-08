import request from '@/utils/request'

// 分析总览不同时间段发文量变化趋势
export function getManuscriptTrend(data) {
  return request({
    url: 'analysisOverview/getManuscriptTrend',
    method: 'post',
    data
  })
}

// 分析总览热文top10
export function getAnalysisOverviewHotArticle(data) {
  return request({
    url: 'wenHaiHotArticle/getAnalysisOverviewHotArticle',
    method: 'post',
    data
  })
}

// 微信、微博不同时间段发文量变化趋势
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

// 发文热词通用接口
export function getTraditionDispatchHotWord(data) {
  return request({
    url: 'tradition/getTraditionDispatchHotWord',
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

// 获取宏观数据
export function getMBlogMacroData(data) {
  return request({
    url: 'wechatOrMblog/getMblogMacroData',
    method: 'post',
    data
  })
}

// 微博-发文习惯
export function getTraditionDispatchHabit(data) {
  return request({
    url: 'tradition/getTraditionDispatchHabit',
    method: 'post',
    data
  })
}

// 传统媒体-发文变化趋势
export function getTraditionManuscriptTrend(data) {
  return request({
    url: 'tradition/getTraditionManuscriptTrend',
    method: 'post',
    data
  })
}

// 各渠道热文接口（单渠道、单账号，所有渠道共用）
export function searchWenHaiHotArticle(data) {
  return request({
    url: 'wenHaiHotArticle/searchWenHaiHotArticle',
    method: 'post',
    data
  })
}

// 分析总览热词接口
export function getDispatchHotWord(data) {
  return request({
    url: 'analysisOverview/getDispatchHotWord',
    method: 'post',
    data
  })
}

// 分析总览、账号分析享评赞在看变化
export function getInteractionTrend(data) {
  return request({
    url: 'analysisOverview/getInteractionTrend',
    method: 'post',
    data
  })
}

// 分析总览-新增粉丝量趋势图
export function getNewFansTrend(data) {
  return request({
    url: 'analysisOverview/getNewFansTrend',
    method: 'post',
    data
  })
}

// 分析总览-获取机构下账号各渠道榜单
export function accountRank(data) {
  return request({
    url: 'analysisOverview/accountRank',
    method: 'post',
    data
  })
}

// 短视频账号粉丝性别分布
export function selectFansSex(data) {
  return request({
    url: 'douyin/selectFansSex',
    method: 'post',
    data
  })
}

// 短视频账号粉丝地域分布
export function selectFansProvince(data) {
  return request({
    url: 'douyin/selectFansProvince',
    method: 'post',
    data
  })
}

// 短视频账号粉丝变化量趋势
export function selectFansTrend(data) {
  return request({
    url: 'douyin/selectFansTrend',
    method: 'post',
    data
  })
}

// 账号总览-宏观数据
export function totalData(data) {
  return request({
    url: 'analysisOverview/totalData',
    method: 'post',
    data
  })
}

// 各账号分析-宏观数据
export function getTotalData(data) {
  return request({
    url: 'wechatOrMblog/getTotalData',
    method: 'post',
    data
  })
}
