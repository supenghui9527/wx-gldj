// pages/active/consultation/consultation.js
let amapFile = require('../../../utils/amap-wx.js'), myAmapFun;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    nav: {
      text: '地图',
      text1: '资讯'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext('map')
    myAmapFun = new amapFile.AMapWX({ key: 'cd8a5c0aca6d10ef29ecd7599e9173d5' });
    let systemInfo_ = wx.getSystemInfoSync();

    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        let latitude = res.latitude;
        let longitude = res.longitude;
        // let marker = this.createMarker(res);
        this.setData({
          centerX: longitude,
          centerY: latitude,
          // controls: [{
          //   id: 1,
          //   iconPath: '/images/route.png',
          //   position: {
          //     left: systemInfo_.screenWidth - 60,
          //     top: systemInfo_.windowHeight - systemInfo_.windowHeight * 0.28,
          //     width: 50,
          //     height: 50
          //   },
          //   clickable: true
          // }]
        })
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  }
})