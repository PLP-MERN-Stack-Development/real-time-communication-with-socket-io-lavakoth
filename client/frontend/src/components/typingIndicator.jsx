// src/components/TypingIndicator.jsx
export default function TypingIndicator({ typingUsers }) {
  if (typingUsers.length === 0) return null;

  const names = typingUsers.map(u => u.username).join(', ');
  const text = typingUsers.length > 2
    ? 'Several people are typing...'
    : `${names} ${typingUsers.length > 1 ? 'are' : 'is'} typing...`;

  return (
    <div className="px-4 py-1 text-sm text-gray-500 italic animate-pulse">
      {text}
    </div>
  );
}