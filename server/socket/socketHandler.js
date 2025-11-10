const { joinUser, leaveUser, getUsersInRoom } = require('../controllers/authController');
const { broadcastMessage, broadcastSystem } = require('../controllers/chatController');
const { getMessages } = require('../utils/messageStorage');

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('user_join', ({ username, room = 'global' }) => {
      socket.join(room);
      joinUser(socket, username, room);
      broadcastSystem(io, `${username} joined ${room}`, room);
      io.to(room).emit('user_list', getUsersInRoom(room));
      socket.emit('load_messages', getMessages(room));
    });

    socket.on('send_message', ({ message, room }) => {
      if (socket.username && message.trim()) {
        broadcastMessage(io, socket, message.trim(), room || socket.room);
      }
    });

    socket.on('typing', ({ isTyping, room }) => {
      socket.to(room || socket.room).emit('typing', { id: socket.id, username: socket.username, isTyping });
    });

    socket.on('private_message', ({ to, message }) => {
      const msg = {
        id: Date.now(),
        sender: socket.username,
        senderId: socket.id,
        message,
        isPrivate: true,
        to,
        timestamp: new Date().toISOString()
      };
      io.to(to).emit('private_message', { ...msg, isOwn: false });
      socket.emit('private_message', { ...msg, isOwn: true });
    });

    socket.on('disconnect', () => {
      const user = leaveUser(socket.id);
      if (user) {
        broadcastSystem(io, `${user.username} left`, user.room);
        io.to(user.room).emit('user_list', getUsersInRoom(user.room));
      }
    });
  });
};