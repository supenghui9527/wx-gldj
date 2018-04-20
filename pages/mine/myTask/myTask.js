// pages/mine/myTask/myTask.js
Page({
  data: {
    active: 0,
    lists:[],
    nav: {
      text: '待完成',
      text1: '已完成'
    },
  },
  onLoad: function (options) {
    this.getMytaskLists(this.data.active);
  },
  // 切换
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
    this.getMytaskLists(this.data.active)
  },
  // 获取任务列表
  getMytaskLists(status) {
    getApp().$ajax({
      httpUrl: getApp().api.mySignUrl,
      data: {
        userId: wx.getStorageSync('userinfo').id,
        status: status
      }
    }).then(({ data }) => {
      data.map(item=>{
        item.actDate = item.actDate.substring(0, 16);
      });
      this.setData({
        lists: data
      })
    })
  }
})