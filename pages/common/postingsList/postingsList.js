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
    // 隐藏分组
    hideGroup() {
      this.setData({
        isFocusGroup: true
      })
      this.triggerEvent('overflowScroll');
    },
    // 点赞分享评论
    userDo(actID, userID, type, comment) {
      getApp().$ajax({
        httpUrl: getApp().api.postingsLikesUrl,
        data: {
          actID: actID,
          userID: userID,
          type: type,
          comment: comment ? comment:''
        }
      }).then(({ data }) => {

      })
    },
    showBigPictrues() {

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
          this.userDo('402880d162a8dd960162a8dded9c0000', '223', '0')
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
      this.userDo('402880d162a8dd960162a8dded9c0000','223','2')
    }
  }
})
