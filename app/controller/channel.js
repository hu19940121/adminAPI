
'use strict';

const Controller = require('egg').Controller;


class ChannelController extends Controller {
// 频道列表
  async channelList() {
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
    const allres = await this.app.mysql.select('channel');
    console.log(this.app.plugins.knex);

    // const allres = await this.app.knex('channel').select();
    const res = await this.app.mysql.select('channel', {
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
  // 新增频道
  async add() {
    const ctx = this.ctx;
    const acceptData = ctx.request.body;
    if (!acceptData) {
      return;
    }
    const res = await this.app.mysql.insert('channel', acceptData);
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
  // 删除频道
  async del() {
    const id = this.ctx.query.id;
    let data = {};
    if (id) {
      const res = await this.app.mysql.delete('channel', { id });
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
  // 按照id查询频道详情
  async getChannelById() {
    const id = this.ctx.query.id;
    let data = {};
    if (id) {
      const res = await this.app.mysql.get('channel', { id });
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
  // 更新频道
  async updateChannel() {
    const acceptData = this.ctx.request.body;
    const res = await this.app.mysql.update('channel', acceptData);
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
  // 获取channel关联轮播图以及电影种类
  async getChannelContentById() {
    const { ctx, app } = this;
    const { id } = ctx.query;
    let data = {};
    let backData = {};
    const swiperList = await app.knex('swiper').select().where('channelId', id); // 轮播图
    const videoData = await app.knex('videoCate').join('video', 'videoCate.id', 'video.videoCate_id').select()
      .where('channelId', id); // 视频数据
    const cateData = await app.knex('videoCate').select();
    const videoList = [];
    cateData.map(cate => {
      const tempObj = {
        cate_name: '',
        layout: '',
        list: [],
      };
      videoData.map(video => {
        if (video.videoCate_id === cate.id) {
          tempObj.cate_name = cate.name;
          tempObj.layout = cate.layout;
          tempObj.list.push(video);
        }
      });
      if (tempObj.cate_name !== '') {
        videoList.push(tempObj);
      }
    });
    backData = {
      swiperList,
      videoList,
    };
    if (videoList) {
      data = {
        message: 'success',
        code: 20000,
        data: backData,
      };
    } else {
      data = {
        message: 'error',
        code: 20001,
        data: null,
      };
    }
    this.ctx.body = data;
  }
}
module.exports = ChannelController;

