// pages/mine/myIntegral/myIntegral.js
const util = require('../../../utils/util.js');
Page({
  data: {
    lists: [
      {
        date: '2018-4-8',
        list: [{
          content: '参加活动签到成功2分',
          time: '15:30'
        },
        {
          content: '植树活动2分',
          time: '15:30'
        }]
      },
      {
        date: '2018-4-7',
        list: [{
          content: '参加活动签到成功2分大多数的速度打的',
          time: '15:30'
        },
        {
          content: '植树活动2分',
          time: '15:30'
        }]
      }
    ]
  },
  onLoad: function (options) {
  },
  onReady: function () {
    this.getPointList();
  },
  onShow: function () {
    
  },
  getPointList() {
    getApp().$ajax({
      httpUrl: getApp().api.findMyPointUrl,
      data: {
        userId: wx.getStorageSync('userinfo').id
      }
    }).then(({ data }) => {
      this.setData({
        lists: this.resetData(data)
      })
    })
  },
  resetData(data){
    let newLists = [];
    data.map(({ PubDate, Score, actName }) => {
      let date = util.formatTime(new Date(PubDate)).substring(0, 10),
        time = util.formatTime(new Date(PubDate)).substring(10),
        index = -1;
      newLists.map((e, i) => {
        if (e.date === date) {
          index = i;
          return;
        }
      });
      if (index === -1) {
        newLists.push({ date, list: [{ actName, Score, time }] });
      } else {
        newLists[index].list.push({ actName, Score, time });
      }
    })
    return newLists;
  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})