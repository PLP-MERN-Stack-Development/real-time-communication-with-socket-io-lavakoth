// src/components/MessageList.jsx
export default function MessageList({ messages }) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`flex ${msg.system ? 'justify-center' : msg.isOwn ? 'justify-end' : 'justify-start'}`}
        >
          <div
            className={`max-w-xs px-4 py-2 rounded-lg text-sm ${
              msg.system
                ? 'bg-gray-200 text-gray-600 italic'
                : msg.isOwn
                ? 'bg-blue-600 text-white'
                : 'bg-gray-300 text-gray-800'
            }`}
          >
            {!msg.system && msg.username && (
              <p className="font-semibold text-xs opacity-70">{msg.username}</p>
            )}
            <p>{msg.message}</p>
            <p className="text-xs opacity-70 mt-1">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}