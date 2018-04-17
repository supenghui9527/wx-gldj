//index.js
const util = require('../../utils/util.js');
//获取应用实例
const app = getApp();
var animation = wx.createAnimation({
  duration: 500,
  timingFunction: 'ease',
});
Page({
  data: {
    active: 0,
    addGroupShow: false,
    nav: ['关注', '热门'],
    showMsg: false,
    hotGroup: [],
    groupLists:[],
    lists: [],
    footer: {
      idx: true,
      mine: false
    },
    animationData: {},
    focusShow: false,//是否显示关注
    hotShow: false,//是否显示热门
    showPlus: false,//点击加是否显示活动
    overFlow: true,//阻止滚动事件
    showEdit: true,//显示编辑分组
    editText: '编辑',
    focusGroup: true // 点击关注分组
  },
  onLoad() {
    this.getPostingsList(this.data.active);
    this.getGroupLists();
    this.getHotGroupLists();
  },
  getListData(){
    this.getPostingsList(this.data.active)
  },
  // 获取帖子列表
  getPostingsList(type) {
    getApp().$ajax({
      isShowLoading: false,
      httpUrl: getApp().api.getPostingsUrl,
      data: {
        userId: wx.getStorageSync('userinfo').id,
        type: type
      }
    }).then(({ data }) => {
      let lists = data;
      lists.map(item=>{
        item.imgUrl = getApp().imgUrl;
        item.actDate = util.formatTime(new Date(item.pubDate));
        item.pics ? item.pics = item.pics.split(',') : item.pics= [];
        let pics = item.pics;
        pics[1] ? item.pics = pics : item.pics = pics.slice(0, 1);
      })
      console.log(lists)
      this.setData({
        lists: lists
      })
    })
  },
  // 获取热门分类列表
  getHotGroupLists() {
    getApp().$ajax({
      isShowLoading: false,
      httpUrl: getApp().api.getActTypeUrl,
      data: {}
    }).then(({ data }) => {
      this.setData({
        hotGroup: data
      })
    })
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
      data.map(item=>{
        item.checked = false;
      })
      this.setData({
        groupLists: data
      })
    })
  },
  // 点击切换关注和热门
  changeTab(e) {
    // 判断第一次是否为选中状态
    if (this.data.active == e.target.dataset.index) {
      // 判断点击是否为关注
      this.hideFixed();
    } else {
      animation.rotateZ(360).step();
      this.getPostingsList(e.target.dataset.index);
      this.setData({
        active: e.target.dataset.index,
        hotShow: false,
        focusShow: false,
        overFlow: true,
        animationData: animation.export()
      })
    }
  },
  // 阻止事件冒泡
  showFixed(){
  },
  // 隐藏关注热门
  hideFixed(){
    if (this.data.active == 0) {
      this.animation = animation;
      this.setData({
        hotShow: false
      })
      if (this.data.focusShow) {
        animation.rotateZ(360).step();
        this.setData({
          focusShow: false,
          overFlow: true,
          animationData: animation.export()
        })
      } else {
        animation.rotateZ(180).step();
        this.setData({
          focusShow: true,
          overFlow: false,
          animationData: animation.export()
        })
      }
    } else {
      // this.animation = animation;
      if (this.data.hotShow) {
        animation.rotateZ(360).step();
        this.setData({
          hotShow: false,
          focusShow: false,
          overFlow: true,
          animationData: animation.export()
        })
      } else {
        animation.rotateZ(180).step();
        this.setData({
          hotShow: true,
          focusShow: false,
          overFlow: false,
          animationData: animation.export()
        })
      }
    }
  },
  // 隐藏通知公告
  hideMsg() {
    this.setData({
      showMsg: true
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 1000)
  },
  // 点击帖子关注显示分组
  showGroup() {
    this.setData({
      focusGroup: false
    })
  },
  // 点击浮层隐藏分组
  hideGroup() {
    this.setData({
      focusGroup: true
    })
  },
  // 编辑分组
  editGroup() {
    if (this.data.editText == '编辑') {
      this.setData({
        showEdit: false,
        editText: '完成'
      })
    } else {
      this.setData({
        showEdit: true,
        editText: '编辑'
      })
    }
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
  //阻止页面滚动穿透
  overflowHidden() {
    this.setData({
      overFlow: !this.data.overFlow
    })
  },
  // 点击消息进入消息页面
  goMessage() {
    wx.navigateTo({
      url: '/pages/index/message/message',
    })
  },
  // 点击搜索进入搜索页面
  goSearch() {
    wx.navigateTo({
      url: '/pages/index/search/search',
    })
  },
  // 点击加图标显示弹出
  clickShowPlus() {
    this.setData({
      showPlus: true,
      overFlow: false
    })
  },
  // 关闭弹出活动
  closePlus() {
    this.setData({
      showPlus: false,
      overFlow: true
    })
  }
})
