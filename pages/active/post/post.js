// pages/active/post/post.js
const util = require('../../../utils/util.js');
var date = new Date();
Page({
  data: {
    active: 0,
    date: util.formatTime(date),
    tempFilePaths: [],
    obj: {
      number: 6
    }
  },
  onLoad(){
  },
  //选择本地相册中的图片
  upLoad() {
    wx.chooseImage({
      success: (res) => {
        let tempFilePaths = res.tempFilePaths;
        if (this.data.tempFilePaths == '') {
          this.setData({
            tempFilePaths: tempFilePaths
          })
        } else {
          this.setData({
            tempFilePaths: this.data.tempFilePaths.concat(tempFilePaths)
          })
        }
      }
    })
  },
  //删除预览图片
  delPictrue(e) {
    let idx = e.currentTarget.dataset.index, tempFilePaths = this.data.tempFilePaths;
    tempFilePaths.splice(idx, 1);
    this.setData({
      tempFilePaths: tempFilePaths
    })
  }
})