// pages/active/activityPreview/userLists/userLists.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNameArr: [],
    ids: [],
    lists: [
      {
        text: '分组一',
        id: 2,
        isSelect: true
      },
      {
        text: '分组二',
        id: 3,
        isSelect: true
      },
      {
        text: '分组三',
        id: 4,
        isSelect: true
      },
      {
        text: '分组四',
        id: 5,
        isSelect: true
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  chooseAll () {
    let lists = this.data.lists, ids = [];
    lists.forEach(i => {
      i.isSelect = !i.isSelect;
      ids.push(i.id);
    })
    this.setData({
      lists: lists
    });
  },
  chooseGroup(e) {
    let item = e.target.dataset.item, lists = this.data.lists,ids =[];
    lists.forEach(i => {
      i.id == item.id ? i.isSelect = !i.isSelect : ''
      if (!i.isSelect) ids.push(i.id)
    })
    this.setData({
      lists: lists
    });
  }
})