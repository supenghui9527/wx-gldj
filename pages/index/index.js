//index.js
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
    nav: ['关注','热门'],
    footer:{
      idx: true,
      mine: false
    },
    animationData:{},
    focusShow: false,//是否显示关注
    hotShow: false,//是否显示热门
    showPlus: false,//点击加是否显示活动
    overFlow: true,//阻止滚动事件
    showEdit: true,//显示编辑分组
    editText: '编辑',
    focusGroup: true // 点击关注分组
  },
  onLoad(){
    // getApp().$ajax({
    //   httpUrl: 'http://www.wsspha.cn/images/bg.png',
    //   data: {
    //     orgID: this.data.userID
    //   }
    // }).then(({ data }) => {
    //   let newList = [];
    //   if (data.state == 0) {
    //     if (data.orgList && data.orgList.length >= 10) newList = data.orgList.slice(0, 10);
    //     this.setData({
    //       Unfinished: data.content,
    //       UnfinishedLists: newList,
    //       showUnfinished: true
    //     })
    //   }
    //   wx.hideLoading();
    // })
  },
  // 点击切换关注和热门
  changeTab (e) {
    // 判断第一次是否为选中状态
    if (this.data.active == e.target.dataset.index){
      // 判断点击是否为关注
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
    }else{
      animation.rotateZ(360).step();
      this.setData({
        active: e.target.dataset.index,
        hotShow: false,
        focusShow: false,
        overFlow: true,
        animationData: animation.export()
      })
    }
  },
  // 点击帖子关注显示分组
  showGroup () {
    this.setData({
      focusGroup: false      
    })
  },
  // 点击浮层隐藏分组
  hideGroup () {
    this.setData({
      focusGroup: true  
    })
  },
  // 编辑分组
  editGroup () {
    if(this.data.editText=='编辑'){
      this.setData({
        showEdit: false,
        editText: '完成'
      })
    }else{
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
  sureAddGroup() {
    this.setData({
      addGroupShow: false
    })
  },
  //阻止页面滚动穿透
  overflowHidden() {
    this.setData({
      overFlow: false
    })
  },
  overflowScroll() {
    this.setData({
      overFlow: true
    })
  },
  // 点击消息进入消息页面
  goMessage () {
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
  clickShowPlus () {
    this.setData({
      showPlus:true,
      overFlow: false
    })
  },
  // 关闭弹出活动
  closePlus () {
    this.setData({
      showPlus: false,
      overFlow: true
    })
  }
})
