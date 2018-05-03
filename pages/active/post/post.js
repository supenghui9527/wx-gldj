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
    console.log(options)
    if (options.id) this.setData({ title: options.text, id: options.id, actName: options.actName })
  },
  goActivity() {
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
  getData: function (tempFilePaths, successUp, failUp, i, length) {
    wx.uploadFile({
      url: getApp().api.upLoadPicUrl,
      header: { "Content-Type": "multipart/form-data" },
      filePath: tempFilePaths[i],
      name: 'image',
      formData: {
        ID: this.data.id
      },
      success: (res) => {
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
          wx.showToast({
            title: '发布成功',
            icon: 'none',
            duration: 2500,
            success: res => {
              wx.switchTab({
                url: '/pages/index/index'
              })
            }
          })
        }
        else {
          this.getData(tempFilePaths, successUp, failUp, i, length);
        }
      },
    })
  },
  //删除预览图片
  delPictrue(e) {
    let idx = e.currentTarget.dataset.index, tempFilePaths = this.data.tempFilePaths;
    tempFilePaths.splice(idx, 1);
    this.setData({
      tempFilePaths: tempFilePaths
    })
  },
  //发布帖子
  submitPostings(e) {
    let successUp = 0, //成功个数
      failUp = 0, //失败个数
      length = this.data.tempFilePaths.length, //总共个数
      i = 0, //第几个
      data = e.detail.value;
    for (let i in data) {
      if (data[i] == '') {
        if (i == 'location') continue;
        wx.showToast({
          title: '请确认信息是否填写完整',
          icon: 'none'
        });
        return;
      }
    };
    wx.showLoading({ mask: true, title: '发布中...' });
    getApp().$ajax({
      isShowLoading:false,
      hideLoading: false,
      httpUrl: getApp().api.actPostUrl,
      data: data
    }).then((res) => {
      if (length) {
        this.getData(this.data.tempFilePaths, successUp, failUp, i, length);
      } else {
        wx.switchTab({
          url: '/pages/index/index'
        })
      }
    })
  }
})