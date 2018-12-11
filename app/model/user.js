'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const User = app.model.define('user', {
    id: { type: INTEGER, primaryKey: true, autoIncrement: true },
    username: INTEGER,
    password: STRING(45),
    create_time: STRING(45),
    update_time: STRING(45),
    isdelete:INTEGER,
    token: STRING(255),
    avator:STRING(255),
  },{
    freezeTableName: true, // Model 对应的表名将与model名相同
    timestamps: false,
  });
  return User;
};