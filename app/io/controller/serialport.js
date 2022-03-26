/*
 * @Author: pglin66@126.com
 * @Date: 2022-03-23 15:05:24
 * @LastEditors: pglin66@126.com
 * @LastEditTime: 2022-03-25 22:09:07
 * @FilePath: \sf-midway-adminf:\iot\2022\egg_modebus\app\io\controller\serialport.js
 * @Description: 
 */
//var iconv = require('iconv-lite');  //引入数据编码格式转换模块
'use strict';
var port;
const Controller = require('egg').Controller;
const { SerialPort ,SerialPortMock } = require('serialport')
class DefaultController extends Controller {

  async list() {
    const { ctx, app } = this;
    const message = ctx.args[0];
    await ctx.socket.emit('list', await SerialPort.list());
  }
  async connect(){
    const { ctx, app } = this;
    const message = ctx.args[0];
    console.log(message)
   
    port = new SerialPort(message)//{ path: 'COM3', baudRate: 9600 }
    /**
     * 
     *   baudrate: baudrate,  //波特率设置
            databits: databits,  //数据位
            parity: parity,  //校验位
            stopbits: stopbits //停止位
     */
    port.on('readable', function () {
      console.log('Data:', port.read())
    })
    
    // Switches the port into "flowing mode"
    port.on('data', function (data) {
      console.log('Data:', data)
    })
    // autoOpen: false,
    // port.open(function (err) {
    //   if (err) {
    //     return console.log('Error opening port: ', err.message)
    //   }
    
    //   // Because there's no callback to write, write errors will be emitted on the port:
    //   port.write('main screen turn on')
    // })
  }
  async write(){
    

    const { ctx, app } = this;
    const message = ctx.args[0];
    console.log(message)
    //var buf_once = new Buffer(message, 'hex');//ascii  utf8 utf16le - 2 或 4 个字节 ucs2 - utf16le  base64  latin1  binary - latin1 hex 
    var newdata = new Buffer(message,'hex');//先把数据存在buf里面
    port.write(newdata, function (err, results) {
      if (err) {
          console.log('err ' + err);
      }
      else {
       
          console.log('发送数据字节长度： ' + results);  //发出去的数据字节长度
      }
  })
  }
}
module.exports = DefaultController;

/**
 * 
 *      import io from 'socket.io-client'
      let socket = io("ws://localhost:7001", {
         transports: ['websocket']
        })

// /不间断尝试重连接
    socket.on('reconnect_attempt',()=> { 
      console.log("reconnect")
      socket.transports = ['websocket','polling', 'flashsocket']; 
    });

// 重连接时出错
    socket.on('reconnect_error',(attemptNumber)=> { 
      console.log(attemptNumber)
    });

//连接成功走这个方法
    socket.on('connect',()=>{
      console.log(socket.connected)
    })

//报错时走这个方法
    socket.on('connect_error', (error) => {
      console.log(error)
    });

//连接存活验证 
    socket.on('ping', (error) => {
      console.log('ping_include')
    });

    socket.emit('serialport/list','');
    socket.on('list', (res) => {
      console.log(res)
    });
    //socket.emit('serialport/connect','');
    socket.emit('serialport/write','');


 * 
 */