// pages/index/detail/detail.js
const util = require('../../../utils/util.js');
Page({
  data: {
    active: 1,
    showComment: true,
    islike: '',// 判断是否点赞0没，1有
    options: {},
    detail: {},
    isPublic: 1
  },
  onLoad: function (options) {
    this.setData({ islike: options.islike });
    this.data.options = options;
    this.getDetail(options);
    this.setData({
      userID:wx.getStorageSync('userinfo').id
    })
  },
  getDetail(options) {
    getApp().$ajax({
      httpUrl: getApp().api.getPostingsDetailUrl,
      data: {
        actId: options.actId
      }
    }).then(({ data }) => {
      let detail = data[0];
      detail.imgUrl = getApp().imgUrl;
      detail.actDate = util.formatTime(new Date(detail.pubDate));
      detail.commentsDetail.map(item=>{
        item.create_date_time = util.formatTime(new Date(item.create_date_time));
        if (item.tag==1){
          item.name = `${item.name.substring(0,1)}**`
        }
      })
      detail.sharesDetail.map(item => {
        item.create_date_time = util.formatTime(new Date(item.create_date_time))
      })
      detail.pics ? detail.pics = detail.pics.split(',') : detail.pics = [];
      let pics = detail.pics;
      pics[1] ? detail.pics.pop() : detail.pics = pics.slice(0, 1);
      this.setData({
        detail: detail,
        actId: options.actId
      })
    })
  },
  // 点赞分享评论切换
  changeTab(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  // 评论
  goComment() {
    this.setData({
      showComment: !this.data.showComment
    })
  },
  // 确认评论
  sureComment(e) {
    e.detail.value ? this.userDo({ type: 1, comment: e.detail.value }) : wx.showToast({
      title: '请输入评论内容',
      icon:'none'
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    let ctx = this;
    return {
      title: '鼓楼党建e生活',
      path: `/pages/index/detail/detail?actId=${ctx.data.actId}`,
      success: function (res) {
        ctx.userDo({ type: 0 })
      },
      fail: function (res) {
      }
    }
  },
  // 点击浏览大图
  showBigImage(e) {
    getApp().showBigPic(e);
  },
  // 点赞
  clickLikes() {
    this.data.islike == 0 ? this.userDo({ type: 2, islike: true }) : wx.showToast({ title: '您已点赞', icon: 'none' });
  },
  // 是否匿名评论
  checkboxChange(e){
    if (e.detail.value.length==0){
      this.setData({
        isPublic: 0
      })
    }else{
      this.setData({
        isPublic: 1
      })
    }
  },
  // 点赞分享评论
  userDo({ type, comment, islike = false }) {
    if(wx.getStorageSync('userinfo')){
      getApp().$ajax({
        httpUrl: getApp().api.postingsLikesUrl,
        data: {
          actID: this.data.actId,
          userID: wx.getStorageSync('userinfo').id,
          type: type,
          comment: comment || '',
          isPublic: this.data.isPublic
        }
      }).then(({ data }) => {
        islike && this.setData({ islike: 1 });
        this.getDetail(this.data.options);
      })
    }else{
      wx.showToast({
        title:'您未登录请登录后在执行操作',
        icon:'none'
      })
    }
  }
})