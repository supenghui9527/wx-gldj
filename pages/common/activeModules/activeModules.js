// pages/common/activeModules.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isHidden:{
      type: 'boolean'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭弹出活动
    closePlus() {
      this.triggerEvent("closePlus");
    },
    sign() {
      wx.scanCode({
        onlyFromCamera: true,
        success: (res) => {
          getApp().$ajax({
            httpUrl: getApp().api.actSignUrl,
            data: {
              actID: res.result.author,
              userID: '233',
              type: '2'
            }
          }).then(({ data }) => {

          })
        }
      })
    }
  }
})
