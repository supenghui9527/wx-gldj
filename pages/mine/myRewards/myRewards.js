// pages/mine/myRewards/myRewards.js
const util = require('../../../utils/util.js');
Page({
  data: {
    active: 0,
    nav: {
      text: '奖励',
      text1: '惩罚'
    },
    lists: []
  },
  onLoad: function (options) {
    // console.log(this.recombinedData(this.data.testLists));
    getApp().$ajax({
      httpUrl: getApp().api.getMyRewardsUrl,
      data: {
        orgId: wx.getStorageSync('userinfo').dept_id,
        infotype: '0',
      }
    }).then(({ data }) => {
      this.setData({
        lists: data
      })
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  // 组装数据
  recombinedData(data) {
    let yearArr = [];
    data.map(({ content, createDateTime }) => {
      let year = util.formatTime(new Date(createDateTime)).substring(0, 4);
      let index = -1;
      let date = util.formatTime(new Date(createDateTime)).substring(5, 10);
      yearArr.forEach((e, i) => {
        if (e.year === year) {
          index = i;
          return;
        }
      });
      if (index === -1) {
        yearArr.push({ year, month: [{ content, date }]});
      } else {
        yearArr[index].month.push({ content, date });
      }
    });
    return yearArr;
  },
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
  }
})