'user strict'
const Controller = require('egg').Controller;
  class Callback extends Controller {
    async qq() {
      const { ctx } = this
      console.log('qqqq',ctx.query);
      
    }
  }
module.exports = Callback