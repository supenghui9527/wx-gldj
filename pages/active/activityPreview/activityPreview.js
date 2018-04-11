// pages/active/activityPreview/activityPreview.js
const util = require('../../../utils/util.js');
var date = new Date();
Page({
  data: {
    active: 0,
    userLists: '',
    userID: '',
    date: util.formatTime(date).substring(0, 10),
    time: util.formatTime(date).substring(10),
    typeLists: [
      {
        name: '党工委',
        id: 2
      },
      {
        name: '党小组会',
        id: 2
      },
      {
        name: '党员大会',
        id: 2
      },
      {
        name: '党支部',
        id: 2
      },
      {
        name: '党日活动',
        id: 2
      },
      {
        name: '党员活动',
        id: 2
      }
    ]
  },
  onLoad(options) {
    if(options.ids){
      this.setData({
        userLists: options.lists,
        userID: options.ids
      })
    }
  },
  chooseType(e) {
    console.log(e)
    this.setData({
      active: e.target.dataset.index
    })
  },
  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  goUserList() {
    wx.navigateTo({
      url: "/pages/active/activityPreview/userLists/userLists",
    })
  },
  submitActivity(e) {
    let formData = e.detail.value;
    console.log(formData)
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
    }).then(({ data }) => {

    })
  }
})