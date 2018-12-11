
'use strict';

const Controller = require('egg').Controller;
const qiniu = require('qiniu');

class GetTokenController extends Controller {
  async getQiniuToken() { // 获取七牛token
    const accessKey = 'P_8rAw-wQVVhTN9C9plnEkZ1P9LfLQ_zCS-9fV-B';
    const secretKey = '3QvYbmb14AR-LRJmhHcHVtq-38bKrkmIM3wI34Rq';
    const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
    const options = {
      scope: 'kaier', //空间名
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);
    const ctx = this.ctx;
    ctx.body = {
      code: 20000,
      token: uploadToken,
      url: 'ozuws2ja3.bkt.clouddn.com',
      msg: 'success',
    };
  }

}
module.exports = GetTokenController;

