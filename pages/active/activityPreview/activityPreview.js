// pages/active/activityPreview/activityPreview.js
const util = require('../../../utils/util.js');
var date = new Date();
Page({
  data: {
    active: 0,
    date: util.formatTime(date).substring(0,10),
    time: util.formatTime(date).substring(10),
    obj:{
      number: 6
    }
  },
  chooseType (e) {
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
})