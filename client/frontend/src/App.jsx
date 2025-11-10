// src/App.jsx
import { useState, useEffect } from 'react';
import { useSocket } from './socket';
import MessageList from './components/messageList';
import UserList from './components/userList';
import TypingIndicator from './components/typingIndicator';
import ChatBox from './components/chatBox';

export default function App() {
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const {
    isConnected,
    messages,
    users,
    typingUsers,
    connect,
    disconnect,
    sendMessage,
    setTyping,
  } = useSocket();

  const currentUser = users.find(u => u.id === useSocket().socket?.id);

  const handleJoin = (e) => {
    e.preventDefault();
    if (username.trim()) {
      connect(username.trim());
      setIsJoined(true);
    }
  };

  // Auto-reconnect on mount
  useEffect(() => {
    return () => disconnect();
  }, []);

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6">Real-Time Chat</h1>
          <form onSubmit={handleJoin} className="space-y-4">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Join Chat
            </button>
          </form>
          <p className="text-xs text-center mt-4 text-gray-500">
            {isConnected ? 'Server connected' : 'Connecting...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="flex-1 flex flex-col max-w-4xl mx-auto">
        <header className="bg-white shadow-sm p-4 border-b">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold">Chat Room</h1>
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded">● Online</span>
              <span className="font-medium">{currentUser?.username}</span>
            </div>
          </div>
        </header>

        <div className="flex-1 flex">
          <div className="flex-1 flex flex-col">
            <MessageList messages={messages} />
            <TypingIndicator typingUsers={typingUsers} />
            <ChatBox sendMessage={sendMessage} setTyping={setTyping} />
          </div>
          <UserList users={users} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
}