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
function $ajax({ wxApp = false, httpUrl, data = {}, method = 'post', title = "加载中..." }) {
  return new Promise((resolve, reject) => {
    wx.showLoading({ mask: true, title: title });
    wx.request({
      url: httpUrl,
      method: method,
      data: data,
      header: method === 'post' ? { "Content-Type": "application/x-www-form-urlencoded" } : { 'content-type': 'application/json' },
      success: ({ data: { data, message, state } }) => {
        if (state == 1) {
          resolve({ data: data, message });
        } else {
          wx.hideLoading();
          wxApp != false ? wxApp.setData({ err: message }) : wx.showToast({ title: message })
        }
      },
      fail: (err) => {
        wx.showToast({
          title: err
        })
      }
    })
  })
}
function showBigPic(e) {
  let img = e.currentTarget.dataset.img,
    imgUrl = e.currentTarget.dataset.imgurl,
    urls = [];
  for (let i = 0; i < img.length; i++) {
    urls[i] = imgUrl + img[i];
  }
  wx.previewImage({
    urls: urls
  })
}
module.exports = {
  formatTime: formatTime,
  $ajax: $ajax
}
