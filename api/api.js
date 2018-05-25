const HOST = 'https://guloupy.hopethink.com/gldj/';//https://guloupy.hopethink.com/gldj/
module.exports = {
  HOST,
  loginUrl: `${HOST}api/user/login`,  // 登录接口
  resetPasswordUrl: `${HOST}api/login/update`,  // 修改密码
  getPostingsUrl: `${HOST}api/act/list`,  // 获取帖子列表
  goSearchUrl: `${HOST}api/act/findbycontent`,  // 搜索帖子
  getPostingsDetailUrl: `${HOST}api/act/listdetail`,  // 获取帖子列表
  getActTypeUrl: `${HOST}api/acttype/list`,  // 活动类型列表
  getFouseGroupUrl: `${HOST}api/usergroup/list`,// 关注分组列表
  addFouseGroupUrl: `${HOST}api/usergroup/add`, // 添加关注分组
  deleteGroupUrl: `${HOST}api/usergroup/delete`, // 删除关注分组
  getUserGroupUrl: `${HOST}api/partygroup/list`,// 用户分组列表
  actReserveUrl: `${HOST}wqqapi/act/reserve`,  // 活动预约发布
  getReserveListsUrl: `${HOST}api/act/relist`, // 活动预约发布列表
  userFouseUrl: `${HOST}api/usergroup/interest`, // 用户关注
  userCancelUrl: `${HOST}api/usergroup/cancel`, // 用户取消关注
  actPostUrl: `${HOST}wqqapi/act/pub`,  // 活动发布
  searchByGroupUrl: `${HOST}api/myListByGroup`,// 根据用户分组筛选
  getActTitleUrl:`${HOST}api/act/titlelist`,// 活动标题列表
  actSignUrl: `${HOST}wqqapi/act/sign`, // 活动预约签到
  cancelSignUrl: `${HOST}wqqapi/act/cancel`, // 取消预约
  upLoadPicUrl: `${HOST}wqqapi/act/uploadMultipleFile`,  // 活动发布上传图片
  postingsLikesUrl: `${HOST}wqqapi/act/conduct`,  // 查询帖子点赞
  getMyRewardsUrl: `${HOST}wqqapi/act/SearchPartyInfo`,  // 我的奖惩
  codeImageUrl: `${HOST}wqqapi/act/generateCode`, //生成二维码
  findMyPointUrl: `${HOST}wqqapi/act/findMyScoreByUserID`, // 个人积分信息
  myFouseUrl: `${HOST}api/usergrouporg/myinterest`,  // 我的关注
  myFansUrl: `${HOST}api/usergrouporg/myfans`,  // 我的粉丝
  myPostingUrl: `${HOST}api/partyact/mypub`, // 我的发布
  mySignUrl: `${HOST}api/act/myservice`, // 我的预约签到
  getMapsPoints: `${HOST}api/party/map`, // 党建地图
  changeAvatarUrl: `${HOST}wqqapi/act/uploadUserHeader`  // 修改个人头像
}