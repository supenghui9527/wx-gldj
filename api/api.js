const HOST = 'http://192.168.8.24:8080/';
module.exports = {
  loginUrl: `${HOST}api/user/login`,  // 登录接口
  getPostingsUrl: `${HOST}api/act/list`,  // 获取帖子列表
  getActTypeUrl: `${HOST}api/acttype/list`,  // 活动类型列表
  getFouseGroupUrl: `${HOST}api/usergroup/list`,// 关注分组列表
  addFouseGroupUrl: `${HOST}api/usergroup/add`, // 添加关注分组
  getUserGroupUrl: `${HOST}api/partygroup/list`,// 用户分组列表
  actReserveUrl: `${HOST}wqqapi/act/reserve`,  // 活动预约发布
  getReserveListsUrl: `${HOST}api/act/relist`, // 活动预约发布列表
  userFouseUrl: `${HOST}api/usergroup/interest`, // 用户关注
  actPostUrl: `${HOST}wqqapi/act/pub`,  // 活动发布
  actSignUrl: `${HOST}wqqapi/act/sign`, // 活动预约签到
  upLoadPicUrl: `${HOST}wqqapi/act/uploadMultipleFile`,  // 活动发布上传图片
  postingsLikesUrl: `${HOST}act/conduct`,  // 查询帖子点赞
  // upLoadPicUrl: `${HOST}publicPic.do`,  // 上传图片
  getMyRewardsUrl: `${HOST}wqqapi/act/SearchPartyInfo`,  // 我的奖惩
  codeImageUrl: `${HOST}wqqapi/act/generateCode`,//生成二维码
  findMyPointUrl: `${HOST}findMyPoint.do`,  // 个人积分信息
  pointListUrl: `${HOST}findOrgOrder.do`,  // 积分列表
  userInfoUrl: `${HOST}fingByOrgID.do`,  // 个人中心信息
  changeAvatarUrl: `${HOST}wqqapi/act/uploadUserHeader`,  // 修改个人头像
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