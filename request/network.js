// var API_URL = 'https://kjw.wx.fzwsc.com';
import {API_URL} from './base'
// var API_URL = 'https://m.wx.fjtogo.com';

function requestGet(url,data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: API_URL + url,
      data: data,
      method: "GET", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function(res){
        if (res.data.code == 200) {
          resolve(res.data);
        }else{
          reject(res.data)
        }
        
      },
      fail: function(err) {
         reject(err.data);
      }
    })
  })
}
function requestPost(url,data) {
  return new Promise((resolve, reject) => {
    uni.request({
      url: API_URL + url,
      data: data,
      method: "POST", // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function(res){
        //注意：可以对参数解密等处理
        if (res.data.code == 200) {
          resolve(res.data);
        }else{
          reject(res.data)
        }
      },
      fail: function(err) {
         reject(err);
      }
    })
  });
}
function requestPic(url,filePath,name,data) {
   return new Promise( (resolve, reject) => {
    uni.uploadFile({
      url: API_URL + url,
      filePath: filePath,
      name: name,
      formData: data,
      success: res => {
         res = JSON.parse(res.data);
         if (res.code == 200) {
            resolve(res)
         }else{
            reject(res)
         }
      },
      fail: err => {
         reject(err)
      }
    })
   })
}

module.exports = {
  get: requestGet,
  post: requestPost,
  pic: requestPic
}