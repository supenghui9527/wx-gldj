// pages/index/detail/detail.js
Page({
  data: {
    active: 1
  },
  onLoad: function (options) {
  
  },
  changeTab(e){
    this.setData({
      active: e.currentTarget.dataset.index
    })
  }
})