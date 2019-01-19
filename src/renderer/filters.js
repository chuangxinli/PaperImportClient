import Vue from 'vue'
/*过滤器*/
Vue.filter("formatTime", function (value, type) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
  function addZero(val) {
    if (val < 10) {
      return '0' + val
    } else {
      return val
    }
  }

  let dateTime = ''
  let date = new Date(value)
  let year = date.getFullYear()
  let month = addZero(date.getMonth() + 1)
  let day = addZero(date.getDate())
  let hour = addZero(date.getHours())
  let minute = addZero(date.getMinutes())
  let second = addZero(date.getSeconds())
  if (type === 'YMD') {
    dateTime = year + '-' + month + '-' + day
  } else if (type === 'YMDHMS') {
    dateTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  } else if (type === 'HMS') {
    dateTime = hour + ':' + minute + ':' + second
  } else if (type === 'YM') {
    dateTime = year + '-' + month
  }
  return dateTime
});
