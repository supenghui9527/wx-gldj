// pages/mine/messageBox/messageBox.js
const util = require('../../../utils/util.js');
Page({
  data: {
    lists:[]
  },
  onLoad: function (options) {
    getApp().$ajax({
      httpUrl: getApp().api.getMyRewardsUrl,
      data: {
        orgId: wx.getStorageSync('userinfo').dept_id,
        infotype: '3',
      }
    }).then(({ data }) => {
      data.map(item=>{
        item.create_date_time = util.formatTime(new Date(item.create_date_time)).substring(0, 10);
      })
      this.setData({
        lists: data
      })
    })
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
  onShareAppMessage: function () {
  
  }
})