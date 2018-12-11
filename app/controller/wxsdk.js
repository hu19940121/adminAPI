
'use strict';

const Controller = require('egg').Controller;
const sha1 = require('sha1');
const axios = require('axios');
// 配置公众号url
class WxsdkController extends Controller {
  async wxjsSDK() {
    const ctx = this.ctx;
    const reciveData = ctx.query;
    const { timestamp, nonce, echostr, signature } = reciveData;
    const token = 'qwertyuiopqqqqq';
    const list = [ token, timestamp, nonce ].sort();
    const str = list.join('');
    const result = sha1(str);
    if (result === signature) {
      ctx.body = echostr;
    } else {
      ctx.body = false;
    }

  }
  async getJsSdk() {
    const ctx = this.ctx;
    const grant_type = 'client_credential';
    const appid = 'wx98a09b20ba9c64b2';
    const secret = '7bd3451b1ba4a07123020beb15fa7797';
    const url = ctx.request.body.url; // 获取前端传过来的url
    // let url = '';
    let timestamp = '';
    let nonce_str = '';
    let signature = '';
    let access_toekn = '';
    await axios('https://api.weixin.qq.com/cgi-bin/token?grant_type=' + grant_type + '&appid=' + appid + '&secret=' + secret).then(res => {
      access_toekn = res.data.access_token;
    });
    await axios('https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=' + access_toekn + '&type=jsapi').then(res => {
      const jsapi_ticket = res.data.ticket;
      nonce_str = '123456'; // 密钥，字符串任意，可以随机生成
      timestamp = new Date().getTime(); // 时间戳
      // 将请求以上字符串，先按字典排序，再以'&'拼接，如下：其中j > n > t > u，此处直接手动排序
      const str = 'jsapi_ticket=' + jsapi_ticket + '&noncestr=' + nonce_str + '&timestamp=' + timestamp + '&url=' + url;

      // 用sha1加密
      signature = sha1(str);
    });
    // console.log({
    //   appId: appid,
    //   timestamp,
    //   url,
    //   msg: 'success',
    //   nonceStr: nonce_str,
    //   signature,
    // });

    ctx.body = {
      appId: appid,
      timestamp,
      url,
      msg: 'success',
      nonceStr: nonce_str,
      signature,
    };
  }

  async getUserInfoByCode() {
    const ctx = this.ctx;
    const appid = 'wx98a09b20ba9c64b2';
    const secret = '7bd3451b1ba4a07123020beb15fa7797';
    const code = ctx.request.body.code; // 获取前端传过来的code
    const getAccess_token_url = `https://api.weixin.qq.com/sns/oauth2/access_token?appid=${appid}&secret=${secret}&code=${code}&grant_type=authorization_code`;
    let getUserInfoUrl = '';
    let refreshTokenUrl = '';
    let Access_tokenData = {};
    await axios(getAccess_token_url).then(res => {
      console.log(res.data);
      // Access_tokenData = res.data;
      refreshTokenUrl = `https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=${appid}&grant_type=refresh_token&refresh_token=${res.data.refresh_token}`;

    });

    await axios(refreshTokenUrl).then(res => {
      console.log(res.data);
      Access_tokenData = res.data;
      getUserInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${Access_tokenData.access_token}&openid=${res.data.openid}&lang=zh_CN`;
    });

    await axios(getUserInfoUrl).then(res => {
      console.log(res.data);
    });

    await axios(`https://api.weixin.qq.com/sns/auth?access_token=${Access_tokenData.access_token}&openid=${Access_tokenData.openid}`).then(res => {
      console.log(res.data);
      // Access_tokenData = res.data;
      // getUserInfoUrl = `https://api.weixin.qq.com/sns/userinfo?access_token=${res.data.access_toekn}&openid=${res.data.openid}&lang=zh_CN`;
    });
    // https://api.weixin.qq.com/sns/oauth2/refresh_token?appid=APPID&grant_type=refresh_token&refresh_token=REFRESH_TOKEN
    // https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN
    // https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code
    // const { timestamp, nonce, echostr, signature } = reciveData;
    // const token = 'qwertyuiopqqqqq';
    // const list = [ token, timestamp, nonce ].sort();
    // const str = list.join('');
    // const result = sha1(str);
    // if (result === signature) {
    //   ctx.body = echostr;
    // } else {
    //   ctx.body = false;
    // }

  }


}
module.exports = WxsdkController;

