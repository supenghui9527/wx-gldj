// pages/mine/mine.js
Page({
  data: {
    showPlus: false,
    footer: {
      idx: false,
      mine: true
    },
  },
  //上传头像
  changeAvatar: function (e) {
    let ctx = this;
    wx.chooseImage({
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: getApp().api.changeAvatarUrl,
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            orgID: wx.getStorageSync('userInfo').orgID
          },
          success: function (res) {
            let data = JSON.parse(res.data);
            if (data.state == 1) {
              wx.showToast({
                title: data.message,
                success: (res) => {
                  ctx.onLoad();
                }
              })
            }
          }
        })
      }
    })
  },
  // 点击加图标显示弹出
  clickShowPlus() {
    this.setData({
      showPlus: true,
      overFlow: false
    })
  },
  // 关闭弹出活动
  closePlus() {
    this.setData({
      showPlus: false
    })
  },
  gomessage() {
    wx.navigateTo({
      url: '/pages/mine/messageBox/messageBox',
    })
  }
})