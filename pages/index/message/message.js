// pages/index/message/message.js
Page({
  data: {
    active: 0,
    nav:{
      text: '@我的',
      text1: '所有'
    },
    lists: [
      {
        actName: '方芳芳',
        title: '发发呆',
        createDate: '2018-4-11',
        actDate: '2018-4-11',
        place: '南京鼓楼',
        contracts: '苏朋辉',
        tel: '13853522562',
        remark: '带的',
        state: '1'
      },
      {
        actName: '方芳芳',
        title: '发发呆',
        createDate: '2018-4-11',
        actDate: '2018-4-11',
        place: '南京鼓楼',
        contracts: '苏朋辉',
        tel: '13853522562',
        remark: '带的',
        state: '2'
      }
    ]

  },
  onLoad(options) {
    this.getReserveLists('1');
  },
  // 获取活动预约发布列表
  getReserveLists(type){
    getApp().$ajax({
      httpUrl: getApp().api.getReserveListsUrl,
      data: {
        userID: wx.getStorageSync('userinfo').id,
        type: type
      }
    }).then(({ data }) => {
      this.getGroupLists();
    })
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
    this.data.active == 0 ? this.getReserveLists('1') : this.getReserveLists('0')
  }
})