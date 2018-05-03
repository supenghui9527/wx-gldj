// pages/mine/myOrdered/myOrdered.js
Page({
  data: {
    lists: [],
    userType: 0
  },
  onLoad: function (options) {
    getApp().$ajax({
      httpUrl: getApp().api.mySignUrl,
      data: {
        userId: wx.getStorageSync('userinfo').id,
        status: 0
      }
    }).then(({ data }) => {
      data.map(item => {
        item.actDate = item.actDate.substring(0, 16);
        item.create_date_time = item.create_date_time.substring(0, 16)
      })
      this.setData({
        lists: data
      })
    })
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
  
  }
})