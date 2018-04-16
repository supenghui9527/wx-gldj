// pages/index/detail/detail.js
Page({
  data: {
    active: 1,
    showComment: true,
    detail:{}
  },
  onLoad: function (options) {
    getApp().$ajax({
      httpUrl: getApp().api.getPostingsDetailUrl,
      data: {
        actId: options.actId
      }
    }).then(({ data }) => {
      let detail = data[0];
      detail.imgUrl = getApp().imgUrl;
      this.setData({
        detail: detail,
        actId: options.actId
      })
    })
  },
  changeTab(e){
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  // 评论
  goComment(){
    this.setData({
      showComment: !this.data.showComment
    })
  },
  sureComment(e){
    this.userDo('1',e.detail.value)
  },
  // 点赞分享评论
  userDo(type, comment) {
    getApp().$ajax({
      httpUrl: getApp().api.postingsLikesUrl,
      data: {
        actID: this.data.actId,
        userID: wx.getStorageSync('userinfo').id,
        type: type,
        comment: comment || ''
      }
    }).then(({ data }) => {

    })
  },
})