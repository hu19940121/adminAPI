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
      const state = ctx.query.state
      //Step2：通过Authorization Code获取Access Token
      const step2Url = `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${callBackUrl}`
      let result;
      await axios.get(step2Url).then(res=>{
        result = res
      }) 
      ctx.body = {
        msg:'success',
        code:0,
        data:result
      }
      
    }
  }
module.exports = Callback