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
  attached(){
    this.setData({userType:wx.getStorageSync('userinfo').isSuperAdmin})
  },
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
              actID: JSON.parse(res.result).author,
              userID: wx.getStorageSync('userinfo').id,
              type: '2'
            }
          }).then(({ data }) => {
            wx.showToast({
              title: '签到成功',
              icon:'none'
            })
          })
        },
        fail:()=>{
          console.log(1)
        }
      })
    }
  }
})
