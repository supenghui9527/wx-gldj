// pages/active/consultation/consultation.js
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
    showDetail: false //是否显示详情入口
  },
  onShow: function () {
    // 使用 wx.createMapContext 获取 map 上下文
    this.mapCtx = wx.createMapContext('map')
    this.getOrgLists();
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        let latitude = res.latitude;
        let longitude = res.longitude;
        // let marker = this.createMarker(res);
        this.setData({
          centerX: longitude,
          centerY: latitude
        })
      }
    });
  },
  onHide: function () {

  },
  onUnload: function () {

  },
  // 获取所有活动列表
  getOrgLists() {
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
  // 显示下级
  showLists(e){
    let lists = this.data.lists;
    if (this.data.oldIndex != e.currentTarget.dataset.index){
      lists.map(item => {
        item.show = false
      })
    }
    lists[e.currentTarget.dataset.index].show = !lists[e.currentTarget.dataset.index].show
    this.setData({
      listItem: this.data.lists[e.currentTarget.dataset.index],
      oldIndex: e.currentTarget.dataset.index,
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
      iconPath: "/images/4.png",
      id: point.id || 0,
      callout:{
        content: point.addr,
        color:'#323232',
        padding:6,
        borderRadius:2,
        display:'BYCLICK'
      },
      latitude: latitude,
      longitude: longitude,
      width: 20,
      height: 20
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