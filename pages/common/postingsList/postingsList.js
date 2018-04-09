// pages/common/postingsList/postingsList.js
Component({
  properties: {
    lists:{
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
    showBigPictrues() {

    },
    // 显示添加分组
    showAddGroup() {
      this.triggerEvent('showAddGroup');
    },
    onShareAppMessage: function (res) {
      return {
        title: '自定义转发标题',
        path: `/pages/home/detail/detail?cID=${this.data.cID}`,
        success: function (res) {
          console.log(res)
        },
        fail: function (res) {
        }
      }
    },
    goDetail(){
      wx.navigateTo({
        url: '/pages/index/detail/detail',
      })
    }
  }
})
