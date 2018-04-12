// pages/mine/myRewards/myRewards.js
const util = require('../../../utils/util.js');
Page({
  data: {
    active: 0,
    nav: {
      text: '奖励',
      text1: '惩罚'
    },
    testLists: [
      {
        content: '测试但撒旦撒旦撒旦撒',
        createDateTime: 1523431097000
      },
      {
        content: '测试但撒旦',
        createDateTime: 1523401097000
      },
      {
        content: '测试但撒旦dsdsd',
        createDateTime: 1323431097000
      }
    ],
    lists: [{
      year: 2018,
      month: [{
        content: '测试但撒旦撒旦撒旦撒',
        date: '04-08'
      },
      {
        content: '测试但撒旦',
        date: '04-05'
      }]
    },
    {
      year: 2017,
      month: [{
        content: '测试但撒旦dsdsd',
        date: '03-08'
      }]
    }]
  },
  onLoad: function (options) {

    console.log(this.recombinedData(this.data.testLists));

    getApp().$ajax({
      httpUrl: getApp().api.getMyRewardsUrl,
      data: {
        orgId: '4028888961e5adf30161e5cbbc4b0000',// wx.getStorageSync('userinfo').dept_id
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