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
    this.getLists(1);
  },
  getLists(type){
    getApp().$ajax({
      httpUrl: getApp().api.getMyRewardsUrl,
      data: {
        orgId: wx.getStorageSync('userinfo').dept_id,
        infotype: type,
      }
    }).then(({ data }) => {
      this.setData({
        lists: this.recombinedData(data)
      })
    })
  },
  // 切换
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
    this.data.active == 0 ? this.getLists(1) : this.getLists(2);
  },
  // 组装数据
  recombinedData(data) {
    let yearArr = [];
    data.map(({ content, create_date_time }) => {
      let year = util.formatTime(new Date(create_date_time)).substring(0, 4);
      let index = -1;
      let date = util.formatTime(new Date(create_date_time)).substring(5, 10);
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
  }
})