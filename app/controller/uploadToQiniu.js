
'use strict';
const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
	class UploadToQiniuController extends Controller {
		async uploadImage() {
      const { ctx } = this
      console.log('ctx.request.files--------------',ctx.request.files);
      
      const file = ctx.request.files[0];
      console.log('接收的file文件',file);
      
      const name = 'egg-multipart-test/' + path.basename(file.filename);      
      console.log('name-------',name);
      
      let result;
      try {
        // 处理文件，比如上传到云端
        result = await ctx.oss.put(name, file.filepath);
      } finally {
        // 需要删除临时文件
        await fs.unlink(file.filepath);
      }
      ctx.body = {
        url: result.url,
        // 获取所有的字段值
        requestBody: ctx.request.body,
      };
      // console.log('reciveData',reciveData);
    }
   
	}
module.exports = UploadToQiniuController;

