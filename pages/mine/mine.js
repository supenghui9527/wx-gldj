// pages/mine/mine.js
Page({
  data: {
    showPlus: false,
    footer: {
      idx: false,
      mine: true
    },
    myfouse: '',
    myfans: '',
    mypost: '',
    myscore: '',
    userName: '',
    orgName: '',
    avatar: '',
  },
  onLoad() {
    let userinfo = wx.getStorageSync('userinfo');
    this.setData({
      myfouse: userinfo.interests,
      myfans: userinfo.fans,
      mypost: userinfo.acts,
      myscore:userinfo.score,
      userName: userinfo.name,
      orgName: userinfo.orgName,
      avatar: `http://192.168.8.24:8080/${userinfo.avatar}`
    })
  },
  //上传头像
  changeAvatar: function (e) {
    let ctx = this;
    wx.chooseImage({
      success: function (res) {
        let tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: getApp().api.changeAvatarUrl,
          header: { "Content-Type": "multipart/form-data" },
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            userID: wx.getStorageSync('userinfo').id
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
  // 
  gomessage() {
    wx.navigateTo({
      url: '/pages/mine/messageBox/messageBox',
    })
  }
})