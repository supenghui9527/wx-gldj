// pages/login/login.js
Page({
  data: {

  },
  login(e) {
    getApp().$ajax({
      httpUrl: 'http://www.wsspha.cn/images/bg.png',
      data: {
        user: e.detail.value.user,
        password: e.detail.value.password
      }
    }).then(({ data }) => {
      if (data.state == 0) {
      }
      wx.hideLoading();
    })
  }
})