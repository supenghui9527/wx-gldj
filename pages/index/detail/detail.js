// pages/index/detail/detail.js
Page({
  data: {
    active: 1,
    showComment: true
  },
  onLoad: function (options) {
  
  },
  changeTab(e){
    this.setData({
      active: e.currentTarget.dataset.index
    })
  },
  // 评论
  goComment(){
    this.setData({
      showComment: false
    })
  }
})