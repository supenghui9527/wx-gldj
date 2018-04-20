// pages/loading/loading.js
Page({
  data: {
  
  },
  onLoad() {
    setTimeout(()=>{
      wx.redirectTo({
        url: '/pages/login/login'
      })
    },1500)
  }
})