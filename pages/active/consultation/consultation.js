// pages/active/consultation/consultation.js
let amapFile = require('../../../utils/amap-wx.js'), myAmapFun;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    lists:[],
    nav: {
      text: '地图',
      text1: '资讯'
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext('map');
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
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  onHide: function () {
  
  },
  onUnload: function () {
  
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  },
  getNewsLists(){
    getApp().$ajax({
      httpUrl: getApp().api.getMyRewardsUrl,
      data: {
        orgId: wx.getStorageSync('userinfo').dept_id,
        infotype: 0,
      }
    }).then(({ data }) => {
      this.setData({
        lists: data
      })
    })
  },
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
    this.data.active == 1 && this.getNewsLists();
  }
})