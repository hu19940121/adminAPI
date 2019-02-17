'use strict';

// had enabled by egg
// exports.static = true;
exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};
exports.knex = {
  enable: true,
  package: 'egg-knex',
};

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};

// exports.assets = {
//   enable: true,
//   package: 'egg-view-assets',
// };

exports.cors = {
  enable: true,
  package: 'egg-cors',
};
// exports.sequelize = {
//   enable: true,
//   package: 'egg-sequelize',
// };
exports.oss = {
  enable: true,
  package: 'egg-oss',
};
exports.static = true;