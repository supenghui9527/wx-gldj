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
    showAddGroup: true,
    activityID: '',
    groupID:[]
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
      console.log(e)
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
        this.triggerEvent('getListData');
      })
    },
    // 选择关注分组
    chooseGroup(e) {
      let value = e.detail.value, index = e.currentTarget.dataset.index;
      this.data.groupLists[index].checked= true;
      if(value[0]){
        this.data.groupID.push(value[0]);
      }else{
        this.data.groupID.splice(value.length-1,1);
      }
    },
    // 确认关注
    sureFouse() {
      this.data.groupLists.map(item=>{
        item.checked = false;
      })
      this.setData({
        groupLists:this.data.groupLists
      });
      let groupID =  this.data.groupID;
      this.clickFouse(groupID.toString());
    },
    // 关注
    clickFouse(groupID){
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
          success:res=>{
            this.triggerEvent('getListData');
            this.hideGroup();
          }
        })
      })
    },
    // 取消关注
    cancelFouse(e){
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
          success:res=>{
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
    // 分享
    onShareAppMessage: function (res) {
      if (res.from === 'button') {
        // 来自页面内转发按钮
        console.log(res.target)
      }
      return {
        title: '自定义转发标题',
        path: `/pages/home/detail/detail?actId=${this.data.cID}`,
        success: function (res) {
          this.userDo('223', '0')
        },
        fail: function (res) {
        }
      }
    },
    // 进入详情
    goDetail(e){
      wx.navigateTo({
        url: `/pages/index/detail/detail?actId=${e.currentTarget.dataset.actid}`,
      })
    },
    // 点赞
    clickLikes(e) {
      this.userDo(e.currentTarget.dataset.id,'2')
    }
  }
})
