// pages/active/activityPreview/activityPreview.js
const util = require('../../../utils/util.js');
const date = new Date();
Page({
  data: {
    active: 0 ,
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
    wx.getStorageSync('actType') ? this.setData({ active: wx.getStorageSync('actType') }) : this.setData({ active: wx.getStorageSync('hotGroup')[0].id });
    this.setData({ typeLists: wx.getStorageSync('hotGroup')});
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
  onHide(){
    // wx.removeStorageSync('actType');
  },
  // 活动类型
  chooseType(e) {
    wx.setStorageSync('actType', e.target.dataset.index);
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
        if (item=='remark') continue;
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
        duration: 2500,
        success:()=>{
          wx.removeStorageSync('actType');
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    })
  }
})