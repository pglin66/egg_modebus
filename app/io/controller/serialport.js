/*
 * @Author: pglin66@126.com
 * @Date: 2022-03-23 15:05:24
 * @LastEditors: pglin66@126.com
 * @LastEditTime: 2022-03-23 15:34:50
 * @FilePath: \mps_merchante:\iot\egg_modebus\app\io\controller\serialport.js
 * @Description: 
 */
'use strict';
var serialport;
const Controller = require('egg').Controller;
const { SerialPort ,SerialPortMock } = require('serialport')
class DefaultController extends Controller {
  async list() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    await ctx.socket.emit('list', await SerialPort.list());
  }
  async connect(){
    serialport = new SerialPort({ path: 'COM3', baudRate: 9600 })
  }
  async write(){
    serialport.write('ROBOT POWER ON')
  }
}
module.exports = DefaultController;
// or async functions
/* exports.ping = async function() {
  const message = this.args[0];
  await this.socket.emit('res', `666Hi! I've got your message: ${message}`);
}; */