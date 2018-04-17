const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 请求方法
function $ajax({ isShowLoading = true, wxApp = true, httpUrl, data = {}, method = 'post', title = '加载中...' }) {
  return new Promise((resolve, reject) => {
    isShowLoading && wx.showLoading({ mask: true, title: title });
    wx.request({
      url: httpUrl,
      method: method,
      data: data,
      header: method === 'post' ? { "Content-Type": "application/x-www-form-urlencoded" } : { 'content-type': 'application/json' },
      success: ({ data: { data, message, state } }) => {
        if (state == 1) {
          resolve({ data: data, message });
          wx.hideLoading();
        } else {
          wx.hideLoading();
          wxApp ? wx.showToast({ title: message, icon: 'none' }) : wxApp.setData({ err: message });
        }
      },
      fail: (err) => {
        wx.hideLoading();
        wx.showToast({
          title: '网络请求超时，请检查您的网络',
          icon: 'none'
        })
      }
    })
  })
}
function showBigPic(e) {
  let img = e.currentTarget.dataset.img,
    imgUrl = 'https://guloupy.hopethink.com/gldj/',
    urls = [];
  for (let i = 0; i < img.length; i++) {
    urls[i] = imgUrl + img[i];
  }
  wx.previewImage({
    urls: urls
  })
}
module.exports = {
  formatTime,
  $ajax,
  showBigPic
}
