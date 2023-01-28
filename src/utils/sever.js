const http=require('http');
const Koa=require('koa');
const io=require('socket.io');

//
let server=new Koa();
//
let httpServer=http.createServer(server.callback());
httpServer.listen(8080);

//
console.log(httpServer)
let wsServer=io(httpServer);

wsServer.on('connection', sock=>{
  console.log('connected');

  const ID=new Date() * 1;

  sock.emit('ID', ID);

  sock.on('msg', (user, msg)=>{
    wsServer.emit('broadcast', ID, user, msg);
  });
});