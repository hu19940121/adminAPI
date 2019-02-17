'user strict'
const uuidv1 = require('uuid/v1'); //生成userId
const axios = require('axios');
const client_id = '101533733' //应用的appId
const client_secret = '3c4a6dfdde0060a61d2c79f620b2553c'

const Controller = require('egg').Controller;
  class Callback extends Controller {
    // async qqLogin() {
    //   const { ctx } = this
    //   // Step1：获取Authorization Code
    //   const callBackUrl = 'https://www.kaier001.com/api/v1/callback/qq'
    //   const step1Url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&redirect_uri=${callBackUrl}&state=qq&scope=get_user_info`
    //   ctx.body = `<meta http-equiv="refresh" content="0; url=${step1Url}" />`
    //   // ctx.unsafeRedirect(step1Url)
    // }
    async qq() {
      const { ctx,app } = this
      const code = ctx.query.code
      console.log('code_____',code);
      
      const callBackUrl = 'https://www.kaier001.com/api/v1/callback/qq'
      //Step2：通过Authorization Code获取Access Token
      const step2Url = `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${client_id}&client_secret=${client_secret}&code=${code}&redirect_uri=${callBackUrl}`
      let accessTokenObj = {};
      let openIdObj = {}
      let userInfo = {}
      await axios.get(step2Url).then(res=>{
        let accessTokenStr = res.data //获取到accessToken字符串
        accessTokenStr.split('&').map(item=>{
          let key = item.split('=')[0].toString()
          accessTokenObj[key] = item.split('=')[1]
        })
      })  
      // Step3：通过Access Token Code获取openId
      const step3Url = `https://graph.qq.com/oauth2.0/me?access_token=${accessTokenObj.access_token}`
      await axios.get(step3Url).then(res=>{
        console.log('通过Access Token Code获取openId---------res',res);
        openIdObj = JSON.parse(res.data.replace(/[\r\n]/g,"").match(/^callback\((.*)\);$/)[1]); //callback( {"error":100020,"error_description":"code is reused error"} ) 转为obj
      })
      // Step4: 获取用户信息
      const getUserInfoUrl = `https://graph.qq.com/user/get_user_info?access_token=${accessTokenObj.access_token}&oauth_consumer_key=${client_id}&openid=${openIdObj.openid}`
      await axios.get(getUserInfoUrl).then(res=>{
        console.log('获取用户信息res_________',res);
        userInfo = res.data
      })
      const selectRes = await app.knex('user').select().where('open_id',openIdObj.openid)
      if (selectRes.length > 0) { //如果已经存过数据库了
        ctx.session.userId = selectRes[0].userId
        ctx.redirect('https://www.kaier001.com')
      } else {
        let userId = uuidv1();
        let saveInfo = {
          userId,
          openId: openIdObj.openid,
          nickname: userInfo.nickname,
          city: userInfo.city,
          gender: userInfo.gender,
          province: userInfo.province,
          avatar: userInfo.figureurl_qq_2
        }
        const res = await app.knex('user').insert(saveInfo)
        ctx.session.userId = saveInfo.userId
        ctx.redirect('https://www.kaier001.com')
      }
    }
    async getUserInfo() { //直接在session取用户数据 - -
      const { ctx, app } = this
      let bodyObj = {}
      if (ctx.session.userId) {
        const res = await app.knex('user').select().where('userId',ctx.session.userId)
        const userInfo = res[0]
        bodyObj = {
          msg:'success',
          code:0,
          userInfo
        }
        console.log('有session查出来的',res[0]);
      } else {
        bodyObj = {
          msg:'未登录',
          code:2,
        }
      }
      ctx.body = bodyObj
    }
  }
module.exports = Callback