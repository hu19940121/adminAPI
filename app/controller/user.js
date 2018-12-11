
'use strict';

const Controller = require('egg').Controller;


class UserController extends Controller {
  async login() {
    const ctx = this.ctx;
    const reciveData = ctx.request.body; //
    const { username, password } = reciveData;
    const res = await this.app.mysql.get('user', { username }); // 条件查询一条记录
    let data = {};
    if (res) {
      if (res.password === password) {
        const timestamp = new Date().getTime();
        // jwt生成token
        const token = this.app.jwt.sign({
          username: res.username,
          id: res.id,
        }, this.app.config.jwt.secret, this.app.config.jwt.expiresIn);
        await this.app.mysql.update('user', { id: res.id, update_time: timestamp, token });
        data = { message: '登录成功', data: { token }, code: 20000 };
      } else {
        data = { message: '密码错误', code: 200001 };
      }
    } else {
      data = { message: '用户不存在', code: 200001 };
    }
    console.log(data);
    ctx.body = data;
  }
  async userinfo() {
    const ctx = this.ctx;
    const reciveData = ctx.query;
    const res = await this.app.mysql.get('user', { token: reciveData.token });
    console.log(res);
    let data = {};
    if (res) {
      data = {
        message: '获取用户信息成功',
        data: { name: res.username, avator: res.avator },
        code: 20000,
      };
    }
    ctx.body = data;
  }
}
module.exports = UserController;

