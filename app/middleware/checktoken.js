// app/middleware/checktoken.js
'use strict';
// const jwt = require('jsonwebtoken');
module.exports = app => {
  return async function(ctx, next) {
    const reciveData = ctx.query;
    const token = reciveData.token;
    try {
      app.jwt.verify(token, app.config.jwt.secret); // 解码
      await next(); // 校验成功继续往下执行
    } catch (error) {
      // await next();
      if (error.name === 'TokenExpiredError') { // token过期
        ctx.body = {
          message: 'token已过期请重新登录',
          data: null,
          code: 50014,
        };
        return false;
      }
      if (error.name === 'JsonWebTokenError') {
        ctx.body = {
          code: 50008,
          message: '非法token',
        };
        return;
      }
      ctx.body = {
        code: 500,
        message: '服务器内部错误',
        data: null,
      };
      return;
    }
  };
};
