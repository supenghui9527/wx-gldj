const HOST = 'http://192.168.0.236:8080/api/';
module.exports = {
  loginUrl: `${HOST}user/login`,  // 登录接口
  getPostingsUrl: `${HOST}act/list`,  // 获取帖子列表
  getMorePostingUrl: `${HOST}acttype/list`,  // 活动类型列表
  actReserveUrl: `${HOST}act/reserve`,  // 活动预约发布
  actPostUrl: `${HOST}act/pub`,  // 活动发布
  actSignUrl: `${HOST}act/sign`, // 活动签到
  upLoadPicUrl: `${HOST}act/uploadMultipleFile`,  // 活动发布上传图片
  searchUrl: `${HOST}vagueSearch.do`,  // 帖子搜索
  postingsDetailUrl: `${HOST}findCommunityByCID.do`,  // 帖子详情
  postingsCommentUrl: `${HOST}findComment.do`,  // 查询帖子评论
  postingsLikesUrl: `${HOST}act/conduct`,  // 查询帖子点赞
  savePostingsCommentUrl: `${HOST}releaseCommentToCommunity.do`,  // 保存评论帖子内容
  deletePostingsUrl: `${HOST}deleteComunity.do`,  // 删除帖子
  // upLoadPicUrl: `${HOST}publicPic.do`,  // 上传图片
  pushPostingsUrl: `${HOST}publicCommunity.do`,  // 发布帖子
  getAllOrgNameUrl: `${HOST}findAllOrgName.do`,  // 获取所有组织名称
  getMapMarkesUrl: `${HOST}findAllPosition.do`,  // 获取地图markes
  markeDetailUrl: `${HOST}findPositionDetail.do`,  // 地图marke点详情
  addWorkUrl: `${HOST}addWork.do`,  // 添加近期工作
  findMyPointUrl: `${HOST}findMyPoint.do`,  // 个人积分信息
  pointListUrl: `${HOST}findOrgOrder.do`,  // 积分列表
  userInfoUrl: `${HOST}fingByOrgID.do`,  // 个人中心信息
  changeAvatarUrl: `${HOST}modifyAvatar.do`,  // 修改个人头像
  changePasswordUrl: `${HOST}modifyPassword.do`,  // 修改密码
  getMyWorkUrl: `${HOST}findMyWork.do`,  // 查看我的近期工作
  deleteWorkUrl: `${HOST}deleteWork.do`,  // 删除近期工作
  getUnfinishedUrl: `${HOST}findUnfinishOrg.do`,  // 获取未完成工作的组织
  getAlreadyPostingsUrl: `${HOST}findMeetingByOrgID.do`,  // 获取已发帖子列表
  saveUserInfoUrl: `${HOST}modifyOrg.do`,  // 保存党组织信息
  changeWorkUrl: `${HOST}modifyWork.do`,  // 修改近期工作
  sureWorkUrl: `${HOST}modifyWorkStatus.do`,  // 确认近期工作
  getMessagesUrl: `${HOST}findAllMessage.do`,  // 获取消息
  sureMessageUrl: `${HOST}backMessage.do`, // 确认是否同意删除党员
  deleteMesageUrl: `${HOST}deleteMesage.do`,  // 删除消息
  alreadyLookUrl: `${HOST}readMessage.do`  // 消息已读未读
}