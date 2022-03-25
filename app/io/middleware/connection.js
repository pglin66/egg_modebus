/**
 * 在每一个客户端连接或者退出时发生作用
 * @param app
 * @returns {(function(*, *): Promise<void>)|*}
 */
/*  module.exports = app => {
    return async (ctx, next) => {
      ctx.socket.emit('res', 'connected!');
      console.log('server socket connected');
      await next();
    };
  }; */
  module.exports = app => {
    return async (ctx, next) => {
      ctx.socket.emit('res', 'connected!');
      await next();
      // execute when disconnect.
      console.log('disconnection!');
    };
  };