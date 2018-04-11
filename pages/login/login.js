// pages/login/login.js
Page({
  data: {

  },
  login(e) {
    getApp().$ajax({
      httpUrl: getApp().api.loginUrl,
      data: {
        user: e.detail.value.user,
        password: e.detail.value.password
      }
    }).then(({ data }) => {
      // console.log(data);
      wx.setStorageSync('userinfo', data[0])
      wx.navigateTo({
        url: '/pages/index/index',
      })
      wx.hideLoading();
    })
  }
})