const users = new Map(); // socket.id → { id, username, room }

const joinUser = (socket, username, room = 'global') => {
  const user = { id: socket.id, username, room };
  users.set(socket.id, user);
  socket.username = username;
  socket.room = room;
  return user;
};

const leaveUser = (socketId) => {
  const user = users.get(socketId);
  if (user) users.delete(socketId);
  return user;
};

const getUsersInRoom = (room) => 
  Array.from(users.values()).filter(u => u.room === room);

const getAllUsers = () => Array.from(users.values());

module.exports = { joinUser, leaveUser, getUsersInRoom, getAllUsers };