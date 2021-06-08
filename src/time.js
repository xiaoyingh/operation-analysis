
// 获取当前日期方法
export function getNowFormatDate() {
  var date = new Date()
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate
  return currentdate
}

// 获取指定日期前3个月
export function getPreMonthDay(date, monthNum) {
  const dateArr = date.split('-')
  const year = dateArr[0] // 获取当前日期的年份
  const month = dateArr[1] // 获取当前日期的月份
  const day = dateArr[2] // 获取当前日期的日
  let days = new Date(year, month, 0)
  days = days.getDate() // 获取当前日期中月的天数
  let year2 = year
  let month2 = parseInt(month) - monthNum
  if (month2 <= 0) {
    year2 =
        parseInt(year2) -
        parseInt(month2 / 12 == 0 ? 1 : Math.abs(parseInt(month2 / 12)) + 1)
    month2 = 12 - (Math.abs(month2) % 12)
  }
  let day2 = day
  let days2 = new Date(year2, month2, 0)
  days2 = days2.getDate()
  if (day2 > days2) {
    day2 = days2
  }
  if (month2 < 10) {
    month2 = '0' + month2
  }
  const t2 = year2 + '-' + month2 + '-' + day2
  return t2
}

// 获取当前日期，包括时分秒
export function getNowFormatDateHMS() {
  var date = new Date()
  var seperator1 = '-'
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var hour = date.getHours() // 获取当前小时数(0-23)
  var minute = date.getMinutes() // 获取当前分钟数(0-59)
  var second = date.getSeconds() // 获取当前秒数(0-59)

  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = '0' + strDate
  }

  if (hour >= 0 && hour <= 9) {
    hour = '0' + hour
  }
  if (minute >= 0 && minute <= 9) {
    minute = '0' + minute
  }
  if (second >= 0 && second <= 9) {
    second = '0' + second
  }

  var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hour + ':' + minute + ':' + second
  return currentdate
}

// 获取指定日期前一天
export function getBeforeDay(d) {
  var date = new Date()
  d = new Date(d)
  d = +d - 1000 * 60 * 60 * 24
  d = new Date(d)
  var year = d.getFullYear()
  var mon = d.getMonth() + 1
  var day = d.getDate()
  var hour = date.getHours() // 获取当前小时数(0-23)
  var minute = date.getMinutes() // 获取当前分钟数(0-59)
  var second = date.getSeconds() // 获取当前秒数(0-59)
  var s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day) + ' ' + hour + ':' + minute + ':' + second
  return s
}

// 获取指定日期后一天
export function getAfterDay(d) {
  var date = new Date()
  d = new Date(d)
  d = +d + 1000 * 60 * 60 * 24
  d = new Date(d)
  var year = d.getFullYear()
  var mon = d.getMonth() + 1
  var day = d.getDate()
  var hour = date.getHours() // 获取当前小时数(0-23)
  var minute = date.getMinutes() // 获取当前分钟数(0-59)
  var second = date.getSeconds() // 获取当前秒数(0-59)
  var s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day) + ' ' + hour + ':' + minute + ':' + second
  return s
}

// 获取指定日期前七天
export function getBeforeWeek(d) {
  var date = new Date()
  d = new Date(d)
  d = +d - 1000 * 60 * 60 * 24 * 6
  d = new Date(d)
  var year = d.getFullYear()
  var mon = d.getMonth() + 1
  var day = d.getDate()
  var hour = date.getHours() // 获取当前小时数(0-23)
  var minute = date.getMinutes() // 获取当前分钟数(0-59)
  var second = date.getSeconds() // 获取当前秒数(0-59)
  var s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day) + ' ' + hour + ':' + minute + ':' + second
  return s
}

// 获取指定日期前一个月
export function getBeforeMonth(d) {
  var date = new Date()
  d = new Date(d)
  d = +d - 1000 * 60 * 60 * 24 * 29
  d = new Date(d)
  var year = d.getFullYear()
  var mon = d.getMonth() + 1
  var day = d.getDate()
  var hour = date.getHours() // 获取当前小时数(0-23)
  var minute = date.getMinutes() // 获取当前分钟数(0-59)
  var second = date.getSeconds() // 获取当前秒数(0-59)
  var s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day) + ' ' + hour + ':' + minute + ':' + second
  return s
}

// 获取指定日期前一个年
export function getBeforeYear(d) {
  var date = new Date()
  d = new Date(d)
  var year = d.getFullYear() - 1
  var mon = d.getMonth() + 1
  var day = d.getDate()
  var hour = date.getHours() // 获取当前小时数(0-23)
  var minute = date.getMinutes() // 获取当前分钟数(0-59)
  var second = date.getSeconds() // 获取当前秒数(0-59)
  var s = year + '-' + (mon < 10 ? ('0' + mon) : mon) + '-' + (day < 10 ? ('0' + day) : day) + ' ' + hour + ':' + minute + ':' + second
  return s
}

