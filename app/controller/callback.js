'user strict'
const axios = require('axios');
const client_id = '101533733' //应用的appId
const client_secret = '3c4a6dfdde0060a61d2c79f620b2553c'

const Controller = require('egg').Controller;
  class Callback extends Controller {
    async qqLogin() {
      const { ctx } = this
      // Step1：获取Authorization Code
      const callBackUrl = 'https://www.kaier001.com/api/v1/callback/qq'
      const step1Url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${callBackUrl}&state=qq&scope=get_user_info`
      ctx.redirect(step1Url)
    }
    async qq() {
      const { ctx } = this
      const code = ctx.query.code
      const callBackUrl = 'https://www.kaier001.com/api/v1/callback/qq'
      //Step2：通过Authorization Code获取Access Token
      const step2Url = `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${callBackUrl}`
      let accessTokenObj = {};
      let openIdObj = {}
      let userInfo = {}
      await axios.get(step2Url).then(res=>{
        let accessTokenStr = res.data //获取到accessToken字符串
        accessTokenStr.split('&').map(item=>{
          console.log("item.split('=')[0].toString()",item.split('=')[0].toString());
          console.log("item.split('=')[0]",item.split('=')[0]);
          let key = item.split('=')[0].toString()
          console.log("key",key);
          console.log("typeofkey",typeof(key));
          accessTokenObj[key] = item.split('=')[1]
        })
      })  
      // Step3：通过Access Token Code获取openId
      const step3Url = `https://graph.qq.com/oauth2.0/me?access_token=${accessTokenObj.access_token}`
      await axios.get(step3Url).then(res=>{
        openIdObj = JSON.parse(res.data.replace(/[\r\n]/g,"").match(/^callback\((.*)\);$/)[1]); //callback( {"error":100020,"error_description":"code is reused error"} ) 转为obj
      })
      // Step4: 获取用户信息
      const getUserInfoUrl = `https://graph.qq.com/user/get_user_info?access_token=${accessTokenObj.access_token}&oauth_consumer_key=${client_id}&openid=${openIdObj.openid}`
      await axios.get(getUserInfoUrl).then(res=>{
        userInfo = res.data
      })
      ctx.body = {
        msg:'success',
        code:0,
        userInfo
      }
    }
  }
module.exports = Callback