// pages/active/post/activityList/activityList.js
let oldLists = [];
Page({
  data: {
    lists:[]
  },
  onLoad: function (options) {
    wx.request({
      url: getApp().api.getActTitleUrl,
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: {
        userID:wx.getStorageSync('userinfo').id
      },
      success: ({data}) => {
        oldLists = data.data;
        this.setData({lists: data.data});
      }
    })
  },
  search(e){
    let lists = this.data.lists,newLists = [];
    if (e.detail.value){
      lists.forEach(item => {
        if (item.title.indexOf(e.detail.value) != -1) {
          newLists.push(item)
        }
      })
      this.setData({lists: newLists});
    }else{
      this.setData({lists: oldLists});
    }
  },
  chooseItem (e) {
    let item = e.currentTarget.dataset.item;
    this.setData({inputValue: item.title});
    wx.redirectTo({
      url: `/pages/active/post/post?text=${item.title}&id=${item.id}&actName=${item.actName}`
    });
  }
})