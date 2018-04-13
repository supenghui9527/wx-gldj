// pages/active/post/post.js
const util = require('../../../utils/util.js');
var date = new Date();
Page({
  data: {
    active: 0,
    date: util.formatTime(date),
    tempFilePaths: [],
    typeLists: []
  },
  onLoad(options) {
    if (options.id) this.setData({title: options.text,id: options.id})
  },
  goActivity(){
    wx.navigateTo({
      url: "/pages/active/post/activityList/activityList",
    })
  },
  getPlace() {
    wx.chooseLocation({
      success: (res) => {
        this.setData({
          address: res.address
        })
      }
    })
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
  //上传图片方法
  getData: function (tempFilePaths, successUp, failUp, i, length, cid) {
    wx.uploadFile({
      url: getApp().api.upLoadPicUrl,
      header: { "Content-Type": "multipart/form-data" },
      filePath: tempFilePaths[i],
      name: 'image',
      formData: {
        ID: this.data.id
      },
      success: (resp) => {
        successUp++;
      },
      fail: (res) => {
        failUp++;
      },
      complete: () => {
        i++;
        if (i == length) {
          // console.log('总共' + successUp + '张上传成功,' + failUp + '张上传失败！');
          wx.hideLoading();
          // wx.redirectTo({
          //   url: '/pages/home/home'
          // })
        }
        else {
          this.getData(tempFilePaths, successUp, failUp, i, length, cid);
        }
      },
    })
  },
  //发布帖子
  //删除预览图片
  delPictrue(e) {
    let idx = e.currentTarget.dataset.index, tempFilePaths = this.data.tempFilePaths;
    tempFilePaths.splice(idx, 1);
    this.setData({
      tempFilePaths: tempFilePaths
    })
  },
  submitPostings(e) {
    let successUp = 0, //成功个数
      failUp = 0, //失败个数
      length = this.data.tempFilePaths.length, //总共个数
      i = 0, //第几个
      data = e.detail.value;
    wx.showLoading({
      title: '发帖中...',
      mask: true
    });
    wx.request({
      url: getApp().api.actPostUrl,
      method: 'post',
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data: data,
      success: (res) => {
          if (length) {
            this.getData(this.data.tempFilePaths, successUp, failUp, i, length, res.data.data);
          } else {
            wx.redirecTo({
              url: '/pages/index/index'
            })
          }
      }
    })
  }
})