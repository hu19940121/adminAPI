
'use strict';

const Controller = require('egg').Controller;


class ArticleController extends Controller {
  async list() {
    console.log(this.ctx.session);

  }
  async add() {
    const ctx = this.ctx;
    const reciveData = ctx.request.body;
    const res = await this.app.mysql.insert('article', reciveData);
    if (res.affectedRows === 1) {
      ctx.body = {
        msg: '增加成功',
        code: 0,
      };
    } else {
      ctx.body = {
        msg: '失败',
        code: -1,
      };
    }
  }

}
module.exports = ArticleController;

