// pages/loading/loading.js
Page({
  data: {
  
  },
  onLoad() {
    if (wx.getStorageSync('userinfo')) {
      getApp().$ajax({
        httpUrl: getApp().api.loginUrl,
        isLogin:true,
        isShowLoading: false,
        title: '登录中...',
        data: {
          user: wx.getStorageSync('userinfo').login_name,
          password: wx.getStorageSync('userinfo').personCard
        }
      }).then(({ data }) => {
        wx.setStorageSync('userinfo', data[0]);
        wx.switchTab({
          url: '/pages/index/index',
        })
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