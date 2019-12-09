const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const message = n =>{
  wx.showToast({
    title: n,
    icon: 'none',
    duration: 2000
  })
}
// 验证价格
const checkPrice = n => {
   let reg = /^([1-9][0-9]*)+(\.[0-9]{1,2})?$/;
   if (reg.test(n)) {
      return true;
   }else{
     return false
   }
}
// 验证手机号码
const checkPhone = n => {
  let reg = /^1[3|4|5|7|8][0-9]{9}$/;
  if (reg.test(n)) {
      return true;
  }else{
    return false
  }
}
// 验证正整数
const checkPositiveNum = n => {
  let reg = /^[0-9]+.?[0-9]*/;
  if (reg.test(n)) {
      return true;
  }else{
    return false
  }
}
module.exports = {
  formatTime: formatTime,
  message: message,
  checkPrice: checkPrice,
  checkPhone: checkPhone,
  checkPositiveNum: checkPositiveNum
}
