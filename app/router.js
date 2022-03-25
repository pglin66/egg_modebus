/*
 * @Author: pglin66@126.com
 * @Date: 2022-03-15 16:13:36
 * @LastEditors: pglin66@126.com
 * @LastEditTime: 2022-03-23 15:22:16
 * @FilePath: \mps_merchante:\iot\egg_modebus\app\router.js
 * @Description: 
 */
'use strict';

/**
 * @param {Egg.Application} app - egg application 
 */
module.exports = app => {
  const { router, controller, io } = app;
  router.get('/', controller.home.index);
  console.log(io,'io')
     // socket.io
      io.of('/').route('default', io.controller.default.ping);
      io.of('/').route('chat', io.controller.chat.ping);
      io.of('/').route('serialport/list', io.controller.serialport.list);
      io.of('/').route('serialport/connect', io.controller.serialport.connect);
      io.of('/').route('serialport/write', io.controller.serialport.write);
};





