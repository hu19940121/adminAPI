'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const checktoken = app.middleware.checktoken(app);
  // 后台api  v1
  router.get('/', controller.home.index);
  router.get('/api/v1/getToken/getQiniuToken', controller.getToken.getQiniuToken);// 获取七牛token 和url
  router.get('/api/v1/wxsdk/wxjsSDK', controller.wxsdk.wxjsSDK); // 配置公众号url
  router.post('/api/v1/wxsdk/getUserInfoByCode', controller.wxsdk.getUserInfoByCode); // 微信授权
  router.post('/api/v1/wxsdk/getJsSdk', controller.wxsdk.getJsSdk); // 获取jssdk
  router.post('/api/v1/user/login', controller.user.login); // 登录接口
  router.get('/api/v1/user/userinfo', checktoken, controller.user.userinfo); // 获取用户信息
  // 频道相关
  router.get('/api/v1/channel/channelList', checktoken, controller.channel.channelList); // 获取频道列表
  router.post('/api/v1/channel/add', controller.channel.add); // 新增频道
  router.get('/api/v1/channel/del', controller.channel.del); // 删除频道
  router.get('/api/v1/channel/getChannelById', controller.channel.getChannelById); // 根据id获取频道详情
  router.post('/api/v1/channel/updateChannel', controller.channel.updateChannel); // 更新频道
  // 视频分类相关
  router.get('/api/v1/videoCate/list', checktoken, controller.videoCate.list);
  router.post('/api/v1/videoCate/add', controller.videoCate.add); //
  router.get('/api/v1/videoCate/del', controller.videoCate.del); //
  router.get('/api/v1/videoCate/getItemById', controller.videoCate.getItemById); //
  router.post('/api/v1/videoCate/update', controller.videoCate.update); //
  // 视频相关
  router.get('/api/v1/video/list', checktoken, controller.video.list);
  router.post('/api/v1/video/add', controller.video.add); //
  router.get('/api/v1/video/del', controller.video.del); //
  router.get('/api/v1/video/getItemById', controller.video.getItemById); //
  router.post('/api/v1/video/update', controller.video.update); //
  router.post('/api/v1/video/selectVideoList', controller.video.selectVideoList); // 条件查询 视频列表

  // 首页轮播图相关
  router.get('/api/v1/swiper/swiperList', checktoken, controller.swiper.swiperList); // 获取轮播图列表
  router.post('/api/v1/swiper/add', controller.swiper.add); // 新增轮播图
  router.get('/api/v1/swiper/del', controller.swiper.del); // 删除轮播图
  router.get('/api/v1/swiper/getSwiperById', controller.swiper.getSwiperById); // 根据id获取轮播图详情
  router.post('/api/v1/swiper/updateSwiper', controller.swiper.updateSwiper); // 更新轮播图


  // 小程序api v2
  router.get('/api/v2/channel/channelList', controller.channel.channelList); // 获取频道列表
  router.post('/api/v2/xcxLogin/login', controller.xcxLogin.login); // 获取频道列表
  router.get('/api/v2/channel/getChannelContentById', controller.channel.getChannelContentById); // 获取频道相关联的数据


  //webapp api v1
  router.get('/api/v1/post/list', controller.post.list); // 帖子列表
  router.post('/api/v1/post/addPost', controller.post.addPost); // 帖子列表
  router.post('/api/v1/uploadToQiniu/uploadImage', controller.uploadToQiniu.uploadImage); // 上传图片到七牛

  router.get('/api/v1/callback/qq', controller.callback.qq); // qq登录回调
  router.get('/api/v1/callback/qqLogin', controller.callback.qqLogin); // qq登录回调



};
