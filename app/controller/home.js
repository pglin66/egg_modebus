'use strict';
const Controller = require('egg').Controller;
const { SerialPort ,SerialPortMock } = require('serialport')

const { MockBinding } = require('@serialport/binding-mock')


//VSBC\DEVICES\0001
//VSBC\DEVICES\0000
class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    const path = '/dev/example'
    SerialPortMock.binding.createPort(path)
    const serialport = new SerialPortMock({ path, baudRate: 9600 })
    serialport.write('ROBOT POWER ON')
    MockBinding.createPort('/dev/ROBOT', { echo: true, record: true })

    console.log(await SerialPort.list())

    ctx.body = 'hi';
  }
}
module.exports = HomeController;
