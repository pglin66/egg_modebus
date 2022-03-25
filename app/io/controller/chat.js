/*
 * @Author: pglin66@126.com
 * @Date: 2022-03-23 11:46:52
 * @LastEditors: pglin66@126.com
 * @LastEditTime: 2022-03-23 14:45:37
 * @FilePath: \mps_merchante:\iot\egg_modebus\app\io\controller\chat.js
 * @Description: 
 */
const Controller = require('egg').Controller;

class ChatController extends Controller {
  async ping() {
    const { ctx, app } = this;
    const nsp = app.io.of('/');
    const message = ctx.args[0] || {};
    const socket = ctx.socket;
    const client = socket.id;
    nsp.emit('target', nsp);
    try {
      const { target, payload } = message;
      if (!target) return;
      const msg = ctx.helper.parseMsg('exchange', payload, { client, target });
      nsp.emit(target, msg);
    } catch (error) {
      app.logger.error(error);
    }
  }
}

module.exports = ChatController;
