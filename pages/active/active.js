// pages/active/active.js
Page({
  data: {
    footer: {
      idx: false,
      nav: true
    },
  },
  onLoad: function (options) {
    this.setData({ userType: wx.getStorageSync('userinfo').isSuperAdmin })
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  //签到
  sign() {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        getApp().$ajax({
          httpUrl: getApp().api.actSignUrl,
          data: {
            actID: JSON.parse(res.result).author,
            userID: wx.getStorageSync('userinfo').id,
            type: '2'
          }
        }).then(({ data }) => {
          wx.showToast({
            title: '签到成功',
            icon: 'none'
          })
        })
      },
      fail: () => {
        console.log(1)
      }
    })
  }
})