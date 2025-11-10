class Message {
  constructor({ id, sender, senderId, message, room = 'global', isPrivate = false, to = null, read = false, timestamp }) {
    this.id = id;
    this.sender = sender;
    this.senderId = senderId;
    this.message = message;
    this.room = room;
    this.isPrivate = isPrivate;
    this.to = to;
    this.read = read;
    this.timestamp = timestamp;
  }
}

module.exports = Message;