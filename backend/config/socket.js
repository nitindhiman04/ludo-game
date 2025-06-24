const { Server } = require('socket.io');
const { sessionMiddleware } = require('./session');

let io;

const wrap = (middleware) => (socket, next) => middleware(socket.request, {}, next);

module.exports = (server) => {
  io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000',
      credentials: true,
    },
  });

  io.use(wrap(sessionMiddleware));

  io.on('connection', (socket) => {
    console.log('🟢 A user connected:', socket.id);
    
    socket.on('disconnect', () => {
      console.log('🔴 User disconnected:', socket.id);
    });

    // Example event
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
  });
};

module.exports.getIO = () => io;
