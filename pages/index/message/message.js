// pages/index/message/message.js
Page({
  data: {
    active: 0,
    enterType: false,
    userType: 0,//判断进入的角色
    nav: {
      text: '@我的',
      text1: '所有'
    },
    noData: false,
    showCodeImage: true,
    lists: []
  },
  onLoad(options) {
    let userType = wx.getStorageSync('userinfo').isSuperAdmin;
    if (options.enterType == 0) {
      this.setData({ enterType: false });
      this.getReserveLists('1', 0);
    } else {
      if (userType == 1) {
        this.setData({ userType: userType, enterType:false });
        this.getReserveLists('0', 1);
      } else {
        this.setData({ enterType: true });
        this.getReserveLists('1', 0);
      }
    }
  },
  // 获取活动预约发布列表
  getReserveLists(type, active) {
    getApp().$ajax({
      httpUrl: getApp().api.getReserveListsUrl,
      data: {
        userID: wx.getStorageSync('userinfo').id,
        type: type
      }
    }).then(({ data }) => {
      data.map(item => {
        item.actDate = item.actDate.substring(0, 16);
        item.create_date_time = item.create_date_time.substring(0, 16)
      })
      this.setData({
        lists: data,
        active: active,
        noData: data.toString() == '' ? true : false
      })
    })
  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  // 获取二维码图片
  getCodeImage(e) {
    getApp().$ajax({
      httpUrl: getApp().api.codeImageUrl,
      data: {
        actid: e.target.dataset.actid,
      }
    }).then(({ data }) => {
      this.setData({
        codeImage: `${getApp().codeUrl}${data}`,
        showCodeImage: false
      })
    })
  },
  hideCodeImage() {
    this.setData({
      showCodeImage: true
    })
  },
  // 签到预约
  clickOrder(e) {
    getApp().$ajax({
      httpUrl: getApp().api.actSignUrl,
      data: {
        userID: wx.getStorageSync('userinfo').id,
        actID: e.target.dataset.actid,
        nums: e.target.dataset.nums,
        type: '1'
      }
    }).then(({ data }) => {
      this.data.active == 0 ? this.getReserveLists('1', 0) : this.getReserveLists('0', 1);
    })
  },
  changeNav(e) {
    let active = e.currentTarget.dataset.index;
    active == 0 ? this.getReserveLists('1', 0) : this.getReserveLists('0', 1)
  }
})