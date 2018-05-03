// pages/mine/myPosts/myPosts.js
const util = require('../../../utils/util.js');
Page({
  data: {
    lists: [],
    isShowFouse:false
  },
  onLoad: function (options) {
    this.getPostingsList();
  },
  // 获取我的发布列表
  getPostingsList(){
    getApp().$ajax({
      httpUrl: getApp().api.myPostingUrl,
      data: {
        userID: wx.getStorageSync('userinfo').id
      }
    }).then(({ data }) => {
      wx.stopPullDownRefresh();
      this.setData({
        lists: util.resetData(data)
      })
    })
  },
  getListData() {
    this.getPostingsList()
  },
  // 点赞分享评论
  userDo({actID, type, comment}) {
    getApp().$ajax({
      httpUrl: getApp().api.postingsLikesUrl,
      data: {
        actID: actID,
        userID: wx.getStorageSync('userinfo').id,
        type: type,
        comment: comment || ''
      }
    }).then(({ data }) => {
      this.getListData()
    })
  },
  // 获取组件传递id
  toIndexActid(e) {
    this.setData({
      actID: e.detail
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    let ctx = this, actId = res.target.dataset.actid;
    return {
      title: '鼓楼党建e生活',
      path: `/pages/index/detail/detail?actId=${actId}`,
      success: function (res) {
        ctx.userDo(actId, '0')
      },
      fail: function (res) {
      }
    }
  },
  onPullDownRefresh: function () {
  
  },
  onReachBottom: function () {
  
  }
})