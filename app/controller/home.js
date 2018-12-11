'use strict';
const path = require('path');

const Controller = require('egg').Controller;
function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class HomeController extends Controller {
  async index() {
    const fs = require('mz/fs');
    const tpl = path.join(this.app.config.static.dir,  'index.html');
    // 如果没变化的话可以 cache 起来，不用每次 read
    this.ctx.body = await fs.readFile(tpl, 'utf-8');
    // const data = {
    //   message: 'success',
    //   data: {
    //     "text":'test'
    //   },
    //   code: 20000,
    // };
    // this.ctx.body = data;
  }
  // async index() {
  //   let msg = ''
  //   const { ctx } = this
  //   // await this.ctx.render('index.html');
  //   // const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
  //   // const query = {id:2 };

  //   // ctx.body = await ctx.model.User.findAll();
  //   const user = await ctx.model.User.findById(toInt(0));
  //   if (!user) {
  //     msg = 'no'
  //   }
  //   ctx.body = {
  //     user,
  //     msg
  //   }
  // }

}

module.exports = HomeController;
