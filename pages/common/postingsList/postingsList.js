// pages/common/postingsList/postingsList.js
Component({
  properties: {
    lists: {
      type: 'array'
    },
    groupLists: {
      type: 'array'
    },
    isShowFouse: {
      type: 'boolean'
    }
  },
  data: {
    isFocusGroup: true,
    showAddGroup: true,
    activityID: '',
    groupID: []
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 显示分组
    showGroup(e) {
      this.setData({
        isFocusGroup: false,
        orgID: e.currentTarget.dataset.orgid
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
          comment: comment || '',
          isPublic: ''
        }
      }).then(({ data }) => {
        this.triggerEvent('getListData');
      })
    },
    // 选择关注分组
    chooseGroup(e) {
      let value = e.detail.value;
      this.data.groupID = value;
    },
    // 确认关注
    sureFouse() {
      let groupID = this.data.groupID;
      this.clickFouse(groupID.toString());
    },
    // 关注
    clickFouse(groupID) {
      getApp().$ajax({
        httpUrl: getApp().api.userFouseUrl,
        data: {
          userID: wx.getStorageSync('userinfo').id,
          orgID: this.data.orgID,
          groupID: groupID || '-1'
        }
      }).then(({ data }) => {
        this.setData({
          groupID: [],
          groupLists: this.data.groupLists
        })
        wx.showToast({
          title: '关注成功',
          icon: 'none',
          success: res => {
            this.triggerEvent('getListData');
            this.hideGroup();
          }
        })
      })
    },
    // 取消关注
    cancelFouse(e) {
      getApp().$ajax({
        httpUrl: getApp().api.userCancelUrl,
        data: {
          userID: wx.getStorageSync('userinfo').id,
          orgID: e.currentTarget.dataset.orgid
        }
      }).then(({ data }) => {
        wx.showToast({
          title: '取消成功',
          icon: 'none',
          success: res => {
            this.triggerEvent('getListData');
          }
        })
      })
    },
    // 暂不分组
    fouseNoGroup() {
      this.clickFouse();
    },
    // 显示添加分组
    showAddGroup() {
      this.triggerEvent('showAddGroup');
    },
    // 获取帖子id
    getActid(e) {
      this.setData({ activityID: e.currentTarget.dataset.actid });
      this.triggerEvent('toIndexActid', e.currentTarget.dataset.actid);
    },
    // 进入详情
    goDetail(e) {
      wx.navigateTo({
        url: `/pages/index/detail/detail?actId=${e.currentTarget.dataset.actid}&islike=${e.currentTarget.dataset.islike}`,
      })
    },
    // 点赞
    clickLikes(e) {
      e.currentTarget.dataset.islike == 0 ? this.userDo(e.currentTarget.dataset.id, '2') : wx.showToast({
        title: '您已点赞',
        icon: 'none'
      })
    }
  }
})
