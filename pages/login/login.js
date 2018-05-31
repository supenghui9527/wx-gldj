// pages/login/login.js
Page({
  data: {

  },
  login(e) {
    getApp().$ajax({
      httpUrl: getApp().api.loginUrl,
      title: '登录中...',
      data: {
        user: e.detail.value.user,
        password: e.detail.value.password
      }
    }).then(({ data }) => {
      wx.setStorageSync('userinfo', data[0]);
      wx.showToast({
        title: '登陆成功',
        icon:'none'
      })
      wx.switchTab({
        url: '/pages/index/index',
      })
    })
  }
})