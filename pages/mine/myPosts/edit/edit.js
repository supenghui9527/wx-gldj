// pages/active/post/post.js
const util = require('../../../../utils/util.js');
var date = new Date();
Page({
  data: {
    active: 0,
    tempFilePaths: [],
    typeLists: []
  },
  onLoad(options) {
    const detail = JSON.parse(options.actDetail);
    console.log(detail)
    this.setData({
      typeLists: wx.getStorageSync('hotGroup'),
      actName: detail.actname,
      title: detail.title,
      content: detail.content,
      id: detail.id,
      date: util.formatTime(new Date(detail.actdate)).substring(0, 10),
      time: util.formatTime(new Date(detail.actdate)).substring(11),
      address: detail.place,
      actType: detail.acttype
    })
  },
  // 获取选择类型
  bindNameChange(e) {
    console.log(e)
    this.setData({
      actName: this.data.typeLists[e.detail.value].name
    })
  },
  // 获取位置
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
  //日期
  bindDateChange(e){
    this.setData({
      date:e.detail.value
    })
  },
  //时间
  bindTimeChange(e) {
    this.setData({
      time: e.detail.value
    })
  },
  //上传图片方法
  getData: function(tempFilePaths, successUp, failUp, i, length) {
    wx.uploadFile({
      url: getApp().api.upLoadPicUrl,
      header: {
        "Content-Type": "multipart/form-data"
      },
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
        } else {
          this.getData(tempFilePaths, successUp, failUp, i, length);
        }
      },
    })
  },
  //删除预览图片
  delPictrue(e) {
    let idx = e.currentTarget.dataset.index,
      tempFilePaths = this.data.tempFilePaths;
    tempFilePaths.splice(idx, 1);
    this.setData({
      tempFilePaths: tempFilePaths
    })
  },
  //发布帖子
  submitPostings(e) {
    const data = e.detail.value;
    console.log(data)
    for (let i in data) {
      if (data[i] == '') {
        if (i == 'place') continue;
        wx.showToast({
          title: '请确认信息是否填写完整',
          icon: 'none'
        });
        return;
      }
    };
    wx.showLoading({
      mask: true,
      title: '发布中...'
    });
    getApp().$ajax({
      isShowLoading: false,
      hideLoading: false,
      httpUrl: getApp().api.editPostingsUrl,
      data: data
    }).then((res) => {
      wx.showToast({
        title: '编辑成功',
        icon: 'none',
        success(){
          setTimeout(()=>{
            wx.navigateBack({
              delta: 1
            })
          },1000)

        }
      })

    })
  }
})