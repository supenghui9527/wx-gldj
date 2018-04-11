// pages/active/activityPreview/userLists/userLists.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeNameArr: [],
    all: true,
    ids: [],
    lists: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let userinfo = wx.getStorageSync('userinfo');
    getApp().$ajax({
      httpUrl: getApp().api.getUserGroupUrl,
      data: {
        orgId: userinfo.dept_id
      }
    }).then(({ data }) => {
      let datas = data;
      for(let i=0; i<datas.length;i++){
        datas[i].isSelect = true;
      }
      this.setData({
        lists: datas
      })
    })

  },
  // 选择所有
  chooseAll () {
    let ids = ['-1'];
    this.data.all ? this.setData({ all: false, ids: '-1', texts: '所有人'}) : this.setData({ all: true, ids: '', texts:''});
  },
  // 选择分组
  chooseGroup(e) {
    let item = e.currentTarget.dataset.item, lists = this.data.lists,ids =[],texts=[];
    lists.forEach(i => {
      i.id == item.id ? i.isSelect = !i.isSelect : ''
      if (!i.isSelect) {
        ids.push(i.id);
        texts.push(i.name)
      }
    })
    this.setData({
      lists: lists,
      ids: ids.toString(),
      texts: texts.toString()
    });
  },
  // 确定
  sure() {
    let data = {
      ids: this.data.ids,
      texts: this.data.texts
    }
    wx.setStorageSync('userGroup', data)
    wx.navigateBack({
      delta: 1
    })
  }
})