// pages/mine/myPosts/myPosts.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists: [
      {
        orgName: '机关工委',
        orgPic: '/images/avatar.jpg',
        actName: '清晨跑步',
        timeTip: '2018-4-9',
        pubContent: '开发小程序的第一步，你需要拥有一个小程序帐号，通过这个帐号你就可以管理你的小程序。跟随这个教程，开始你的小程序之旅吧！',
        pic: ['/images/avatar.jpg', '/images/avatar.jpg', '/images/avatar.jpg'],
        isView: 1,
        shares: 2,
        comments: 3,
        likes: 4
      },
      {
        orgName: '南京建邺',
        orgPic: '/images/avatar.jpg',
        actName: '晚上锻炼身体',
        timeTip: '2018-4-9',
        pubContent: '于是微信客户端就把首页的代码装载进来，通过小程序底层的一些机制，就可以渲染出这个首页。小程序启动之后，在 app.js 定义的 App 实例的 onLaunch 回调会被执行:',
        pic: ['/images/avatar.jpg', '/images/avatar.jpg', '/images/avatar.jpg'],
        isView: 2,
        shares: 2,
        comments: 3,
        likes: 4
      },
      {
        orgName: '南京鼓楼',
        orgPic: '/images/avatar.jpg',
        actName: '清晨跑步',
        timeTip: '2018-4-9',
        pubContent: '纷纷大幅度的方法的方法的短发短发短发反反复复反反复复反反复复的地方',
        pic: ['/images/avatar.jpg', '/images/avatar.jpg', '/images/avatar.jpg'],
        isView: 2,
        shares: 2,
        comments: 3,
        likes: 4
      },
      {
        orgName: '南京栖霞',
        orgPic: '/images/avatar.jpg',
        actName: '清晨跑步',
        timeTip: '2018-4-9',
        pubContent: '反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复反反复复吩咐',
        pic: ['/images/avatar.jpg', '/images/avatar.jpg', '/images/avatar.jpg'],
        isView: 1,
        shares: 2,
        comments: 3,
        likes: 4
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})