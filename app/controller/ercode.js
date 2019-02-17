
'use strict';

const Controller = require('egg').Controller;
var qr = require('qr-image');
class ErcodeController extends Controller {
  async createErcode() {
    const { ctx } = this
    const { text, size, margin } = ctx.query;
    try {
      // 大小默认5，二维码周围间距默认1
      var qr_svg = qr.image('I love QR!', { type: 'svg' });
      qr_svg.pipe(require('fs').createWriteStream('i_love_qr.svg'));
      var svg_string = qr.imageSync('I love QR!', { type: 'svg' });
      console.log('svg_string',svg_string);
      
      // ctx.status = 200;
      // ctx.type = 'image/png';
      // ctx.body = img;
    } catch (e) {
      ctx.status = 414;
      ctx.set('Content-Type', 'text/html');
      ctx.body = '<h1>414 Request-URI Too Large</h1>';
    }
    ctx.body = {
      data:svg_string
    }
  }
}
module.exports = ErcodeController;

