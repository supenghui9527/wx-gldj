// pages/mine/myIntegral/myIntegral.js
const util = require('../../../utils/util.js');
Page({
  data: {
    lists: []
  },
  onLoad: function (options) {
    this.getPointList();
    this.setData({
      score: wx.getStorageSync('userinfo').score
    })
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