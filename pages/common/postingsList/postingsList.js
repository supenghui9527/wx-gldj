// pages/common/postingsList/postingsList.js
Component({
  properties: {
    lists:{
      type: 'array'
    },
    groupLists:{
      type: 'array'
    }
  },
  data: {
    isFocusGroup: true,
    showAddGroup: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 显示分组
    showGroup() {
      this.setData({
        isFocusGroup: false
      });
      this.triggerEvent('overflowHidden');
    },
    // 点击浏览大图
    showBigImage(e) {
      getApp().showBigPic(e);
    },
    // 隐藏分组
    hideGroup() {
      this.setData({
        isFocusGroup: true
      })
      this.triggerEvent('overflowScroll');
    },
    // 点赞分享评论
    userDo(actID, type, comment) {
      getApp().$ajax({
        httpUrl: getApp().api.postingsLikesUrl,
        data: {
          actID: actID,
          userID: wx.getStorageSync('userinfo').id,
          type: type,
          comment: comment||''
        }
      }).then(({ data }) => {

      })
    },
    // 选择关注分组
    chooseGroup(e) {
      console.log(e)
    },
    sureFouse() {
      getApp().$ajax({
        httpUrl: getApp().api.userFouseUrl,
        data: {
          userID: wx.getStorageSync('userinfo').id,
          orgID: '',
          groupID: ''
        }
      }).then(({ data }) => {

      })
    },
    // 显示添加分组
    showAddGroup() {
      this.triggerEvent('showAddGroup');
    },
    // 分享
    onShareAppMessage: function (res) {
      return {
        title: '自定义转发标题',
        path: `/pages/home/detail/detail?cID=${this.data.cID}`,
        success: function (res) {
          this.userDo('223', '0')
        },
        fail: function (res) {
        }
      }
    },
    // 进入详情
    goDetail(){
      wx.navigateTo({
        url: '/pages/index/detail/detail',
      })
    },
    // 点赞
    clickLikes() {
      this.userDo('4028a88162be2e570162be346660000c','2')
    }
  }
})
