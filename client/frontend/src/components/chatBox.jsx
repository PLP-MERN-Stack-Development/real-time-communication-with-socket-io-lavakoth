// src/components/ChatBox.jsx
import { useState } from 'react';

export default function ChatBox({ sendMessage, setTyping }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleTyping = (e) => {
    setInput(e.target.value);
    setTyping(e.target.value.length > 0);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
      <input
        type="text"
        value={input}
        onChange={handleTyping}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Send
      </button>
    </form>
  );
}