// pages/active/post/activityList/activityList.js
let oldLists = [];
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lists:[
      {
        text: '方法的方法纷纷大幅度放大',
        id: ''
      },
      {
        text: '利空黄金分割和方法很好很好',
        id: ''
      },
      {
        text: '呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜呜',
        id: ''
      },
      {
        text: '啊啊啊啊所得税的的速度',
        id: ''
      }, 
      {
        text: '反反复复反反复复反反复复反反复复反反复复吩咐',
        id: ''
      }
    ]
  },
  onLoad: function (options) {
    oldLists = this.data.lists
  },
  search(e){
    let lists = this.data.lists,newLists = [];
    if (e.detail.value){
      lists.forEach(item => {
        if (item.text.indexOf(e.detail.value) != -1) {
          newLists.push(item)
        }
      })
      console.log(newLists)
      this.setData({
        lists: newLists
      })
    }else{
      this.setData({
        lists: oldLists
      })
    }
  },
  chooseItem (e) {
    let item = e.currentTarget.dataset.item;
    this.setData({
      inputValue: item.text
    })
    wx.redirectTo({
      url: `/pages/active/post/post?text=${item.text}&id=${item.id}`
    })
  }
})