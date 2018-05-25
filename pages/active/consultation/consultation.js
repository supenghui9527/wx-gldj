// pages/active/consultation/consultation.js
let amapFile = require('../../../utils/amap-wx.js'), myAmapFun;
Page({
  data: {
    active: 0,
    lists: [],
    nav: {
      text: '地图',
      text1: '资讯'
    },
    centerX: '',
    centerY: '',
    markers: [],
    detail: {},
    polyline: [],
    controls: [],
    showDetail: false //是否显示详情入口
  },
  onLoad: function (options) {
    this.mapCtx = wx.createMapContext('map');
    myAmapFun = new amapFile.AMapWX({ key: 'cd8a5c0aca6d10ef29ecd7599e9173d5' });
    let systemInfo_ = wx.getSystemInfoSync();
    this.getOrgLists();
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        let latitude = res.latitude;
        let longitude = res.longitude;
        let marker = this.createMarker(res);
        this.setData({
          centerX: longitude,
          centerY: latitude
        })
      }
    });
  },
  onReady: function (e) {
  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  // 获取所有活动列表
  getOrgLists(itemIndex, showPosition) {
    getApp().$ajax({
      httpUrl: getApp().api.getMapsPoints
    }).then(({ data }) => {
      let lists = this.resetData(data);
      lists.map(item=>{
        item.show = false
      })
      let markers = [];
      data.map(item => {
        let marker = this.createMarker(item);
        markers.push(marker);
      })
      this.setData({
        markers: markers,
        lists: lists,
        oldLists: data
      })
    })
    
  },
  showLists(e){
    let lists = this.data.lists;
    lists[e.currentTarget.dataset.index].show = !lists[e.currentTarget.dataset.index].show
    this.setData({
      listItem: this.data.lists[e.currentTarget.dataset.index],
      lists: lists
    })
  },
  resetData(data) {
    let newLists = [];
    data.map((item) => {
      let orgType = item.type,
        index = -1;
      newLists.map((e, i) => {
        if (e.orgType === orgType) {
          index = i;
          return;
        }
      });
      if (index === -1) {
        newLists.push({ orgType, list: [item] });
      } else {
        newLists[index].list.push(item);
      }
    })
    return newLists;
  },
  // 创建地图的marker
  createMarker(point) {
    let latitude = point.lat;
    let longitude = point.lng;
    let marker = {
      iconPath: "/images/color1.png",
      id: point.id || 0,
      name: point.orgName || '',
      callout:{
        content: point.addr,
        color:'#323232',
        padding:6,
        borderRadius:2
      },
      latitude: latitude,
      longitude: longitude,
      menu: point.menu,
      name: point.name,
      width: 30,
      height: 30
    };
    if (point.type == '开放式党组织活动阵地') {
      marker.iconPath = "/images/4.png"
    } else if (point.type == '支部书记工作室') {
      marker.iconPath = "/images/3.png"
    } else if (point.type == '党员实境课堂') {
      marker.iconPath = "/images/2.png"
    } else {
      marker.iconPath = "/images/l.png"
    }
    return marker;
  },
  regionchange(e) {
  },
  // 点击marker点
  markertap(e) {
    let markerID = '';
    if (e.markerId){
      markerID = e.markerId
    }else{
      markerID = e.currentTarget.dataset.markerid
    }
    let lists = this.data.oldLists;
    lists.map(item=>{
      if (markerID == item.id) this.setData({ detail: item, centerX: item.lng, centerY: item.lat, showDetail:true})
    })
  },
  getNewsLists() {
    getApp().$ajax({
      httpUrl: getApp().api.getMyRewardsUrl,
      data: {
        orgId: wx.getStorageSync('userinfo').dept_id,
        infotype: 0,
      }
    }).then(({ data }) => {
      this.setData({
        newsLists: data
      })
    })
  },
  changeNav(e) {
    this.setData({
      active: e.currentTarget.dataset.index
    })
    this.data.active == 1 && this.getNewsLists();
  }
})