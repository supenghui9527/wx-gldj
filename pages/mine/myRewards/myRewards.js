// pages/mine/myRewards/myRewards.js
Page({
  data: {
    active: 0,
    nav: {
      text: '奖励',
      text1: '惩罚'
    },
    lists: [{
      year: 2018,
      month: [{
        content: '苏朋辉6666666啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊'
      },
      {
        content: '撒撒撒啊啊啊啊啊啊22222'
      }]
    },
    {
      year: 2017,
      month: [{
        content: '撒撒撒啊啊啊啊啊啊555555'
      },
      {
        content: '撒撒撒啊啊啊啊啊啊66666'
      }]
    }]
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  },
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  }
})