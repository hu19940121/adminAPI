
'use strict';

const Controller = require('egg').Controller;


class videoController extends Controller {
// 列表
  async list() {
    const ctx = this.ctx;
    const pageIndex = ctx.query.pageIndex;
    const pageSize = ctx.query.pageSize;
    let offset = 0;
    const limit = pageSize;
    if (pageIndex === 1) {
      offset = 0;
    } else {
      offset = pageIndex * pageSize - pageSize;
    }
    // console.log(limit, offset);
    // const allres = await this.app.mysql.select('video');
    const allres = await this.app.knex('video').select();
    const res = await this.app.knex('video').select()
      .limit(parseInt(limit))
      .offset(parseInt(offset));

    // const res = await this.app.mysql.select('video', {
    //   limit: parseInt(limit),
    //   offset: parseInt(offset),
    //   title: '',
    // });
    let data = {};
    if (res) {
      data = {
        message: 'success',
        data: res,
        code: 20000,
        count: allres.length,
      };
    }
    ctx.body = data;
  }
  // 新增
  async add() {
    const ctx = this.ctx;
    const acceptData = ctx.request.body;
    if (!acceptData) {
      return;
    }
    const res = await this.app.mysql.insert('video', acceptData);
    let data = {};
    if (res) {
      data = {
        message: '新增成功',
        data: null,
        code: 20000,
      };
    } else {
      data = {
        message: '新增失败',
        data: null,
        code: 20001,
      };
    }
    ctx.body = data;

  }
  // 删除
  async del() {
    const id = this.ctx.query.id;
    let data = {};
    if (id) {
      const res = await this.app.mysql.delete('video', { id });
      if (res) {
        data = {
          message: '删除成功',
          code: 20000,
          data: null,
        };
      }
    } else {
      data = {
        message: '缺少id',
        code: 20001,
        data: null,
      };
    }
    this.ctx.body = data;

  }
  // 按照id查询详情
  async getItemById() {
    const id = this.ctx.query.id;
    let data = {};
    if (id) {
      const res = await this.app.mysql.get('video', { id });
      if (res) {
        data = {
          message: '查询成功',
          code: 20000,
          data: res,
        };
      } else {
        data = {
          message: '未找到',
          code: 20001,
          data: null,
        };
      }
    } else {
      data = {
        message: '缺少id',
        code: 20001,
        data: null,
      };
    }
    this.ctx.body = data;
  }
  // 更新
  async update() {
    const acceptData = this.ctx.request.body;
    const res = await this.app.mysql.update('video', acceptData);
    const updateSuccess = res.affectedRows === 1;
    let data = {};
    if (updateSuccess) {
      data = {
        message: '更新成功',
        data: null,
        code: 20000,
      };
    } else {
      data = {
        message: '更新失败',
        data: null,
        code: 20001,
      };
    }
    this.ctx.body = data;
  }
  // 按照id查询详情
  async selectVideoList() {
    const { ctx, app } = this;
    const acceptData = ctx.request.body;
    let data = {};
    if (acceptData) {
      // const res = await this.app.mysql.get('video', { id });
      const res = await app.knex('video').select().where(acceptData); // 查询

      if (res) {
        data = {
          message: '查询成功',
          code: 20000,
          data: res,
        };
      } else {
        data = {
          message: '未找到',
          code: 20001,
          data: null,
        };
      }
    } else {
      data = {
        message: '缺少is_episode',
        code: 20001,
        data: null,
      };
    }
    ctx.body = data;
  }

}
module.exports = videoController;

