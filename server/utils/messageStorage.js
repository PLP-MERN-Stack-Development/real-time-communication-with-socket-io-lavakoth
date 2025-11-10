const Message = require('../models/Message');
const messages = new Map(); // room → [Message]
const MAX_PER_ROOM = 50;

const saveMessage = (msg) => {
  const room = msg.room || 'global';
  if (!messages.has(room)) messages.set(room, []);
  const roomMsgs = messages.get(room);
  roomMsgs.push(msg);
  if (roomMsgs.length > MAX_PER_ROOM) roomMsgs.shift();
};

const getMessages = (room = 'global') => messages.get(room) || [];

module.exports = { saveMessage, getMessages };