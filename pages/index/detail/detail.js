// pages/index/detail/detail.js
const util = require('../../../utils/util.js');
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
      detail.actDate = util.formatTime(new Date(detail.pubDate));
      detail.pics ? detail.pics = detail.pics.split(',') : detail.pics = [];
      let pics = detail.pics;
      pics[1] ? detail.pics.pop() : detail.pics = pics.slice(0, 1);
      console.log(detail.checksDetail)
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
  // 分享
  onShareAppMessage: function (res) {
    return {
      title: '自定义转发标题',
      path: `/pages/home/detail/detail?actId=${this.data.actId}`,
      success: function (res) {
        this.userDo('0')
      },
      fail: function (res) {
      }
    }
  },
  // 点击浏览大图
  showBigImage(e) {
    console.log(e)
    getApp().showBigPic(e);
  },
  // 点赞
  clickLikes(){
    userDo('2');
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