// pages/mine/myFocusing/myFocusing.js
Page({
  data: {
    lists: [],
    cancel: '取消关注'
  },
  onLoad: function (options) {
    this.getFouseLists();
  },
  // 获取关注列表
  getFouseLists() {
    getApp().$ajax({
      httpUrl: getApp().api.myFouseUrl,
      data: {
        userID: wx.getStorageSync('userinfo').id
      }
    }).then((data) => {
      data.imgUrl = getApp().imgUrl;
      this.setData({
        lists: data
      })
    })
  },
  // 取消关注
  cancelFouse(e) {
    getApp().$ajax({
      httpUrl: getApp().api.userCancelUrl,
      data: {
        userID: wx.getStorageSync('userinfo').id,
        orgID: e.currentTarget.dataset.id
      }
    }).then(({ data }) => {
      wx.showToast({
        title: '取消成功',
        icon: 'none',
        success: res => {
          this.getFouseLists();
        }
      })
    })
  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  }
})