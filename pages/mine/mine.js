// pages/mine/mine.js
Page({
  data: {
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
  onShow() {
    let userInfo = wx.getStorageSync('userinfo');
    this.setData({ userInfo: userInfo, userType: userInfo.isSuperAdmin});
    this.getUserinfo(userInfo);
  },
  getUserinfo(userInfo){
    getApp().$ajax({
      isShowLoading: false,
      httpUrl: getApp().api.loginUrl,
      data: {
        user: userInfo.login_name,
        password: userInfo.personCard
      }
    }).then(({ data }) => {
      wx.setStorageSync('userinfo', data[0]);
      let userinfo = wx.getStorageSync('userinfo');
      this.setData({
        myfouse: userinfo.interests,
        myfans: userinfo.fans,
        mypost: userinfo.acts,
        myscore: userinfo.score,
        userName: userinfo.name,
        orgName: userinfo.orgName,
        avatar: `${getApp().imgUrl}${userinfo.avatar}`
      })
    })
  },
  //上传头像
  changeAvatar: function (e) {
    let ctx = this;
    wx.chooseImage({
      success: (res) =>{
        let tempFilePaths = res.tempFilePaths;
        wx.uploadFile({
          url: getApp().api.changeAvatarUrl,
          header: { "Content-Type": "multipart/form-data" },
          filePath: tempFilePaths[0],
          name: 'image',
          formData: {
            userID: wx.getStorageSync('userinfo').id
          },
          success: ({data})=>{
            let datas = JSON.parse(data);
            if (datas.state==1){
              ctx.getUserinfo(this.data.userInfo);
              wx.showToast({
                title: '头像修改成功',
                icon:'none'
              });
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
  // 消息通知
  gomessage() {
    wx.navigateTo({
      url: '/pages/mine/messageBox/messageBox',
    })
  }
})