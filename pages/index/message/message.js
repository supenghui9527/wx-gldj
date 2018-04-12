// pages/index/message/message.js
Page({
  data: {
    active: 0,
    nav:{
      text: '@我的',
      text1: '所有'
    },
    noData: false,
    showCodeImage: true,
    lists: []
  },
  onLoad(options) {
    this.getReserveLists('1',0);
  },
  // 获取活动预约发布列表
  getReserveLists(type,active){
    getApp().$ajax({
      httpUrl: getApp().api.getReserveListsUrl,
      data: {
        userID: wx.getStorageSync('userinfo').id,
        type: type
      }
    }).then(({ data }) => {
      this.setData({
        lists: data,
        active: active,
        noData: data.toString()==''?true:false
      })
    })
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  // 获取二维码图片
  getCodeImage(e){
    getApp().$ajax({
      httpUrl: getApp().api.codeImageUrl,
      data: {
        actid: e.target.dataset.actid,
      }
    }).then(({ data }) => {
      this.setData({
        codeImage: `${getApp().imgUrl}${data}`,
        showCodeImage: false
      })
    }) 
  },
  hideCodeImage(){
    this.setData({
      showCodeImage: true
    })
  },
  clickOrder(e) {
    getApp().$ajax({
      httpUrl: getApp().api.actSignUrl,
      data: {
        userID: wx.getStorageSync('userinfo').id,
        actID: e.target.dataset.actid,
        type: '1'
      }
    }).then(({ data }) => {
      this.data.active == 0 ? this.getReserveLists('1', 0) : this.getReserveLists('0', 1);
    })  
  },
  changeNav(e) {
    let active = e.currentTarget.dataset.index;
    active == 0 ? this.getReserveLists('1',0) : this.getReserveLists('0',1)
  }
})