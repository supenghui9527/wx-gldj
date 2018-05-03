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
    motto: 'Hello World',
    userInfo: {},
    marquee: { text: '您好，欢迎使用鼓楼党员e生活！' },
    active: 1,
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
    overFlow: true,//阻止滚动事件
    showEdit: true,//显示编辑分组
    editText: '编辑',
    focusGroup: true // 点击关注分组
  },
  onShow(){
    const str = this.data.marquee.text;
    const width = this.getWidth(str);
    this.setData({ [`${'marquee'}.width`]: width });
    this.getPostingsList(this.data.active);
    this.getGroupLists();
    this.getHotGroupLists();
  },
  getListData(){
    this.getPostingsList(this.data.active);
  },
  getWidth: (str) => {
    return [].reduce.call(str, (pre, cur, index, arr) => {
      if (str.charCodeAt(index) > 255) {// charCode大于255是汉字
        pre++;
      } else {
        pre += 0.5;
      }
      return pre;
    }, 0);
  },
  getDuration: (str) => {// 保留，根据文字长度设置时间
    return this.getWidth() / 1;
  },
  // 获取帖子列表
  getPostingsList(type, actName) {
    getApp().$ajax({
      httpUrl: getApp().api.getPostingsUrl,
      data: {
        userId: wx.getStorageSync('userinfo').id,
        type: type,
        actName: actName||''
      }
    }).then(({ data }) => {
      wx.stopPullDownRefresh();
      this.setData({
        lists: util.resetData(data)
      })
    })
  },
  // 热门根据类型筛选
  selectByType(e){
    e.currentTarget.dataset.type == '全部' ? this.getPostingsList(1) : this.getPostingsList(1, e.currentTarget.dataset.type);
    this.hideFixed();
  },
  // 获取热门分类列表
  getHotGroupLists() {
    getApp().$ajax({
      isShowLoading: false,
      httpUrl: getApp().api.getActTypeUrl,
      data: {}
    }).then(({ data }) => {
      wx.setStorageSync('hotGroup',data);
      this.setData({hotGroup: data});
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
      this.setData({
        groupLists: data
      })
    })
  },
  // 根据用户分组筛选帖子
  searchByGroup(e){
    getApp().$ajax({
      httpUrl: getApp().api.searchByGroupUrl,
      data: {
        userId: wx.getStorageSync('userinfo').id,
        groupId:e.currentTarget.dataset.id
      }
    }).then(({ data }) => {
      this.setData({lists: util.resetData(data)});
      this.hideFixed();
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
    this.setData({ showEdit: true, editText: '编辑' });
    if (this.data.active == 0) {
      this.animation = animation;
      this.setData({hotShow: false});
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
    this.getListData();
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
    this.data.editText == '编辑' ? this.setData({ showEdit: false, editText: '完成' }) : this.setData({ showEdit: true, editText: '编辑' })
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
    if(this.data.groupName){
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
    }else{
      wx.showToast({
        title: '请填写分组名称',
        icon:'none'
      })
    }
  },
  // 删除用户分组
  deleteGroup(e){
    getApp().$ajax({
      httpUrl: getApp().api.deleteGroupUrl,
      data: {
        userId: wx.getStorageSync('userinfo').id,
        name: e.currentTarget.dataset.name
      }
    }).then(({ data }) => {
      this.getGroupLists();
    })
  },
  //阻止页面滚动穿透
  overflowHidden() {
    this.setData({
      overFlow: !this.data.overFlow
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
  toIndexActid(e){
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
  // 点击消息进入消息页面
  goMessage() {
    wx.navigateTo({
      url: '/pages/index/message/message?enterType=0',
    })
  },
  // 点击搜索进入搜索页面
  goSearch() {
    wx.navigateTo({
      url: '/pages/index/search/search',
    })
  }
})
