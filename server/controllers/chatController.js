const Message = require('../models/Message');
const { saveMessage } = require('../utils/messageStorage');

const broadcastMessage = (io, socket, text, room = 'global') => {
  const msg = new Message({
    id: Date.now(),
    sender: socket.username,
    senderId: socket.id,
    message: text,
    room,
    timestamp: new Date().toISOString()
  });

  saveMessage(msg);
  io.to(room).emit('receive_message', { ...msg, isOwn: socket.id === msg.senderId });
};

const broadcastSystem = (io, text, room = 'global') => {
  const msg = new Message({
    id: Date.now(),
    system: true,
    message: text,
    room,
    timestamp: new Date().toISOString()
  });
  saveMessage(msg);
  io.to(room).emit('receive_message', msg);
};

module.exports = { broadcastMessage, broadcastSystem };