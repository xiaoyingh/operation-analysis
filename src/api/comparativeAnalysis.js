import request from '@/utils/request'

// 对比分析-添加不同渠道要对比的账号
export function updateAccountAnalysis(data) {
  return request({
    url: 'accountAnalysis/updateAccountAnalysis',
    method: 'post',
    data
  })
}

// 对比分析-获取不同渠道加入对比的账号列表--外面列表的
export function selectAccountAnalysis(data) {
  return request({
    url: 'accountAnalysis/selectAccountAnalysis',
    method: 'post',
    data
  })
}

// 对比分析-获取机构下不同渠道的账号列表--弹窗里面的
export function selectManagementAnalysis(data) {
  return request({
    url: 'accountAnalysis/selectManagementAnalysis',
    method: 'post',
    data
  })
}

// 对比分析-微信新增粉丝量对比
export function newFansContrast(data) {
  return request({
    url: 'wechatContranst/newFansContrast',
    method: 'post',
    data
  })
}
// 对比分析-短视频新增粉丝量对比
export function newFansContrastVideo(data) {
  return request({
    url: 'shortVideoContrast/newFansContrast',
    method: 'post',
    data
  })
}

// 对比分析-微博新增粉丝量对比
export function mblogFansContrast(data) {
  return request({
    url: 'mblogContranst/newFansContrast',
    method: 'post',
    data
  })
}

// 对比分析-微信发文变化趋势
export function newTraditionManuscriptTrend(data) {
  return request({
    url: 'tradition/getTraditionManuscriptTrend',
    method: 'post',
    data
  })
}

// 对比分析-微信发文变化趋势
export function newInteractionTrend(data) {
  return request({
    url: 'wechatOrMblog/getInteractionTrend',
    method: 'post',
    data
  })
}

// 对比分析 - 微博热文top10
export function getContrastHotArticleexport(data) {
  return request({
    url: 'wenHaiHotArticle/getContrastHotArticle',
    method: 'post',
    data
  })
}

// 所属机构获取
export function getOrganizeName(data) {
  return request({
    url: 'accountAnalysis/getOrganizeName',
    method: 'post',
    data
  })
}
// 获取已经查询的账号列表
export function getAccountAnalysisyi(data) {
  return request({
    url: 'accountAnalysis/selectAccountAnalysis',
    method: 'post',
    data
  })
}
