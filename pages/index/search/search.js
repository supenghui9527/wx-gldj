// pages/index/search/search.js
const util = require('../../../utils/util.js');
Page({
  data:{
    lists: []
  },
  onLoad(){
    this.getGroupLists();
  },
  getListData(){
    this.getSearchLists(this.data.content);
  },
  getSearchLists(content) {
    getApp().$ajax({
      httpUrl: getApp().api.goSearchUrl,
      data: {
        userId: wx.getStorageSync('userinfo').id,
        content: content
      }
    }).then(({ data }) => {
      this.setData({
        lists: util.resetData(data)
      })
    })
  },
  search(e){
    this.setData({ content: e.detail.value});
    this.getSearchLists(e.detail.value);
  },
  // 获取用户分组
  getGroupLists() {
    getApp().$ajax({
      isShowLoading: false,
      httpUrl: getApp().api.getFouseGroupUrl,
      data: {
        userId: wx.getStorageSync('userinfo').id
      }
    }).then(({ data }) => {
      data.map(item => {
        item.checked = false;
      })
      this.setData({
        groupLists: data
      })
    })
  },
  // 显示添加分组
  showAddGroup() {
    this.setData({
      addGroupShow: true
    })
  },
  // 取消添加分组
  hideAddGroup() {
    this.setData({
      addGroupShow: false
    })
  },
  // 获取添加分组输入框值
  getGroupName(e) {
    this.setData({
      groupName: e.detail.value
    })
  },
  // 添加用户分组
  sureAddGroup() {
    getApp().$ajax({
      httpUrl: getApp().api.addFouseGroupUrl,
      data: {
        userId: wx.getStorageSync('userinfo').id,
        name: this.data.groupName
      }
    }).then(({ data }) => {
      this.getGroupLists();
    })
    this.setData({
      addGroupShow: false
    })
  },
  // 点赞分享评论
  userDo(actID, type, comment) {
    getApp().$ajax({
      httpUrl: getApp().api.postingsLikesUrl,
      data: {
        actID: actID,
        userID: wx.getStorageSync('userinfo').id,
        type: type,
        comment: comment || ''
      }
    }).then(({ data }) => {
      this.getListData()
    })
  },
  // 获取组件传递id
  toIndexActid(e) {
    this.setData({
      actID: e.detail
    })
  },
  // 分享
  onShareAppMessage: function (res) {
    let ctx = this, actId = res.target.dataset.actid;
    return {
      title: '鼓楼党建e生活',
      path: `/pages/index/detail/detail?actId=${actId}`,
      success: function (res) {
        ctx.userDo(actId, '0')
      },
      fail: function (res) {
      }
    }
  },
  //阻止页面滚动穿透
  overflowHidden() {
    this.setData({
      overFlow: !this.data.overFlow
    })
  },
  backIndex () {
    wx.navigateBack({
      delta: 1
    })
  }
})