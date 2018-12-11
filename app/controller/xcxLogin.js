
'use strict';

const Controller = require('egg').Controller;
const axios = require('axios');
class XcxLoginController extends Controller {
  async login() {
    let data = '';
    const ctx = this.ctx;
    const reciveData = ctx.request.body;
    const code = reciveData.code; // 获取前端传过来的code
    const userInfo = reciveData.userInfo;
    const AppID = 'wxf94fea15bf8dd485'; // appid
    const AppSecret = 'a78b9089d8b1b80b0bda853caa60dfee';
    const api = `https://api.weixin.qq.com/sns/jscode2session?appid=${AppID}&secret=${AppSecret}&js_code=${code}&grant_type=authorization_code`;
    await axios(api).then(res => {
      data = {
        msg: 'success',
        code: 0,
        data: Object.assign({}, res.data, userInfo),
      };
    }).catch(() => {
      data = {
        msg: '获取openid失败',
        code: 0,
        data: null,
      };
    });

    if (data.data) {
      const backData = data.data;
      // 去三方表查询openid  查到就更新用户信息 未查到 则插入新用户
      const selectRes = await this.app.mysql.select('oauth_user', { where: { openId: backData.openid } });
      if (selectRes.length > 0) {
        const row = {
          openId: backData.openid,
          userInfo: JSON.stringify(userInfo),
        };
        const options = {
          where: {
            openId: backData.openid,
          },
        };
        const result = await this.app.mysql.update('oauth_user', row, options); // 更新  表中的记录
      } else {
        const result = await this.app.mysql.insert('oauth_user', { openId: backData.openid, userInfo: JSON.stringify(userInfo) });
      }
    }
    ctx.body = data;
  }

}
module.exports = XcxLoginController;

