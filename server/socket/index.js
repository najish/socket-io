const { Server } = require('socket.io');
const verifySocketJWT = require('./authMiddleware');
const { Message } = require('../models');

const connectedUsers = {}; // userId -> socketId

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
    },
  });

  // Middleware to authenticate token during handshake
  io.use((socket, next) => {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error('Authentication error: Token missing'));
    }

    const userId = verifySocketJWT(token);
    if (!userId) {
      return next(new Error('Authentication error: Invalid token'));
    }

    socket.userId = userId; // attach userId to socket
    next();
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.userId} -> ${socket.id}`);
    connectedUsers[socket.userId] = socket.id;

    // Handle private messages
    socket.on('private_message', async ({ from, to, text }) => {
      const toSocketId = connectedUsers[to];
      if (toSocketId) {
        io.to(toSocketId).emit('private_message', { from, text });
      }

      // Save message in DB
      try {
        await Message.create({
          senderId: from,
          receiverId: to,
          message: text,
        });
      } catch (err) {
        console.error('Error saving message:', err);
      }
    });

    // Disconnect
    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.userId}`);
      delete connectedUsers[socket.userId];
    });
  });

  return io;
};

module.exports = initSocket;
