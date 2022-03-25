/*
 * @Author: pglin66@126.com
 * @Date: 2022-03-23 11:46:52
 * @LastEditors: pglin66@126.com
 * @LastEditTime: 2022-03-23 15:06:24
 * @FilePath: \mps_merchante:\iot\egg_modebus\app\io\controller\default.js
 * @Description: 
 */
// {app_root}/app/io/controller/default.js
'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  async ping() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    await ctx.socket.emit('res', `999Hi! I've got your message: ${message}`);
  }
}

module.exports = DefaultController;

// // or async functions

// exports.ping = async function() {
//   const message = this.args[0];
//   await this.socket.emit('res', `666Hi! I've got your message: ${message}`);
// };