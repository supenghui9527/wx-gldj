// pages/loading/loading.js
Page({
  data: {
  
  },
  onLoad() {
    if (wx.getStorageSync('userinfo')) {
      wx.switchTab({
        url: '/pages/index/index',
      })
    }else{
      setTimeout(() => {
        wx.redirectTo({
          url: '/pages/login/login'
        })
      }, 1500)
    }
  }
})