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
    getApp().$ajax({
      httpUrl: getApp().api.loginUrl,
      data: {
        user: userinfo.login_name,
        password: userinfo.personCard
      }
    }).then(({ data }) => {
      wx.setStorageSync('userinfo', data[0]);
      userinfo = wx.getStorageSync('userinfo');
      this.setData({
        myfouse: userinfo.interests,
        myfans: userinfo.fans,
        mypost: userinfo.acts,
        myscore: userinfo.score,
        userName: userinfo.name,
        orgName: userinfo.orgName,
        userType: userinfo.isSuperAdmin,
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
              let userinfo = wx.getStorageSync('userinfo');
              userinfo.avatar = datas.data;
              wx.setStorageSync('userinfo', userinfo);
              ctx.onLoad();
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