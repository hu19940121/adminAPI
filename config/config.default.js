'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {
    // mysql: {
    //   // 单数据库信息配置
    //   client: {
    //     // host
    //     host: '106.13.10.101',
    //     // 端口号
    //     port: '3306',
    //     // 用户名
    //     user: 'kaier001',
    //     // 密码
    //     password: 'hushihao5549003',
    //     // 数据库名
    //     database: 'kaier',
    //   },
    //   // 是否加载到 app 上，默认开启
    //   app: true,
    //   // 是否加载到 agent 上，默认关闭
    //   agent: false,
    // },
    // multipart : {
    //   mode: 'file', //启用file模式
    // },
    security: {
      csrf: {
        enable: false,
        ignoreJSON: true,
      },
      // domainWhiteList: ['*']
    },
    jwt: {
      secret: 'kaier3321',
      expiresIn: {
        expiresIn: 7200, // 秒到期时间
      },
    },
    // middleware: [ 'checktoken' ],

  };
  config.cluster = {
    listen: {
      port: 8080, // 端口
      // hostname: '192.168.1.106', // 你的IP
    },
  };
  config.cors = {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  // config.sequelize = {
  //   dialect: 'mysql',
  //   host: '106.13.10.101',
  //   port: 3306,
  //   database: 'kaier',
  //   username: 'kaier001',
  //   password: 'hushihao5549003'

  // }
  exports.multipart = {
    mode: 'file', //启用file模式
    whitelist: [
          // images
      '.jpg', '.jpeg', // image/jpeg
      '.png', // image/png, image/x-png
      '.gif', // image/gif
      '.bmp', // image/bmp
      '.wbmp', // image/vnd.wap.wbmp
      '.webp',
      '.tif',
      '.psd',
      // text
      '.svg',
      '.js', '.jsx',
      '.json',
      '.css', '.less',
      '.html', '.htm',
      '.xml',
      // tar
      '.zip',
      '.gz', '.tgz', '.gzip',
      // video
      '.mp3',
      '.mp4',
      '.avi',
      '.txt',
      ''
    ],
    fileSize: '100mb',
  }
  exports.knex = {
    // database configuration
    client: {
      // database dialect
      dialect: 'mysql',
      connection: {
        // host
        host: '47.104.191.55',
        // port
        port: '3306',
        // username
        user: 'root',
        // password
        password: '!hblsqt',
        // database
        database: 'kaier2',
      },
      // connection pool
      pool: { min: 0, max: 5 },
      // acquire connection timeout, millisecond
      acquireConnectionTimeout: 30000,
    },
    // load into app, default is open
    app: true,
    // load into agent, default is close
    agent: false,
  };
  exports.view = {
    root: path.join(appInfo.baseDir, 'app/view'),
    mapping: {
      '.html': 'nunjucks',
    },
  };
  exports.static = {
    prefix:'/static',
    dir: path.join(appInfo.baseDir, 'app/public')
  }
  
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1532070433309_6169';

  // add your config here
  config.middleware = [ ];

  return config;
};
// exports.multipart = {
//   mode: 'file', //启用file模式
// }
