// 储存单位转化
const computedSize = value => {
  if (!value) { // 在这里进行一次传递数据判断.如果传递进来的为空值,返回其空字符串.解决其问题
    return ''
  }
  if (value > (1024 * 1024)) {
    return (value / 1024 / 1024).toFixed(2) + ' TB'
  } else if (value > 1024) {
    return (value / 1024).toFixed(2) + ' GB'
  } else {
    return value.toFixed(2) + ' MB'
  }
}

export { computedSize }
