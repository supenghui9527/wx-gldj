// pages/mine/myTask/myTask.js
Page({
  data: {
    active: 0,
    nav: {
      text: '待完成',
      text1: '已完成'
    },
  },
  onLoad: function (options) {

  },
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  }
})