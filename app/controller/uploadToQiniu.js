
'use strict';
const Controller = require('egg').Controller;
const fs = require('mz/fs');
const path = require('path');
const qiniu = require('qiniu');
var config = new qiniu.conf.Config();
// 空间对应的机房
config.zone = qiniu.zone.Zone_z2;
var formUploader = new qiniu.form_up.FormUploader(config);
// 是否使用https域名
//config.useHttpsDomain = true;
// 上传是否使用cdn加速
//config.useCdnDomain = true;
const accessKey = 'P_8rAw-wQVVhTN9C9plnEkZ1P9LfLQ_zCS-9fV-B';
const secretKey = '3QvYbmb14AR-LRJmhHcHVtq-38bKrkmIM3wI34Rq';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const options = {
  scope: 'kaier', //空间名
};
const domain = 'http://resource.kaier001.com'
const putPolicy = new qiniu.rs.PutPolicy(options);
const uploadToken = putPolicy.uploadToken(mac);
var formUploader = new qiniu.form_up.FormUploader(config);

//生成七牛token

	class UploadToQiniuController extends Controller {
    uploadFileToQiniu(uploadToken, key, localFile, putExtra) {
      return new Promise((resolve,reject)=>{
        formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
          respBody, respInfo) {
          if (respErr) {
            throw respErr;
          }
          if (respInfo.statusCode == 200) {
            // console.log('成功。。。。。。。');
            resolve(respBody)
          } else {
            reject(respInfo)
            // console.log(respInfo.statusCode);
            // console.log(respBody);
          }
        });
      })
    }
		async uploadImage() {
      const { ctx } = this      
      var putExtra = new qiniu.form_up.PutExtra();
      let file = ctx.request.files[0] //获取文件
      // 文件上传
      let result;
        try {
          // 处理文件，比如上传到云端
          result = await this.uploadFileToQiniu(uploadToken,file.filename,file.filepath,putExtra)          
        } finally {
          // 需要删除临时文件
          await fs.unlink(file.filepath);
        }
        // console.log(result);
      ctx.body = {
        code:0,
        url: `${domain}/${result.key}`, //拼接为url
        msg:'success'
        // 获取所有的字段值
      };
    }
	}
module.exports = UploadToQiniuController;

