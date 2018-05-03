// pages/mine/myFans/myFans.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [],
    cancel: '',
    fanstype:0
  },
  onLoad: function (options) {
    this.getFansLists()
  },
  // 获取粉丝列表
  getFansLists() {
    getApp().$ajax({
      httpUrl: getApp().api.myFansUrl,
      data: {
        orgID: wx.getStorageSync('userinfo').dept_id
      }
    }).then(( data ) => {
      data.imgUrl = getApp().imgUrl;
      this.setData({
        lists: data
      })
    })
  },
  // 移除粉丝
  deleteFans(){
    getApp().$ajax({
      httpUrl: getApp().api.deleteFansUrl,
      data: {
        orgID: wx.getStorageSync('userinfo').dept_id
      }
    }).then((data) => {
      data.imgUrl = getApp().imgUrl;
      this.setData({
        lists: data
      })
    })
  },
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