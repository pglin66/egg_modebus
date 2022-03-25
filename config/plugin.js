/*
 * @Author: pglin66@126.com
 * @Date: 2022-03-15 16:58:38
 * @LastEditors: pglin66@126.com
 * @LastEditTime: 2022-03-23 14:13:24
 * @FilePath: \mps_merchante:\iot\egg_modebus\config\plugin.js
 * @Description: 
 */
'use strict';

/** @type Egg.EggPlugin */
// module.exports = {
//   // had enabled by egg
//   // static: {
//   //   enable: true,
//   // }
// };


// jwt登录状态验证插件
exports.jwt = {
  enable: true,
  package: 'egg-jwt',
};

// 跨域插件
exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.ejs = {
  enable: true,
  package: 'egg-view-ejs',
};

exports.io = {
  enable: true,
  package: 'egg-socket.io',
};