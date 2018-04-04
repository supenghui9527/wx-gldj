// pages/index/message/message.js
Page({
  data: {
    active: 0,
    nav:{
      text: '@我的',
      text1: '所有'
    },
    lists: {
      item: 6,
      text: '我的签到'
    }
  },
  onLoad: function (options) {
  
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
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  }
})