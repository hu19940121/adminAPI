
'use strict';

const Controller = require('egg').Controller;


class SwiperController extends Controller {
// 轮播图列表
  async swiperList() {
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
    console.log(limit, offset);
    const allres = await this.app.mysql.select('swiper');
    const res = await this.app.mysql.select('swiper', {
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
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
  // 新增轮播图
  async add() {
    const ctx = this.ctx;
    const acceptData = ctx.request.body;
    if (!acceptData) {
      return;
    }
    const res = await this.app.mysql.insert('swiper', acceptData);
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
  // 删除轮播图
  async del() {
    const id = this.ctx.query.id;
    let data = {};
    if (id) {
      const res = await this.app.mysql.delete('swiper', { id });
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
  // 按照id查询轮播图详情
  async getSwiperById() {
    const id = this.ctx.query.id;
    let data = {};
    if (id) {
      const res = await this.app.mysql.get('swiper', { id });
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
  // 更新轮播图
  async updateSwiper() {
    const acceptData = this.ctx.request.body;
    const res = await this.app.mysql.update('swiper', acceptData);
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
}
module.exports = SwiperController;

