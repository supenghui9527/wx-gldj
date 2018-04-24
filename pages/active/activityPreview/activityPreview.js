// pages/active/activityPreview/activityPreview.js
const util = require('../../../utils/util.js');
var date = new Date();
Page({
  data: {
    active: 0,
    typeName: '支部大会',
    userLists: '',
    groupId: '',
    date: util.formatTime(date).substring(0, 10),
    time: util.formatTime(date).substring(10),
    typeLists: []
  },
  onLoad(options) {

  },
  onShow(){
    this.setData({ typeLists: wx.getStorageSync('hotGroup'), active: wx.getStorageSync('hotGroup')[0].id});
    let userinfo = wx.getStorageSync('userinfo');
    if (wx.getStorageSync('userGroup')) {
      this.setData({
        userLists: wx.getStorageSync('userGroup').texts,
        groupId: wx.getStorageSync('userGroup').ids,
        orgName: userinfo.orgName,
        orgID: userinfo.dept_id,
        userID: userinfo.id,
        userName:userinfo.name
      })
      wx.removeStorageSync('userGroup')
    }
  },
  // 活动类型
  chooseType(e) {
    this.setData({
      active: e.target.dataset.index,
      typeName: e.target.dataset.name
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  // 选择需要通知用户
  goUserList() {
    wx.navigateTo({
      url: "/pages/active/activityPreview/userLists/userLists",
    })
  },
  submitActivity(e) {
    let formData = e.detail.value;
    for (let item in formData) {
      if (formData[item] == '') {
        wx.showToast({
          title: '请确认信息是否填写完整',
          icon: 'none'
        })
        return false;
      }
    }
    getApp().$ajax({
      httpUrl: getApp().api.actReserveUrl,
      data: e.detail.value
    }).then((data) => {
      wx.showToast({
        title: '预告发布成功',
        icon:'none',
        success:()=>{
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      })
    })
  }
})