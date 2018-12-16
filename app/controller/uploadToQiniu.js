
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
const domain = 'http://resource.kaier001.com'
var formUploader = new qiniu.form_up.FormUploader(config);

//生成七牛token

	class UploadToQiniuController extends Controller {
    uploadFileToQiniu(uploadToken, key, localFile, putExtra) {
      return new Promise((resolve,reject)=>{
        formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
          respBody, respInfo) {
          if (respErr) {
            console.log('-------------------------------------error',respErr);
            throw respErr;
          }
          if (respInfo.statusCode == 200) {
            resolve(respBody)
          } else {
            reject(respInfo)
            this.ctx.logger('--------上传失败返回的状态值',respInfo)
            console.log('---------------respInfo',respInfo);
          }
        });
      })
    }
    //获取token
    getUploadToken(key) {
      const options = {
        scope: 'kaier'+":"+ key, //可以覆盖空间里的资源
      };
      const putPolicy = new qiniu.rs.PutPolicy(options);
      const uploadToken = putPolicy.uploadToken(mac);
      return uploadToken
    }
		async uploadImage() {
      const { ctx } = this      
      var putExtra = new qiniu.form_up.PutExtra();
      let file = ctx.request.files[0] //获取文件
      // 文件上传
      let result;
        try {
          const uploadToken = this.getUploadToken(file.filename)
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

